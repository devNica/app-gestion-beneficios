import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
        amountApproved: 0,
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

        setProps: (state, action) => {
          return {
              ...state,
              clinics: action.payload.clinics,
              lensDetail: action.payload.details,
              lensMaterial: action.payload.material,
              lensType: action.payload.types,
              diagnosis: action.payload.diag
          }
        },

        setMemoryFlag: (state, action) => {
            return {
                ...state,
                memoryFlag: action.payload
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
                memoryFlag: false,
                generalInfoReq: initialState.generalInfoReq,
                ophthalmicInfoReq: initialState.ophthalmicInfoReq,
                applicationSupports: initialState.applicationSupports
            }
        }
    }
})

export const {
    setProps,
    setMemoryFlag,
    loadHistory,
    loadRecord,
    setGeneralInfoReq,
    setOphthalmicInfoReq,
    setSupportsReq,
    resetGlassReq } = glassSlice.actions


export default glassSlice.reducer