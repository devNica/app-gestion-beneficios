import './dialog.css'


export default function CustomDialog({
    isOpen,
    onDialog,
    message = '...',
    question = '¡Desea continuar con esta accion!',
    positiveActionTitle = 'Ok',
    negativeActionTitle = 'Cancel',
    showIcons = true
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
                        {positiveActionTitle}
                        {
                            showIcons ? <i className="bi bi-check-square-fill"></i> : <></>
                        }

                    </button>
                    <button className="btn return" onClick={() => onDialog(false)}>
                        {negativeActionTitle}
                        {
                            showIcons ? <i className="bi bi-x-square-fill"></i> : <></>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}