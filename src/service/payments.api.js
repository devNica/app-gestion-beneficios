import axiosInstance from "./http.js"

import { httpHandler } from "./http.handler.js"


export const fetchPaymentsPropsAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/payment/props'
    })
}


export const fetchApplicationsPendingForPaymentAPI = async (clinicId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment/pending/${clinicId}`
    })
}


export const fetchPaymentRequestAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment`
    })
}

export const registerPaymentRequestAPI = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment`,
        method: 'POST',
        body: payload
    })
}


export const fetchPaymentPlanPropsAPI = async (requestId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment/${requestId}/props`
    })
}

export const registerPaymentPlanAPI = async (docId, payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment/${docId}/payment-plan`,
        method: 'PUT',
        body: payload
    })
}


export const updatePaymentReferenceAPI = async (docId, payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment/${docId}/reference`,
        method: 'PUT',
        body: payload
    })
}



export const archivePaymentRequestAPI = async (serie) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment/request/archive/${serie}`,
        method: 'PATCH'
    })
}


export const revertPaymentRequestAPI = async (serie) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/payment/${serie}/revert`,
        method: 'DELETE'
    })
}
