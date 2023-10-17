import { useSelector } from "react-redux"

export const useAdminProps = () => {
    const {
        paymentTypes,
        userAuthorizers,
        authorizedAmountsMathernity,
        maternitySupports,
        typesBirth,
        internalExchange
    } = useSelector(state => state.props)

    const serializedAuthorizers = userAuthorizers.map(user => ({ id: user.id, value: user.empleado }))
    const serializedPaymentTypes = paymentTypes.map(py => ({ id: py.id, value: py.type }))
   
    return {
        serializedAuthorizers,
        serializedPaymentTypes,
        authorizedAmountsMathernity,
        maternitySupports,
        typesBirth,
        internalExchange
    }
}