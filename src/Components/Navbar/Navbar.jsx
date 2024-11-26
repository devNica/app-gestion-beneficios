import './navbar.css'
import DevNicaLogo from '../../assets/devnica-blue.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useManageCredential } from '../../hooks/useAuth'
import { useTrackingProps } from '../../hooks/useTracking'
import RequestTrackingView from '../../views/Tracking/ReqTrackingView'

export default function Navbar() {

    const [isMenuOpen, setMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { clearCredentials } = useManageCredential()
    const { states } = useTrackingProps()

    function onClose(){
        setIsOpen(false)
    }

    return (
        <>
        <nav className="navbar__container">
            <ul className="nav__items left">
                <li className='nav__link__brand'>
                    <Link to={'/home'}>
                        <img src={DevNicaLogo} alt="devnica-logo" className='logo' />
                    </Link>

                </li>
            </ul>

            <ul className="nav__items right">
                <li className='nav__link badge' onClick={()=>setIsOpen(true)}>
                    <i className="bi bi-pin-angle-fill"></i>
                    {
                        states.spool > 0 ?
                            <div className="badge-content">
                                <span className='badge-count'>{`${states.spool}`}</span>
                            </div> : <></>
                    }

                </li>
                <li className="nav__link profile" onClick={() => setMenuOpen(prev => !prev)}>
                    <span>AG</span>
                    <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
                        <h3>
                            Operador del Sistema
                            <br />
                            <span>Alvaro Gonzalez</span>
                        </h3>
                        <ul>
                            <li>
                                <button
                                    className='link'
                                    onClick={() => clearCredentials()}
                                    >
                                    <i className="bi bi-box-arrow-right"></i>
                                    Salir
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>


        </nav>
        <RequestTrackingView isOpen={isOpen} onClose={onClose}/>
        </>
    )
}