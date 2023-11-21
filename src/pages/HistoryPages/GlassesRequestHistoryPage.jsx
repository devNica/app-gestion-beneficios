import { useEffect } from "react"
import RequestHistoryView from "../../views/history/RequestHistoryView.jsx";
import { useGlassesRequestManagement } from "../../hooks/useGlass"

const GlassesRequestHistoryPage = () => {

    const { actions, states: glassesSts } = useGlassesRequestManagement()

    const nameSpace = {
        navigationPath: 'glasses',
        slice: 'glass',
        process: [
            { type: 'edit', procIdentity: 'GL-EDIT'},
            { type: 'register', procIdentity: 'GL-REG'}
        ]
    }
    

    useEffect(() => {
        actions.fetchAsyncGlassesHistory()
    }, [])

    return (
        <div className="history__page">
            <h3 className="bread__crum">Historico de Beneficio de Lentes</h3>
           {
                glassesSts.history.length > 0 ?
                    <RequestHistoryView
                        data={glassesSts.history}
                        nameSpace={nameSpace}
                    /> : <></>
            }
        </div>
    )
}

export default GlassesRequestHistoryPage