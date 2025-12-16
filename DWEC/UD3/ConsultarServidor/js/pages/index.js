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

function cargarInicio() {
    pintarCards();
    cargarDatosCards();
    activarClicks();
}

function pintarCards() {
    const $cards = $("#cards");
    const html = ENTITIES.map(({ key, label }) => `
    <div class="card" data-key="${key}">
        <h3 class="title">${label}</h3>
        <p class="meta">
            Total: <span class="count">…</span>
        </p>
        <p class="error" hidden>Error</p>
    </div>
  `).join("");

    $cards.nodes[0].innerHTML = html;
}

function activarClicks() {
    const cardsContainer = $("#cards").n;

    cardsContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        const key = card.dataset.key;
        const entidad = ENTITIES.find(x => x.key === key);
        if (!entidad) return;

        window.location.href = entidad.page;
    });
}

function cargarDatosCards() {
    return Promise.all(
        ENTITIES.map(entidad => cargarDatosCard(entidad))
    );
}

async function cargarDatosCard({ key, label }) {
    const card = $(`.card[data-key="${key}"]`).nodes;
    const count = card.querySelector(".count");
    const error = card.querySelector(".error");

    try {
        const datos = await get(BASE_URL + key);
        count.textContent = datos.length;
    } catch (err) {
        count.textContent = "—";
        error.hidden = false;
        console.error(`Error cargando ${label}`, err);
    }
}


window.addEventListener("DOMContentLoaded", cargarInicio);
