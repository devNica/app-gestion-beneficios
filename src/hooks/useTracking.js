import { useDispatch, useSelector } from "react-redux"
import { addTracking, removeTracking, updateTrackingSpace } from "../redux/tracking.slice"
import { resetGlassReq } from "../redux/glass.slice"
import {resetMaternityReq} from "../redux/maternity.slice.js";
import {resetDeathReq} from "../redux/death.slice.js";

export const useTrackingProps = () => {
    const {
        spool,
        recordTracking,
    } = useSelector(state => state.tracking)

    const dispatch = useDispatch()

    function removeTrack({space,  procIdentity}) {
        if (space === 'glass') dispatch(resetGlassReq())
        if (space === 'maternity') dispatch(resetMaternityReq())
        if (space === 'death') dispatch(resetDeathReq())
        dispatch(removeTracking(procIdentity))
    }

    function trackingUpdate({ typeAction, data, space = '', procIdentity = '' }) {
        if (typeAction === 'add') {
            /** si aun no hay un tipo de proceso especifico, permite agregarlo */
            if (!findTrack({ procIdentity: data.procIdentity })){
                dispatch(addTracking(data))
            }
        }
        else if (typeAction === 'remove') {
            dispatch(removeTracking(procIdentity))
        }
        else if (typeAction === 'freeUpSpace') {
            dispatch(updateTrackingSpace(space))
            if(space === 'glass') {
                dispatch(resetGlassReq())
            }
            if (space === 'maternity') {
                dispatch(resetMaternityReq())
            }
        }
    }

    function findTrack({ procIdentity }) {
        if (recordTracking.length > 0) {
            return recordTracking.some(track => track.procIdentity === procIdentity)
        } else return false
    }

    return {
        states: {
            spool,
            recordTracking
        },
        actions: {
            trackingUpdate,
            findTrack,
            removeTrack
        }
    }
}