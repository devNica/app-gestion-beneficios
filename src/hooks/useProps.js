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

    const authorizedAmoutForGlassBenefit = authorizedAmounts.find(ele => ele.typeBenefit === 'Lentes')
    const maternityAmounts = authorizedAmounts.filter(ele => ele.typeBenefitId === 2)
    const maternitySupports = supports.find(ele => ele.typeBenefitId === 2).supports
   
    return {
        authorizedAmoutForGlassBenefit,
        maternityAmounts,
        userAuthorizers,
        paymentTypes,
        authorizedAmounts,
        maternitySupports,
        typesBirth,
        internalExchange
    }
}