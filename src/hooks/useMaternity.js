import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setNewBornInfoReq } from '../redux/maternity.slice'
import { decrementTracking, incrementTracking } from "../redux/tracking.slice"


export const useMaternityRequestManagement = () => {
    const dispatch = useDispatch()
    const newUnSavedRequest = useSelector(state => state.maternity.newUnSavedRequest)
    const generalInfoReq = useSelector(state => state.maternity.generalInfoReq)
    const newBornInfoReq = useSelector(state => state.maternity.newBornInfoReq)

    function setGnralInfo(data) {
        if (!newUnSavedRequest) {
            dispatch(incrementTracking())
        }
        dispatch(setGeneralInfoReq(data))
    }

    function setNewBornInfo(data) {
        dispatch(setNewBornInfoReq(data))
    }

    // function resetGlassRequest(data) {
    //     dispatch(decrementTracking())
    //     dispatch(resetGlassReq())
    // }


    return {
        states: {
            generalInfoReq,
            newBornInfoReq,
        },
        actions: {
            setGnralInfo,
            setNewBornInfo
        }
    }
}
