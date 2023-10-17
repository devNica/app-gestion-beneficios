import { RiArrowDropRightLine } from 'react-icons/ri'

import './leftcontainer.css'
import { useState } from 'react'
import SidebarComponent from '../Components/SidebarC/SidebarC'

export default function LeftContainer() {

    const [isCollapsed, setIsCollapsed] = useState(false)

    
    return (
        <div className={`left__container ${isCollapsed ? 'collapsed' : ''}`}>

            <div className="toggle">
                <RiArrowDropRightLine className='sidebar__toggle' onClick={()=>setIsCollapsed(prev => !prev)}/>
            </div>

            <SidebarComponent/>
        </div>
    )
}