import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_API_PREFIX}`,
    headers: {
        'Content-Type': 'application/json'
    },
    
    validateStatus: async status => {
        if (status === 401) {
            console.log('status: ', status)
        }
        
        return status >= 200 && status < 300
    }
})

axiosInstance.interceptors.request.use(config => {
    config.headers = {
        ...config.headers
    }
    return config
})

axiosInstance.interceptors.response.use(response => {
    return response
})

export default  axiosInstance