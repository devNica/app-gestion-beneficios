import PropTypes from "prop-types";
import './dialog.css'


export default function PrintDialog({
    isOpen,
    onDialog,
    message = '...',
    question = '¿Cual Accion desea Realizar?',
    suggestedActionTitle = 'Ok',
    optionalActionTitle = 'Cancel',
    showSuggesteIcon = true,
    showOptionalIcon = false
}) {

    if (!isOpen) return null

    return (
        <div className="custom__dialog">
            <div className="custom__dialog-content">
                <div className="title">
                    <h2>{message}</h2>
                    <h3>{question}</h3>
                </div>

                <div className="info">
                    <i className="bi bi-info-circle-fill"></i>
                </div>

                <div className="options">
                    <button className="btn confirm" onClick={() => onDialog(true)}>
                        {suggestedActionTitle}
                        {
                            showSuggesteIcon ? <i className="bi bi-check-square-fill"></i> : <></>
                        }

                    </button>
                    <button className="btn return" onClick={() => onDialog(false)}>
                        {optionalActionTitle}
                        {
                            showOptionalIcon ? <i className="bi bi-eyeglasses"></i> : <></>
                        }
                    </button>
                </div>
            </div>
        </div>
        )
}

PrintDialog.propTypes = {
    isOpen: PropTypes.bool,
    onDialog: PropTypes.func,
    message: PropTypes.string,
    question: PropTypes.string,
    suggestedActionTitle: PropTypes.string,
    optionalActionTitle: PropTypes.string,
    showSuggesteIcon: PropTypes.bool,
    showOptionalIcon: PropTypes.bool
}