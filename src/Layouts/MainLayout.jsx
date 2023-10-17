import LeftContainer from '../Containers/LeftContainer'
import MainContainer from '../Containers/MainContainer'
import TopContainer from '../Containers/TopContainer'
import './layout.css'

export function MainLayout () {
    return (
       <div className="main__layout">
        <TopContainer/>
        <LeftContainer/>
        <MainContainer/>
       </div>
    )
}