import {useDispatch, useSelector} from "react-redux"
import {setEmployeeWithChildrens , setEmployeeWithRelatives, setEmployeeList} from "../redux/beneficiary.slice.js";
import employeeWithChildrensMockup from '../data/employee-with-childrens.json'
import employeeWithRelativesMockup from '../data/employee-with-relatives.json'
import employeeListMockup from '../data/employee-list.json'

export const useBeneficiaryProps = () => {
    const dispatch = useDispatch()
    
    const {
        employeeWithChildrens,
        employeeWithRelatives,
        employeeList
    } = useSelector(state => state.beneficiary)
    
    function setAsyncEmployeeList() {
        dispatch(setEmployeeList(employeeListMockup))
    }
    
    function setAsyncEmployeeWithChildrens() {
        dispatch(setEmployeeWithChildrens(employeeWithChildrensMockup))
    }
    
    function setAsyncEmployeeWithRelatives(){
        dispatch(setEmployeeWithRelatives(employeeWithRelativesMockup))
    }
    
    function getCoupleName({ beneficiaryName }) {
        const result = employeeWithChildrens.find(emp => `${emp.firstName} ${emp.lastName}` === beneficiaryName)
        console.log('result: ', result, ' beneficiary Name: ', beneficiaryName)
        return result.couple
    }
    
    function getBeneficiaryListBySex({ sex }){
        return employeeWithChildrens.filter(emp => emp.sex === sex )
    }
    
    function getChildren ({ employeeId }) {
        const result =  employeeWithChildrens.filter(emp => emp.id === employeeId)
        return result[0].children.map(child => ({...child, selected: false }))
    }
    
    return {
        states: {
            employeeList,
            employeeWithChildrens,
            employeeWithRelatives
        },
        
        actions: {
            setAsyncEmployeeList,
            setAsyncEmployeeWithChildrens,
            setAsyncEmployeeWithRelatives,
            getCoupleName,
            getBeneficiaryListBySex,
            getChildren
        }
        
    }
}