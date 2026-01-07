// src/services/api.js
import { http } from "../utils/http.js";

// Cambia aquí tu base URL (JSONPlaceholder o tu API real)
export const BASE_URL = "https://jsonplaceholder.typicode.com";

function createResource(baseUrl) {
    return {
        list: (params = {}) => http.get(baseUrl, params),
        get: (id) => http.get(`${baseUrl}/${id}`),
        create: (dto) => http.post(baseUrl, dto),
        update: (id, dto) => http.put(`${baseUrl}/${id}`, dto),
        patch: (id, dto) => http.patch(`${baseUrl}/${id}`, dto),
        remove: (id) => http.del(`${baseUrl}/${id}`),
    };
}

export const api = {
    users: createResource(`${BASE_URL}/users`),
    posts: createResource(`${BASE_URL}/posts`),
    todos: createResource(`${BASE_URL}/todos`),
    comments: createResource(`${BASE_URL}/comments`),
    albums: createResource(`${BASE_URL}/albums`),
    photos: createResource(`${BASE_URL}/photos`),
};

export default api;
