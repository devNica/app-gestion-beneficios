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

export const fetchAdminPropsFromAPI = async () => {
    const response = await axiosInstance('/props/admin')

    if ([404, 500].some(codes => codes === response.status)) {
        console.log('error detectado: ')
        throw new Error(response.data)
    }

    return response.data
}

export const fetchRelativesApplicant = async (employeeId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/relatives/${employeeId}`
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


export const fetchPropsForMaternityFromAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity/props`
    })
}

export const fetchMaternityApplicants = async (mode) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity/applicants/${mode}`
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


export const fetchMaternityRequestDetail = async (orderId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity/detail/${orderId}`
    })
}

export const updateMaternityRequestDetail = async (orderId, payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/maternity/${orderId}`,
        body: payload,
        method: 'PUT'
    })
}
