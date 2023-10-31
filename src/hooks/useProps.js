import { useSelector } from "react-redux"

export const useAdminProps = () => {
    const {
        paymentTypes,
        userAuthorizers,
        authorizedAmounts,
        supports,
        typesBirth,
        internalExchange
    } = useSelector(state => state.props)

    const serializedAuthorizers = userAuthorizers.map(user => ({ id: user.id, value: user.empleado }))

    const maternityAmounts = authorizedAmounts.filter(ele => ele.typeBenefitId === 2)
    const maternitySupports = supports.find(ele => ele.typeBenefitId === 2).supports
   
    return {
        maternityAmounts,
        serializedAuthorizers,
        paymentTypes,
        authorizedAmounts,
        maternitySupports,
        typesBirth,
        internalExchange
    }
}