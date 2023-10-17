import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SidebarItem({ item }) {

    const [isOpen, setIsOpen] = useState(false)
    const contentRef = useRef(null)

    if (item?.childrens) {

        const calculateHeight = () => {
            if (contentRef.current) {
                const childCount = item.childrens ? item.childrens.length : 0;
                const itemHeight = 45; // Altura estimada de cada elemento de la lista
                const maxHeight = childCount * itemHeight;
                contentRef.current.style.height = isOpen ? `${maxHeight}px` : '0px';
            }
        };

        // Ejecuta la función de cálculo de altura cuando se abre o cierra el menú
        useEffect(() => {
            calculateHeight();
        }, [isOpen, item.childrens]);


        return (
            <li className="sidebar__item dropdown">
                <div className="nav__link">
                    <i className={`${item.icon} nav__icon`} />
                    <span className='nav__title'>{item.title}</span>
                    <i className={`bi bi-arrow-right-short nav__icon ${isOpen ? 'toggle' : ''}`} onClick={() => setIsOpen(prev => !prev)} />
                </div>
                <ul className={`dropdown__content`} ref={contentRef}>
                    {
                        item.childrens.map((child, index) => (
                            <SidebarItem item={child} key={index} />
                        ))
                    }
                </ul>
            </li>
        )
    }

    else return (
        <li className="sidebar__item">
            <Link to={item.path} className='nav__link'>
                <i className={`${item.icon} nav__icon`} />
                <span className='nav__title'>{item.title}</span>
            </Link>
        </li>
    )
}