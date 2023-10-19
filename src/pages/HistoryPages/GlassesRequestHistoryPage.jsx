import { useEffect } from "react"
import GlasesReqHistoryView from "../../views/glasses/GlassesReqHistoryView"
import { useGlassProps, useGlassesRequestManagement } from "../../hooks/useGlass"

import './glasses-req-history.css'

const GlassesRequestHistoryPage = () => {

    const { actions } = useGlassesRequestManagement()

    const { serializedHistory } = useGlassProps()

    
    const data = serializedHistory({
        queryFields: [],
        returnFields: ["benefitId", "fullname", "employeeNumber", "registeredAt", "approvedAt", "statusDesc"]
    })

    

    useEffect(() => {
        actions.fetchAsyncGlassesHistory()
    }, [])

    return (
        <div className="history__page">
            <h3 className="bread__crum">Historico de Beneficio de Lentes</h3>
            {
                data.length > 0 ?
                    <GlasesReqHistoryView data={data} /> : <></>
            }
        </div>
    )
}

export default GlassesRequestHistoryPage