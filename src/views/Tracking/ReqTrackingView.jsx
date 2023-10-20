import { useTrackingProps } from '../../hooks/useTracking'
import './req-tracking-view.css'

export default function RequestTrackingView({
    isOpen,
    onClose
}) {

    if (!isOpen) return null

    const { states: { recordTracking } } = useTrackingProps()

    const renderRow = recordTracking.map((row, index) => (
        <tr key={`trk-${index}`} className='row-data'>
            <td>{index + 1}</td>
            <td>{row.space}</td>
            <td>{row.mode}</td>
            <td>{row.procIdentity}</td>
            <td>
                <button className={'btn-remove'}>Remover</button>
            </td>
        </tr>
    ))

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
                        {renderRow}
                    </tbody>
                </table>
            </div>
        </div>
    )
}