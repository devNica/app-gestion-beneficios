import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setAdditionalInfoReq } from '../redux/death.slice'


export const useDeathRequestManagement = () => {
    const dispatch = useDispatch()
    const generalInfoReq = useSelector(state => state.death.generalInfoReq)
    const additionalInfo = useSelector(state => state.death.additionalInfo)
    const relativesList = useSelector(state=> state.death.relativesList)

    function setGnralInfo(data) {
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
