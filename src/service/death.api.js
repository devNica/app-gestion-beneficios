import axiosInstance from "./http.js"

import { httpHandler } from "./http.handler.js"

export const fetchShortDeathHistoryFromAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/death/'
    })
}

export const fetchDetailDeathBenefitApplicationFromAPI = async (orderId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/death/detail/${orderId}`
    })
}

export const fetchDeathBenefitApplicantsFromAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/death/applicants'
    })
}

export const fetchDeathBenefitPropsFromAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/death/props'
    })
}

export const registerDeathBenefitApplicationFromAPI = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/death',
        method: 'POST',
        body: payload
    })
}

export const fetchParentalInfoFromAPI = async (orderId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/death/parental/${orderId}`,
    })
}


export const updateDeathBenefitApplicationFromAPI = async (payload, orderId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/death/${orderId}`,
        method: 'PUT',
        body: payload
    })
}