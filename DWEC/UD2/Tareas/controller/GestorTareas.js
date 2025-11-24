import datos from "../datos.js";

class GestorTareas {
    #tareas;

    constructor() {
        this.#tareas = datos;
    }

    #siguienteTareaId() {
        if (this.#tareas.length === 0) return 1;
        const maxId = Math.max(...this.#tareas.map(t => t.tareaId ?? 0));
        return maxId++;
    }

    generarHTMLListado() {
        let resultado = `
            <div class="tabla">
                <div class="fila cabecera">
                    <div>ID</div>
                    <div>Título</div>
                    <div>Duración</div>
                    <div>Completada</div>
                    <div><button type="button" data-accion="crear">Crear</button></div>
                </div>
        `;

        this.#tareas.forEach(t => {
            resultado += `
                <div class="fila" data-entidadId="${t.tareaId}">
                    <div>${t.tareaId}</div>
                    <div>${t.titulo}</div>
                    <div>${t.duracion}</div>
                    <div>${t.completada ? "Sí" : "No"}</div>
                    <div>
                        <button type="button" data-accion="ver">Ver</button>
                        <button type="button" data-accion="editar">Editar</button>
                        <button type="button" data-accion="borrar">Borrar</button>
                    </div>
                </div>
            `;
        });

        resultado += `</div>`;
        return resultado;
    }

    generarHTMLFormulario(tareaId = 0) {
        let tarea = null;

        if (tareaId) {
            tarea = this.#tareas.find(t => t.tareaId == tareaId) ?? null;
        }

        const titulo = tarea?.titulo ?? "";
        const duracion = tarea?.duracion ?? "";
        const completada = tarea?.completada ?? false;

        return `
            <form id="form-tarea">
                <input type="hidden" name="tareaId" value="${tarea ? tarea.tareaId : 0}">

                <div>
                    <label>
                        Título:
                        <input type="text" name="titulo" value="${titulo}" required>
                    </label>
                </div>

                <div>
                    <label>
                        Duración (minutos):
                        <input type="number" name="duracion" min="1" value="${duracion}" required>
                    </label>
                </div>

                <div>
                    <label>
                        <input type="checkbox" name="completada" ${completada ? "checked" : ""}>
                        Completada
                    </label>
                </div>

                <div>
                    <button type="button" data-accion="guardar">Guardar</button>
                    <button type="button" data-accion="cancelar">Cancelar</button>
                </div>
            </form>
        `;
    }

    borrarTarea(tareaId) {
        const indice = this.#tareas.findIndex(x => x.tareaId == tareaId);
        if (indice !== -1) {
            this.#tareas.splice(indice, 1);
        }
    }

    crearTarea(titulo, duracion, completada) {
        const nueva = {
            tareaId: this.#siguienteTareaId(),
            titulo: titulo,
            duracion: parseInt(duracion, 10),
            completada: !!completada
        };

        this.#tareas.push(nueva);
    }

    editarTarea(tareaId, titulo, duracion, completada) {
        const tarea = this.#tareas.find(t => t.tareaId == tareaId);
        if (!tarea) return;

        tarea.titulo = titulo;
        tarea.duracion = parseInt(duracion, 10);
        tarea.completada = !!completada;
    }
}

/* Codigo auxiliar de interfaz de usuario */

function asignarManejadores() {
    const botones = document.querySelectorAll("[data-accion]");
    botones.forEach(b => {
        b.addEventListener("click", gestionarClick);
    });
}

function gestionarClick(evento) {
    const boton = evento.currentTarget;
    const accion = boton.dataset["accion"];

    let nuevoHTML = "";
    let fila = "";
    let entidadId = 0;

    switch (accion) {
        case "crear":
            nuevoHTML = $gestor.generarHTMLFormulario(); // formulario vacío
            break;

        case "editar":
            fila = boton.closest("[data-entidadId], [data-entidadid]");
            entidadId = parseInt(
                fila.dataset["entidadId"] ?? fila.dataset["entidadid"],
                10
            );

            nuevoHTML = $gestor.generarHTMLFormulario(entidadId);
            break;

        case "ver":
            fila = boton.closest("[data-entidadId], [data-entidadid]");
            entidadId = parseInt(
                fila.dataset["entidadId"] ?? fila.dataset["entidadid"],
                10
            );

            nuevoHTML = $gestor.generarHTMLFormulario(entidadId); // formulario con datos
            break;

        case "borrar": {
            const borrar = confirm("¿Eliminar tarea?");
            if (!borrar) return;

            fila = boton.closest("[data-entidadId], [data-entidadid]");
            entidadId = parseInt(
                fila.dataset["entidadId"] ?? fila.dataset["entidadid"],
                10
            );

            $gestor.borrarTarea(entidadId);
            nuevoHTML = $gestor.generarHTMLListado();
            break;
        }

        case "guardar": {
            const form = document.querySelector("#form-tarea");
            if (!form) return;

            const formData = new FormData(form);
            const tareaId = parseInt(formData.get("tareaId") || "0", 10);
            const titulo = (formData.get("titulo") || "").toString().trim();
            const duracion = formData.get("duracion") || "0";
            const completada = formData.get("completada") === "on";

            if (!titulo) {
                alert("Introduce un título.");
                return;
            }

            if (tareaId === 0) {
                // crear
                $gestor.crearTarea(titulo, duracion, completada);
            } else {
                // editar
                $gestor.editarTarea(tareaId, titulo, duracion, completada);
            }

            nuevoHTML = $gestor.generarHTMLListado();
            break;
        }

        case "cancelar":
            nuevoHTML = $gestor.generarHTMLListado();
            break;

        default:
            console.log("Acción no completada", accion);
            return;
    }

    $contenedor.innerHTML = nuevoHTML;
    asignarManejadores();
}

/* Código de inicialización */
let $contenedor;
let $gestor;

window.addEventListener("load", () => {
    $contenedor = document.querySelector(".contenedor");
    $gestor = new GestorTareas();

    $contenedor.innerHTML = $gestor.generarHTMLListado();
    asignarManejadores();
});
