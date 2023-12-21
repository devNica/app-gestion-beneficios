import { useState } from 'react'
import Select from '../../Components/Select/Select'

import CustomNotification from '../../Components/Notification/CustomNotification'

import { usePaymentHook } from '../../hooks/usePayment'

import Records from './Records'
import { currencyToNumber, formatNumberWithCommas } from '../../utils/number.util'
import CustomInput from '../../Components/CustomInput/CustomInput'
import { isEmpty } from 'lodash'
import { getCurrentDateString } from '../../utils/date.util'
import { fetchApplicationsPendingForPaymentAPI, registerPaymentRequestAPI } from '../../service/payments.api'

import { useAuthHook } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'

import './payment-request-form.css'
import { setNotification } from '../../redux/notification.slice'
import { loadPayments } from '../../redux/payment.slice'


const PaymentRequestToClinicForm = ({ currentIndex, updateCurrentIndex }) => {

    const { states: { clinics, periods } } = usePaymentHook()
    const { states: authSts } = useAuthHook()
    const dispatch = useDispatch()

    CustomNotification()

    const [clinic, setClinic] = useState(null)
    const [period, setPeriod] = useState(null)
    const [recordsSelected, setSelection] = useState([])
    const [accAmount, setAccAmount] = useState('C$ 0.00')
    const [memoRef, setMemoRef] = useState('')
    const [hashDate, setHashDate] = useState(getCurrentDateString('.', new Date().toISOString().slice(0, 10)))
    const [records, setRecords] = useState([])


    async function handleClinicSelection(data) {
        setClinic(data)
        const result = await fetchApplicationsPendingForPaymentAPI(data.id)
        setRecords(result.data)
        setAccAmount('C$ 0.00')
        setSelection([])
    }

    function resetFields() {
        setClinic(null)
        setPeriod(null)
        setAccAmount('C$ 0.00')
        setSelection([])
        setRecords([])
        setMemoRef('')
    }


    function calculateAccumulatedAmount(items) {
        let currencyAmount = 0

        items.forEach(item => {
            currencyAmount += currencyToNumber(item.amountNio.split(' ')[1])
        })

        setAccAmount(`C$ ${formatNumberWithCommas(currencyAmount)}`)
    }

    function handleSelection(data) {
        console.log(data)
        const itemFound = recordsSelected.find(cs => cs.glassesRequestId === data.glassesRequestId)

        // si es diferente de nulo, ya estaba en el los seleccionado
        // lo tanto hay que sacarlo de la lista actual
        if (itemFound !== undefined) {
            const items = recordsSelected.filter(cs => cs.glassesRequestId !== data.glassesRequestId)
            calculateAccumulatedAmount(items)

            setSelection(items)
        } else {
            const updateItems = [...recordsSelected, data]

            calculateAccumulatedAmount(updateItems)
            setSelection(updateItems)

        }

    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setMemoRef(prev => {
                const hash = prev.slice(0, (prev.length - 11))
                if (hash.length === 0 || hash.length === 1) {
                    return ''
                } else if (hash.length > 1) {
                    return hash
                }
            })
        }
    }

    function updateDocumentRefs(value) {
        setMemoRef(prev => {
            if (isEmpty(prev)) {
                return value + '.' + hashDate
            } else {
                return value.replace(`.${hashDate}`, '') + '.' + hashDate
            }
        })
    }

    async function handleSubmit() {

        if (clinic === null) {
            dispatch(setNotification({
                message: 'Debe seleccionar una clinica de la lista actual',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (period === null) {
            dispatch(setNotification({
                message: 'Debe seleccionar un periodo de la lista actual',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (recordsSelected.length < 1) {
            dispatch(setNotification({
                message: 'Debe seleccionar al menos un registro para procesar la solicitud',
                type: 'warning',
                delay: 1500
            }))

            return
        }


        if (memoRef === '') {
            dispatch(setNotification({
                message: 'No ha digitado la referencia del memorandum',
                type: 'warning',
                delay: 1500
            }))

            return
        }


        const payload = {
            memoRef,
            numberDocs: recordsSelected.length,
            amountNio: currencyToNumber(accAmount.split(' ')[1]),
            clinicId: clinic.id,
            periodId: period.id,
            createdBy: authSts.user.id,
            requestToPay: recordsSelected.map(record => ({ glassesRequestId: record.glassesRequestId }))
        }

        const result = await registerPaymentRequestAPI(payload)
            .finally(() => {
                dispatch(setNotification({
                    message: 'Registro de Solicitud Exitoso',
                    type: 'success',
                    delay: 1500
                }))
            })

        resetFields()

        dispatch(loadPayments(result.data))
    }

    function goToHistory() {
        updateCurrentIndex(currentIndex + 1)
    }

    return (
        <div className="payment__request-form">

            <div className="option__filter">
                <Select
                    id={'clinic'}
                    options={clinics}
                    currentValue={clinic}
                    onChange={(v) => handleClinicSelection(v)}
                    label='Optica:'
                />

                <Select
                    id={'period'}
                    options={periods}
                    currentValue={period}
                    onChange={(v) => setPeriod(v)}
                    label='Periodo:'
                />

                <CustomInput
                    id="memoRef"
                    name="memoRef"
                    label="Memorandum Ref:"
                    type="text"
                    value={memoRef}
                    handleKeyDown={handleKeyDown}
                    onChange={(e) => updateDocumentRefs(e.target.value)}
                />
            </div>

            <Records
                data={records}
                handleSelectionRow={handleSelection}
            />


            <table className='resume'>
                <tbody>
                    <tr className='resume-info'>
                        <td>Total:</td>
                        <td>{accAmount}</td>
                    </tr>
                </tbody>
            </table>


            <div className="options">
                <button className="btn btn__next" onClick={goToHistory}>
                    Ver Registros
                </button>

                <button className='btn btn__payment' onClick={handleSubmit}>
                    Generar Sol Pago
                    <i className="bi bi-cash-stack"></i>
                </button>


            </div>


        </div>
    )
}

export default PaymentRequestToClinicForm