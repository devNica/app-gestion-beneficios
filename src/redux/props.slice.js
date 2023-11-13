import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    paymentTypes: [],

    userAuthorizers: [],

    authorizedAmounts: [],

    supports: [],

    typesBirth: [
        { id: 1, value: 'Parto Normal' },
        { id: 2, value: 'Parto Gemelar' },
        { id: 3, value: 'Parto Multiple +2...' }
    
    ],
    exchangeRate: null
}

const propsSlice = createSlice({
    name: 'props',
    initialState,
    reducers: {
        setProps: (state, action) => {
            return {
                ...state,
                paymentTypes: action.payload.paymentTypes,
                exchangeRate: action.payload.exchangeRate,
                supports: action.payload.supports,
                authorizedAmounts: action.payload.authorizedAmounts,
                userAuthorizers: action.payload.userAuthorizers
            }
        }
    }
})


export const { setProps } = propsSlice.actions
export default propsSlice.reducer