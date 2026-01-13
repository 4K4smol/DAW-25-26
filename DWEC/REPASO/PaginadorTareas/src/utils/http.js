const DEFAULT_HEADERS = {
    'Content-Type': 'Application/json',
    'Accetp': 'Application/json',
};

/**
 * BuildQuery
 */
function buildQuery(params = {}) {
    const qs = new URLSearchParams();

    Object.entries(params).forEach(([param, v]) => {
        if (v === '' || v === undefined || v === null) return;
        qs.append(param, v);
    });

    const query = qs.toString();
    return query ? `?${query}` : '';
}

export async function request(endpoint, options = {}) {
    const {
        method = "GET",
        params = {},
        body = null,
        headers = {}
    } = options;

    const url = endpoint + buildQuery(params);

    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...DEFAULT_HEADERS,
                ...headers
            },
            body: body ? JSON.stringify(body) : null
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: data?.message
            };
        }

        return data;
    } catch (err) {
        console.log(err)
    }
}