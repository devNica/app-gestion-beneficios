import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    history: [],
    authorizedAmount: null,
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
        confirmedChildren: null
    }
}

const maternitySlice = createSlice({
    name: 'maternity',
    initialState,
    reducers: {

        loadAuthorizedAmounts: (state, action) => {
            return {
                ...state,
                authorizedAmount: action.payload.amounts
            }
        },

        loadHistory: (state, action) => {
            return {
                ...state,
                history: action.payload
            }
        },

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

        resetNewBornInfoReq: (state) =>{
          return {
              ...state,
              newBornInfoReq: initialState.newBornInfoReq
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
    loadAuthorizedAmounts,
    loadHistory,
    setGeneralInfoReq,
    setNewBornInfoReq,
    resetMaternityReq,
    resetNewBornInfoReq} = maternitySlice.actions

export default maternitySlice.reducer