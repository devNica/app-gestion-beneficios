import { useState } from 'react'
import DataTable from '../../Components/DataTable/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import CustomDialog from '../../Components/Dialog/Dialog'

import { useGlassesRequestManagement } from '../../hooks/useGlass'
import { useTrackingProps } from '../../hooks/useTracking'

import CustomNotification from '../../Components/Notification/CustomNotification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../redux/notification.slice'

import PropTypes from "prop-types"

import './glasses-req-history-view.css'

export default function GlasesReqHistoryView({ data }) {

    CustomNotification()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { actions } = useGlassesRequestManagement()
    const { actions: trackingAct } = useTrackingProps()

    const [currentRecord, serCurrentRecord] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    function onDialog(choose) {
        if (choose) {
            trackingAct.trackingUpdate({
                typeAction: 'freeUpSpace',
                space: 'glass'
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
                space: 'glass',
                mode: 'edit',
                procIdentity: 'GL-EDIT'
            },
            space: 'glass'
        })

        /** recuperar solicitud por Id */
        actions.fetchGlassesRequestRecordById()
        /** navegar hasta el formulario en modo edicion */
        navigate(`/glasses/edit/${currentRecord.benefitId}`)


    }

    function handleRecordSelection(data) {
        serCurrentRecord(data)
    }

    function handleEditRecord() {
        if (currentRecord.statusDesc !== 'En Revision') {
            dispatch(setNotification({
                message: 'Este registro no admite edicion',
                type: 'info',
                delay: 1500
            }))
        } else {
            if (trackingAct.findTrack({ procIdentity: 'GL-REG'})) {
                setIsOpen(true)
            } else {
                goToEdit()
            }
        }
    }

    return (
        <div className="history__glasses-view">

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
                            <Link className="btn view-option" to={`/glasses/detail/${currentRecord.benefitId}`}>
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


GlasesReqHistoryView.propTypes={
    data: PropTypes.arrayOf(PropTypes.shape({
        benefitId: PropTypes.number,
        fullname: PropTypes.string,
        employeeNumber: PropTypes.string,
        registeredAt: PropTypes.string,
        approvedAt: PropTypes.string,
        statusDesc: PropTypes.string
    }))
}