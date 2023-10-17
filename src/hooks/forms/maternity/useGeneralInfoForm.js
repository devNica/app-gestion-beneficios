import { useEffect, useState } from "react"
import { useEmployeeProps } from "../../useEmployee"
import { useGetUserInfo } from "../../useAuth"
import { useMaternityRequestManagement } from "../../useMaternity"
import { useDispatch } from "react-redux"
import CustomNotification from "../../../Components/Notification/CustomNotification"
import { isNull } from "../../../utils/object.util"
import { setNotification } from "../../../redux/notification.slice"
import { getCurrentDateString } from "../../../utils/date.util"
import { isEmpty } from "lodash"


export default function useGeneralInfoForm({ updateCurrentIndex, currentIndex, paymentTypes }) {

    const dispatch = useDispatch()
    /** Notifications Controller */
    CustomNotification()

    const { getMaternityBeneficiaries, getPartnerBeneficiary } = useEmployeeProps()
    const logger = useGetUserInfo()

    const { states: { generalInfoReq: gnrl }, actions } = useMaternityRequestManagement()


    const [registerDate, setRegisterDate] = useState(new Date().toISOString().slice(0, 10))
    const [paymentType, setPaymentType] = useState(paymentTypes[0])
    const [beneficiary, setBeneficiary] = useState(null)
    const [currentAuthorizer, setCurrentAuthorizer] = useState(null)
    const [notes, setNotes] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [partner, setPartner] = useState('')
    const [genderSelected, setGender] = useState('F')
    const [memoRef, setMemoRef] = useState('')
    const [hashDate, setHashDate] = useState(getCurrentDateString('', gnrl.registerDate || new Date().toISOString().slice(0, 10)))

    useEffect(() => {
        if (gnrl.registerDate !== null) {
            setRegisterDate(gnrl.registerDate)
        }
        if (gnrl.authorizer !== null) {
            setCurrentAuthorizer(gnrl.authorizer)
        }
        if (gnrl.paymentType !== null) {
            setPaymentType(gnrl.paymentType)
        }
        if (gnrl.partner !== null) {
            setPartner(gnrl.partner)
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

    const employeeList = getMaternityBeneficiaries({
        queryFields: [{ gender: genderSelected }],
        returnFields: ['id', 'first_name', 'last_name', 'email'],
        gender: genderSelected
    })

    function updateGenderSelected(value) {
        setGender(value)
        setBeneficiary(null)
        setPartner(null)
    }

    function handleEmployeeSelection(data) {
        setIsModalOpen(false)
        setBeneficiary(data)

        if (genderSelected === 'M') {
            setPartner(getPartnerBeneficiary({
                beneficiaryName: `${data.first_name} ${data.last_name}`
            }))
        } else {
            setPartner(null)
        }
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
            partner
        })

        updateCurrentIndex(currentIndex + 1)
    }


    return {
        states: {
            paymentType,
            beneficiary,
            currentAuthorizer,
            isModalOpen,
            partner,
            genderSelected,
            registerDate,
            memoRef,
            notes,
            employeeList,
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