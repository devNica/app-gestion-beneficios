import { useCallback, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchMaternityRequestDetail } from "../../service/api"
import { loadRecord } from "../../redux/maternity.slice"
import MaternityRequestSummary from "../../summaries/MaternityRequestSummary.jsx";

const MaternityRequestSummaryPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    
    const fetching = useCallback(async()=>{
        try {
            const response = await fetchMaternityRequestDetail(id)
                
            dispatch(loadRecord({
                markedChildren: response.data.markedChildren,
                generalInfoReq: response.data.gnralInfoReq,
                newBornInfoReq: response.data.newBornInfoReq
            }))

            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    },[id])

    useEffect(()=>{
        
        setLoading(true)
        fetching()
        
    },[])
    
    return (
        <div>
            { !loading ?
                <MaternityRequestSummary/>:
            <></>
            }

        </div>
    )
}


export default MaternityRequestSummaryPage