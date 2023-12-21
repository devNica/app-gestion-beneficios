import { useState } from 'react'

import { Link } from 'react-router-dom'
import { TbSunglasses } from 'react-icons/tb'
import { BiSolidBabyCarriage } from 'react-icons/bi'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { IoFastFood } from 'react-icons/io5'
import { LuHelpingHand } from 'react-icons/lu'
import { PiStudentFill } from 'react-icons/pi'
import { RiArrowDropRightLine } from 'react-icons/ri'
import './sidebar.css'

export default function Sidebar({ isCollapsed }) {

    const [isDropDownOpen, setDropDown] = useState(false)

    const handleOpen = (who) => {
        const element = document.getElementById(who)

        const menu = element.children.item(1)

        let height = 0

        if (menu.clientHeight == "0") {
            height = menu.scrollHeight
        }

        menu.style.height = `${height}px`

        setDropDown(prev => !prev)
    }


    return (
        <aside className="sidebar collapsed">

            <ul className="sidebar__items">
                <li className="link__item">
                    <Link to={'/glass'} className='nav__link'>
                        <TbSunglasses className='nav__icon' />
                        <span className={`nav__title ${isCollapsed ? 'hide' : ''}`}>Lentes</span>
                    </Link>
                </li>

                <li className="link__item">
                    <Link to={'/maternity'} className='nav__link'>
                        <BiSolidBabyCarriage className='nav__icon' />
                        <span className={`nav__title ${isCollapsed ? 'hide' : ''}`}>Maternidad</span>
                    </Link>
                </li>

                <li className="link__item">
                    <Link to={'/monetary'} className='nav__link'>
                        <FaRegMoneyBillAlt className='nav__icon' />
                        <span className={`nav__title ${isCollapsed ? 'hide' : ''}`}>Monetario</span>
                    </Link>
                </li>


                <li className={`link__item dropdown ${isDropDownOpen ? 'open' : 'close'}`} id='becas'>
                    <div className='nav__link dropdown__menu'>
                        <PiStudentFill className='nav__icon' />
                        <span className={`nav__title ${isCollapsed ? 'hide' : ''}`}>Becas</span>
                        <RiArrowDropRightLine className='nav__icon arrow' onClick={() => handleOpen('becas')} />
                    </div>

                    <ul className="menu__items">
                        <li className="nav__item">
                            <Link to={'/a1'}>
                                <IoFastFood className='sub__icon' />
                                <span className='sub__title'>Becas Internas</span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to={'/a2'}>
                                <IoFastFood className='sub__icon' />
                                <span className='sub__title'>Becas Externas</span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to={'/a3'}>
                                <IoFastFood className='sub__icon' />
                                <span className='sub__title'>Ayudas</span>
                            </Link>
                        </li>
                    </ul>
                </li>


                <li className={`link__item dropdown ${isDropDownOpen ? 'open' : 'close'}`} id='otro'>
                    <div className='nav__link dropdown__menu'>
                        <PiStudentFill className='nav__icon' />
                        <span className={`nav__title ${isCollapsed ? 'hide' : ''}`}>Otro</span>
                        <RiArrowDropRightLine className='nav__icon arrow' onClick={() => handleOpen('otro')} />
                    </div>

                    <ul className="menu__items">
                        <li className="nav__item">
                            <Link to={'/a1'}>
                                <IoFastFood className='sub__icon' />
                                <span className='sub__title'>Recomenda</span>
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to={'/a2'}>
                                <IoFastFood className='sub__icon' />
                                <span className='sub__title'>Bajas</span>
                            </Link>
                        </li>

                    </ul>
                </li>
            </ul>

        </aside>
    )
}