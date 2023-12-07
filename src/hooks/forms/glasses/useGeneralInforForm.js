import { useState, useEffect } from 'react'
import CustomNotification from '../../../Components/Notification/CustomNotification'

import { isNull } from "../../../utils/object.util"

/** hooks & management state */
import { useGetUserInfo } from "../../useAuth"
import { useDispatch } from "react-redux"
import { setNotification } from "../../../redux/notification.slice"


import { useGlassesRequestManagement } from "../../useGlass"
import { useTrackingProps } from '../../useTracking'

export const useHandleGeneralGlassesBenefitInfoForm = ({
    currentIndex,
    updateCurrentIndex,
    mode
}) => {


    const dispatch = useDispatch()
    const logger = useGetUserInfo()

    CustomNotification()

    const { actions, states } = useGlassesRequestManagement()
    const { actions: trackingAct } = useTrackingProps()

    const { generalInfoReq: gnrl } = states

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [beneficiary, setBeneficiary] = useState(null)
    const [notes, setNotes] = useState(gnrl.notes)
    const [medicalRecord, setMedicalRecord] = useState(null)

    const [registerDate, setRegisterDate] = useState(new Date().toISOString().slice(0, 10))

    useEffect(() => {
        if (gnrl.beneficiary !== null) {
            setBeneficiary(gnrl.beneficiary)
        }
        if (gnrl.registerDate !== null) {
            setRegisterDate(gnrl.registerDate)
        }
        if (gnrl.medicalRecord !== null) {
            setMedicalRecord(gnrl.medicalRecord)
        }
    }, [])

    function handleEmployeeSelection(data) {
        setIsModalOpen(false)
        setBeneficiary(data)
    }

    function handleRegisterDate(value) {
        setRegisterDate(value)
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

        actions.setGnralInfo({
            registerDate,
            beneficiary,
            medicalRecord,
            notes
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
            isModalOpen,
            beneficiary,
            notes,
            registerDate,
            logger,
        },

        actions: {
            handleEmployeeSelection,
            handleRegisterDate,
            handleSubmit,
            setNotes,
            setIsModalOpen,
        }
    }

}