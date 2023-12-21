import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clinics: [],
    periods: [],
    applicationsPendingForPayment: [],
    payments: []
}

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setProps (state, actions) {
            return {
                ...state,
                clinics: actions.payload.clinics,
                periods: actions.payload.periods
            }
        },

        loadPayments (state, actions) {
            return {
                ...state,
                payments: actions.payload
            }
        },

        loadApplications (state, actions) {
            return {
                ...state,
                applicationsPendingForPayment: actions.payload
            }
        }
    }
})


export const { setProps, loadApplications, loadPayments } = paymentSlice.actions

export default paymentSlice.reducer