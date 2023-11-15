import axiosInstance from "./http.js"

import { httpHandler } from "./http.handler.js"


export const loginUserDM = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/auth/signin',
        method: 'POST',
        body: payload
    })
}

export const fetchGlassesPropsFromAPI = async () => {
    const response = await axiosInstance.get('/props/glasses')
    
    if ([404, 500].some(codes => codes === response.status)) {
        throw new Error(response.data)
    }
    
    return response.data
}

export const fetchAdminPropsFromAPI = async () => {
    const response = await axiosInstance('/props/admin')

    if ([404, 500].some(codes => codes === response.status)) {
        console.log('error detectado: ')
        throw new Error(response.data)
    }

    return response.data
}

export const fetchGlassesApplicants = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/glasses/applicants'
    })
}

export const createNewGlassesRequest = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/glasses',
        body: payload,
        method: 'POST'
    })
}


export const fetchShortHistoryGlassesReq = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/glasses'
    })
}


export const fetchGlassesRequestDetail = async (orderId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/${orderId}`
    })
}


export const fetchAuthorizedAmountsForMaternity = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity/authorized-amount`
    })
}

export const fetchMaternityApplicants = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity/applicants`
    })
}


export const updateGlassesRequestFromAPI = async (orderId, payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/${orderId}`,
        body: payload,
        method: 'PUT'
    })
}

export const registerNewRequestMaternityBenefit = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity`,
        body: payload,
        method: 'POST'
    })
}


export const fetchShortHistoryMaternityReq = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity`
    })
}
