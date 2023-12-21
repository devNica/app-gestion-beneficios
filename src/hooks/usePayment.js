import { useDispatch, useSelector } from 'react-redux'
import { setProps, loadPayments } from '../redux/payment.slice'

export const usePaymentHook = () => {

    const dispatch = useDispatch()
    const { 
        clinics, 
        periods,
        payments, 
        applicationsPendingForPayment 
    } = useSelector(state => state.payments)


    function initializePaymentStore ({ props, payments }) {
        dispatch(setProps({
            clinics: props.data.clinics,
            periods: props.data.periods
        }))

        dispatch(loadPayments(payments.data))
    }

    return {
        states: {
            clinics,
            periods,
            payments,
            applicationsPendingForPayment
        },
        actions: {
            initializePaymentStore
        }
    }
}