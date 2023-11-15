import { createSlice } from "@reduxjs/toolkit"
import {fetchShortHistoryMaternityReq, registerNewRequestMaternityBenefit} from "../service/api.js";

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
        authorizedAmountId: null,
        supports: [],
        typeBirth: null,
        amountInUS: null,
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

export const fetchHistoryMaternityReqThunk = () => async dispatch => {
    try {
        const {data} = await fetchShortHistoryMaternityReq()
        dispatch(loadHistory(data))
    }catch(err) {
        throw new Error(String(err))
    }
}

export const registerMaternityBenefitThunk = () => async (dispatch, getState) => {
    try{
        const { generalInfoReq, newBornInfoReq } = getState().maternity
        const { user } = getState().auth
        const { exchangeRate } = getState().props

        const childrenSelcted = newBornInfoReq.confirmedChildren.filter(ch => ch.selected)

        const payload = {
            registerDate: generalInfoReq.registerDate,
            beneficiaryId: generalInfoReq.beneficiary.employeeId,
            paymentTypeId: generalInfoReq.paymentType.id,
            couple: generalInfoReq.partner,
            notes: generalInfoReq.notes,
            memoRef: generalInfoReq.memoRef,
            loggerId: user.id,
            authorizerId: generalInfoReq.authorizer.id,
            authorizedAmountId: newBornInfoReq.authorizedAmountId,
            exchangeRateId: exchangeRate.id,
            supports: newBornInfoReq.supports,
            children: childrenSelcted.map(ch => ({ parentId: ch.id }))
        }

        await registerNewRequestMaternityBenefit(payload)

        dispatch(resetMaternityReq())
    }catch(err){

    }
}