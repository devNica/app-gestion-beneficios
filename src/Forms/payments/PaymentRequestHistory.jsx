import { useState } from "react"
import DataTable from "../../Components/DataTable/DataTable"
import { usePaymentHook } from "../../hooks/usePayment"
import ReactTooltip from 'react-tooltip'

import './payment-history.css'
import { archivePaymentRequestAPI, revertPaymentRequestAPI } from "../../service/payments.api"
import { loadPayments } from "../../redux/payment.slice"
import { useDispatch } from 'react-redux'
import CustomNotification from "../../Components/Notification/CustomNotification"
import { setNotification } from "../../redux/notification.slice"

const PaymentRequestHistory = ({ currentIndex, updateCurrentIndex }) => {

    const { states: { payments } } = usePaymentHook()
    const [record, setRecord] = useState(null)

    const dispatch = useDispatch()
    CustomNotification()

    function handlePaymentSelection(data) {
        setRecord(data)
    }

    function goToForm() {
        updateCurrentIndex(currentIndex - 1)
    }

    function generarPDF() {
        fetch(`${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_API_PREFIX}/payment/${record.serie}/download/payment-memo`, {
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

    async function archiveRequest() {
        await archivePaymentRequestAPI(record.serie)
            .then(res => {
                dispatch(loadPayments(res.data))
                dispatch(setNotification({
                    message: 'Solicitud Archivada',
                    type: 'success',
                    delay: 1500
                }))
            })
    }

    async function revertPaymentRequest() {
        await revertPaymentRequestAPI(record.serie)
            .then(res => {
                dispatch(loadPayments(res.data))
                dispatch(setNotification({
                    message: 'Reversion Exitosa!',
                    type: 'success',
                    delay: 1500
                }))
            })
    }

    return (
        <div className="payment__request__history">

            <div className="current__data-selected">
                <span className="current__record-info">{record !== null ? `[${record.serie}] - [${record.clinicName}]` : '-/-/-/-'}</span>
                {record !== null ?
                    <div className="options">
                        <button className="btn btn__print" data-tip data-for='btn-print' onClick={generarPDF}>
                            <i className="bi bi-printer-fill"></i>
                        </button>
                        <ReactTooltip id='btn-print' place='bottom'>
                            Imprimir Memorandum
                        </ReactTooltip>

                        <button className="btn btn__archive" data-tip data-for='btn-archive' onClick={archiveRequest}>
                            <i className="bi bi-box-seam-fill"></i>
                        </button>
                        <ReactTooltip id='btn-archive' place='bottom'>
                            Archivar Solicitud
                        </ReactTooltip>

                        <button className="btn btn__revert" data-tip data-for='btn-revert' onClick={revertPaymentRequest}>
                            <i className="bi bi-database-fill-dash"></i>
                        </button>
                        <ReactTooltip id='btn-revert' place='bottom'>
                            Revertir Solicitud
                        </ReactTooltip>
                    </div> : <></>
                }

            </div>

            <DataTable
                dataSource={payments}
                columnSizes={[10, 15, 25, 20, 30]}
                showColumns={['serie', 'amountNio', 'clinicName', 'period', 'createdBy']}
                labels={['Serie', 'Monto', 'Optica', 'Periodo', 'Creado Por']}
                sortColumn={[0, 2, 3]}
                entries={[5, 10, 20]}
                enableSearch={true}
                enableEntries={true}
                onSelectedRow={handlePaymentSelection}

            />


            <div className="navigation">
                <button className="btn btn__back" onClick={goToForm}>
                    Ir al Formulario
                </button>
            </div>
        </div>
    )
}

export default PaymentRequestHistory