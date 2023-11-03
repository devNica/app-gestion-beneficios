
export const httpHandler = async ({
    instance,
    headers,
    token = '',
    method = 'GET',
    endpoint,
    body,
    params,
    abort
}) => {
    try {
        const response = await instance.request({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...headers
            },
            method,
            url: endpoint,
            params,
            data: body,
            signal: abort?.signal,
            timeout: 5000
        })
        return response.data
    } catch (error) {
        console.log('handlerError', error)
        throw new Error(error)
    }
}

