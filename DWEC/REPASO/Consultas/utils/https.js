const HEADERS_DEFAULT = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

/**
 * Build query
 */
function buildQuery(params = {}) {
    const qs = new URLSearchParams();

    Object.entries(params).forEach(([param, value]) => {
        if (value === '' || value === null || value === undefined) return;
        qs.append(param, value);
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
                ...HEADERS_DEFAULT,
                ...headers
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            throw {
                status: response.status,
                message: response.message
            };
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("ERROR HTTP", error);
        throw error;
    }
}