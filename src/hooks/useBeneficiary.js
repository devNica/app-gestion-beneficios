import {useDispatch, useSelector} from "react-redux"
import {
    setEmployeeWithRelatives,
} from "../redux/beneficiary.slice.js";
import employeeWithRelativesMockup from '../data/employee-with-relatives.json'

export const useBeneficiaryProps = () => {
    const dispatch = useDispatch()
    
    const {
        employeeWithChildrens,
        employeeWithRelatives,
        employeeList
    } = useSelector(state => state.beneficiary)
    
    const { authorizedAmount } = useSelector(state => state.death)
    
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
    
    function calcMonetaryAidForDeath(employeeId, typeRegister = 'F') {

        const preload = employeeList.filter(emp => emp.employeeId === employeeId)

        const records = preload[0].relatives.filter(fr => fr.status)

        let results

        if (typeRegister === 'F') {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: authorizedAmount.find(element => element.relative === item.relationship).amount,
                authorizedAmountId: authorizedAmount.id
            }))

        } else {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: authorizedAmount.find(ele => ele.relative === 'Colaborador').amount,
                authorizedAmountId: authorizedAmount.id
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
            calcMonetaryAidForDeath
        }
        
    }
}