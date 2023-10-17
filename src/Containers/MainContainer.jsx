import { Outlet } from 'react-router-dom'
import './container.css'

export default function MainContainer() {

    return (
        <div className="main__container">
           
            <Outlet/>
        </div>
    )
}