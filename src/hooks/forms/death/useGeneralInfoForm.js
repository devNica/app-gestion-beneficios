import { useEffect, useState } from "react"
import { useGetUserInfo } from "../../useAuth"
import { useDeathRequestManagement } from "../../useDeath"
import { getCurrentDateString } from "../../../utils/date.util"
import { isEmpty } from "lodash"
import { useDispatch } from "react-redux"
import CustomNotification from "../../../Components/Notification/CustomNotification"
import { isNull } from "../../../utils/object.util"
import { setNotification } from "../../../redux/notification.slice"
import { resetAdditionalInfoReq, setRelativeList } from "../../../redux/death.slice"
import { useTrackingProps } from "../../useTracking.js";
import { useBeneficiaryProps } from "../../useBeneficiary.js";


export default function useGeneralInfoForm({ updateCurrentIndex, currentIndex, mode }) {

    const dispatch = useDispatch()
    const logger = useGetUserInfo()

    /** Notifications Controller */
    CustomNotification()

    const { states: { employeeList }, actions: beneficiaryAct } = useBeneficiaryProps()

    const relativesOfEmployee = employeeList

    const { states: { generalInfoReq: gnral, relativesList }, actions } = useDeathRequestManagement()
    const { actions: trackingAct } = useTrackingProps()


    const [registerDate, setRegisterDate] = useState(new Date().toISOString().slice(0, 10))
    const [typeRegister, setTypeRegister] = useState('F') // C = colaborador or F = familiar
    const [paymentType, setPaymentType] = useState(null)
    const [beneficiary, setBeneficiary] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentAuthorizer, setCurrentAuthorizer] = useState(null)
    const [notes, setNotes] = useState('')
    const [memoRef, setMemoRef] = useState('')
    const [hashDate, setHashDate] = useState(getCurrentDateString('', gnral.registerDate || new Date().toISOString().slice(0, 10)))
    const [relatives, setRelatives] = useState([])


    useEffect(() => {
        setBeneficiary(gnral.beneficiary)
        setNotes(gnral.notes)
        setMemoRef(gnral.memoRef)
        setPaymentType(gnral.paymentType)
        setRegisterDate(gnral.registerDate || new Date().toISOString().slice(0, 10))
        setCurrentAuthorizer(gnral.authorizer)
        setTypeRegister(gnral.typeRegister)
        setRelatives(relativesList)
    }, [])

    function handleTypeRegister(v) {
        if (mode === 'register') {
            setTypeRegister(v)
            setBeneficiary(null)
        }
    }

    function handleEmployeeSelection(data) {
        setIsModalOpen(false)
        setBeneficiary(data)
        const listOfMonetaryAidPerRelative = beneficiaryAct.calcMonetaryAidForDeath(data.employeeId, typeRegister)
        setRelatives(listOfMonetaryAidPerRelative)
        dispatch(resetAdditionalInfoReq())
    }

    function handleRegisterDate(value) {
        const prevDate = getCurrentDateString('', registerDate)
        const postDate = getCurrentDateString('', value)

        setRegisterDate(value)
        setHashDate(postDate)
        setMemoRef(prev => prev.replace(prevDate, postDate))

    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {

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

    function updateDocumentRefs(value) {
        setMemoRef(prev => {
            if (isEmpty(prev)) {
                return value + '-' + hashDate
            } else {
                return value.replace(`-${hashDate}`, '') + '-' + hashDate
            }
        })
    }

    function handleNextStep() {

        if (!isNull(beneficiary)) {
            dispatch(setNotification({
                message: 'No ha seleccionado al Beneficiario',
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

        if (memoRef === '') {
            dispatch(setNotification({
                message: 'No se ha digitado el numero de Referencia del memorandum',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        dispatch(setRelativeList(relatives))
        actions.setGnralInfo({
            typeRegister,
            registerDate,
            beneficiary,
            paymentType,
            notes,
            logger: logger.username,
            authorizer: currentAuthorizer,
            memoRef,
        })

        trackingAct.trackingUpdate({
            typeAction: 'add',
            data: {
                message: '',
                space: 'death',
                mode,
                procIdentity: mode === 'register' ? 'DAH-REG' : 'DAH-EDIT'
            },
            space: 'death'
        })

        updateCurrentIndex(currentIndex + 1)
    }

    return {
        states: {
            registerDate,
            typeRegister,
            paymentType,
            beneficiary,
            isModalOpen,
            notes,
            currentAuthorizer,
            relativesOfEmployee,
            logger,
            memoRef
        },
        actions: {
            setPaymentType,
            setCurrentAuthorizer,
            setIsModalOpen,
            setNotes,
            handleTypeRegister,
            handleEmployeeSelection,
            handleRegisterDate,
            handleKeyDown,
            updateDocumentRefs,
            handleNextStep
        }
    }
}