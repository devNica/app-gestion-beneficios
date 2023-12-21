import { useState, useEffect } from 'react'
import CustomNotification from '../../../Components/Notification/CustomNotification'

import { isNull } from "../../../utils/object.util"

/** hooks & management state */
import { useDispatch } from "react-redux"
import { setNotification } from "../../../redux/notification.slice"


import { useGlassesRequestManagement } from "../../useGlass"
import { useTrackingProps } from '../../useTracking'
import { fetchApplicantRelativesAPI } from '../../../service/glasses.api'

export const useHandleGeneralGlassesBenefitInfoForm = ({
    currentIndex,
    updateCurrentIndex,
    mode
}) => {


    const dispatch = useDispatch()

    CustomNotification()

    const { actions, states } = useGlassesRequestManagement()
    const { actions: trackingAct } = useTrackingProps()

    const { generalInfoReq: gnrl, clinics, paymentTypes, applicantList, requestStatus } = states

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [notes, setNotes] = useState(gnrl.notes)
    const [registerDate, setRegisterDate] = useState(new Date().toISOString().slice(0, 10))

    const [clinic, setClinic] = useState(null)
    const [paymentType, setPaymentType] = useState(null)
    const [authorizer, setAuthorizer] = useState(null)
    const [applicant, setApplicant] = useState(null)
    const [relativeModal, setRelativeModal] = useState(false)
    const [optionSelected, setOptionSelected] = useState(gnrl.initialOption)
    const [relatives, setRelatives] = useState([])
    const [relativeSelected, setRelativeSelected] = useState(null)


    useEffect(() => {

        if (gnrl.beneficiary !== null) {
            setApplicant(gnrl.beneficiary)
        }
        if (gnrl.registerDate !== null) {
            setRegisterDate(gnrl.registerDate)
        }
        if (gnrl.paymentType !== null) {
            setPaymentType(gnrl.paymentType)
        }
        if (gnrl.relative !== null) {
            setRelativeSelected(gnrl.relative)
        }
        if (gnrl.selectedClinic !== null) {
            setClinic(gnrl.selectedClinic)
        }

        if (gnrl.authorizedBy !== null) {
            setAuthorizer(gnrl.authorizedBy)
        }


    }, [])

    async function handleApplicantSelection(data) {
        setIsModalOpen(false)
        setApplicant(data)

        const result = await fetchApplicantRelativesAPI(data.employeeId)
        setRelatives(result.data)
        setRelativeSelected(null)
    }

    function handleRelativeSelection(data) {
        setRelativeSelected(data)
        setRelativeModal(false)
    }

    function handleRegisterDate(value) {
        setRegisterDate(value)
    }

    function handleSubmit() {

        if (!isNull(applicant)) {
            dispatch(setNotification({
                message: 'No ha seleccionado al Colaborador',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (optionSelected === 'P' && relativeSelected === null) {
            dispatch(setNotification({
                message: 'No ha seleccionado al pariente del Colaborador',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (clinic === null) {
            dispatch(setNotification({
                message: 'No ha seleccionado la Optica',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (paymentType === null) {
            dispatch(setNotification({
                message: 'No ha seleccionado el tipo de pago',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (authorizer === null) {
            dispatch(setNotification({
                message: 'No ha seleccionado el Autorizador',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        actions.setGnralInfo({
            initialOption: optionSelected,
            registerDate: registerDate,
            beneficiary: applicant,
            relative: relativeSelected,
            selectedClinic: clinic,
            paymentType: paymentType,
            authorizedBy: authorizer,
            notes: notes
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

    function handleOptionSelection(v) {

        if (mode === 'register') {
            setOptionSelected(v)
            setRelativeSelected(null)
            setRelatives(null)
            setApplicant(null)
        } else {
            dispatch(setNotification({
                message: 'No se puede modificar el valor de esta opcion',
                type: 'info',
                delay: 1500
            }))
        }

    }

    return {
        states: {
            isModalOpen,
            applicant,
            notes,
            registerDate,
            clinic,
            clinics,
            paymentType,
            paymentTypes,
            authorizer,
            applicantList,
            relativeSelected,
            relatives,
            relativeModal,
            optionSelected,
            requestStatus
        },

        actions: {
            handleApplicantSelection,
            handleRegisterDate,
            handleSubmit,
            setNotes,
            setIsModalOpen,
            setAuthorizer,
            setClinic,
            setPaymentType,
            setRelativeModal,
            setRelativeSelected,
            handleOptionSelection,
            handleRelativeSelection
        }
    }

}