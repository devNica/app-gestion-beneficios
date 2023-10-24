import {useDispatch, useSelector} from "react-redux"
import {setEmployeeWithChildrens , setEmployeeWithRelatives, setEmployeeList} from "../redux/beneficiary.slice.js";
import employeeWithChildrensMockup from '../data/employee-with-childrens.json'
import employeeWithRelativesMockup from '../data/employee-with-relatives.json'
import employeeListMockup from '../data/employee-list.json'
import {filterData} from "../utils/object.util.js";

export const useBeneficiaryProps = () => {
    const dispatch = useDispatch()
    
    const {
        employeeWithChildrens,
        employeeWithRelatives,
        employeeList
    } = useSelector(state => state.beneficiary)
    
    const {
        amountForDeathEmployee,
        amountForDeathFamilyMember } = useSelector(state => state.props.amountAuthorizedForDeath)

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
        return result.couple
    }
    
    function getBeneficiaryListBySex({ sex }){
        return employeeWithChildrens.filter(emp => emp.sex === sex )
    }
    
    function getChildren ({ employeeId }) {
        const result =  employeeWithChildrens.filter(emp => emp.id === employeeId)
        return result[0].children.map(child => ({...child, selected: false }))
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
                amount: amountForDeathFamilyMember.find(element => element.relative === item.relationShip).amount
            }))

        } else {
            results = records.map(item => ({
                ...item,
                date: '',
                amount: amountForDeathEmployee[0].amount
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
            setAsyncEmployeeList,
            setAsyncEmployeeWithChildrens,
            setAsyncEmployeeWithRelatives,
            getCoupleName,
            getBeneficiaryListBySex,
            getChildren,
            getEmployeeWithRelatives,
            calcMonetaryAidForDeath
        }
        
    }
}