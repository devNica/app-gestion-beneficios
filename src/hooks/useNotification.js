import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useGetNotification = () => {
    const { type, delay, message } = useSelector(state => state.notifications)


    useEffect(()=> {

    },[type, delay, message])

    return {
        type,
        delay, 
        message
    }
}