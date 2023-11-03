import { useState, useEffect } from 'react'
import CustomNotification from '../../../Components/Notification/CustomNotification'

import { isNull } from "../../../utils/object.util"

/** hooks & management state */
import { useGetUserInfo } from "../../useAuth"
import { useDispatch } from "react-redux"
import { setNotification } from "../../../redux/notification.slice"


import { useGlassesRequestManagement } from "../../useGlass"
import { getCurrentDateString } from "../../../utils/date.util"
import { isEmpty } from "lodash"
import { useTrackingProps } from '../../useTracking'

export const useHandleGeneralGlassesBenefitInfoForm = ({ 
    paymentTypes, 
    currentIndex, 
    updateCurrentIndex,
    authorizedAmount, 
    mode
}) => {


    const dispatch = useDispatch()
    /** Notifications Controller */
    CustomNotification()
    const logger = useGetUserInfo()

    const { actions, states } = useGlassesRequestManagement()
    const { actions: trackingAct } = useTrackingProps()


    const { generalInfoReq: gnrl } = states

    const [paymentType, setPaymentType] = useState(gnrl.paymentType !== null ? gnrl.paymentType : paymentTypes[0])
    const [currentClinic, setCurrentClinic] = useState(gnrl.clinic)
    const [currentAuthorizer, setCurrentAuthorizer] = useState(gnrl.authorizer)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [beneficiary, setBeneficiary] = useState(null)
    const [notes, setNotes] = useState(gnrl.notes)
    const [letterRef, setLetterRef] = useState(gnrl.letterRef)
    const [memoRef, setMemoRef] = useState(gnrl.memoRef)

    const [registerDate, setRegisterDate] = useState(gnrl.registerDate || new Date().toISOString().slice(0, 10))
    const [hashDate, setHashDate] = useState(getCurrentDateString('', gnrl.registerDate || new Date().toISOString().slice(0, 10)))

    useEffect(()=>{
        if(gnrl.beneficiary !== null) {
            setBeneficiary(gnrl.beneficiary)
        }
    }, [])

    function handleEmployeeSelection(data) {
        setIsModalOpen(false)
        setBeneficiary(data)
    }

    function handleSetPaymentType(value) {
        if (paymentType.id !== value.id && value.id === 1) {
            setPaymentType(value)
            setMemoRef('')
        } else if (paymentType.id !== value.id && value.id === 2) {
            setPaymentType(value)
            setLetterRef('')
        }
    }

    function handleRegisterDate(value) {
        const prevDate = getCurrentDateString('', registerDate)
        const postDate = getCurrentDateString('', value)

        setRegisterDate(value)
        setHashDate(postDate)

        if (paymentType.id === 1) {
            setLetterRef(prev => prev.replace(prevDate, postDate))
        } else {
            setMemoRef(prev => prev.replace(prevDate, postDate))
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (paymentType.id === 1) {
                setLetterRef(prev => {
                    const hash = prev.slice(0, (prev.length - 10))
                    if (hash.length === 0) {
                        return ''
                    } else if (hash.length > 0) {
                        return hash + '-'
                    }
                })
            } else {
                setMemoRef(prev => {
                    const hash = prev.slice(0, (prev.length - 10))
                    if (hash.length === 0) {
                        return ''
                    } else if (hash.length > 0) {
                        return hash + '-'
                    }
                })
            }
        }
    }

    function updateDocumentRefs(value) {
        if (paymentType.id === 1) {
            setLetterRef(prev => {
                console.log('prev: ', prev, '   hasdate:', hashDate)
                if (isEmpty(prev)) {
                    return value + '-' + hashDate
                } else {
                    return value.replace(`-${hashDate}`, '') + '-' + hashDate
                }
            })
        } else {
            setMemoRef(prev => {
                if (isEmpty(prev)) {
                    return value + '-' + hashDate
                } else {
                    return value.replace(`-${hashDate}`, '') + '-' + hashDate
                }

            })
        }
    }

    function handleSubmit() {

        if (!isNull(beneficiary)) {
            dispatch(setNotification({
                message: 'No ha seleccionado al Beneficiario',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (!isNull(currentClinic)) {
            dispatch(setNotification({
                message: 'No ha seleccionado una clinica',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (!isNull(currentAuthorizer)) {
            dispatch(setNotification({
                message: 'No ha seleccionado el autorizador del beneficio',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (paymentType.value === 1) {
            if (!isNull(letterRef)) {
                dispatch(setNotification({
                    message: 'No se ha digitado el numero de Referencia de la Carta de Reembolso',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }
        } else {
            if (!isNull(memoRef)) {
                dispatch(setNotification({
                    message: 'No se ha digitado el numero de Referencia del memorandum',
                    type: 'warning',
                    delay: 1500
                }))

                return
            }
        }

        actions.setGnralInfo({
            registerDate,
            beneficiary,
            paymentType,
            clinic: currentClinic,
            authorizedAmount: authorizedAmount,
            notes,
            logger: logger.username,
            authorizer: currentAuthorizer,
            letterRef,
            memoRef
        }, mode)

        trackingAct.trackingUpdate({
            typeAction: 'add',
            data: {
                message: '',
                space: 'glass',
                mode,
                procIdentity: mode === 'register' ? 'GL-REG' : 'GL-EDIT'
            },
            space: 'glass'
        })

        updateCurrentIndex(currentIndex + 1)
    }

    return {
        states: {
            paymentType,
            currentClinic,
            currentAuthorizer,
            isModalOpen,
            beneficiary,
            notes,
            letterRef,
            memoRef,
            registerDate,
            hashDate,
            logger
        },

        actions: {
            handleEmployeeSelection,
            handleRegisterDate,
            handleSubmit,
            setCurrentClinic,
            setCurrentAuthorizer,
            setNotes,
            setIsModalOpen,
            updateDocumentRefs,
            handleKeyDown,
            handleSetPaymentType
        }
    }

}