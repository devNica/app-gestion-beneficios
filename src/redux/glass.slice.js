import { createSlice } from "@reduxjs/toolkit"
import {createNewGlassesRequest, fetchShortHistoryGlassesReq, updateGlassesRequestFromAPI} from "../service/api"

const initialState = {

    authorizedAmount: null,
    paymentTypes: [],

    history: [],

    clinics: [],
    lensDetail: [],
    lensMaterial: [],
    lensType: [],
    diagnosis: [],

    memoryFlag: false,

    generalInfoReq: {
        registerDate: null,
        beneficiary: null,
        paymentType: null,
        clinic: null,
        authorizedAmount: null,
        notes: '',
        logger: '',
        authorizer: null,
        letterRef: '',
        memoRef: ''
    },
    ophthalmicInfoReq: {
        rightEye: [
            { erEsf: '-' },
            { erCil: '-' },
            { erAxis: '-' },
            { erDip: '-' },
            { erPrisma: '-' },
            { erBase: '-' },
            { erAddition: '-' },
            { erAv: '-' }
        ],
        leftEye: [
            { elEsf: '-' },
            { elCil: '-' },
            { elAxis: '-' },
            { elDip: '-' },
            { elPrisma: '-' },
            { elBase: '-' },
            { elAddition: '-' },
            { elAv: '-' }
        ],
        lenMaterial: null,
        lenDetail: null,
        lenType: null,
        diagnosis: []
    },
    applicationSupports: {
        currentMode: 'OPF',
        hasProforma: false,
        proforma: {
            date: null,
            serie: '',
            amount: '',
            currency: null,
            amountInCS: '',
            exchangeRate: null
        },
        hasInvoice: false,
        invoice: {
            date: null,
            serie: '',
            amount: '',
            currency: null,
            amountInCS: '',
            exchangeRate: null
        }
    }
}

const glassSlice = createSlice({
    name: 'glass',
    initialState,
    reducers: {

        setGlassesProps: (state, action) => {
            return {
                ...state,
                paymentTypes: action.payload.paymentTypes,
                authorizedAmount: action.payload.amounts,
                clinics: action.payload.clinics,
                lensDetail: action.payload.details,
                lensMaterial: action.payload.material,
                lensType: action.payload.types,
                diagnosis: action.payload.diag
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
                generalInfoReq: action.payload.gnral,
                ophthalmicInfoReq: action.payload.oph,
                applicationSupports: action.payload.sup
            }
        },

        setGeneralInfoReq: (state, action) => {
            return {
                ...state,
                memoryFlag: true,
                generalInfoReq: action.payload
            }
        },

        setOphthalmicInfoReq: (state, action) => {
            return {
                ...state,
                ophthalmicInfoReq: action.payload
            }
        },

        setSupportsReq: (state, action) => {
            return {
                ...state,
                applicationSupports: action.payload
            }
        },

        resetGlassReq: (state) => {
            return {
                ...state,
                history: [],
                generalInfoReq: initialState.generalInfoReq,
                ophthalmicInfoReq: initialState.ophthalmicInfoReq,
                applicationSupports: initialState.applicationSupports
            }
        }
    }
})

export const {
    setGlassesProps,
    loadHistory,
    loadRecord,
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    resetGlassReq } = glassSlice.actions


export const fetchHistoryGlassesReqThunk = () => async dispatch => {
    try {
       const {data} = await fetchShortHistoryGlassesReq()
        dispatch(loadHistory(data))
    }catch(err) {
        throw new Error(String(err))
    }
}

export const registerGlassesRequestThunk = () => async (dispatch, getState) => {
    try {

        const { generalInfoReq, ophthalmicInfoReq, applicationSupports } = getState().glass
        const {exchangeRate} = getState().props
        const { user } = getState().auth

        await createNewGlassesRequest({
            registerDate: generalInfoReq.registerDate,
            memoRef: generalInfoReq.memoRef,
            letterRef: generalInfoReq.letterRef,
            notes: generalInfoReq.notes,
            diagnosis: ophthalmicInfoReq.diagnosis,
            rEye: ophthalmicInfoReq.rightEye,
            lEye: ophthalmicInfoReq.leftEye,
            proforma: applicationSupports.proforma,
            invoice: applicationSupports.invoice,
            lenMaterialId: ophthalmicInfoReq.lenMaterial.id,
            lendDetailId: ophthalmicInfoReq.lenDetail.id,
            lenTypeId: ophthalmicInfoReq.lenType.id,
            clinicId: generalInfoReq.clinic.id,
            beneficiaryId: generalInfoReq.beneficiary.employeeId,
            loggerId: user.id,
            authorizerId: generalInfoReq.authorizer.id,
            paymentTypeId: generalInfoReq.paymentType.id,
            authorizedAmountId: generalInfoReq.authorizedAmount.id,
            supportType: applicationSupports.currentMode,
            exchangeRateRef: exchangeRate.value
        })

        dispatch(resetGlassReq())

    } catch (error) {
        console.log('error encontrado', error)
        throw new Error(String(error))
    }
}


export const updateGlassesRequestThunk = (orderId) => async (dispatch, getState) => {
    try {

        const { generalInfoReq, ophthalmicInfoReq, applicationSupports } = getState().glass
        const {exchangeRate} = getState().props

        await updateGlassesRequestFromAPI(orderId, {
            registerDate: generalInfoReq.registerDate,
            memoRef: generalInfoReq.memoRef,
            letterRef: generalInfoReq.letterRef,
            notes: generalInfoReq.notes,
            diagnosis: ophthalmicInfoReq.diagnosis,
            rEye: ophthalmicInfoReq.rightEye,
            lEye: ophthalmicInfoReq.leftEye,
            proforma: applicationSupports.proforma,
            invoice: applicationSupports.invoice,
            lenMaterialId: ophthalmicInfoReq.lenMaterial.id,
            lendDetailId: ophthalmicInfoReq.lenDetail.id,
            lenTypeId: ophthalmicInfoReq.lenType.id,
            clinicId: generalInfoReq.clinic.id,
            beneficiaryId: generalInfoReq.beneficiary.employeeId,
            // loggerId: 1, // corregir esto cuando se implemente la api de auth
            authorizerId: generalInfoReq.authorizer.id,
            paymentTypeId: generalInfoReq.paymentType.id,
            authorizedAmountId: generalInfoReq.authorizedAmount.id,
            supportType: applicationSupports.currentMode,
            exchangeRateId: exchangeRate.id
        })

        dispatch(resetGlassReq())

    } catch (error) {
        console.log('error encontrado', error)
        throw new Error(String(error))
    }
}


export default glassSlice.reducer