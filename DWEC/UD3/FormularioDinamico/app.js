window.document.addEventListener("DOMContentLoaded", () => {
    const $contenedor = document.getElementById('contenedor');
    $form.formulario($contenedor);

    $contenedor.addEventListener("click", (e) => {
        const fila = e.target.closest(".fila");
        if (fila) {
            document.querySelectorAll(".fila.click").forEach(f => {
                f.classList.remove("click");
            });

            fila.classList.add("click");
        }

        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;

        switch (action) {
            case "seleccionar": {
                const filaSeleccionada = document.querySelector('#tabla-izquierda .fila.click');
                if (!filaSeleccionada) return;
                const alumnoId = filaSeleccionada.dataset.id;
                console.log(filaSeleccionada);
                $form.seleccionarAlumno(alumnoId);
                break;
            }
            case "deseleccionar": {
                const filaSeleccionada = document.querySelector('#tabla-derecha .fila.click');
                if (!filaSeleccionada) return;
                const alumnoId = filaSeleccionada.dataset.id;
                $form.deselecionarAlumno(alumnoId);
                break;
            }

            case "enviar": {
                const resultado = document.querySelector(".resultado");
                $form.enviarJSON(resultado);
            }
            default:
                break;
        }

    });
});

const $form = (() => {
    const alumnos = [
        { alumnoId: 1, nombre: "Ana López", ciclo: "DAW" },
        { alumnoId: 2, nombre: "Laura Sánchez", ciclo: "ASIR" },
        { alumnoId: 3, nombre: "Carlos Martínez", ciclo: "DAM" },
        { alumnoId: 4, nombre: "Juan Pérez", ciclo: "ASIR" },
        { alumnoId: 5, nombre: "Mario Gómez", ciclo: "DAW" },
        { alumnoId: 6, nombre: "Lucía Torres", ciclo: "DAM" },
        { alumnoId: 7, nombre: "Sofía Núñez", ciclo: "ASIR" },
        { alumnoId: 8, nombre: "Clara Sánchez", ciclo: "DAW" },
        { alumnoId: 9, nombre: "Manuel Díaz", ciclo: "DAM" },
        { alumnoId: 10, nombre: "Pedro Torres", ciclo: "DAW" },
        { alumnoId: 11, nombre: "Elena Ruiz", ciclo: "DAM" },
        { alumnoId: 12, nombre: "Álvaro Morales", ciclo: "ASIR" }
    ];
    const alumnosSeleccionados = [];

    function formulario(contenedor) {
        const formulario = document.createElement('form');

        const filtroDiv = document.createElement('div');
        filtroDiv.innerHTML = `
            <label for="cicloSelect">Ciclo:</label>
            <select id="cicloSelect" name="ciclo">
                ${["Todos", "DAM", "DAW", "ASIR"]
                .map(c => `<option value="${c}">${c}</option>`)
                .join("")}
            </select>
        `;
        const selectorCiclo = filtroDiv.querySelector('#cicloSelect');


        // --- Contenedores de tablas ---
        const tablasWrapper = document.createElement('div');
        tablasWrapper.classList.add('tablas-wrapper');

        const tablaIzquierda = document.createElement('div');
        tablaIzquierda.id = 'tabla-izquierda';

        const tablaDerecha = document.createElement('div');
        tablaDerecha.id = 'tabla-derecha';

        // --- Botones de traspaso ---
        const botonesTraspaso = document.createElement('div');
        botonesTraspaso.classList.add('botones-traspaso');

        botonesTraspaso.innerHTML = `
            <button type="button" class="boton-traspaso" data-action="seleccionar">-></button>
            <button type="button" class="boton-traspaso" data-action="deseleccionar"><-</button>
        `;

        // --- Submit ---
        const enviar = document.createElement('div');
        enviar.classList.add('boton-enviar');
        enviar.innerHTML = `
            <button type="button" data-action="enviar">Enviar</button>
        `;

        // --- Resultado ---
        const resultado = document.createElement('div');
        resultado.classList.add('resultado');

        // Pintado
        tablaIzquierda.innerHTML = listaAlumnos(alumnos, null);
        tablaDerecha.innerHTML = listaAlumnosSeleccionados(alumnosSeleccionados);

        tablasWrapper.appendChild(tablaIzquierda);
        tablasWrapper.appendChild(botonesTraspaso);
        tablasWrapper.appendChild(tablaDerecha);

        // Cambio de filtro
        selectorCiclo.addEventListener('change', () => {
            const valor = selectorCiclo.value;
            const filtro = (valor === "Todos") ? null : valor;
            tablaIzquierda.innerHTML = listaAlumnos(alumnos, filtro);
        });

        formulario.appendChild(filtroDiv);
        formulario.appendChild(tablasWrapper);
        formulario.appendChild(enviar);
        formulario.appendChild(resultado);

        contenedor.appendChild(formulario);
    }

    function listaAlumnos(lista, filtro) {
        const header = ['Nombre', 'Ciclo'];
        let datos = lista;

        if (filtro) {
            datos = datos.filter(a => a.ciclo === filtro);
        }

        return `
        <div class="tabla">
            <div class="header">
                ${header.map(h => `
                    <div class="header-child">${h}</div>
                `).join('')}
            </div>

            <div class="filas">
                ${datos.map(a => `
                    <div class="fila" data-id="${a.alumnoId}">
                        <input class="fila-child" type="hidden" value="${a.alumnoId}" disabled>
                        <input class="fila-child" type="text" value="${a.nombre}" disabled>
                        <input class="fila-child" type="text" value="${a.ciclo}" disabled>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    }

    function listaAlumnosSeleccionados(lista) {
        const header = ['Nombre', 'Ciclo', 'Acciones'];

        return `
        <div class="tabla">
            <div class="header">
                ${header.map(h => `
                    <div class="header-child">${h}</div>
                `).join('')}
            </div>

            <div class="filas">
                ${lista.map(a => `
                    <div class="fila" data-id="${a.alumnoId}">
                        <input class="fila-child" type="hidden" value="${a.alumnoId}">
                        <input class="fila-child" value="${a.nombre}" disabled>
                        <input class="fila-child" value="${a.ciclo}" disabled>

                        <div class="fila-child">
                            <button type="button">+</button>
                            <button type="button">-</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    }

    function seleccionarAlumno(alumnoId) {
        if (!alumnoId) return;

        const alumnoPos = alumnos.findIndex(a => a.alumnoId === Number(alumnoId));

        if (alumnoPos >= 0) {
            const [alumnoEliminado] = alumnos.splice(alumnoPos, 1);
            alumnosSeleccionados.push(alumnoEliminado);
        }

        actualizarTablas();
    }

    function deselecionarAlumno(alumnoId) {
        if (!alumnoId) return;

        const alumnoPos = alumnosSeleccionados.findIndex(a => a.alumnoId === Number(alumnoId));

        if (alumnoPos >= 0) {
            const [alumnoEliminado] = alumnosSeleccionados.splice(alumnoPos, 1);
            alumnos.push(alumnoEliminado);
        }

        actualizarTablas();
    }

    function enviarJSON(resultado) {
        if (!resultado) return;

        const filas = document.querySelectorAll('#tabla-derecha .fila');

        const ids = [];
        const nombres = [];
        const orden = [];

        filas.forEach((fila, index) => {
            const id = Number(fila.dataset.id);
            const nombre = fila.querySelector('.fila-child:nth-child(2)').value;

            ids.push(id);
            nombres.push(nombre);
            orden.push(index + 1);
        });

        const jsonFinal = {
            alumnoId: ids,
            nombres: nombres,
            orden: orden
        };

        resultado.textContent = JSON.stringify(jsonFinal, null, 4);
    }

    function actualizarTablas() {
        const tablaIzquierda = document.getElementById('tabla-izquierda');
        const tablaDerecha = document.getElementById('tabla-derecha');

        // Mantener el filtro actual, si existe
        const selectorCiclo = document.getElementById('cicloSelect');
        let filtro = null;
        if (selectorCiclo && selectorCiclo.value !== "Todos") {
            filtro = selectorCiclo.value;
        }

        tablaIzquierda.innerHTML = listaAlumnos(alumnos, filtro);
        tablaDerecha.innerHTML = listaAlumnosSeleccionados(alumnosSeleccionados);
    }

    return {
        formulario,
        seleccionarAlumno,
        deselecionarAlumno,
        enviarJSON
    }
})();



