import { createSlice } from "@reduxjs/toolkit"
import {
    fetchShortHistoryMaternityReq,
    registerNewRequestMaternityBenefit,
    updateMaternityRequestDetail
} from "../service/api.js";

const initialState = {
    history: [],
    authorizedAmount: null,
    markedChildren: [],
    paymentTypes: [],
    childrenList: [], // esto es una mejora al codigo
    generalInfoReq: {
        gender: null,
        registerDate: null,
        beneficiary: null,
        paymentType: null,
        notes:'',
        logger: '', 
        authorizer: null,
        memoRef: null,
        couple: ''
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

        loadProps: (state, action) => {
            return {
                ...state,
                paymentTypes: action.payload.paymentTypes,
                authorizedAmount: action.payload.amounts
            }
        },

        loadHistory: (state, action) => {
            return {
                ...state,
                history: action.payload
            }
        },

        loadRecord: (state, action) => {
            return {
                ...state,
                markedChildren: action.payload.markedChildren,
                generalInfoReq: action.payload.generalInfoReq,
                newBornInfoReq: action.payload.newBornInfoReq
            }
        },

        resetMaternityReq: (state) => {
            return {
                ...state,
                history: initialState.history,
                markedChildren: initialState.markedChildren,
                childrenList: initialState.childrenList,
                generalInfoReq: initialState.generalInfoReq,
                newBornInfoReq: initialState.newBornInfoReq
            }
        },

        updateChildrenList: (state, action) => {
            return {
                ...state,
                childrenList: action.payload.children
            }
            },

        setGeneralInfoReq: (state, action) =>{
            return {
                ...state,
                childrenList: action.payload.children,
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
    loadRecord,
    loadProps,
    loadHistory,
    updateChildrenList,
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
        const { generalInfoReq, newBornInfoReq, childrenList } = getState().maternity
        const { user } = getState().auth
        const { exchangeRate } = getState().props

        const childrenSelected = childrenList.filter(ch => ch.selected)

        const payload = {
            registerDate: generalInfoReq.registerDate,
            beneficiaryId: generalInfoReq.beneficiary.employeeId,
            paymentTypeId: generalInfoReq.paymentType.id,
            couple: generalInfoReq.couple,
            notes: generalInfoReq.notes,
            memoRef: generalInfoReq.memoRef,
            loggerId: user.id,
            authorizerId: generalInfoReq.authorizer.id,
            authorizedAmountId: newBornInfoReq.authorizedAmountId,
            exchangeValue: exchangeRate.value,
            supports: newBornInfoReq.supports,
            children: childrenSelected.map(ch => ({ parentId: ch.id }))
        }

        await registerNewRequestMaternityBenefit(payload)

        dispatch(resetMaternityReq())
    }catch(err){
        console.log(err)
    }
}


export const updateMaternityRequestThunk = (orderId) => async (dispatch, getState) => {
    try{
        const { generalInfoReq, newBornInfoReq, childrenList } = getState().maternity

        const childrenSelcted = childrenList.filter(ch => ch.selected)

        const payload = {
            registerDate: generalInfoReq.registerDate,
            beneficiaryId: generalInfoReq.beneficiary.employeeId,
            paymentTypeId: generalInfoReq.paymentType.id,
            couple: generalInfoReq.couple,
            notes: generalInfoReq.notes,
            memoRef: generalInfoReq.memoRef,
            authorizerId: generalInfoReq.authorizer.id,
            authorizedAmountId: newBornInfoReq.authorizedAmountId,
            supports: newBornInfoReq.supports,
            children: childrenSelcted.map(ch => ({ parentId: ch.id }))
        }

        await updateMaternityRequestDetail(orderId, payload)

        dispatch(resetMaternityReq())
    }catch(err){
        console.log('ERROR AL ACTUALIZAR BENEFICIO MATERNIDAD: ', err)
    }
}