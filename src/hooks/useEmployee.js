import { useSelector } from "react-redux"
import { filterData } from "../utils/object.util"


export const useGetEmployeeList = () => useSelector(state => state.employee.employeeList)

export const useEmployeeProps = () => {

    const employees = useSelector(state => state.employee.employeeList)
    const { collaborator, family } = useSelector(state => state.props.amountAuthorizedForDeath)

    function getEmployeeList({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, employees)
    }

    function getMaternityBeneficiaries({ queryFields, returnFields, gender }) {
        if (gender === 'M') {
            const preload = employees.filter(emp => emp.couple !== "")
            return filterData([...queryFields, { hasFamilyRecord: true }], returnFields, preload)
        } else {
            return filterData(queryFields, returnFields, employees)
        }
    }

    function getPartnerBeneficiary({ beneficiaryName }) {

        const result = employees.find(emp => `${emp.first_name} ${emp.last_name}` === beneficiaryName)

        return result.couple

    }

    function getDeathBeneficiaries({ queryFields, returnFields }) {
        return filterData(queryFields, returnFields, employees)
    }

    function calcBenefitAmountPerRelative(employeeId, typeRegister = 'F') {

        const preload = employees.filter(emp => emp.id === employeeId)

        const records = preload[0].familyRecord.filter(fr => fr.status)

        let results

        if (typeRegister === 'F') {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: family.find(element => element.relative === item.relationShip).amount
            }))

        } else {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: collaborator[0].amount
            }))
        }


        return results

    }

    return {
        getEmployeeList,
        getMaternityBeneficiaries,
        getPartnerBeneficiary,
        getDeathBeneficiaries,
        calcBenefitAmountPerRelative
    }
}