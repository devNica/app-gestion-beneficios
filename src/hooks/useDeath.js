import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setAdditionalInfoReq } from '../redux/death.slice'
import { decrementTracking, incrementTracking } from "../redux/tracking.slice"


export const useDeathRequestManagement = () => {
    const dispatch = useDispatch()
    const newUnSavedRequest = useSelector(state => state.death.newUnSavedRequest)
    const generalInfoReq = useSelector(state => state.death.generalInfoReq)
    const additionalInfo = useSelector(state => state.death.additionalInfo)
    const relativesList = useSelector(state=> state.death.relativesList)

    function setGnralInfo(data) {
        if (!newUnSavedRequest) {
            dispatch(incrementTracking())
        }
        dispatch(setGeneralInfoReq(data))
    }

    function setAdditionalInfo(data) {
        dispatch(setAdditionalInfoReq(data))
    }

    return {
        states: {
            relativesList,
            generalInfoReq,
            additionalInfo
        },
        actions: {
            setGnralInfo,
            setAdditionalInfo
        }
    }
}
