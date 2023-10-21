import PropTypes from "prop-types"
import './modal.css'

const Modal = ({ isOpen, onClose, children, title = 'Modal Title' }) => {

    if (!isOpen) return null

    return (
        <div className="custom__modal">
            <div className="modal__container">
                <div className="modal__header">
                    <span className='modal-title'>{title}</span>
                    <button className='modal-close' type='button' onClick={onClose}>X</button>
                </div>
                <div className="modal__content">
                    {children}
                </div>
            </div>

        </div>
    )
}
export default Modal

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.element,
    title: PropTypes.string
}