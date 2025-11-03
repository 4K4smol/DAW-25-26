window.addEventListener("load", () => {
    const $btnListar = document.getElementById("btn-listar");
    const $btnListarSuspensos = document.getElementById("btn-listar-suspensos");
    const $btnEstadisticasModulo = document.getElementById("btn-estadisticas-modulo");
    const $btnCargarJSON = document.getElementById("btn-cargar-json");

    const $inputResultados = document.getElementById("resultado");

    function printResultadoHTML(html) {
        $inputResultados.innerHTML = html;
    }

    $btnListar.addEventListener("click", () => {
        const alumnos = JSON.parse($yedra.devolverDatos());

        let html = `
            <div class="tabla">
                <div class="header">
                    <div>Nombre</div>
                    <div>Nota</div>
                    <div>Módulo</div>
                    <div>Convocatoria</div>
                </div>
        `;

        alumnos.forEach(a => {
            html += `
            <div class="row">
                <div>${a.nombre}</div>
                <div>${a.nota}</div>
                <div>${a.modulo}</div>
                <div>${a.convocatorias}</div>
            </div>
            `;
        });

        html += `</div>`;

        printResultadoHTML(html);
    });

    $btnListarSuspensos.addEventListener("click", () => {
        const resultado = JSON.parse($yedra.listaAlumnosSuspensos());
        let html = `
            <div class="tabla">
                <div class="header">
                    <div>Nombre</div>
                    <div>Nota</div>
                    <div>Modulo</div>
                </div>
        `;

        resultado.forEach(a => {
            html += `
                <div class="row">
                    <div>${a.nombre}</div>
                    <div>${a.nota}</div>
                    <div>${a.modulo}</div>
                </div>
            `;
        });

        html += '</div>';
        printResultadoHTML(html);
    });

    $btnEstadisticasModulo.addEventListener("click", () => {
        const resultado = JSON.parse($yedra.estadisticaPorModulo());

        let html = `
            <div class="tabla">
                <div class="header">
                    <div>Modilo</div>
                    <div>Nota media</div>
                    <div>Convocatoria Media</div>
                    <div>Cantidad de alumnos</div>
                </div>
        `;

        resultado.map(m => {
            html += `
                <div class="row">
                    <div>${m.nombre}</div>
                    <div>${m.notaMedia}</div>
                    <div>${m.convocatoriasMedia}</div>
                    <div>${m.cantidadAlumnos}</div>
                </div>
            `;
        });
        html += '</div>';

        printResultadoHTML(html);
    });

    $btnCargarJSON.addEventListener("click", () => {
// [{"nombre": "Ana", "nota": 8.1, "modulo": "DWES", "convocatorias": 2 },{"nombre": "Luis", "nota": 4.95, "modulo": "DWEC", "convocatorias": 1}]

        const cadena = String(prompt("Inserte un nuevo array JSON:"));
        const ok = $yedra.cargarJSON(cadena.trim());

        // Devuelve
        html = `<p>Se ha cargado correctamente la siguiente cadena:<br>${ok}</p>`
        printResultadoHTML(html);
    });

});
