import { useState } from "react"
import DataTable from "../../Components/DataTable/DataTable"
import { usePaymentHook } from "../../hooks/usePayment"

import './payment-history.css'

const PaymentRequestHistory = ({ currentIndex, updateCurrentIndex }) => {

    const { states: { payments } } = usePaymentHook()
    const [record, setRecord] = useState(null)

    function handlePaymentSelection(data) {
        setRecord(data)
    }

    function goToForm() {
        updateCurrentIndex(currentIndex - 1)
    }

    function generarPDF() {
        fetch(`http://localhost:6700/telcor/beneficios/v1/payments/dowload-memo/${record.serie}`, {
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
        <div className="payment__request__history">

            <div className="current__data-selected">
                <span className="current__record-info">{record !== null ? `[${record.serie}] - [${record.clinicName}]` : '-/-/-/-'}</span>
                {record !== null ?
                    <div className="options">
                        <button className="btn btn__print" onClick={generarPDF}>
                            <i className="bi bi-printer-fill"></i>
                        </button>
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