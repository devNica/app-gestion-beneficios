import items from '../../data/navigation.json'
import SidebarItem from './SidebarItem'
import './sidebar.css'


export default function SidebarComponent () {

    const renderItems = items.map((item, index)=>(
        <SidebarItem item={item} key={index}/>
    ))

    return(
        <div className="sidebar">
            <ul className='sidebar__list'>
                {renderItems}
            </ul>
        </div>
    )
}