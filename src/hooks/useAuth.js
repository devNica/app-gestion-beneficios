import { useDispatch, useSelector } from "react-redux";
import {loginFailed, logout, reload} from '../redux/auth.slice'

export const useIsAuth = () => useSelector(state => state.auth.isAuth)
export const useGetUserInfo = () => useSelector(state => state.auth.user)


export const useManageCredential = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    function clearCredentials() {
        dispatch(logout())
    }

    function loadCredential () {
        if (token !== null) {
            dispatch(reload())
        } else {
            dispatch(loginFailed())
        }
    }

    return {
        clearCredentials,
        loadCredential
    }
}