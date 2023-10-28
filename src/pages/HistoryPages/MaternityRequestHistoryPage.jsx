import { useEffect } from "react"
import RequestHistoryView from "../../views/history/RequestHistoryView.jsx";

import {useMaternityRequestManagement} from "../../hooks/useMaternity.js";

const MaternityRequestHistoryPage = () => {

    const { actions } = useMaternityRequestManagement()
   
    const nameSpace = {
        navigationPath: 'maternity',
        slice: 'maternity',
        process: [
            { type: 'edit', procIdentity: 'MTN-EDIT'},
            { type: 'register', procIdentity: 'MTN-REG'}
        ]
    }

    const data = actions.serializedHistory({
        queryFields: [],
        returnFields: ["recordId", "fullname", "employeeNumber", "registeredAt", "approvedAt", "statusDesc"]
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
                        fetchRequestById={actions.fetchMaternityRequestRecordById}
                    /> : <></>
            }
        </div>
        )
}

export default MaternityRequestHistoryPage