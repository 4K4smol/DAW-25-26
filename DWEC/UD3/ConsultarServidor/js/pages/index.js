import { get } from "../Api/http.js";
import $ from "../Utilities/dom.js";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const ENTITIES = [
    { key: "users", label: "Users", page: "users.html" },
    { key: "todos", label: "Todos", page: "todos.html" },
    { key: "albums", label: "Albums", page: "albums.html" },
    { key: "photos", label: "Photos", page: "photos.html" },
    { key: "posts", label: "Posts", page: "posts.html" },
    { key: "comments", label: "Comments", page: "comments.html" },
];

window.addEventListener("DOMContentLoaded", init);

function init() {
    renderCards();
    setupClicks();
    loadCounts();
}

function renderCards() {
    const container = $("#cards").n;

    container.innerHTML = ENTITIES.map(({ key, label }) => `
        <div class="card" data-key="${key}">
            <h3 class="title">${label}</h3>
            <p class="meta">Total: <span class="count">…</span></p>
            <p class="error" hidden>Error</p>
        </div>
    `).join("");
}

function setupClicks() {
    const container = $("#cards").n;

    container.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        const key = $(card).data("key");
        const entity = ENTITIES.find(x => x.key === key);
        if (!entity) return;

        window.location.href = entity.page; // Redirigir a la paágina de cada Cards
    });
}

function loadCounts() {
    ENTITIES.forEach(loadCount);
}

async function loadCount({ key, label }) {
    const card = $(`.card[data-key="${key}"]`).n;
    if (!card) return;

    const countEl = card.querySelector(".count");
    const errorEl = card.querySelector(".error");

    try {
        const data = await get(BASE_URL + key);
        countEl.textContent = data.length;
    } catch (err) {
        countEl.textContent = "—";
        errorEl.hidden = false;
        console.error(`Error cargando ${label}`, err);
    }
}
