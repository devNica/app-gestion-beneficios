import { createSlice } from "@reduxjs/toolkit"
import {createNewGlassesRequest, fetchShortHistoryGlassesReq, updateGlassesRequestFromAPI} from "../service/api"

const initialState = {

    authorizedAmount: null,
    paymentTypes: [],

    applicationsInProcess: [],
    applicationTypes: [],
    applicationStatus: [],
    preApplicants: [],

    history: [],

    clinics: [],
    lensDetail: [],
    lensMaterial: [],
    lensType: [],
    diagnosis: [],

    memoryFlag: false,

    generalInfoReq: {
        medicalRecord: null,
        registerDate: null,
        beneficiary: null,
        notes: ''
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

        updApplicantsAndApplications: (state, action) =>{
            return {
                ...state,
                preApplicants: action.payload.preApplicants,
                applicationsInProcess: action.payload.list,
            }
        },

        setPreApplicantsProps: (state, action) => {
            return {
                ...state,
                paymentTypes: action.payload.paymentTypes,
                applicationsInProcess: action.payload.applicationsInProcess,
                applicationTypes: action.payload.applicationTypes,
                clinics: action.payload.clinics,
                preApplicants: action.payload.preApplicants
            }
        },

        setGlassesProps: (state, action) => {
            return {
                ...state,
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
    updApplicantsAndApplications,
    setPreApplicantsProps,
    setGlassesProps,
    loadHistory,
    loadRecord,
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    resetGlassReq } = glassSlice.actions


export const updateRecordStatusThunk = (recordId) => (dispatch, getState) =>{
    const { history } = getState().glass
    const currentHistory = history.map(h=>{
        if(h.recordId === recordId){
            return {
                ...h,
                state: "Impreso",
                stateId: 2
            }
        } else return h
    })

    dispatch(loadHistory(currentHistory))
}

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

        await createNewGlassesRequest({
            registerDate: generalInfoReq.registerDate,
            notes: generalInfoReq.notes,
            diagnosis: ophthalmicInfoReq.diagnosis,
            rEye: ophthalmicInfoReq.rightEye,
            lEye: ophthalmicInfoReq.leftEye,
            proforma: applicationSupports.proforma,
            invoice: applicationSupports.invoice,
            lenMaterialId: ophthalmicInfoReq.lenMaterial.id,
            lendDetailId: ophthalmicInfoReq.lenDetail.id,
            lenTypeId: ophthalmicInfoReq.lenType.id,
            authorizedAmount: generalInfoReq.beneficiary.authorizedAmount,
            supportType: applicationSupports.currentMode,
            exchangeValue: exchangeRate.value,
            glassesRequestId: generalInfoReq.beneficiary.glassesRequestId,
            applicationType: generalInfoReq.beneficiary.applicationType
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

        await updateGlassesRequestFromAPI({
            registerDate: generalInfoReq.registerDate,
            notes: generalInfoReq.notes,
            diagnosis: ophthalmicInfoReq.diagnosis,
            rEye: ophthalmicInfoReq.rightEye,
            lEye: ophthalmicInfoReq.leftEye,
            proforma: applicationSupports.proforma,
            invoice: applicationSupports.invoice,
            lenMaterialId: ophthalmicInfoReq.lenMaterial.id,
            lendDetailId: ophthalmicInfoReq.lenDetail.id,
            lenTypeId: ophthalmicInfoReq.lenType.id,
            authorizedAmount: generalInfoReq.beneficiary.authorizedAmount,
            supportType: applicationSupports.currentMode,
            exchangeValue: exchangeRate.value,
            glassesRequestId: orderId,
            applicationType: generalInfoReq.beneficiary.applicationType,
            medicalRecordId: generalInfoReq.medicalRecord.id
        })

        dispatch(resetGlassReq())

    } catch (error) {
        console.log('error encontrado', error)
        throw new Error(String(error))
    }
}


export default glassSlice.reducer