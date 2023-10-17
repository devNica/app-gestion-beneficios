import { createSlice } from "@reduxjs/toolkit"
import employeeMockups from '../data/familiar.json'

const initialState = {
    employeeList: employeeMockups
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeeList: (state, action) => {
            return {
                ...state,
                employeeList: action.payload
            }
        }
    }
})


export default employeeSlice.reducer