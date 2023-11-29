import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setNewBornInfoReq,
    resetNewBornInfoReq, fetchHistoryMaternityReqThunk, updateChildrenList, loadProps
} from '../redux/maternity.slice'
import {filterData} from "../utils/object.util.js";
import {setEmployeeList} from "../redux/beneficiary.slice.js";
import {loadRecord} from "../redux/maternity.slice.js";

export const useMaternityRequestManagement = () => {
    const dispatch = useDispatch()
    
    const {
        paymentTypes,
        authorizedAmount,
        history,
        markedChildren,
        childrenList,
        generalInfoReq,
        newBornInfoReq
    } = useSelector(state => state.maternity)

    function initialDataLoading (applicants, props, mode='register', record = null) {

        dispatch(loadProps({
            paymentTypes: props.data.paymentType,
            amounts: props.data.amounts
        }))

        dispatch(setEmployeeList(applicants.data))

        // en el modo edicion cargar los datos de la orden a editar
        if (mode === 'edit') {
            dispatch(loadRecord({
                markedChildren: record.data.markedChildren,
                generalInfoReq: record.data.gnralInfoReq,
                newBornInfoReq: record.data.newBornInfoReq
            }))
        }
    }

    function resetNewBornInfo() {
        dispatch(resetNewBornInfoReq())
    }

    
    function setGnralInfo(data, children) {
        dispatch(setGeneralInfoReq({ info: data, children }))
    }

    function setNewBornInfo(data, children) {
        dispatch(setNewBornInfoReq(data))
        dispatch(updateChildrenList({ children }))
    }

    function fetchAsyncMaternityHistory() {
        dispatch(fetchHistoryMaternityReqThunk())
    }

    function serializedHistory({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, history)
    }

    return {
        states: {
            paymentTypes,
            childrenList,
            authorizedAmount,
            markedChildren,
            generalInfoReq,
            newBornInfoReq,
        },
        actions: {
            serializedHistory,
            fetchAsyncMaternityHistory,
            setGnralInfo,
            setNewBornInfo,
            resetNewBornInfo,
            initialDataLoading
        }
    }
}
