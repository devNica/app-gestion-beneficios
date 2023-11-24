import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    fetchHistoryGlassesReqThunk, loadRecord, setGlassesProps
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
        paymentTypes,
        history, 
        memoryFlag,
        generalInfoReq,
        ophthalmicInfoReq,
        applicationSupports: supportsReq
    } = useSelector(state => state.glass)

    function fetchAsyncGlassesHistory() {
        dispatch(fetchHistoryGlassesReqThunk())
    }

    function initialDataLoading(applicants, props, request, mode='register') {

        dispatch(setGlassesProps({
            paymentTypes: props.data.tipoPago,
            amounts: props.data.montos,
            clinics: props.data.clinica,
            details: props.data.detalleLente,
            material: props.data.materialLente,
            types: props.data.tipoLente,
            diag: props.data.diagnostico
        }))

        dispatch(setEmployeeList(applicants.data))

        if (mode==='edit'){
           dispatch(loadRecord({
                gnral: request.data.gnralInfoReq,
                oph: request.data.opthalmicInfo,
                sup: request.data.applicationSupports
            }))
        }
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
            paymentTypes,
            history,
            memoryFlag,
            generalInfoReq,
            ophthalmicInfoReq,
            supportsReq
        },
        actions: {
            fetchAsyncGlassesHistory,
            initialDataLoading,
            setGnralInfo,
            setOphthalmicInfo,
            setApplicationSupports,
        }
    }
}
