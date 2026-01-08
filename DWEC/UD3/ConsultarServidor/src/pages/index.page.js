import $ from "../utils/dom.js";
import { http } from "../utils/http.js";

(() => {
    const BASE = "https://jsonplaceholder.typicode.com";

    const entities = [
        { key: "users", label: "Users", href: "./users.html" },
        { key: "posts", label: "Posts", href: "./posts.html" },
        { key: "todos", label: "Todos", href: "./todos.html" },
        { key: "comments", label: "Comments", href: "./comments.html" },
        { key: "albums", label: "Albums", href: "./albums.html" },
        { key: "photos", label: "Photos", href: "./photos.html" },
    ];

    const $status = $("#status");
    const $cards = $("#cards");

    init();

    async function init() {
        try {
            setStatus("Cargando datos...");

            // Peticiones en paralelo
            const results = await Promise.all(
                entities.map(e => http.get(`${BASE}/${e.key}`))
            );

            const counts = {};
            results.forEach((arr, i) => {
                counts[entities[i].key] = Array.isArray(arr) ? arr.length : 0;
            });

            renderCards(counts);
            setStatus('');
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err?.message || "No se pudo cargar la información."}`);
        }
    }

    function setStatus(msg) {
        if ($status.n) $status.n.textContent = msg || "";
    }

    function renderCards(counts) {
        const html = entities.map(e => {
            const n = counts[e.key] ?? 0;
            return `
                <article class="card">
                <h2>${e.label}</h2>
                <p class="big">${n}</p>
                <a class="btn" href="${e.href}">Gestionar</a>
                </article>
            `;
        }).join("");

        if ($cards.n) $cards.n.innerHTML = html;
    }
})();
