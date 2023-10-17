import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newUnSavedRequest: false,
    generalInfoReq: {
        gender: null,
        registerDate: null,
        beneficiary: null,
        paymentType: null,
        notes:'',
        logger: '', 
        authorizer: null,
        memoRef: null,
        partner: ''
    },
    newBornInfoReq: {
        supports: [],
        typeBirth: null,
        amountInUS: null,
        amountInCS: null,
        childrens: [{
            id: 0,
            firstname: '--',
            lastname: '--',
            sex: 'M',
            birthdate: ''
        }]
    }
}

const maternitySlice = createSlice({
    name: 'maternity',
    initialState,
    reducers: {
        setGeneralInfoReq: (state, action) =>{
            return {
                ...state,
                newUnSavedRequest: true,
                generalInfoReq: action.payload
            }
        },

        setNewBornInfoReq: (state, action) => {
            return {
                ...state,
                newBornInfoReq: action.payload
            }
        }
    }
})

export const { setGeneralInfoReq, setNewBornInfoReq } = maternitySlice.actions

export default maternitySlice.reducer