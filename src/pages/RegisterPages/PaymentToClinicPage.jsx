import { useCallback, useEffect, useState } from "react"
import PaymentRequestToClinicForm from "../../Forms/payments/PaymentRequestToClinicForm"
import PaymentRequestHistory from '../../Forms/payments/PaymentRequestHistory'
import { fetchPaymentRequestAPI, fetchPaymentsPropsAPI } from "../../service/payments.api"
import { usePaymentHook } from "../../hooks/usePayment"

import CustomLoader from "../../Components/Loader/CustomLoader"
import Stepper from "../../Components/Stepper/Stepper"

import '../main-page.css'


const PaymentToClinicPage = () => {

    const { actions } = usePaymentHook()

    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)

    const fetching = useCallback(async () => {

        const [props, payments] = await Promise.all([
            fetchPaymentsPropsAPI(),
            fetchPaymentRequestAPI()
        ])

        setLoading(false)

        actions.initializePaymentStore({
            props,
            payments
        })

    }, [])

    useEffect(() => {
        fetching()
    }, [])

    const multipleComponent = [
        <PaymentRequestToClinicForm
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <PaymentRequestHistory
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />
    ]

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficios de Lentes - Solicitudes de Pago</h3>
            {
                loading ?
                    <CustomLoader /> :
                    <Stepper
                        showIndicators={false}
                        CurrenComponent={multipleComponent.at(currentIndex)}
                        currentIndex={currentIndex}
                    />
            }
        </div>
    )
}

export default PaymentToClinicPage