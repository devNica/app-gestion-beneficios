import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    fetchHistoryGlassesReqThunk, loadRecord, loadHistory, loadProps, loadApplicants
} from '../redux/glass.slice'
import {filterData} from "../utils/object.util.js";

export const useGlassProps = () => {
    const {
        authorizedAmount,
        history,
        clinics,
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType,
    } = useSelector(state => state.glass)

    function serializedHistory({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, history)
    }

    return {
        authorizedAmount,
        history,
        clinics,
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType,
        serializedHistory
    }
}


export const useGlassesRequestManagement = () => {
    const dispatch = useDispatch()

    const {
        requestStatus,
        requestsInProcess,
        applicantList,
        applicationTypes,
        aplicationStatus,
        paymentTypes,
        history,
        clinics,
        memoryFlag,
        generalInfoReq,
        ophthalmicInfoReq,
        applicationSupports: supportsReq
    } = useSelector(state => state.glass)

    function fetchAsyncGlassesHistory() {
        dispatch(fetchHistoryGlassesReqThunk())
    }


    function propsRequiredInEditingMode({ props, requestDetail }){

        dispatch(loadProps({
            paymentTypes: props.data.paymentTypes,
            applicationTypes: props.data.applicationTypes,
            clinics: props.data.clinics,
            authorizedAmount: props.data.authorizedAmount,

            lensType: props.data.lensType,
            lensMaterial: props.data.lensMaterial,
            lensDetail: props.data.lensDetail,
            diagnosis: props.data.diagnosis
        }))

        dispatch(loadRecord({
            status: requestDetail.data.requestStatus,
            gnral: requestDetail.data.gnralInfoReq,
            oph: requestDetail.data.opthalmicInfo,
            sup: requestDetail.data.applicationSupports
        }))
    }


    function propsRequiredInRegistrationMode({ props, applicants }) {

        dispatch(loadProps({
            paymentTypes: props.data.paymentTypes,
            applicationTypes: props.data.applicationTypes,
            clinics: props.data.clinics,
            authorizedAmount: props.data.authorizedAmount,

            lensType: props.data.lensType,
            lensMaterial: props.data.lensMaterial,
            lensDetail: props.data.lensDetail,
            diagnosis: props.data.diagnosis
        }))
        
        dispatch(loadApplicants(applicants.data))
        

    }

    function resetHistory(){
        dispatch(loadHistory([]))
    }

    function setGnralInfo(data) {
        dispatch(setGeneralInfoReq(data))
    }

    function setOphthalmicInfo(data) {
        dispatch(setOphthalmicInfoReq(data))
    }

    function setApplicationSupports(data) {
        dispatch(setSupportsReq(data))
    }

    return {
        states: {
            requestStatus,
            requestsInProcess,
            applicationTypes,
            aplicationStatus,
            applicantList,
            paymentTypes,
            history,
            clinics,
            memoryFlag,
            generalInfoReq,
            ophthalmicInfoReq,
            supportsReq
        },
        actions: {
            resetHistory,
            fetchAsyncGlassesHistory,
            setGnralInfo,
            setOphthalmicInfo,
            setApplicationSupports,
            propsRequiredInRegistrationMode,
            propsRequiredInEditingMode
        }
    }
}
