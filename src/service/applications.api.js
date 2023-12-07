import axiosInstance from "./http.js"

import { httpHandler } from "./http.handler.js"


export const fetchApplicationsInProcess = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/applications/in-process'
    })
}
export const fetchPropsForGlassesApplications = async () => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/applications/props'
    })
}

export const registerApplication = async (payload) => {
    return await httpHandler({
        instance: axiosInstance,
        endpoint: '/applications',
        body: payload,
        method: 'POST'
    })
}