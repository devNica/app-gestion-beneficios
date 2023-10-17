import { createSlice } from "@reduxjs/toolkit"
import clinicMockup from '../data/clinics.json'
import diagnosisMockup from '../data/diagnosis.json'
import glassSpec from '../data/glass-spec.json'

const initialState = {
    requestList: [],

    clinics: clinicMockup,
    lensDetail: glassSpec.details,
    lensMaterial: glassSpec.material,
    lensType: glassSpec.lens,
    diagnosis: diagnosisMockup,

    newUnSavedRequest: false,

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

        setGeneralInfoReq: (state, action) => {
            return {
                ...state,
                newUnSavedRequest: true,
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
                newUnSavedRequest: false,
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
        }
    }
})

export const { setGeneralInfoReq, setOphthalmicInfoReq, setSupportsReq, resetGlassReq } = glassSlice.actions


export default glassSlice.reducer