import { useDispatch, useSelector } from "react-redux"
import { setGeneralInfoReq, setAdditionalInfoReq } from '../redux/death.slice'


export const useDeathRequestManagement = () => {
    const dispatch = useDispatch()
    const {
        requiredSupports,
        generalInfoReq, 
        additionalInfo, 
        relativesList
    } = useSelector(state => state.death)
   
    function setGnralInfo(data) {
       dispatch(setGeneralInfoReq(data))
    }

    function setAdditionalInfo(data) {
        dispatch(setAdditionalInfoReq(data))
    }

    function getRequiredSupportsByTypeRegister({ typeRegister }){
        if(typeRegister === 'F') return requiredSupports.forFamilyMember
        else if (typeRegister === 'C') return requiredSupports.forEmployee
    }

    return {
        states: {
            relativesList,
            generalInfoReq,
            additionalInfo
        },
        actions: {
            setGnralInfo,
            setAdditionalInfo,
            getRequiredSupportsByTypeRegister
        }
    }
}
