import { useEffect, useState } from "react"
import DataTable from "../../Components/DataTable/DataTable"
import { useGlassesRequestManagement } from "../../hooks/useGlass"
import { useSelector } from 'react-redux'

import './application-in-process.css'

const ApplicationsGlassesInProcess = ({ currentIndex, updateCurrentIndex }) => {

    const { user } = useSelector(state => state.auth)

    const { states: { applicationsInProcess } } = useGlassesRequestManagement()
    const [record, setRecord] = useState(null)

    useEffect(() => {
    }, [applicationsInProcess])

    function goToForm() {
        updateCurrentIndex(currentIndex - 1)
    }


    function handleRecordSelection(data) {
        setRecord(data)
    }

    async function generarPDF (){
        fetch(`http://localhost:6700/telcor/beneficios/v1/glasses/download-memo`,{
            body: JSON.stringify({ orderId: record.requestGlassesId, username: user.username }), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res=>{
            return res
                .arrayBuffer()
                .then(res => {
                    const blob = new Blob([res], { type: 'application/pdf' })
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'report.pdf'
                    link.click();
                })
                .catch(e => alert(e)).finally(()=> {
                    // updateRecordStatus(currentRecord.recordId)
                })
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="records">

            <div className="record">
                <span className="applicant">{record !== null ? record.fullname : '-/-/-/-'}</span>
                { record !== null ?
                    <div className="options">
                        <button className="btn btn__print" onClick={generarPDF}>
                            <i className="bi bi-printer-fill"></i>
                        </button>
                       {
                            record.applicationType !== 'CVN' ?
                                 <button className="btn btn__approved">
                                     <i className="bi bi-person-check"></i>
                                 </button> : <></>
                       }
                        <button className="btn btn__rejected">
                            <i className="bi bi-person-fill-slash"></i>
                        </button>
                    </div>: <></>
                }
            </div>

            <DataTable
                dataSource={applicationsInProcess}
                columnSizes={[15, 40, 10, 15, 10, 10]}
                showColumns={['serie', 'fullname', 'employeeId', 'registerDate', 'applicationType', 'applicationStatus']}
                labels={['Serie', 'Nombre', 'No Emp', 'Fecha', 'Tipo', 'Estado']}
                sortColumn={[0, 1, 4, 5]}
                entries={[6, 12, 24]}
                enableSearch={true}
                enableEntries={true}
                onSelectedRow={handleRecordSelection}
            />

            <div className={'definitions'}>
                <div className={'types'}>
                    <p><strong>CVN:</strong>Solicitud Bajo Convenio</p>
                    <p><strong>SPA:</strong>Solicitud Fuera de Convenio a Colaborador</p>
                    <p><strong>SPB:</strong>Solicitud Fuera de Convenio a Parientes</p>
                </div>
                <div className={'status'}>
                    <p><strong>R:</strong>Requiere Aprobacion</p>
                    <p><strong>A:</strong>Solicitud Aprobada</p>
                    <p><strong>D:</strong>Solicitud Denegada</p>
                </div>

            </div>

            <div className="navigation">
                <button onClick={goToForm} className="btn btn__back">
                    Ir al Formulario
                </button>
            </div>
        </div>
    )
}

export default ApplicationsGlassesInProcess