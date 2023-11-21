import { useEffect, useState } from "react"
import { useMaternityRequestManagement } from "../../useMaternity"
import { formatNumberWithCommas } from "../../../utils/number.util"
import {useDispatch} from "react-redux";
import {setNotification} from "../../../redux/notification.slice.js";
import CustomNotification from "../../../Components/Notification/CustomNotification.jsx";
import {registerMaternityBenefitThunk, updateMaternityRequestThunk} from "../../../redux/maternity.slice.js";
import {useTrackingProps} from "../../useTracking.js";
import {useNavigate} from "react-router-dom";

export default function useNewBornInfoForm({
    updateCurrentIndex,
    currentIndex,
    authorizedAmountsMathernity,
    orderId,
    mode
}) {

    const { states: { newBornInfoReq: info, childrenList }, actions } = useMaternityRequestManagement()
    const { actions: trackingAct } = useTrackingProps()

    const dispatch = useDispatch()
    CustomNotification()

    const navigate = useNavigate()


    const [support, setSupport] = useState(info.supports)
    const [typeBirth, setTypeBirth] = useState('')

    const [amountInUS, setAmountInUS] = useState('')
    const [confirmedChildren, setConfirmedChildren] = useState(childrenList)
    const [authorizedAmountId, setAuthorizedAmountId] = useState(null)

    useEffect(()=>{
        //if (info.confirmedChildren !== null) setConfirmedChildren(info.confirmedChildren)
        if (info.amountInUS !== null) setAmountInUS(info.amountInUS)
        if (info.typeBirth !== null) setTypeBirth(info.typeBirth)
        if (info.authorizedAmountId !== null) setAuthorizedAmountId(info.authorizedAmountId)
    }, [])

    function registerNewRequets(){

        dispatch(registerMaternityBenefitThunk())

        dispatch(setNotification({
            message: 'Registro Exitoso',
            type: 'success',
            delay: 1500
        }))

        trackingAct.removeTrack({
            procIdentity: 'MTN-REG',
            space: 'maternity'
        })
    }

    function editRequest(){
        dispatch(updateMaternityRequestThunk(orderId))

        dispatch(setNotification({
            message: 'Edicion Exitosa',
            type: 'success',
            delay: 1500
        }))

        trackingAct.removeTrack({
            procIdentity: 'MTN-EDIT',
            space: 'maternity'
        })
    }

    function handleBackStep() {

        actions.setNewBornInfo({
            authorizedAmountId,
            supports: support,
            typeBirth: typeBirth,
            amountInUS: amountInUS
        }, confirmedChildren)

        updateCurrentIndex(currentIndex - 1)
    }

    function handleSubmit() {

        const confirmed = confirmedChildren.some(el => el.selected === true || el.selected === 1)

        if(!confirmed) {
             dispatch(setNotification({
                message: 'Debe Seleccionar al menos un registro en la lista parental',
                 type: 'warning',
                 delay: 1500
             }))

            return
        }

        if(support.length === 0) {
            dispatch(setNotification({
                message: 'Agregue informacion de los soportes presentados por el beneficiario',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        actions.setNewBornInfo({
            authorizedAmountId,
            supports: support,
            typeBirth: typeBirth,
            amountInUS: amountInUS,
        },confirmedChildren)

        try{

            if (mode === 'register'){
                registerNewRequets()
            } else if (mode === 'edit'){
                editRequest()
            }


            setTimeout(() => {
                navigate('/home')
            }, 1700);

        } catch(err) {
            console.error(err)
        }
    }

    function updateAmounts(current) {
        let authAmountInUs = 0.00

        const confirmed = current.filter(child => child.selected === true || child.selected === 1)

        if(confirmed.length === 1 ) {
            const data = authorizedAmountsMathernity.find(ele => ele.relative === 'Normal')
            authAmountInUs = data.amount
            setTypeBirth(data.relative)
            setAuthorizedAmountId(data.id)
        } else if (confirmed.length === 2 ){
            const data = authorizedAmountsMathernity.find(ele => ele.relative === 'Gemelar')
            authAmountInUs = data.amount
            setTypeBirth(data.relative)
            setAuthorizedAmountId(data.id)
        } else if (confirmed.length > 2) {
            const data = authorizedAmountsMathernity.find(ele => ele.relative === 'Parto Multiple')
            authAmountInUs = data.amount
            setTypeBirth(data.relative)
            setAuthorizedAmountId(data.id)
        }

        setAmountInUS(`${formatNumberWithCommas(authAmountInUs)} USD`)
    }

    function handleSelectItem(id) {
        const current = confirmedChildren.map((ele) => {
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
            setConfirmedChildren(current)
    }


    return {
        states: {
            support,
            typeBirth,
            amountInUS,
            confirmedChildren
        },
        actions: {
            handleBackStep,
            handleSelectItem,
            handleSubmit,
            setSupport,
            setTypeBirth
        }
    }
}