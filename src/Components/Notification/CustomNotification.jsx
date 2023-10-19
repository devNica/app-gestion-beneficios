import {  useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { resetNotification } from "../../redux/notification.slice"

const CustomNotification = () => {

    const dispatch = useDispatch()
    const { type, delay, message } = useSelector(state => state.notifications)

    useEffect(() => {

        if (type === 'error' && type !== null) {  
            toast.error(message, {
                autoClose: delay,
                
            })
        }

        if (type === 'warning' && type !== null) {  
            toast.warning(message, {
                autoClose: delay,
                
            })
        }


        if (type === 'success' && type !== null) {  
            toast.success(message, {
                autoClose: delay,
                
            })
        }

        if (type === 'info' && type !== null) {  
            toast.info(message, {
                autoClose: delay,
                
            })
        }


        return () => {
            dispatch(resetNotification())
        }

    }, [type])

}

export default CustomNotification