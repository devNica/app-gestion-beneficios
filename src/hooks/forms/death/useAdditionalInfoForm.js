import { useState, useEffect } from 'react'
import { useDeathRequestManagement } from "../../useDeath.js"
import { formatNumberWithCommas } from "../../../utils/number.util.js"
import { useDispatch } from 'react-redux'
import { registerDeathBenefitApplicationThunk } from '../../../redux/death.slice.js'
import { setNotification } from '../../../redux/notification.slice.js'
import CustomNotification from '../../../Components/Notification/CustomNotification.jsx'
import { useTrackingProps } from '../../useTracking.js'
import { useNavigate } from 'react-router-dom'

export const useAdditionalInfoForm = ({ updateCurrentIndex, currentIndex, mode, orderId }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    CustomNotification()

    const { actions: trackingAct } = useTrackingProps()
   
    const {
        states: {
            generalInfoReq: gnral,
            relativesList,
            additionalInfo: info },
        actions } = useDeathRequestManagement()
    
    const { typeRegister } = gnral
    
    const [relativesConfirmed, setRelativesConfirmed] = useState([])
    const [amountInUs, setAmountInUS] = useState('')
    const [supportsConfirmed, setSupportConfirmed] = useState(actions.getRequiredSupportsByTypeRegister({ typeRegister }))
   
    
    useEffect(() => {
        if (relativesList !== null) {
            setRelativesConfirmed(relativesList)
        }
        if (info.supportsConfirmed !== null) {
            setSupportConfirmed(info.supportsConfirmed)
        }

        setAmountInUS(info.amountInUs)
    }, [])
    
    function updateAmounts(current) {
        let accAmountInUs = 0.00

        for (let index in current) {
            if (current[index].selected) {
                accAmountInUs += current[index].amount
            }
        }

        setAmountInUS(`USD ${formatNumberWithCommas(accAmountInUs)}`)
    }

    function handleBackStep() {
        
        actions.updateRelativeList(relativesConfirmed)
        
        actions.setAdditionalInfo({
            hasSupport: false,
            amountInUs: amountInUs,
            supportsConfirmed
        })
        updateCurrentIndex(currentIndex - 1)
    }

    function registerNewRequets() {
        dispatch(registerDeathBenefitApplicationThunk())

        dispatch(setNotification({
            message: 'Registro Exitoso',
            type: 'success',
            delay: 1500
        }))

        trackingAct.removeTrack({
            procIdentity: 'DAH-REG',
            space: 'death'
        })
    }

    function editRequest() {
        // dispatch(updateGlassesRequestThunk(orderId))

        dispatch(setNotification({
            message: 'Edicion Exitosa',
            type: 'success',
            delay: 1500
        }))

        trackingAct.removeTrack({
            procIdentity: 'DAH-EDIT',
            space: 'death'
        })
    }

    function handleSubmit() {
       

        const confirmed = supportsConfirmed.filter(ele => ele.selected === true)
        
        if (confirmed.length < 1) {
            dispatch(setNotification({
                message: 'No se ha especificado los soportes de la solicitud',
                type: 'warning',
                delay: 1500
            }))

            return
        }


        if (amountInUs === '' || amountInUs === 'U$ 0.00') {
            dispatch(setNotification({
                message: 'No se ha completado la informacion parental',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        const relatives = relativesConfirmed.filter(ele => ele.date !== '')

        if (relatives.length < 1){
            dispatch(setNotification({
                message: 'Especifique la fecha de defuncion del colaborador o familiar',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        actions.updateRelativeList(relativesConfirmed)

        actions.setAdditionalInfo({
            hasSupport: false,
            amountInUs: amountInUs,
            supportsConfirmed
        })
        
        try {

            if (mode === 'register'){
                registerNewRequets()
            } else if (mode === 'edit'){
                editRequest()
            }
            
            setTimeout(() => {
                navigate('/home')
            }, 1700);


        } catch (error) {
            dispatch(setNotification({
                message: mode === 'register' ? 'Registro Fallido' : 'Edicion Fallida',
                type: 'danger',
                delay: 1500
            }))
        }        
    }

    function handleSelectItem(id) {
        if (typeRegister === 'F') {
            const current = relativesConfirmed.map((ele) => {
                if (ele.id === id) {
                    return {
                        ...ele,
                        selected: !ele.selected
                    }
                } else {
                    return { ...ele }
                }
            })

            updateAmounts(current)
            setRelativesConfirmed(current)
        } else {
            const current = relativesConfirmed.map((ele) => {
                if (ele.id === id) {
                    return {
                        ...ele,
                        selected: true
                    }
                } else {
                    return {
                        ...ele,
                        selected: false
                    }
                }
            })

            updateAmounts(current)
            setRelativesConfirmed(current)
        }
    }


    function handleDate(e) {
        const keys = e.target.name.split('_')
        const currData = { [keys[1]]: e.target.value }
        const updateRecord = relativesConfirmed.map(rel => {
            if (rel.id === keys[0]) {
                return { ...rel, ...currData }
            } else return rel
        })

        setRelativesConfirmed(updateRecord)
    }
    
    function handleSupportConfirmation(e) {
        const name = e.target.name
        const updateConfirmed = supportsConfirmed.map(el => {
            if(el.fieldName === name) {
                return {
                    ...el,
                    selected: !el.selected
                }
            } else return el
        })
        
        setSupportConfirmed(updateConfirmed)
    }
    
    
    return {
        states: {
            typeRegister,
            amountInUs,
            relativesConfirmed,
            supportsConfirmed
        },
        actions: {
            handleSubmit,
            handleBackStep,
            handleSelectItem,
            handleDate,
            handleSupportConfirmation
        }
    }
}