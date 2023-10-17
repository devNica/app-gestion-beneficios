import { Outlet, useNavigate } from 'react-router-dom';
import { useIsAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';


export default function PrivateRoute() {

    const isAuth = useIsAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/signin')
        }
    }, [isAuth])

    return <Outlet />
}