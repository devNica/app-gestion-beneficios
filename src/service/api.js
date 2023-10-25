import axiosInstance from "./http.js"

export const fetchRequestGlasses = async () => {
    const response = await axiosInstance.get('/telcor/beneficios/glasses')
    
    if ([404, 500].some(codes => codes === response.status)) {
        throw new Error(response.data)
    }
    
    return response.data
}