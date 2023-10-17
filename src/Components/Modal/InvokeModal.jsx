import { AiOutlineFileSearch } from 'react-icons/ai'
import './modal.css'

export default function InvokeModal({ handleClick }) {

    return (
        <>
            <button type="button" className="open__modal-btn" onClick={() => handleClick(true)}>
                <AiOutlineFileSearch/>
            </button>
        </>
    )
}