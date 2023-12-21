import { useState, useEffect, useCallback } from "react"
import { useDispatch } from 'react-redux'
import { fetchGlassesRequestAPI } from "../../service/glasses.api"
import { loadRequestsInProcess } from "../../redux/glass.slice"
import GlassesWorkListView from "../../views/worklist/GlassesWorkListView"
import CustomLoader from "../../Components/Loader/CustomLoader"

const GlassesWorkListPage = () => {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const fetching = useCallback(async ()=> {
        const result = await fetchGlassesRequestAPI()
        
        dispatch(loadRequestsInProcess(result.data))
        setLoading(false)
    },[])

    useEffect(()=>{
        setLoading(true)
        fetching()
    },[])


    return (
        <div>
           { !loading ? <GlassesWorkListView/> : <CustomLoader/>}
        </div>
    )
}


export default GlassesWorkListPage