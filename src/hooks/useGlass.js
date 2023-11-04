import { useDispatch, useSelector } from "react-redux"
import {
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    resetGlassReq,
    loadHistory,
    loadRecord,
    setMemoryFlag,
    setProps, fetchHistoryGlassesReqThunk
} from '../redux/glass.slice'
import mockupRecord from '../data/edit/glasses.json'
import {fetchGlassesPropsFromAPI} from "../service/api.js";
import {useQuery} from "react-query";
import {filterData} from "../utils/object.util.js";

export const useGlassProps = () => {
    const {
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
        history,
        clinics,
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType,
        serializedHistory
    }
}

export const useFetchGlassesProps = () => {
    const dispatch = useDispatch()
    useQuery('glasses', fetchGlassesPropsFromAPI, {
        onSuccess: ({data}) => {
            dispatch(setProps({
                clinics: data.clinica,
                details: data.detalleLente,
                material: data.materialLente,
                types: data.tipoLente,
                diag: data.diagnostico
            }))
        },
        onError: err => {
            console.log('error: ', err)
        }
    })
}

export const useGlassesRequestManagement = () => {
    const dispatch = useDispatch()

    const { 
        memoryFlag,
        generalInfoReq,
        ophthalmicInfoReq,
        applicationSupports: supportsReq
    } = useSelector(state => state.glass)

    function fetchAsyncGlassesHistory() {
        dispatch(fetchHistoryGlassesReqThunk())
    }

    function fetchGlassesRequestRecordById() {
        dispatch(setMemoryFlag(true))
        dispatch(loadRecord({
            gnral: mockupRecord.gnralInfoReq,
            oph: mockupRecord.opthalmicInfo,
            sup: mockupRecord.applicationSupports
        }))
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

    function saveRequest() {
        dispatch(resetGlassReq())
    }

    function clearRequestData() {
        dispatch(resetGlassReq())
    }

    return {
        states: {
            memoryFlag,
            generalInfoReq,
            ophthalmicInfoReq,
            supportsReq
        },
        actions: {
            fetchAsyncGlassesHistory,
            fetchGlassesRequestRecordById,
            setGnralInfo,
            setOphthalmicInfo,
            setApplicationSupports,
            saveRequest,
            clearRequestData
        }
    }
}
