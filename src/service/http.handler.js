import http from "./http.js"

export const httpHandler = async ({
                                      prefix = `${import.meta.env.VITE_API_PREFIX}`,
                                      url,
                                      method = http.get,
                                      body = null,
                                      headers = null,
                                      httpConfig = null,
                                      schema = null
                                  }) => {
    try {

        const config = {
            headers: {
                'Accep-Language': 'es',
                'Content-Type': 'application/json',
                withCredentials: true,
                ...headers
            },
            ...httpConfig
        }

        const response = body
            ? await method(`${prefix}${url}`, body, config)
            : await method(`${prefix}${url}`, config)
        
        return response.data

    } catch(error) {
        console.log('handlerError', error)
    }
}

