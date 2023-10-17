import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setOphthalmicInfoReq, setSupportsReq, resetGlassReq } from '../redux/glass.slice'
import { decrementTracking, incrementTracking } from "../redux/tracking.slice"

export const useGlassProps = () => {
    const {
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

    return {
        serializedClinics,
        serializedDiagnosis,
        serializedLensDetail,
        serializedLensMaterial,
        serializedLensType
    }
}

export const useGlassesRequestManagement = () => {
    const dispatch = useDispatch()
    const newUnSavedRequest = useSelector(state => state.glass.newUnSavedRequest)
    const generalInfoReq = useSelector(state => state.glass.generalInfoReq)
    const ophthalmicInfoReq = useSelector(state => state.glass.ophthalmicInfoReq)
    const supportsReq = useSelector(state => state.glass.applicationSupports)

    function setGnralInfo(data) {
        if (!newUnSavedRequest) {
            dispatch(incrementTracking())
        }
        dispatch(setGeneralInfoReq(data))
    }

    function setOphthalmicInfo(data) {
        dispatch(setOphthalmicInfoReq(data))
    }

    function setApplicationSupports(data) {
        dispatch(setSupportsReq(data))
    }

    function resetGlassRequest(data) {
        dispatch(decrementTracking())
        dispatch(resetGlassReq())
    }


    return {
        states: {
            generalInfoReq,
            ophthalmicInfoReq,
            supportsReq
        },
        actions: {
            setGnralInfo,
            setOphthalmicInfo,
            setApplicationSupports,
            resetGlassRequest
        }
    }
}
