import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    history: [],
    authorizedAmount: null,
    relativesList: null,
    requiredSupports: null,
    generalInfoReq: {
        typeRegister: 'F',
        registerDate: '',
        beneficiary: null,
        relatives: null,
        paymentType: null,
        notes: '',
        logger: '',
        authorizer: null,
        memoRef: '',
    },
    additionalInfo: {
        relativesConfirmed: null,
        amountInCS: 'C$ 0.00',
        amountInUS: 'U$ 0.00',
        supportsConfirmed: null
    }
}

const deathSlice = createSlice({
    name: 'death',
    initialState,
    reducers: {

       loadSupport: (state, action) => {
           return {
               ...state,
               requiredSupports: action.payload
           }
       },

       loadHistory: (state, action)=>{
            return {
                ...state,
                history: action.payload
            }
       },

        resetDeathReq: (state) => {
            return {
                ...state,
                relativesList: initialState.relativesList,
                generalInfoReq: initialState.generalInfoReq,
                additionalInfo: initialState.additionalInfo
            }
        },

        setRelativeList: (state, action) => {
            return {
                ...state,
                relativesList: action.payload
            }
        },

        setGeneralInfoReq: (state, action) => {
            return {
                ...state,
                generalInfoReq: action.payload
            }
        },

        setAdditionalInfoReq: (state, action) => {
            return {
                ...state,
                additionalInfo: action.payload
            }
        },

        resetAdditionalInfoReq: (state) => {
            return {
                ...state,
                additionalInfo: initialState.additionalInfo
            }
        }

    }
})

export const {
    loadSupport,
    loadHistory,
    resetDeathReq,
    setGeneralInfoReq,
    setRelativeList,
    setAdditionalInfoReq,
    resetAdditionalInfoReq } = deathSlice.actions

export default deathSlice.reducer