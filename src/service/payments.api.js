import axiosInstance from "./http.js"

import { httpHandler } from "./http.handler.js"


export const fetchPaymentsPropsAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/payments/props'
    })
}


export const fetchApplicationsPendingForPaymentAPI = async (clinicId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payments/pendings/${clinicId}`
    })
}


export const fetchPaymentRequestAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payments`
    })
}

export const registerPaymentRequestAPI = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payments`,
        method: 'POST',
        body: payload
    })
}