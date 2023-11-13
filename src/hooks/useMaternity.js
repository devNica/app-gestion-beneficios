import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setNewBornInfoReq,
    loadHistory,
    loadAuthorizedAmounts,
    resetNewBornInfoReq
} from '../redux/maternity.slice'
import mockupHistory from '../data/history/generic-history.json'
import {filterData} from "../utils/object.util.js";
import {setEmployeeList} from "../redux/beneficiary.slice.js";

export const useMaternityRequestManagement = () => {
    const dispatch = useDispatch()
    const {
        authorizedAmount,
        history,
        childrenOfBeneficiary,
        generalInfoReq,
        newBornInfoReq
    } = useSelector(state => state.maternity)

    function initialDataLoading (applicants, amounts, mode='register') {

        dispatch(loadAuthorizedAmounts({
            amounts: amounts.data
        }))

        dispatch(setEmployeeList(applicants.data))

        // en el modo edicion cargar los datos de la orden a editar
    }

    function resetNewBornInfo() {
        dispatch(resetNewBornInfoReq())
    }

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
            authorizedAmount,
            childrenOfBeneficiary,
            generalInfoReq,
            newBornInfoReq,
        },
        actions: {
            serializedHistory,
            fetchMaternityRequestRecordById,
            fetchAsyncGlassesHistory,
            setGnralInfo,
            setNewBornInfo,
            resetNewBornInfo,
            initialDataLoading
        }
    }
}
