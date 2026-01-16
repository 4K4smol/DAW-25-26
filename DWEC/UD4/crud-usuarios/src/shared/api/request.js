const API_URL = `https://jsonplaceholder.typicode.com`;

function buildQuery(params) {
    const qs = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined) return;
        qs.append(key, value);
    });

    const query = qs.toString();
    return query ? `?${query}` : "";
}

export async function request(endpoint, options = {}) {
    const { method = "GET", params = {}, body = null, headers = {} } = options;

    const url = API_URL + endpoint + buildQuery(params);

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    // body solo si no es GET
    if (body !== null && method !== "GET") {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);

        const data = await response.json();

        if (!response.ok) {
            const message = data?.message || `Error HTTP ${response.status}`;
            throw new Error(message);
        }

        return data;
    } catch (error) {
        console.error("API ERROR:", error.message);
        throw error;
    }
}
