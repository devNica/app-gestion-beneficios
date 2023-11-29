import { useParams } from 'react-router-dom'
import {useCallback, useEffect, useState} from "react";
import {fetchGlassesRequestDetail} from "../../service/api.js";
import GlassesRequestSummary from "../../summaries/GlassesRequestSummary.jsx";
import {useDispatch} from "react-redux";
import {loadRecord} from "../../redux/glass.slice.js";

const GlassesRequestSummaryPage = () => {
    
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    
    const fetching = useCallback(async () => {

        try {
            const [ request] = await Promise.all([
                fetchGlassesRequestDetail(id)
            ])

            dispatch(loadRecord({
                gnral: request.data.gnralInfoReq,
                oph: request.data.opthalmicInfo,
                sup: request.data.applicationSupports
            }))

            setLoading(false)

        } catch (err){
            console.log(err)
        }
    }, [id])
    
    useEffect(()=>{
        setLoading(true)
        fetching()
    },[])
    
    return (
        <div>
            { !loading ?
                <GlassesRequestSummary/> :
            <></>
            }
        </div>
    )
}

export default  GlassesRequestSummaryPage