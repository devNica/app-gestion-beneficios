import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setNewBornInfoReq } from '../redux/maternity.slice'


export const useMaternityRequestManagement = () => {
    const dispatch = useDispatch()
    const generalInfoReq = useSelector(state => state.maternity.generalInfoReq)
    const newBornInfoReq = useSelector(state => state.maternity.newBornInfoReq)

    function setGnralInfo(data) {
        dispatch(setGeneralInfoReq(data))
    }

    function setNewBornInfo(data) {
        dispatch(setNewBornInfoReq(data))
    }


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
