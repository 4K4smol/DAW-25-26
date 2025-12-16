export async function request(url, options = {}) {
    try {
        const res = await fetch(url, options)

        if (!res.ok) { throw new Error(`Error HTTP: ${res.status}`) }

        return await res.json();

    } catch (e) {
        console.error(e);
    }
}

export const get = (url) => request(url);

export const post = (url, data) => request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
});