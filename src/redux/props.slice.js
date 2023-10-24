import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    paymentTypes: [
        { id: 1, type: 'Reembolso' },
        { id: 2, type: 'Cheque' },
        { id: 3, type: 'Transferencia'}
    ],
    userAuthorizers: [
        { id: '1', empleado: 'Juana Maria Mendez' },
        { id: '2', empleado: 'Juan Antonio Perez Celedon' }
    ],
    authorizedAmountsMathernity: [
        { id: 1, value: 150 },
        { id: 2, value: 300 },
        { id: 3, value: 600 }
    ],
    amountAuthorizedForDeath: {
        collaborator: [{ id: 1, amount: 600.00 }],
        family: [
            { id: 1, relative: 'padre', amount: 325.00 },
            { id: 2, relative: 'madre', amount: 325.00 },
            { id: 3, relative: 'hijo/a', amount: 600.00 },
            { id: 4, relative: 'abuelo/a', amount: 250.00 },
            { id: 5, relative: 'suegro/a', amount: 250.00 },
            { id: 6, relative: 'sobrino/a', amount: 200.00 },
            { id: 7, relative: 'tio/a', amount: 150.00 },
            { id: 8, relative: 'primo/a', amount: 150.00 },
            { id: 9, relative: 'esposo/a', amount: 500.00 },
        ]
    },
    maternitySupports: [
        { id: 1, value: 'Subsidio Prenatal' },
        { id: 2, value: "Constancia de Nacimiento" },
        { id: 3, value: "Certificado de Nacimiento" }
    ],
    typesBirth: [
        { id: 1, value: 'Parto Normal' },
        { id: 2, value: 'Parto Gemelar' },
        { id: 3, value: 'Parto Multiple +2...' }
    
    ],
    internalExchange: 36.5
}

const propsSlice = createSlice({
    name: 'props',
    initialState,
    reducers: {
        setProps: (state, action) => {
            return {
                ...state,
                paymentTypes: action.payload,
                userAuthorizers: action.payload
            }
        }
    }
})

export default propsSlice.reducer