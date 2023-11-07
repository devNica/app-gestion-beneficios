import { Outlet } from 'react-router-dom'
import './container.css'
import {Suspense} from "react";
import CustomLoader from "../Components/Loader/CustomLoader.jsx";
export default function MainContainer() {

    return (
        <div className="main__container">
           <Suspense fallback={<CustomLoader/>}>
               <Outlet/>
           </Suspense>
        </div>
    )
}