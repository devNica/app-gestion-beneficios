import { useDispatch, useSelector } from "react-redux"
import {setGeneralInfoReq, setAdditionalInfoReq, loadHistory} from '../redux/death.slice'
import mockupHistory from '../data/history/generic-history.json'
import {filterData} from "../utils/object.util.js";


export const useDeathRequestManagement = () => {
    const dispatch = useDispatch()
    const {
        history,
        requiredSupports,
        generalInfoReq, 
        additionalInfo, 
        relativesList
    } = useSelector(state => state.death)

    function fetchAsyncDeathHistory(){
        dispatch(loadHistory(mockupHistory))
    }

    function serializedHistory({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, history)
    }

    function fetchDeathRequestRecordById() {

    }

    function setGnralInfo(data) {
       dispatch(setGeneralInfoReq(data))
    }

    function setAdditionalInfo(data) {
        dispatch(setAdditionalInfoReq(data))
    }

    function getRequiredSupportsByTypeRegister({ typeRegister }){
        if(typeRegister === 'F') return requiredSupports.forFamilyMember
        else if (typeRegister === 'C') return requiredSupports.forEmployee
    }

    return {
        states: {
            relativesList,
            generalInfoReq,
            additionalInfo
        },
        actions: {
            serializedHistory,
            fetchDeathRequestRecordById,
            fetchAsyncDeathHistory,
            setGnralInfo,
            setAdditionalInfo,
            getRequiredSupportsByTypeRegister
        }
    }
}
