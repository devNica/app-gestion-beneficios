import axiosInstance from "./http.js"

import { httpHandler } from "./http.handler.js"


export const fetchApplicanstAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/glasses/applicants'
    })
}

export const fetchPropsForGlassesReqAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/glasses/props'
    })
}


export const fetchApplicantRelativesAPI = async (applicantId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/applicants/${applicantId}/relatives`
    })
}


export const registerGlassesRequestAPI = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses`,
        body: payload,
        method: 'POST'
    })
}


export const fetchGlassesRequestAPI = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/glasses/request'
    })
}


export const approvedRequestStatusAPI = async (requestId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/approved/${requestId}`,
        method: 'PATCH'
    })
}

export const confirmedRequestStatusAPI = async (requestId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/confirmed/${requestId}`,
        method: 'PATCH'
    })
}

export const rejectedRequestStatusAPI = async (requestId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/rejected/${requestId}`,
        method: 'PATCH'
    })
}


export const archiveRequestStatusAPI = async (requestId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/archive/${requestId}`,
        method: 'PATCH'
    })
}


export const fetchGlassesRequestDetailAPI = async (requestId) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/${requestId}`
    })
}

export const updGlassesRequestRefAPI = async (requestId, letterRef) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/reference/${requestId}`,
        method: 'PATCH',
        body: letterRef
    })
}


export const updGlassesRequestAPI = async (requestId, payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: `/glasses/request/${requestId}`,
        method: 'PUT',
        body: payload
    })
}