import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gnral: {
        typeBeneficiary: null,
        registerDate: null,
        academicLevel: null,
        officer: null,
        scholar: null,
        institute: null,
        degree: null,
        modality: null
    }
}

const scholarshipSlice = createSlice({
    name: 'scholarship',
    initialState,
    reducers: {
        
    }
})


export default  scholarshipSlice.reducer