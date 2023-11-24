import { createSlice } from "@reduxjs/toolkit"
import { fetchShortDeathHistoryFromAPI, registerDeathBenefitApplicationFromAPI, updateDeathBenefitApplicationFromAPI } from "../service/death.api"

const initialState = {
    history: [],
    
    authorizedAmount: null,
    relativesList: null,
    paymentTypes: [],
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
        hasSupport: false,
        amountInUs: 'U$ 0.00',
        supportsConfirmed: null
    }
}

const deathSlice = createSlice({
    name: 'death',
    initialState,
    reducers: {

       loadProps: (state, action) => {
           return {
               ...state,
               paymentTypes: action.payload.paymentTypes,
               requiredSupports: action.payload.supports,
               authorizedAmount: action.payload.amounts
           }
       },

       loadHistory: (state, action)=>{
            return {
                ...state,
                history: action.payload
            }
       },

       loadRecord: (state, action) => {
            return {
                ...state, 
                relativesList: action.payload.relativesList,
                generalInfoReq: action.payload.generalInfoReq,
                additionalInfo: action.payload.additionalInfo
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
    loadRecord,
    loadProps,
    loadHistory,
    resetDeathReq,
    setGeneralInfoReq,
    setRelativeList,
    setAdditionalInfoReq,
    resetAdditionalInfoReq } = deathSlice.actions

export default deathSlice.reducer

export const fetchShortDeathHistoryThunk = () => async dispatch => {
    try {
        const {data} = await fetchShortDeathHistoryFromAPI()
        dispatch(loadHistory(data))
    }catch(err) {
        throw new Error(String(err))
    }
}


export const registerDeathBenefitApplicationThunk = (orderId, mode='register') => async (dispatch, getState) => {
    try{
        const { generalInfoReq, additionalInfo, relativesList } = getState().death
        const { user } = getState().auth
        const { exchangeRate } = getState().props

        const typeRegister = generalInfoReq.typeRegister
        let relatives = []
        let employeeDeathDate = ''
        
        if(relativesList !== null && relativesList.length > 0) {
            relativesList.forEach(r=>{
                if(r.selected) {
                    employeeDeathDate = typeRegister === 'C' ? r.date: ''
                    relatives.push({ 
                        relativeId: r.id, 
                        fullname: r.fullname.replace('Q.E.P.D', '').trimEnd(), 
                        deathDate: r.date, 
                        authorizedAmountId: r.authorizedAmountId })
                }
            })
        }
         

        const payload ={
            registerDate: generalInfoReq.registerDate,
            typeRegister,
            employeeDeathDate,
            paymentTypeId: generalInfoReq.paymentType.id,
            notes: generalInfoReq.notes,
            memoRef: generalInfoReq.memoRef,
            parentalInfoList: relatives,
            supports: additionalInfo.supportsConfirmed,
            accumulatedAmount: additionalInfo.amountInUs,
            beneficiaryId: generalInfoReq.beneficiary.employeeId,
            loggerId: user.id,
            authorizerId: generalInfoReq.authorizer.id,
            exchangeValue: exchangeRate.value
        }

        if (mode === 'register') {
            await registerDeathBenefitApplicationFromAPI(payload)
        } else if (mode === 'edit'){
            await updateDeathBenefitApplicationFromAPI(payload, orderId)
        }

       dispatch(resetDeathReq())

    } catch(err) {
        console.error(err)
    }
}