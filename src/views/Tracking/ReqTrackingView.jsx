import { useTrackingProps } from '../../hooks/useTracking'
import './req-tracking-view.css'
import CustomNotification from "../../Components/Notification/CustomNotification.jsx";
import {useDispatch} from "react-redux";
import {setNotification} from "../../redux/notification.slice.js";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

export default function RequestTrackingView({
    isOpen,
    onClose
}) {

    if (!isOpen) return null

    CustomNotification()
    const dispatch = useDispatch()
    const { states: { recordTracking }, actions: trackingAct } = useTrackingProps()
    const navigate = useNavigate()

    function onRemoveTrack(data) {

        trackingAct.removeTrack({
            procIdentity: data.procIdentity,
            space: data.space
        })

        dispatch(setNotification({
            message: `Track ${data.procIdentity} Eliminado Correctamente!`,
            type: 'success',
            delay: 1500
        }))

        setTimeout(()=>{
            onClose()
            navigate('/home')
            }, 1100)
    }

    const renderRow = recordTracking.map((row, index) => (
        <tr key={`trk-${index}`} className='row-data'>
            <td>{index + 1}</td>
            <td>{String(row.space).toUpperCase()}</td>
            <td>{String(row.mode).toUpperCase()}</td>
            <td>{row.procIdentity}</td>
            <td>
                <button className={'btn-remove'} onClick={()=>onRemoveTrack(row)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    ))

    const renderEmpty = (
        <tr className="row-data">
            <td style={{ width: '100%' }}>
                No hay procesos en seguimiento
            </td>
        </tr>)

    return (
        <div className="req__tracking__view">

            <div className="header">
                <h1>Tracking List</h1>
            </div>

            <button onClick={onClose} className='btn-close'>
                <i className="bi bi-x-lg"></i>
            </button>

            <div className="tracking-content">
                <table className={'tracking-table'}>
                    <thead className={'tracking-header'}>
                        <tr className={'row-header'}>
                            <th>Ticket</th>
                            <th>Modulo</th>
                            <th>Modo</th>
                            <th>Identificador</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody className='tracking-body'>
                        {
                        recordTracking.length > 0 ?
                        renderRow : renderEmpty }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

RequestTrackingView.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}