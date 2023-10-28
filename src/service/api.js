import axiosInstance from "./http.js"

export const fetchGlassesPropsFromAPI = async () => {
    const response = await axiosInstance.get('/telcor/beneficios/v1/props/glasses')
    
    if ([404, 500].some(codes => codes === response.status)) {
        console.log('error detectado: ')
        throw new Error(response.data)
    }
    
    return response.data
}