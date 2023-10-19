import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setOphthalmicInfoReq, setSupportsReq, resetGlassReq, loadHistory, loadRecord, setMemoryFlag } from '../redux/glass.slice'
import mockupHistory from '../data/history/glasses.json'
import mockupRecord from '../data/edit/glasses.json'
import { filterData } from "../utils/object.util"

export const useGlassProps = () => {
    const {
        history,
        clinics,
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType,
    } = useSelector(state => state.glass)

    const serializedClinics = clinics.map(c => ({ id: c.id, value: c.name }))
    const serializedLensDetail = lensDetail.map(ld => ({ id: ld.id, value: ld.type }))
    const serializedLensMaterial = lensMaterial.map(lm => ({ id: lm.id, value: lm.type }))
    const serializedLensType = lensType.map(lt => ({ id: lt.id, value: lt.type }))


    const serializedDiagnosis = diagnosis.map(dg => ({ id: dg.id, value: dg.type }))

    function serializedHistory({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, history)
    }

    return {
        serializedClinics,
        serializedDiagnosis,
        serializedLensDetail,
        serializedLensMaterial,
        serializedLensType,
        serializedHistory
    }
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
        dispatch(loadHistory(mockupHistory))
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
