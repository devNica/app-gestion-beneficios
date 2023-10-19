import { useDispatch, useSelector } from "react-redux"
import { addTracking, removeTracking, updateTrackingSpace } from "../redux/tracking.slice"
import { resetGlassReq } from "../redux/glass.slice"

export const useTrackingProps = () => {
    const {
        spool,
        recordTracking,
    } = useSelector(state => state.tracking)

    const dispatch = useDispatch()

    function findTrack(identity) {
        return recordTracking.some(track => track.procIdentity === identity)
    }

    function trackingUpdate({ typeAction, data, space = '', procIdentity = '' }) {

        if (typeAction === 'add') {
            /** si aun no hay un tipo de proceso especifico, permite agregarlo */
            if (!findTrack(data.procIdentity)){
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
        }
    }

    function glassSpace({ mode = 'register' }) {
        if (recordTracking.length > 0) {
            if (mode === 'register') {
                return recordTracking.some(track => track.procIdentity === 'GL-REG')

            } else if (mode === 'edit') {
                return recordTracking.some(track => track.procIdentity === 'GL-EDIT')
            }
        } else return false
    }

    return {
        states: {
            spool,
            recordTracking
        },
        actions: {
            trackingUpdate,
            glassSpace, findTrack
        }
    }
}