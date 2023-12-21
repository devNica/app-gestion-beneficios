import { createSlice } from "@reduxjs/toolkit"
import { fetchShortHistoryGlassesReq } from "../service/api"
import { registerGlassesRequestAPI, updGlassesRequestAPI } from "../service/glasses.api"

const initialState = {

    requestsInProcess: [],

    authorizedAmount: null,
    paymentTypes: [],

    applicationTypes: [],
    applicationStatus: [],
    applicantList: [],

    history: [],

    clinics: [],
    lensDetail: [],
    lensMaterial: [],
    lensType: [],
    diagnosis: [],

    requestStatus: {
        id: 0,
        value: ''
    },

    generalInfoReq: {
        initialOption: 'E',
        registerDate: null,
        beneficiary: null,
        relative: null,
        selectedClinic: null,
        paymentType: null,
        authorizedBy: null,
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
        installmentDeduction: null,
        applicationType: null,
        hasProforma: false,
        proforma: {
            date: null,
            serie: '',
            amount: '',
            currency: { id: 1, value: 'C$' },
            amountInCS: '',
            exchangeRate: null
        },
        hasInvoice: false,
        invoice: {
            date: null,
            serie: '',
            amount: '',
            currency: { id: 1, value: 'C$' },
            amountInCS: '',
            exchangeRate: null
        }
    }
}

const glassSlice = createSlice({
    name: 'glass',
    initialState,
    reducers: {


        loadRequestsInProcess: (state, action) => {
            return {
                ...state,
                requestsInProcess: action.payload
            }
        },

        loadApplicants: (state, action) => {
            return {
                ...state,
                applicantList: action.payload
            }
        },

        loadProps: (state, action) => {
            return {
                ...state,
                paymentTypes: action.payload.paymentTypes,
                applicationTypes: action.payload.applicationTypes,
                clinics: action.payload.clinics,
                authorizedAmount: action.payload.authorizedAmount,
               
                lensDetail: action.payload.lensDetail,
                lensMaterial: action.payload.lensMaterial,
                lensType: action.payload.lensType,
                diagnosis: action.payload.diagnosis
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
                requestStatus: action.payload.status,
                generalInfoReq: action.payload.gnral,
                ophthalmicInfoReq: action.payload.oph,
                applicationSupports: action.payload.sup
            }
        },

        setGeneralInfoReq: (state, action) => {
            return {
                ...state,
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
    loadRequestsInProcess,
    loadApplicants,
    loadProps,
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
        const { user} = getState().auth

        await registerGlassesRequestAPI({
            registerDate: generalInfoReq.registerDate,
            applicantId: generalInfoReq.beneficiary.employeeId,
            relativeId: generalInfoReq.relative !== null ? generalInfoReq.relative.id : null,
            clinicId: generalInfoReq.selectedClinic.id,
            paymentTypeId: generalInfoReq.paymentType.id,
            authorizedBy: generalInfoReq.authorizedBy.id,
            registerBy: user.id,
            notes: generalInfoReq.notes,
            beneficiaryType: generalInfoReq.initialOption,

            diagnosis: ophthalmicInfoReq.diagnosis,
            rEye: ophthalmicInfoReq.rightEye,
            lEye: ophthalmicInfoReq.leftEye,
            proforma: applicationSupports.proforma,
            invoice: applicationSupports.invoice,
            lenMaterialId: ophthalmicInfoReq.lenMaterial.id,
            lendDetailId: ophthalmicInfoReq.lenDetail.id,
            lenTypeId: ophthalmicInfoReq.lenType.id,

            exchangeValue: exchangeRate.value,
            installmentDeduction: applicationSupports.installmentDeduction,
            applicationTypeId: applicationSupports.applicationType.id
        })

        dispatch(resetGlassReq())

    } catch (error) {
        console.log('error encontrado', error)
        throw new Error(String(error))
    }
}


export const updateGlassesRequestThunk = (requestId) => async (dispatch, getState) => {
    try {

        const { generalInfoReq, ophthalmicInfoReq, applicationSupports, requestStatus } = getState().glass
        const {exchangeRate} = getState().props

        await updGlassesRequestAPI(requestId, {
            registerDate: generalInfoReq.registerDate,
            applicantId: generalInfoReq.beneficiary.employeeId,
            relativeId: generalInfoReq.relative !== null ? generalInfoReq.relative.id : null,
            clinicId: generalInfoReq.selectedClinic.id,
            paymentTypeId: generalInfoReq.paymentType.id,
            authorizedBy: generalInfoReq.authorizedBy.id,
            notes: generalInfoReq.notes,
            currentRequestStatus: requestStatus.value,
            
            diagnosis: ophthalmicInfoReq.diagnosis,
            rEye: ophthalmicInfoReq.rightEye,
            lEye: ophthalmicInfoReq.leftEye,
            proforma: applicationSupports.proforma,
            invoice: applicationSupports.invoice,
            lenMaterialId: ophthalmicInfoReq.lenMaterial.id,
            lendDetailId: ophthalmicInfoReq.lenDetail.id,
            lenTypeId: ophthalmicInfoReq.lenType.id,

            exchangeValue: exchangeRate.value,
            installmentDeduction: applicationSupports.installmentDeduction,
            applicationTypeId: applicationSupports.applicationType.id
        })

        dispatch(resetGlassReq())

    } catch (error) {
        console.log('error encontrado', error)
        throw new Error(String(error))
    }
}


export default glassSlice.reducer