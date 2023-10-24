import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setNewBornInfoReq } from '../redux/maternity.slice'


export const useMaternityRequestManagement = () => {
    const dispatch = useDispatch()
    const {
        childrenOfBeneficiary,
        generalInfoReq,
        newBornInfoReq
    } = useSelector(state => state.maternity)

    function setGnralInfo(data, children) {
        dispatch(setGeneralInfoReq({ info: data, children }))
    }

    function setNewBornInfo(data) {
        dispatch(setNewBornInfoReq(data))
    }


    return {
        states: {
            childrenOfBeneficiary,
            generalInfoReq,
            newBornInfoReq,
        },
        actions: {
            setGnralInfo,
            setNewBornInfo
        }
    }
}
