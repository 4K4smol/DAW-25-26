export class gestorTareas {
    #tareas = [];
    #siguienteTareaId = 1;

    constructor(tareas = []) {
        this.#tareas = [...tareas];

        if (this.#tareas.length > 0) {
            const maxIdTarea = Math.max(
                ...this.#tareas.map(t => t.tareaId ?? 0)
            );
            this.#siguienteTareaId = maxIdTarea + 1;
        }
    }

    #generarTareaId() {
        return this.#siguienteTareaId++;
    }

    iniciarGestor() {
        const $base = document.getElementById('contenedor');
        $base.innerHTML = "<h1>Gestor Tareas</h1>";

        const $resultado = document.createElement('div');
        $resultado.setAttribute('class', 'resultado');
        $resultado.setAttribute('id', 'resultado');

        $base.appendChild($resultado);
        $resultado.appendChild(this.listadoTareas());
    }

    /**
     *
     * @param {*} data
     * @returns
     */
    guardarTarea(data) {
        const tarea = { ...data };

        tarea.tareaId = (tarea.tareaId === "" || tarea.tareaId == null)
            ? null
            : Number(tarea.tareaId);

        // EDITAR
        if (tarea.tareaId != null) {

            const index = this.#tareas.findIndex(
                t => t.tareaId === tarea.tareaId
            );
            if (index === -1) return false;

            // SOBREESCRIBIR LOS DATOS RECIBIDOS
            this.#tareas[index] = {
                ...this.#tareas[index],
                ...tarea
            };

            return true;
        }

        // CREAR
        tarea.tareaId = this.#generarTareaId();
        this.#tareas.push(tarea);

        return true;
    }

    /**
     *
     * @param {*} tareaId
     * @returns
     */
    eliminarTarea(tareaId) {
        const idx = this.#tareas.findIndex(t => t.tareaId == tareaId);

        if (idx == -1) {
            return false;
        }

        this.#tareas.splice(idx, 1);
        return true;
    }

    listadoTareas() {
        const $tabla = document.createElement('div');
        $tabla.setAttribute('class', 'tabla');
        $tabla.setAttribute('id', 'tabla');

        $tabla.innerHTML = `
            <div class="tabla" id="tabla">
                <div class="tabla-header" id="tabla-header">
                    <div class="header-child" id="header-child">Título</div>
                    <div class="header-child" id="header-child">Duración</div>
                    <div class="header-child" id="header-child">Completado</div>
                    <div class="header-child" id="header-child">
                        <button type="button" data-action="crear-tarea">Crear</button>
                    </div>
                </div>

                <div class="tabla-body" id="tabla-body">
                    ${this.#tareas.map(t => `
                        <div class="body-child" data-id="${t.tareaId}">
                            <div class="body-prop">${t.titulo}</div>
                            <div class="body-prop">${t.duracion}</div>
                            <div class="body-prop">${t.completado ? 'Sí' : 'No'}</div>
                            <div class="body-prop">
                                <button type="button" data-action="ver-tarea">Ver</button>
                                <button type="button" data-action="borrar-tarea">Borrar</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return $tabla;
    }

    formularioTarea(tareaId = null) {
        const $formulario = document.createElement("div");
        $formulario.setAttribute("class", "formulario");
        $formulario.setAttribute("id", "formulario");

        const tarea = (tareaId === null)
            ? null
            : this.#tareas.find(t => t.tareaId == tareaId);

        $formulario.innerHTML = `
            <div class="formulario-tarea" id="formulario-tarea">
                <input id="tarea-id" type="hidden" value="${tarea?.tareaId ?? ''}">

                <label for="tarea-titulo">Título</label>
                <input id="tarea-titulo" type="text" value="${tarea?.titulo ?? ''}"><br><br>

                <label for="tarea-duracion">Duración</label>
                <input id="tarea-duracion" type="text" value="${tarea?.duracion ?? ''}"><br><br>

                <label for="tarea-completado">Completado</label>
                <input id="tarea-completado" type="checkbox" ${tarea?.completado ? "checked" : ""}><br><br>

                <button type="button" data-action="guardar-tarea">Guardar</button>
                <button type="button" data-action="listado-tarea">Volver</button>
            </div>
        `;

        return $formulario;
    }

}