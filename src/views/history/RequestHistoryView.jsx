import {useEffect, useState} from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import CustomDialog from '../../Components/Dialog/Dialog'

// import { useGlassesRequestManagement } from '../../hooks/useGlass'
import { useTrackingProps } from '../../hooks/useTracking'

import CustomNotification from '../../Components/Notification/CustomNotification'
import {useDispatch, useSelector} from 'react-redux'
import { setNotification } from '../../redux/notification.slice'

import PropTypes from "prop-types"

import './request-history-view.css'
import {updateRecordStatusThunk} from "../../redux/glass.slice.js";

export default function RequestHistoryView({ data, nameSpace }) {

    CustomNotification()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const { actions: trackingAct } = useTrackingProps()

    const [currentRecord, serCurrentRecord] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [currentData, setCurrentData] = useState([])


    const editingProcess = nameSpace.process.find(p => p.type === 'edit').procIdentity
    const registeringProcess = nameSpace.process.find(p => p.type === 'register').procIdentity

    useEffect(()=>{
        setCurrentData(data)
    },[currentData])

    function updateRecordStatus(recordId){
        dispatch(updateRecordStatusThunk(recordId))
        setCurrentData([])
    }

    function onDialog(choose) {
        if (choose) {
            trackingAct.trackingUpdate({
                typeAction: 'freeUpSpace',
                space: nameSpace.slice // 'glass', 'death
            })
            setIsOpen(false)
            goToEdit()
        } else {
            setIsOpen(false)
        }
    }

    function goToEdit() {

        trackingAct.trackingUpdate({
            typeAction: 'add',
            data: {
                message: '',
                space: nameSpace.slice,
                mode: 'edit',
                procIdentity: editingProcess
            },
            space: 'glass'
        })


        // fetchRequestById(currentRecord.recordId)
        /** navegar hasta el formulario en modo edicion */
        navigate(`/${nameSpace.navigationPath}/edit/${currentRecord.recordId}`)


    }

    async function generarPDF (){
        fetch(`http://localhost:6700/telcor/beneficios/v1/${nameSpace.navigationPath}/download-memo`,{
            body: JSON.stringify({ orderId: currentRecord.recordId, username: user.username }), // data can be `string` or {object}!
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
                    updateRecordStatus(currentRecord.recordId)
                })
        }).catch(err=>{
            console.log(err);
        })
    }

    function handleRecordSelection(data) {
        serCurrentRecord(data)
    }

    function handleEditRecord() {
        if (currentRecord.stateId !== 4) {
            dispatch(setNotification({
                message: 'Este registro no admite edicion',
                type: 'info',
                delay: 1500
            }))
        } else {
            if (trackingAct.findTrack({ procIdentity: registeringProcess })) {
                setIsOpen(true)
            } else {
                goToEdit()
            }
        }
    }

    return (
        <div className="request__history__view">

            { currentData.length > 0 ?
                <>
                <CustomDialog
                    isOpen={isOpen}
                    positiveActionTitle="Continuar"
                    negativeActionTitle="Cancelar"
                    onDialog={onDialog}
                    showIcons={true}
                    message="Tiene pendiente una solicitud sin salvar"
                    question="¿Desea perder los cambios realizados?"
                />

                <div className="history__page-options">
                    <span>{currentRecord !== null ? currentRecord.fullname : '-/-/-/-'}</span>
                    {
                        currentRecord !== null ?
                            <div className="btn-option">
                                <button className='btn' onClick={generarPDF}>
                                    <i className="bi bi-printer-fill"></i>
                                </button>
                                <Link className="btn view-option" to={`/${nameSpace.navigationPath}/summary/${currentRecord.recordId}`}>
                                    <i className="bi bi-eye-fill"></i>
                                </Link>
                                <button className="btn edit-option" onClick={handleEditRecord}>
                                    <i className="bi bi-pen-fill"></i>
                                </button>
                            </div>
                            : <></>
                    }
                </div>


                <DataTable
                    dataSource={currentData}
                    columnSizes={[13, 40, 12, 15, 20]}
                    showColumns={['serial', 'fullname', 'beneficiaryId', 'registeredAt', 'state']}
                    labels={["Serie", "Nombre", "N Emp", 'Registrado', 'Estado']}
                    entries={[15, 30, 50]}
                    enableSearch={true}
                    enableEntries={true}
                    onSelectedRow={handleRecordSelection}
                />
                </>
             :
            <h1>Pending...</h1>
            }
        </div>
    )
}


RequestHistoryView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any),
    nameSpace: PropTypes.shape({
        navigationPath: PropTypes.oneOf(['glasses', 'death', 'maternity']),
        slice: PropTypes.oneOf(['glass', 'death', 'maternity']),
        process: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.oneOf(['edit', 'register']),
            procIdentity: PropTypes.oneOf(['GL-EDIT', 'GL-REG', 'MTN-EDIT', 'MTN-REG', 'DAH-EDIT', 'DAH-REG'])
        }))
    })
}