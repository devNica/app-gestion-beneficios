import { useEffect, useState } from "react"
import { useGetUserInfo } from "../../useAuth"
import { useMaternityRequestManagement } from "../../useMaternity"
import { useDispatch } from "react-redux"
import CustomNotification from "../../../Components/Notification/CustomNotification"
import { isNull } from "../../../utils/object.util"
import { setNotification } from "../../../redux/notification.slice"
import { getCurrentDateString } from "../../../utils/date.util"
import { isEmpty } from "lodash"
import {useTrackingProps} from "../../useTracking.js";
import {useBeneficiaryProps} from "../../useBeneficiary.js";


export default function useGeneralInfoForm({
    updateCurrentIndex,
    currentIndex,
    paymentTypes,
    mode
}) {

    const dispatch = useDispatch()
    /** Notifications Controller */
    CustomNotification()

    const {  actions: beneficiaryAct  } = useBeneficiaryProps()

    const logger = useGetUserInfo()

    const { states: { generalInfoReq: gnrl, markedChildren, childrenList }, actions } = useMaternityRequestManagement()
    const { actions: trackingAct} =useTrackingProps()

    const [registerDate, setRegisterDate] = useState(new Date().toISOString().slice(0, 10))
    const [paymentType, setPaymentType] = useState(paymentTypes[0])
    const [beneficiary, setBeneficiary] = useState(null)
    const [currentAuthorizer, setCurrentAuthorizer] = useState(null)
    const [notes, setNotes] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [couple, setCouple] = useState('-')
    const [genderSelected, setGender] = useState('F')
    const [memoRef, setMemoRef] = useState('')
    const [hashDate, setHashDate] = useState(getCurrentDateString('', gnrl.registerDate || new Date().toISOString().slice(0, 10)))

    const [children, setChildrenList] = useState([])

    useEffect(() => {

        if(mode === 'edit'){
            const noSelected = beneficiaryAct.getChildren({ employeeId: gnrl.beneficiary.employeeId })
            setChildrenList([...noSelected, ...markedChildren])
        }

        if ( mode === 'register') {
           setChildrenList(childrenList)
        }

        if (gnrl.registerDate !== null) {
            setRegisterDate(gnrl.registerDate)
        }
        if (gnrl.authorizer !== null) {
            setCurrentAuthorizer(gnrl.authorizer)
        }
        if (gnrl.paymentType !== null) {
            setPaymentType(gnrl.paymentType)
        }
        if (gnrl.couple !== null) {
            setCouple(gnrl.couple)
        }
        if (gnrl.gender !== null) {
            setGender(gnrl.gender)
        }
        if (gnrl.notes !== null) {
            setNotes(gnrl.notes)
        }
        if (gnrl.memoRef !== null) {
            setMemoRef(gnrl.memoRef)
        }
        if (gnrl.beneficiary !== null) {
            setBeneficiary(gnrl.beneficiary)
        }
    }, [])

    function updateGenderSelected(value) {
        setGender(value)
        setBeneficiary(null)
        setCouple(null)
    }

    function handleEmployeeSelection(data) {
        setIsModalOpen(false)
        setBeneficiary(data)

        if (genderSelected === 'M') {
            const couple = beneficiaryAct.getCoupleName({
                employeeId: data.employeeId
            })
            setCouple(couple)
        } else {
            setCouple(null)
        }

        if(mode === 'register') {
            setChildrenList(beneficiaryAct.getChildren({ employeeId: data.employeeId }))
        } else if (mode === 'edit') {
            const noSelected = beneficiaryAct.getChildren({ employeeId: gnrl.beneficiary.employeeId })
            setChildrenList([...noSelected, ...markedChildren])
        }
        
        actions.resetNewBornInfo()
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

    function handleSubmit() {

        if (!isNull(beneficiary)) {
            dispatch(setNotification({
                message: 'No ha seleccionado al Beneficiario',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (genderSelected === 'M') {
            if(couple === '-') {
                dispatch(setNotification({
                    message: 'El colaborador no tiene una Pareja asociada',
                    type: 'warning',
                    delay: 1500
                }))
                return
            }
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

        actions.setGnralInfo({
            gender: genderSelected,
            registerDate,
            beneficiary,
            paymentType,
            notes,
            logger: logger.username,
            authorizer: currentAuthorizer,
            memoRef,
            couple
        }, children)

        trackingAct.trackingUpdate({
            typeAction: 'add',
            data: {
                message: '',
                space: 'maternity',
                mode,
                procIdentity: mode === 'register' ? 'MTN-REG' : 'MTN-EDIT'
            },
            space: 'maternity'
        })

        updateCurrentIndex(currentIndex + 1)
    }


    return {
        states: {
            paymentType,
            beneficiary,
            currentAuthorizer,
            isModalOpen,
            couple,
            genderSelected,
            registerDate,
            memoRef,
            notes,
            employeeList: beneficiaryAct.getBeneficiaryListBySex({ sex: genderSelected  }),
            logger
        },
        actions: {
            updateGenderSelected,
            handleEmployeeSelection,
            handleSubmit,
            handleRegisterDate,
            handleKeyDown,
            updateDocumentRefs,
            setRegisterDate,
            setPaymentType,
            setCurrentAuthorizer,
            setIsModalOpen,
            setNotes,
            setMemoRef
        }
    }


}