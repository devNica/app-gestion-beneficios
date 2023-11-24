import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setAdditionalInfoReq,
    loadProps,
    fetchShortDeathHistoryThunk,
    loadRecord,
    setRelativeList,
} from '../redux/death.slice'
import {converToBoolean, filterData} from "../utils/object.util.js";
import { setEmployeeList } from "../redux/beneficiary.slice.js";

export const useDeathRequestManagement = () => {
    const dispatch = useDispatch()
    const {
        history,
        paymentTypes,
        requiredSupports,
        generalInfoReq, 
        additionalInfo, 
        relativesList
    } = useSelector(state => state.death)

    

    function initialDataLoading (applicants, props, mode='register', record = null) {

        dispatch(loadProps({
            paymentTypes: props.data.paymentType,
            supports: props.data.requiredSupports,
            amounts: props.data.authorizedAmount
        }))

        /** solo carga lista de empleados en modo */
        if (mode==='register') {
            dispatch(setEmployeeList(applicants.data))
        }
    
        // Esperar 100ms para que la lista de empleados se asiente en el store
        if (mode === 'edit') {

            const amounts = props.data.authorizedAmount
        
            const relatives = applicants.data
            const relativesMarked = record.data.relativesMarked
            const typeRegister = record.data.generalInfoReq.typeRegister

            const merge = [...relatives, ...relativesMarked]
           
            let results = []

            if (typeRegister === 'F') {
                results = merge.map(item => ({
                    ...item,
                    selected: converToBoolean(item.selected),
                    amount: amounts.find(element => element.relative === item.relationship).amount,
                    authorizedAmountId: amounts.find(element => element.relative === item.relationship).id
                }))
    
            } else {
                results = merge.map(item => ({
                    ...item,
                    date: relativesMarked[0].date,
                    selected: converToBoolean(item.selected),
                    amount: amounts.find(ele => ele.relative === 'Colaborador').amount,
                    authorizedAmountId: amounts.find(ele => ele.relative === 'Colaborador').id
                }))
            }

            dispatch(loadRecord({
                relativesList: results,
                generalInfoReq: record.data.generalInfoReq,
                additionalInfo: record.data.additionalInfo
            }))
        } 
       
    }

    function fetchAsyncDeathHistory(){
        dispatch(fetchShortDeathHistoryThunk())
    }

    function serializedHistory({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, history)
    }

    function fetchDeathRequestRecordById() {

    }

    function updateRelativeList(data) {
        dispatch(setRelativeList(data))
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
            history,
            paymentTypes,
            relativesList,
            generalInfoReq,
            additionalInfo
        },
        actions: {
            initialDataLoading,
            serializedHistory,
            fetchDeathRequestRecordById,
            fetchAsyncDeathHistory,
            updateRelativeList,
            setGnralInfo,
            setAdditionalInfo,
            getRequiredSupportsByTypeRegister
        }
    }
}

