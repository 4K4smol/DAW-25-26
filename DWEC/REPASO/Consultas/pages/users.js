"use strict";

import { request } from "../utils/https.js";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// =========================
// NEGOCIO
// =========================
const $usersNegocio = (() => {
    async function obtenerUsuarios(filtro = null) {
        const params = {};
        if (filtro && filtro.userId) params.id = filtro.userId;

        return await request(API_URL, { params });
    }

    async function obtenerUsuario(id) {
        return await request(`${API_URL}/${id}`);
    }

    async function actualizarUsuario(id, datos) {
        return await request(`${API_URL}/${id}`, {
            method: "PUT",
            body: datos,
            headers: { "Content-Type": "application/json" },
        });
    }

    return { obtenerUsuarios, obtenerUsuario, actualizarUsuario };
})();

// =========================
// UI
// =========================
const $usersUI = (() => {
    let usuarios = [];
    let usuariosFiltrados = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarUsuarios();
    }

    function cargarPreferencias() {
        const pref = localStorage.getItem("users_itemsPorPagina");
        if (pref) {
            elementosPorPagina = pref === "todos" ? "todos" : parseInt(pref, 10);
            const sel = document.querySelector("#paginador");
            if (sel) sel.value = pref;
        }
    }

    function configurarEventos() {
        const $selectItems = document.querySelector("#paginador"); // select
        const $buscador = document.querySelector("#buscador-user-name"); // input

        if ($selectItems) {
            $selectItems.addEventListener("change", function () {
                const val = this.value;
                elementosPorPagina = val === "todos" ? "todos" : parseInt(val, 10);
                localStorage.setItem("users_itemsPorPagina", val);
                paginaActual = 1;
                mostrarUsuarios();
            });
        }

        if ($buscador) {
            // mejor "input" para filtrar al escribir
            $buscador.addEventListener("input", function () {
                filtrarUsuarios(this.value);
            });
        }
    }

    async function cargarUsuarios() {
        const contenedor = document.querySelector(".lista-usuarios");
        if (!contenedor) return;

        try {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get("userId");

            contenedor.innerHTML = "<p>Cargando usuarios...</p>";

            const filtro = userId ? { userId } : null;

            usuarios = await $usersNegocio.obtenerUsuarios(filtro);
            usuariosFiltrados = [...usuarios];

            mostrarUsuarios();
        } catch (e) {
            mostrarError("Error al cargar usuarios.");
        }
    }

    function filtrarUsuarios(texto) {
        const t = (texto || "").trim().toLowerCase();

        usuariosFiltrados = usuarios.filter((u) =>
            (u.name || "").toLowerCase().includes(t)
        );

        paginaActual = 1;
        mostrarUsuarios();
    }

    function mostrarUsuarios() {
        const contenedor = document.querySelector(".lista-usuarios");
        const pag = document.querySelector(".paginacion-users"); // donde pintas el paginador
        if (!contenedor) return;

        contenedor.innerHTML = "";

        if (usuariosFiltrados.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron usuarios.</p>";
            if (pag) pag.innerHTML = "";
            return;
        }

        const total = usuariosFiltrados.length;

        let inicio = 0;
        let fin = total;

        if (elementosPorPagina !== "todos") {
            inicio = (paginaActual - 1) * elementosPorPagina;
            fin = inicio + elementosPorPagina;
        }

        const pagina = usuariosFiltrados.slice(inicio, fin);

        pagina.forEach((u) => {
            const div = document.createElement("div");
            div.className = "item-entidad";
            div.innerHTML = `
        <div class="item-info">
          <h3>${u.name}</h3>
          <p><strong>Email:</strong> ${u.email}</p>
          <p><strong>Ciudad:</strong> ${u?.address?.city ?? "-"}</p>
        </div>
        <div class="item-acciones">
          <button type="button" data-action="detalles" data-id="${u.id}">Ver Detalles</button>
          <button type="button" data-action="todos" data-id="${u.id}">Ver Pendientes</button>
          <button type="button" data-action="albums" data-id="${u.id}">Ver Álbumes</button>
          <button type="button" data-action="posts" data-id="${u.id}">Ver Posts</button>
        </div>
      `;
            contenedor.appendChild(div);
        });

        // Delegación de eventos (mejor que onclick inline)
        contenedor.onclick = (e) => {
            const btn = e.target.closest("button[data-action]");
            if (!btn) return;

            const id = btn.dataset.id;
            const action = btn.dataset.action;

            if (action === "detalles") verDetalles(id);
            if (action === "todos") verTodos(id);
            if (action === "albums") verAlbums(id);
            if (action === "posts") verPosts(id);
        };

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const pag = document.querySelector(".paginacion-users");
        if (!pag) return;

        pag.innerHTML = "";

        if (elementosPorPagina === "todos") return;

        const totalPaginas = Math.ceil(usuariosFiltrados.length / elementosPorPagina);
        if (totalPaginas <= 1) return;

        const btnPrev = document.createElement("button");
        btnPrev.textContent = "Anterior";
        btnPrev.disabled = paginaActual === 1;
        btnPrev.onclick = () => cambiarPagina(paginaActual - 1);

        const info = document.createElement("span");
        info.textContent = ` Página ${paginaActual} de ${totalPaginas} `;

        const btnNext = document.createElement("button");
        btnNext.textContent = "Siguiente";
        btnNext.disabled = paginaActual === totalPaginas;
        btnNext.onclick = () => cambiarPagina(paginaActual + 1);

        pag.append(btnPrev, info, btnNext);
    }

    function cambiarPagina(n) {
        paginaActual = n;
        mostrarUsuarios();
    }

    function verDetalles(id) {
        sessionStorage.setItem("paginaAnterior", window.location.href);
        window.location.href = `userDetalle.html?id=${id}`;
    }

    function verTodos(userId) {
        window.location.href = `../todo/todo.html?userId=${userId}`;
    }

    function verAlbums(userId) {
        window.location.href = `../album/album.html?userId=${userId}`;
    }

    function verPosts(userId) {
        window.location.href = `../post/post.html?userId=${userId}`;
    }

    function mostrarError(msg) {
        const contenedor = document.querySelector(".lista-usuarios");
        if (!contenedor) return;
        contenedor.innerHTML = `<div class="mensaje-error">${msg}</div>`;
    }

    return { init };
})();

window.addEventListener("load", () => {
    $usersUI.init();
});
