import { useState } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import CustomDialog from '../../Components/Dialog/Dialog'

// import { useGlassesRequestManagement } from '../../hooks/useGlass'
import { useTrackingProps } from '../../hooks/useTracking'

import CustomNotification from '../../Components/Notification/CustomNotification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../redux/notification.slice'

import PropTypes from "prop-types"

import './request-history-view.css'

export default function RequestHistoryView({ data, nameSpace }) {

    CustomNotification()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { actions: trackingAct } = useTrackingProps()

    const [currentRecord, serCurrentRecord] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const editingProcess = nameSpace.process.find(p=> p.type === 'edit').procIdentity
    const registeringProcess = nameSpace.process.find(p => p.type === 'register').procIdentity
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

    function handleRecordSelection(data) {
        serCurrentRecord(data)
    }

    function handleEditRecord() {
        if (currentRecord.state !== 'Solicitud Pendiente') {
            dispatch(setNotification({
                message: 'Este registro no admite edicion',
                type: 'info',
                delay: 1500
            }))
        } else {
            if (trackingAct.findTrack({ procIdentity:  registeringProcess })) {
                setIsOpen(true)
            } else {
                goToEdit()
            }
        }
    }

    return (
        <div className="request__history__view">

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
                            <Link className="btn view-option" to={`/${nameSpace.navigationPath}/detail/${currentRecord.recordId}`}>
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
                dataSource={data}
                columnSizes={[10, 25, 15, 15, 15, 20]}
                labels={["Id", "Nombre", "N° Emp", "Registrado", "Aprobado", "Estado"]}
                sortColumn={[0, 1, 2, 3, 4, 5]}
                entries={[15, 30, 50]}
                enableSearch={true}
                enableEntries={true}
                onSelectedRow={handleRecordSelection}
            />
        </div>
        )
}


RequestHistoryView.propTypes={
    data: PropTypes.arrayOf(PropTypes.shape({
        recordId: PropTypes.number,
        fullname: PropTypes.string,
        employeeNumber: PropTypes.string,
        registeredAt: PropTypes.string,
        approvedAt: PropTypes.string,
        state: PropTypes.string
    })),
    nameSpace: PropTypes.shape({
        navigationPath: PropTypes.oneOf(['glasses', 'death', 'maternity']),
        slice: PropTypes.oneOf(['glass', 'death', 'maternity']),
        process: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.oneOf(['edit', 'register']),
            procIdentity: PropTypes.oneOf(['GL-EDIT', 'GL-REG', 'MTN-EDIT', 'MTN-REG', 'DAH-EDIT', 'DAH-REG'])
        }))
    })
}