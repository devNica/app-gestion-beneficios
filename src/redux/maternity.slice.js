import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    childrenOfBeneficiary: [],
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
        /*childrens: [{
            id: 0,
            firstname: '--',
            lastname: '--',
            sex: 'M',
            birthdate: ''
        }]*/
        confirmedChildren: null
    }
}

const maternitySlice = createSlice({
    name: 'maternity',
    initialState,
    reducers: {

        resetMaternityReq: (state) => {
            return {
                ...state,
                childrenOfBeneficiary: initialState.childrenOfBeneficiary,
                generalInfoReq: initialState.generalInfoReq,
                newBornInfoReq: initialState.newBornInfoReq
            }
        },

        setGeneralInfoReq: (state, action) =>{
            return {
                ...state,
                childrenOfBeneficiary: action.payload.children,
                generalInfoReq: action.payload.info
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

export const {
    setGeneralInfoReq,
    setNewBornInfoReq,
    resetMaternityReq } = maternitySlice.actions

export default maternitySlice.reducer