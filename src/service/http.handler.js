
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

        if ([404, 500, 400].some(codes => codes === response.status)) {

            const data = {
                error: true,
                message: response.data.message,
                code: response.status
            }

            return {
                data
            }
        }
        return response.data
}

