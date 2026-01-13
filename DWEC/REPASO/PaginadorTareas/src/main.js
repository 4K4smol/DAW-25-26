import { request } from "./utils/http.js";

const $API_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * API TAREAS
 */
const $negocioTareas = (() => {
    async function obtenerTareas() {
        return await request($API_URL);
    }

    async function obtenerTarea(id) {
        return await request(`${$API_URL}/${id}`);
    }

    async function crearTarea(data) {
        return await request(`${$API_URL}`, {
            method: "POST",
            body: data
        });
    }

    async function editarTarea(id, data) {
        return await request(`${$API_URL}/${id}`, {
            method: "PUT",
            body: data
        });
    }

    return {
        obtenerTareas,
        obtenerTarea,
        crearTarea,
        editarTarea
    }
})();

/**
 * CARGA UI TAREAS
 */
const $logicaUiTarea = (() => {
    let resultado = document.querySelector('.resultado');

    function limpiar() {
        resultado.innerHTML = '';
    }

    function renderTabla(tareas) {
        const resultado = document.querySelector('.resultado');
        const header = ['todo', 'completed'];

        const tabla = document.createElement('div');
        tabla.classList.add('tabla');

        const headerTabla = document.createElement('div');
        headerTabla.classList.add('header-tabla');

        header.forEach(h => {
            const headerCampo = document.createElement('div');
            headerCampo.classList.add('campo-header-tabla');
            headerCampo.textContent = h.toUpperCase();

            headerTabla.appendChild(headerCampo);
        });

        const bodyTabla = document.createElement('div');
        bodyTabla.classList.add('body-tabla');

        tareas.forEach(t => {
            const rowBody = document.createElement('div');
            rowBody.classList.add('row-body-tabla');

            Object.entries(t).forEach(([k, v]) => {
                if (k === 'title' || k === 'completed') {
                    const campoRow = document.createElement('div');
                    campoRow.classList.add('campo-row-body-tabla');
                    campoRow.textContent = v ?? '-';

                    rowBody.appendChild(campoRow);
                }
            })

            bodyTabla.appendChild(rowBody);
        });

        tabla.append(headerTabla, bodyTabla);

        resultado.append(tabla);
    }

    function renderPaginas(paginas = 0, paginaActual = 1) {
        // borra paginación anterior si existe
        const old = resultado.querySelector(".paginacion");
        if (old) old.remove();

        if (!paginas || paginas <= 1) return;

        const pag = document.createElement("div");
        pag.classList.add("paginacion");

        for (let num = 1; num <= paginas; num++) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.classList.add("pagina");
            if (num === paginaActual) btn.classList.add("activa");

            btn.dataset.page = String(num);
            btn.textContent = String(num);

            pag.appendChild(btn);
        }

        resultado.appendChild(pag);
    }


    return {
        limpiar,
        renderTabla,
        renderPaginas
    }
})();


const $logicaEventos = (() => {
    let tareas = [];
    let tareasFiltradas = [];
    let filtroTexto = document.querySelector("#filtro-text");
    let filtroPaginador = document.querySelector("#filtro-paginador");
    let formTarea = document.querySelector("#form-tarea");
    let inputTitle = document.querySelector("#tarea-title");
    let inputCompleted = document.querySelector("#tarea-completed");

    let paginas = 1;
    let paginaActual = 1;

    async function init() {
        try {
            await cargarTareas();

            aplicarFiltro(filtroTexto.value, filtroPaginador.value, paginaActual);
            render();

            bindEvents();
        } catch (err) {
            console.log(err);
        }
    }

    async function cargarTareas() {
        tareas = await $negocioTareas.obtenerTareas();
    }

    function aplicarFiltro(valorTexto = "", valorPaginador = "", pagina = 1) {
        const texto = (valorTexto ?? "").trim().toLowerCase();
        const limite = Number(valorPaginador);

        let lista = [...tareas];

        if (texto) {
            lista = lista.filter(t => (t.title ?? "").toLowerCase().includes(texto));
        }

        if (!Number.isFinite(limite) || limite <= 0) {
            paginaActual = 1;
            tareasFiltradas = lista;
            return;
        }

        paginas = Math.ceil(lista.length / limite);

        const desde = (pagina - 1) * limite;
        const hasta = desde + limite;

        tareasFiltradas = lista.slice(desde, hasta);
    }

    function render() {
        $logicaUiTarea.limpiar();
        $logicaUiTarea.renderTabla(tareasFiltradas);
        $logicaUiTarea.renderPaginas(paginas, paginaActual);
    }

    function bindEvents() {
        filtroTexto.addEventListener("input", () => {
            paginaActual = 1;
            aplicarFiltro(filtroTexto.value, filtroPaginador.value, paginaActual);
            render();
        });

        filtroPaginador.addEventListener("change", () => {
            paginaActual = 1;
            aplicarFiltro(filtroTexto.value, filtroPaginador.value, paginaActual);
            render();
        });

        document.querySelector(".resultado").addEventListener("click", (e) => {
            const btn = e.target.closest(".pagina");
            if (!btn) return;

            const page = Number(btn.dataset.page);
            aplicarFiltro(filtroTexto.value, filtroPaginador.value, page);
            render();
        });

        formTarea.addEventListener("submit", async (e) => {
            e.preventDefault();

            data.entries(d => console.log(d));
            const title = (inputTitle.value ?? "").trim();
            if (!title) return;

            const payload = {
                title,
                completed: inputCompleted.checked,
                userId: 1,
            };

            try {
                const creada = await $negocioTareas.crearTarea(payload);

                tareas.push(creada);

                // reset UI
                inputTitle.value = "";
                inputCompleted.checked = false;

                // volver a página 1 y re-aplicar filtros
                paginaActual = 1;
                aplicarFiltro(filtroTexto.value, filtroPaginador.value, paginaActual);
                render();
            } catch (err) {
                console.log(err);
            }
        });

    }

    return { init };
})();


window.addEventListener('load', () => {
    $logicaEventos.init();
});