// src/utils/http.js

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

function buildQuery(params = {}) {
    const qs = new URLSearchParams();

    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null || v === "") continue;
        qs.append(k, String(v));
    }

    const str = qs.toString();
    return str ? `?${str}` : "";
}

async function parseBody(res) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return await res.json().catch(() => null);
    return await res.text().catch(() => null);
}

export async function request(url, options = {}) {
    const opts = {
        ...options,
        headers: {
            ...DEFAULT_HEADERS,
            ...(options.headers || {}),
        },
    };

    const res = await fetch(url, opts);
    const body = await parseBody(res);

    if (!res.ok) {
        const msg =
            (body && typeof body === "object" && body.message) ||
            `Error HTTP: ${res.status} ${res.statusText}`;
        const err = new Error(msg);
        err.status = res.status;
        err.body = body;
        throw err;
    }

    return body;
}

export const http = {
    buildQuery,

    get: (url, params) => request(`${url}${buildQuery(params)}`),

    post: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: "POST",
            body: JSON.stringify(data ?? {}),
        }),

    put: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data ?? {}),
        }),

    patch: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(data ?? {}),
        }),

    del: (url, options = {}) =>
        request(url, {
            ...options,
            method: "DELETE",
        }),
};
