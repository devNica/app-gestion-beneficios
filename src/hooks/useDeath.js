import { useDispatch, useSelector } from "react-redux"
import {setGeneralInfoReq, setAdditionalInfoReq, loadHistory, loadSupport} from '../redux/death.slice'
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

    const { supports } = useSelector(state => state.props)


    function setRequiredSupport() {

       let forEmployee = []
        let forFamilyMember = []

       supports.forEach(ele => {
           if(ele.requiredTo === 'Colaborador' && ele.typeBenefitId === 3){
               forEmployee = ele.supports.map(item => ({
                   name: item.fieldName,
                   label: item.value,
                   selected: false
               }))
           }
           if (ele.requiredTo === 'Familiar' && ele.typeBenefitId === 3){
               forFamilyMember = ele.supports.map(item => ({
                   name: item.fieldName,
                   label: item.value,
                   selected: false
               }))
           }
       })

        dispatch(loadSupport({
            forEmployee,
            forFamilyMember
        }))
    }

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
            setRequiredSupport,
            serializedHistory,
            fetchDeathRequestRecordById,
            fetchAsyncDeathHistory,
            setGnralInfo,
            setAdditionalInfo,
            getRequiredSupportsByTypeRegister
        }
    }
}
