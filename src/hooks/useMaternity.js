import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setNewBornInfoReq, loadHistory } from '../redux/maternity.slice'
import mockupHistory from '../data/history/generic-history.json'
import {filterData} from "../utils/object.util.js";

export const useMaternityRequestManagement = () => {
    const dispatch = useDispatch()
    const {
        history,
        childrenOfBeneficiary,
        generalInfoReq,
        newBornInfoReq
    } = useSelector(state => state.maternity)

    function fetchMaternityRequestRecordById() {}

    function setGnralInfo(data, children) {
        dispatch(setGeneralInfoReq({ info: data, children }))
    }

    function setNewBornInfo(data) {
        dispatch(setNewBornInfoReq(data))
    }

    function fetchAsyncGlassesHistory() {
        dispatch(loadHistory(mockupHistory))
    }

    function serializedHistory({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, history)
    }

    return {
        states: {
            childrenOfBeneficiary,
            generalInfoReq,
            newBornInfoReq,
        },
        actions: {
            serializedHistory,
            fetchMaternityRequestRecordById,
            fetchAsyncGlassesHistory,
            setGnralInfo,
            setNewBornInfo
        }
    }
}
