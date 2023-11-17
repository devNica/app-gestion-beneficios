import {useDispatch, useSelector} from "react-redux"
import {
    setEmployeeWithRelatives,
} from "../redux/beneficiary.slice.js";
import employeeWithRelativesMockup from '../data/employee-with-relatives.json'
import {filterData} from "../utils/object.util.js";

export const useBeneficiaryProps = () => {
    const dispatch = useDispatch()
    
    const {
        employeeWithChildrens,
        employeeWithRelatives,
        employeeList
    } = useSelector(state => state.beneficiary)
    
    const { authorizedAmounts } = useSelector(state => state.props)
    
    function setAsyncEmployeeWithRelatives(){
        dispatch(setEmployeeWithRelatives(employeeWithRelativesMockup))
    }
    
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
    
    function getEmployeeWithRelatives ({ serialized = false, queryFields =[], returnFields = []}){
        let result = []
        if (serialized) {
            result = filterData(queryFields, returnFields, employeeWithRelatives)
        } else {
            result = employeeWithRelatives
        }
        return result
    }

    function calcMonetaryAidForDeath(employeeId, typeRegister = 'F') {

        const preload = employeeWithRelatives.filter(emp => emp.id === employeeId)

        const records = preload[0].familyRecord.filter(fr => fr.status)

        let results

        if (typeRegister === 'F') {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: authorizedAmounts.find(element => element.relative === item.relationShip && element.typeBenefitId === 3).amount_usd
            }))

        } else {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: authorizedAmounts.find(ele => ele.typeBenefitId === 3 && ele.relative === 'Colaborador').amount_usd
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
            setAsyncEmployeeWithRelatives,
            getCoupleName,
            getBeneficiaryListBySex,
            getChildren,
            getEmployeeWithRelatives,
            calcMonetaryAidForDeath
        }
        
    }
}