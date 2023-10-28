import { useEffect } from "react"
import RequestHistoryView from "../../views/history/RequestHistoryView.jsx";
import {useDeathRequestManagement} from "../../hooks/useDeath.js";

const DeathRequestHistoryPage = () => {

    const { actions } = useDeathRequestManagement()
    
    const nameSpace = {
        navigationPath: 'death',
        slice: 'death',
        process: [
            { type: 'edit', procIdentity: 'DAH-EDIT'},
            { type: 'register', procIdentity: 'DAH-REG'}
        ]
    }

    const data = actions.serializedHistory({
        queryFields: [],
        returnFields: ["recordId", "fullname", "employeeNumber", "registeredAt", "approvedAt", "statusDesc"]
    })

    useEffect(() => {
        actions.fetchAsyncDeathHistory()
    }, [])

    return (
        <div className="history__page">
            <h3 className="bread__crum">Historico de Beneficio por Fallecimiento</h3>
            {
                data.length > 0 ?
                    <RequestHistoryView
                        data={data}
                        nameSpace={nameSpace}
                        fetchRequestById={actions.fetchDeathRequestRecordById}
                    /> : <></>
            }
        </div>
        )
}

export default DeathRequestHistoryPage