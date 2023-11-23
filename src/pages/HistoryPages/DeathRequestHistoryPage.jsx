import { useEffect } from "react"
import RequestHistoryView from "../../views/history/RequestHistoryView.jsx";
import {useDeathRequestManagement} from "../../hooks/useDeath.js";

const DeathRequestHistoryPage = () => {

    const { actions, states: deathSts } = useDeathRequestManagement()
    
    const nameSpace = {
        navigationPath: 'death',
        slice: 'death',
        process: [
            { type: 'edit', procIdentity: 'DAH-EDIT'},
            { type: 'register', procIdentity: 'DAH-REG'}
        ]
    }


    useEffect(() => {
        actions.fetchAsyncDeathHistory()
    }, [])

    return (
        <div className="history__page">
            <h3 className="bread__crum">Historico de Beneficio por Fallecimiento</h3>
            {
                deathSts.history.length > 0 ?
                    <RequestHistoryView
                        data={deathSts.history}
                        nameSpace={nameSpace}
                    /> : <></>
            }
        </div>
        )
}

export default DeathRequestHistoryPage