import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clinics: [],
    periods: [],
    applicationsPendingForPayment: [],
    payments: [],
    paymentPlanProps: []
}

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setProps(state, actions) {
            return {
                ...state,
                clinics: actions.payload.clinics,
                periods: actions.payload.periods
            }
        },

        loadPaymentPlanProps(state, action) {
            return {
                ...state,
                paymentPlanProps: action.payload
            }
        },

        loadPayments(state, actions) {
            return {
                ...state,
                payments: actions.payload
            }
        },

        loadApplications(state, actions) {
            return {
                ...state,
                applicationsPendingForPayment: actions.payload
            }
        }
    }
})


export const { setProps, loadApplications, loadPayments, loadPaymentPlanProps } = paymentSlice.actions

export default paymentSlice.reducer