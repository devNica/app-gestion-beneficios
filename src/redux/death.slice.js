import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    history: [],
    relativesList: null,
    requiredSupports: {
        forEmployee: [
            { name: 'minsaDeathCertificate', label: 'Certificado defuncion MINSA', selected: false},
            { name: 'deathRegistration', label: 'Registro defuncion Alcaldia', selected: false},
            { name: 'employeeBirthCertificate', label: 'Partida Nac. del Colaborador', selected: false},
            { name: 'employeeDocId', label: 'Doc Identidad del Colaborador', selected: false}
        ],
        forFamilyMember: [
            { name: 'minsaDeathCertificate', label: 'Certificado defuncion MINSA', selected: false},
            { name: 'deathRegistration', label: 'Registro defuncion Alcaldia', selected: false},
            { name: 'employeeBirthCertificate', label: 'Partida Nac. del Colaborador', selected: false},
            { name: 'familyMemberBirthCertificate', label: 'Partida Nac. del Familiar', selected: false },
            { name: 'employeeDocId', label: 'Doc Identidad del Colaborador', selected: false },
            { name: 'familyMemberDocId', label: 'Doc Identidad del Familiar', selected: false }
        ]
    },
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
    loadHistory,
    resetDeathReq,
    setGeneralInfoReq,
    setRelativeList,
    setAdditionalInfoReq,
    resetAdditionalInfoReq } = deathSlice.actions

export default deathSlice.reducer