import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../../redux/notification.slice'
import CustomNotification from '../../../Components/Notification/CustomNotification'
import { hasEmptyAttr, isNull } from '../../../utils/object.util'
import { isEmpty } from 'lodash'
import { useGlassesRequestManagement } from '../../useGlass'

export const useHandleOphthalmicForm = ({ currentIndex, updateCurrentIndex }) => {

    CustomNotification()

    const dispatch = useDispatch()

    const { states, actions } = useGlassesRequestManagement()
    const {ophthalmicInfoReq: oph } = states

    const [material, setCurrentMaterial] = useState(oph.lenMaterial)
    const [detail, setCurrentDetail] = useState(oph.lenDetail)
    const [len, setCurrentLen] = useState(oph.lenType)
    const [currentDiagnosis, setDiagnosisList] = useState(oph.diagnosis)

    const [rightEye, setRightEye] = useState(oph.rightEye)

    const [leftEye, setLeftEye] = useState(oph.leftEye)

    function handleNextStep() {
        if (hasEmptyAttr(rightEye)) {
            dispatch(setNotification({
                message: 'No ha completado la informacion del ojo derecho',
                type: 'warning',
                delay: 1500
            }))
            return
        }
        if (hasEmptyAttr(leftEye)) {
            dispatch(setNotification({
                message: 'No ha completado la informacion del ojo izquierdo',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (!isNull(len)) {
            dispatch(setNotification({
                message: 'No definido la caracteristica del lente',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (!isNull(material)) {
            dispatch(setNotification({
                message: 'No definido el material del lente',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (!isNull(detail)) {
            dispatch(setNotification({
                message: 'No definido el detalle del lente',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (isEmpty(currentDiagnosis)) {
            dispatch(setNotification({
                message: 'No se ha agregado informacion de diagnotisco',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        /**almacenar la informacion en el store de redux */
        actions.setOphthalmicInfo({
            rightEye,
            leftEye,
            lenMaterial: material,
            lenDetail: detail,
            lenType: len,
            diagnosis: currentDiagnosis
        })

        updateCurrentIndex(currentIndex + 1)
    }

    function handleBackStep() {
        updateCurrentIndex(currentIndex - 1)
    }

    function handleRightChange(e) {

        const newValue = {
            [e.target.name]: e.target.value
        }
        const x = rightEye.map(el => {
            if (Object.keys(el)[0] === Object.keys(newValue)[0]) {
                return newValue
            } else {
                return el
            }
        })
        setRightEye(x)
    }

    function handleLeftChange(e) {

        const newValue = {
            [e.target.name]: e.target.value
        }
        const x = leftEye.map(el => {
            if (Object.keys(el)[0] === Object.keys(newValue)[0]) {
                return newValue
            } else {
                return el
            }
        })
        setLeftEye(x)
    }

    return {
        states: {
            material,
            detail,
            len,
            rightEye,
            leftEye,
            currentDiagnosis
        },
        actions: {
            handleRightChange,
            handleLeftChange,
            handleBackStep,
            handleNextStep,
            setCurrentDetail,
            setCurrentLen,
            setCurrentMaterial,
            setDiagnosisList
        }
    }
}