import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    employeeWithChildrens: [],
    employeeWithRelatives: [],
    employeeList: []
}

const beneficiarySlice = createSlice({
    name: 'beneficiary',
    initialState,
    reducers: {
        setEmployeeWithChildrens (state, action) {
            return {
                ...state,
                employeeWithChildrens: action.payload
            }
        },
        
        setEmployeeWithRelatives (state, action) {
            return {
                ...state,
                employeeWithRelatives: action.payload
            }
        },
        
        setEmployeeList(state, action){
            return {
                ...state,
                employeeList: action.payload
            }
        },
    }
})

export const { setEmployeeList,
    setEmployeeWithChildrens,
    setEmployeeWithRelatives} = beneficiarySlice.actions

export default beneficiarySlice.reducer