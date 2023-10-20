import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newUnSavedRequest: false,
    relativesList: null,
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
        relativesSelected: null,
        hasSupport: false,
        amountInCS: 'C$ 0.00',
        amountInUS: 'U$ 0.00'
    }
}

const deathSlice = createSlice({
    name: 'death',
    initialState,
    reducers: {

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
                newUnSavedRequest: true,
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
                additionalInfo: {
                    relativesSelected: null,
                    hasSupport: false,
                    amountInCS: 'C$ 0.00',
                    amountInUS: 'U$ 0.00'
                }
            }
        }

    }
})

export const {
    resetDeathReq,
    setGeneralInfoReq,
    setRelativeList,
    setAdditionalInfoReq,
    resetAdditionalInfoReq } = deathSlice.actions

export default deathSlice.reducer