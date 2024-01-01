import { useEffect, useState } from 'react'
import { usePaymentHook } from '../../hooks/usePayment'
import { formatNumberWithCommas } from '../../utils/number.util'
import { useDispatch } from 'react-redux'
import { registerPaymentPlanAPI, updatePaymentReferenceAPI } from '../../service/payments.api'
import { setNotification } from '../../redux/notification.slice'

import UnConfirmedPaymentPlan from './UnConfirmePaymentPlan'
import ConfirmedPaymentPlan from './ConfirmedPaymentPlan'

import './payment-plan-form.css'
import { getCurrentDateString } from '../../utils/date.util'
import { isEmpty } from 'lodash'
import ReactTooltip from 'react-tooltip'
import { loadPaymentPlanProps } from '../../redux/payment.slice'


const cardinals = [
    'Primera', 'Segunda', 'Tercera', 'Cuarta',
    'Quinta', 'Sexta', 'Septima', 'Octava',
    'Novena', 'Decima', 'Decima Primera', 'Decima Segunda'
]

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const years = [
    2023, 2024, 2025, 2026, 2027, 2028, 2029
]

const PaymentPlanForm = () => {

    const { states: { paymentPlanProps } } = usePaymentHook()
    const { installments, docId, confirmed, serie, status, paymentPlan, memoRef } = paymentPlanProps

    const [plan, setPlan] = useState([])
    const [initialMonth, setInitialMonth] = useState(months[0])
    const [initialYear, setInitialYear] = useState(years[0])
    const [reference, setReference] = useState(null)
    const [hashDate, setHashDate] = useState(getCurrentDateString('.', new Date().toISOString().slice(0, 10)))
    const [enablePrint, setEnablePrint] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (memoRef !== null) {
            setReference(memoRef)
        }
        if (memoRef !== null && memoRef !== '') {
            setEnablePrint(true)
        }
    }, [])


    async function confirmPaymentPlan() {


        if (plan.length === 0) {
            dispatch(setNotification({
                message: 'No ha proyectado el plan de pago',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        await registerPaymentPlanAPI(docId, [
            {
                cardinal: cardinals[0],
                iteratedMonth: initialMonth,
                period: initialYear,
                amount: `C$ ${installments[0]}`
            }, ...plan])
            .then(res => {
                console.log('respuesta: ', res)

                dispatch(loadPaymentPlanProps(res.data))

            })

        dispatch(setNotification({
            message: 'Plan de pago registrado correctamente',
            type: 'success',
            delay: 1500
        }))

        setPlan([])
        setInitialMonth(months[0])
        setInitialYear(years[0])



    }

    function calculatePaymentPlan({ month, year, installments = [] }) {

        if (!months.includes(month)) {
            console.error('Mes no válido');
            return null;
        }

        // Obtener el índice del mes
        const monthIndex = months.indexOf(month);

        // Calcular los siguientes meses
        const paymentPlan = [];
        for (let i = 1; i <= installments.length; i++) {
            const newIndex = (monthIndex + i) % 12; // Manejar el desbordamiento al llegar a diciembre
            const newMonth = months[newIndex];
            const newYear = year + Math.floor((monthIndex + i) / 12); // Aumentar el año si es necesario

            paymentPlan.push({
                cardinal: cardinals[i],
                iteratedMonth: newMonth,
                period: newYear,
                amount: `C$ ${formatNumberWithCommas(installments[i - 1])}`
            });
        }

        setPlan(paymentPlan);
    }


    const monthOptions = months.map(ele => (
        <option value={ele} key={`month-${ele}`}>{ele}</option>
    ))

    const yearOptions = years.map(ele => (
        <option value={ele} key={`year-${ele}`}>{ele}</option>
    ))

    function handleKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setReference(prev => {
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
        setReference(prev => {
            if (isEmpty(prev)) {
                return value + '.' + hashDate
            } else {
                return value.replace(`.${hashDate}`, '') + '.' + hashDate
            }
        })
    }


    async function updatePaymentReference() {
        await updatePaymentReferenceAPI(docId, { reference })
            .then(_res => {
                dispatch(setNotification({
                    message: 'Referencia Actualizada correctamente',
                    type: 'success',
                    delay: 1500
                }))

                setEnablePrint(true)

            })
            .catch(err => {
                dispatch(setNotification({
                    message: `${String(err)}`,
                    type: 'danger',
                    delay: 1500
                }))
            })
    }

    async function generarPDF() {
        fetch(`${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_API_PREFIX}/payment/${docId}/download/deduction-memo`, {
            body: JSON.stringify({}), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res => {
            return res
                .arrayBuffer()
                .then(res => {
                    const blob = new Blob([res], { type: 'application/pdf' })
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'report.pdf'
                    link.click();
                })
                .catch(e => alert(e)).finally(() => {
                    // updateRecordStatus(currentRecord.recordId)
                })
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="payment__plan__form">

            <div className="form__header">

                <div className="references">
                    {
                        confirmed ?
                            <>
                                <label htmlFor="">Ref:</label>
                                <input
                                    id="memoRef"
                                    name="memoRef"
                                    type="text"
                                    value={reference !== null ? reference : ''}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => updateDocumentRefs(e.target.value)}
                                    className='memo__ref'
                                    autoComplete='off'
                                />
                                <button
                                    type="button"
                                    className="btn btn__update-ref"
                                    data-tip data-for='btn-ref'
                                    onClick={updatePaymentReference}
                                >
                                    <i className="bi bi-braces-asterisk"></i>
                                </button>
                                <ReactTooltip id='btn-ref' place='bottom'>
                                    Actualizar Ref
                                </ReactTooltip>
                            </> : <></>
                    }

                    <span><strong>Serie:</strong> {serie} -|- No. Cuotas: {installments !== undefined ? installments.length : 0}</span>
                </div>

                <div className="actions">
                    {
                        enablePrint  ?
                            <>
                                <button 
                                    className="btn btn__print" 
                                    data-tip data-for='btn-print'
                                    onClick={generarPDF}
                                >
                                    <i className="bi bi-printer-fill"></i>
                                </button>

                                <ReactTooltip id='btn-print' place='bottom'>
                                    Imprimir Memo
                                </ReactTooltip>
                            </> : <></>
                    }

                    {
                        !confirmed ?
                            <>

                                <button className='btn btn__calculate'
                                    data-tip data-for='btn-projected'
                                    onClick={() => calculatePaymentPlan({
                                        month: initialMonth,
                                        year: Number(initialYear),
                                        installments: installments.slice(1)
                                    }
                                    )}>
                                    <i className="bi bi-rocket-takeoff-fill"></i>
                                </button>
                                <ReactTooltip id='btn-projected' place='bottom'>
                                    Proyectar
                                </ReactTooltip>

                                <button className='btn btn__confirmed'
                                    data-tip data-for='btn-confirm'
                                    onClick={confirmPaymentPlan}
                                >
                                    <i className="bi bi-lightning-fill"></i>
                                </button>

                                <ReactTooltip id='btn-confirm' place='bottom'>
                                    Confirmar
                                </ReactTooltip>
                            </> :

                            <>

                            </>
                    }
                </div>

            </div>

            {
                installments !== undefined ?
                    <table>
                        <thead>
                            <tr className='payment__rows'>
                                <th>Cuota</th>
                                <th>Mes</th>
                                <th>Periodo</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        {
                            confirmed !== null && confirmed ?
                                <ConfirmedPaymentPlan
                                    confirmed={confirmed}
                                    paymentPlan={paymentPlan}
                                /> :

                                <UnConfirmedPaymentPlan
                                    initialCardinal={cardinals[0]}
                                    initialInstallment={installments[0]}
                                    initialMonth={initialMonth}
                                    initialYear={initialYear}
                                    monthOptions={monthOptions}
                                    yearOptions={yearOptions}
                                    setInitialMonth={setInitialMonth}
                                    setInitialYear={setInitialYear}
                                    installments={installments}
                                    plan={plan}
                                    key={'unconfirmed-payment-plan'}
                                />

                        }
                    </table> : <></>
            }

        </div>
    )
}


export default PaymentPlanForm