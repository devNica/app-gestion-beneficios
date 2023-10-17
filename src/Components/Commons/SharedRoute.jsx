import { Outlet, useNavigate } from 'react-router-dom';
import { useIsAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';


export default function SharedRoute() {

    const isAuth = useIsAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/home')
        }
    }, [isAuth])

    return <Outlet />
}