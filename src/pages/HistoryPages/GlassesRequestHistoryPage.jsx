import { useEffect } from "react"
import RequestHistoryView from "../../views/history/RequestHistoryView.jsx";
import { useGlassProps, useGlassesRequestManagement } from "../../hooks/useGlass"

const GlassesRequestHistoryPage = () => {

    const { actions } = useGlassesRequestManagement()

    const { serializedHistory } = useGlassProps()

    const nameSpace = {
        navigationPath: 'glasses',
        slice: 'glass',
        process: [
            { type: 'edit', procIdentity: 'GL-EDIT'},
            { type: 'register', procIdentity: 'GL-REG'}
        ]
    }
    
    const data = serializedHistory({
        queryFields: [],
        returnFields: ["recordId", "fullname", "beneficiaryId", "registeredAt", "approvedAt", "state"]
    })
    
    useEffect(() => {
        actions.fetchAsyncGlassesHistory()
    }, [])

    return (
        <div className="history__page">
            <h3 className="bread__crum">Historico de Beneficio de Lentes</h3>
           {
                data.length > 0 ?
                    <RequestHistoryView
                        data={data}
                        nameSpace={nameSpace}
                        //fetchRequestById={actions.fetchGlassesRequestRecordById}
                    /> : <></>
            }
        </div>
    )
}

export default GlassesRequestHistoryPage