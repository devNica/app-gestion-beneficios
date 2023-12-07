import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    fetchHistoryGlassesReqThunk, loadRecord, setGlassesProps, loadHistory
} from '../redux/glass.slice'
import {filterData} from "../utils/object.util.js";
import {setEmployeeList} from "../redux/beneficiary.slice.js";

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
        preApplicants,
        applicationsInProcess,
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

    function initialDataLoading(applicants=null, props, request, mode='register') {

        dispatch(setGlassesProps({
            details: props.data.detalleLente,
            material: props.data.materialLente,
            types: props.data.tipoLente,
            diag: props.data.diagnostico
        }))

        if (mode === 'register') {
            dispatch(setEmployeeList(applicants.data))
        }

        if (mode==='edit'){
           dispatch(loadRecord({
                gnral: request.data.gnralInfoReq,
                oph: request.data.opthalmicInfo,
                sup: request.data.applicationSupports
            }))
        }
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
            applicationsInProcess,
            applicationTypes,
            aplicationStatus,
            preApplicants,
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
            initialDataLoading,
            setGnralInfo,
            setOphthalmicInfo,
            setApplicationSupports,
        }
    }
}
