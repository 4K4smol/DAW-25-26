window.document.addEventListener("DOMContentLoaded", () => {
    const $contenedor = document.getElementById('contenedor');
    $form.formulario($contenedor);
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

         // Pintado inicial
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

        contenedor.appendChild(formulario);
    }

    function listaAlumnos(alumnos, filtro) {
        const header = ['Nombre', 'Ciclo'];
        if (filtro) {
            alumnos = alumnos.filter(a => a.ciclo === filtro);
        }

        return `
            <div class="tabla">
                <div class="header">
                    ${header.map(h => `
                        <div class="header-child">${h}</div>
                    `).join('')}
                </div>

                <div class="filas">
                    ${alumnos.map(a => `
                        <div class="fila" data-id="${a.alumnoId}">
                            <div class="fila-child">${a.nombre}</div>
                            <div class="fila-child">${a.ciclo}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function listaAlumnosSeleccionados(alumnos) {
        const header = ['Nombre', 'Ciclo', 'Acciones'];

        return `
            <div class="tabla">
                <div class="header">
                    ${header.map(h => `
                        <div class="header-child">${h}</div>
                    `).join('')}
                </div>

                <div class="filas">
                    ${alumnos.map(a => `
                        <div class="fila" data-id="${a.alumnoId}">
                            <div class="fila-child">${a.nombre}</div>
                            <div class="fila-child">${a.ciclo}</div>
                            <div class="fila-child">${a.ciclo}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }


    return {
        formulario,
    }
})();



