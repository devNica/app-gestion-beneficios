import { useSelector } from "react-redux"

export const useAdminProps = () => {
    const {
        paymentTypes,
        userAuthorizers,
        authorizedAmounts,
        supports,
        typesBirth,
        exchangeRate
    } = useSelector(state => state.props)

    const maternitySupports = supports.find(ele => ele.typeBenefitId === 2).supports
   
    return {
        userAuthorizers,
        paymentTypes,
        authorizedAmounts,
        maternitySupports,
        typesBirth,
        exchangeRate
    }
}