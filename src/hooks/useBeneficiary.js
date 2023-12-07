import { useSelector} from "react-redux"
import { converToBoolean } from "../utils/object.util.js";

export const useBeneficiaryProps = () => {

    const {
        employeeWithChildrens,
        employeeWithRelatives,
        employeeList
    } = useSelector(state => state.beneficiary)
    
    const { authorizedAmount } = useSelector(state => state.death)
    
    
    function getCoupleName({ employeeId }) {
        const result = employeeList.find(emp => emp.employeeId === employeeId)
        return result.couple
    }
    
    function getBeneficiaryListBySex({ sex }){
        return employeeList.filter(emp => emp.sex === sex )
    }
    
    function getChildren ({ employeeId }) {
        const result =  employeeList.filter(emp => emp.employeeId === employeeId)

        if (result.length > 0) {
            return result[0].relatives
        } else {
            return []
        }

    }
    
    function calcMonetaryAidForDeath(employeeId, typeRegister = 'F') {

        const found = employeeList.filter(emp => emp.employeeId === employeeId)
        
        const records = found[0].relatives
        
        let results

        if (typeRegister === 'F') {
            results = records.map(item => ({
                ...item,
                date: '',
                selected: converToBoolean(item.selected),
                amount: authorizedAmount.find(element => element.relative === item.relationship).amount,
                authorizedAmountId: authorizedAmount.find(element => element.relative === item.relationship).id
            }))

        } else {
            results = records.map(item => ({
                ...item,
                date: '',
                selected: converToBoolean(item.selected),
                amount: authorizedAmount.find(ele => ele.relative === 'Colaborador').amount,
                authorizedAmountId: authorizedAmount.find(ele => ele.relative === 'Colaborador').id
            }))
        }

        return results

    }

    return {
        states: {
            employeeList,
            employeeWithChildrens,
            employeeWithRelatives
        },
        
        actions: {
            getCoupleName,
            getBeneficiaryListBySex,
            getChildren,
            calcMonetaryAidForDeath
        }
        
    }
}