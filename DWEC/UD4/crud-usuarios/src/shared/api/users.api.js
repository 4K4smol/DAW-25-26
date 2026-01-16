import { request } from "./request";

export const usersApi = {
    list: (params) => request("/users", { params }),

    get: (id) => request(`/users/${id}`),

    create: (data) => request("/users", { method: "POST", body: data }),

    update: (id, data) =>
        request(`/users/${id}`, { method: "PUT", body: data }),

    remove: (id) => request(`/users/${id}`, { method: "DELETE" }),
};
