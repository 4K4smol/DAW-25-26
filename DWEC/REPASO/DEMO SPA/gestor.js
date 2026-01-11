import { gestorTareas } from './model/gestorTareas.js';
import { tareas } from './datos.js';

// Variables “globales” (del módulo)
const tareasColeccion = tareas;
const gestor = new gestorTareas(tareasColeccion);

window.addEventListener("load", () => {
    gestor.iniciarGestor();
    asignarManejadores();
});

function asignarManejadores() {
    const $contenedor = document.getElementById("contenedor");
    $contenedor.addEventListener("click", (e) => {
        manejarClick(e);
    });
}

function manejarClick(e) {
    const btn = e.target.closest("button[data-action]");
    const $resultado = document.getElementById('resultado');

    if (!btn) return;
    const fila = btn?.closest('.body-child');
    const tareaId = fila?.dataset.id;
    const accion = btn.dataset.action;

    switch (accion) {
        case 'crear-tarea':
            $resultado.innerHTML = '';
            $resultado.appendChild(gestor.formularioTarea());
            break;

        case 'ver-tarea':
            $resultado.innerHTML = '';
            $resultado.appendChild(gestor.formularioTarea(tareaId));
            break;

        case 'borrar-tarea':
            if (gestor.eliminarTarea(tareaId) && tareaId !== null) {
                gestor.iniciarGestor();
                return;
            }
            console.log('error al borrar');
            break;

        case 'listado-tarea':
            gestor.iniciarGestor();
            break;

        case "guardar-tarea": {
            const $tareaId = document.getElementById("tarea-id");
            const $tareaTitulo = document.getElementById("tarea-titulo");
            const $tareaDuracion = document.getElementById("tarea-duracion");
            const $tareaCompletado = document.getElementById("tarea-completado");

            const tarea = {
                tareaId: $tareaId.value.trim(),
                titulo: $tareaTitulo.value.trim(),
                duracion: $tareaDuracion.value.trim(),
                completado: $tareaCompletado.checked,
            };

            gestor.guardarTarea(tarea);
            gestor.iniciarGestor();
            break;
        }

        default:
            break;
    }
}