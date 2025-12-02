import { datos } from "./datos.js";


window.document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const contenedor = body.children[0];
    const alumnos = datos;


    /**
     * Añadir cabecera de vistas
     */
    let cabecera = document.createElement('div');
    cabecera.classList.add("contenedor-cabecera");
    cabecera.innerHTML = `
        <h1>Vistas</h1>
        <button type="button" data-action="vista-detalles">Detalles</button>
        <button type="button" data-action="vista-fichas">Ficha</button>
    `;
    contenedor.prepend(cabecera);

    function limpiarContenido() {
        // Mantener solo la cabecera (primer hijo)
        while (contenedor.children.length > 1) {
            contenedor.removeChild(contenedor.lastChild);
        }
    }

    /**
     * Devuelve un elemento div de la tabla de alumnos
     */
    function vistaDetalles(alumnos) {
        const contendorDetallesAlumnos = document.createElement('div');
        contendorDetallesAlumnos.classList.add('contenedor-tabla-alumnos');

        // contenido
        const headers = ['Nombre', 'curso', 'telefono', 'email'];
        const texto = `
            <div class="tabla">
                <div class="header">
                    ${headers.map(h => `<div class="header-child">${h}</div>`).join('')}
                </div>

                <div class="filas">
                    ${alumnos.map(a => `
                        <div class="fila">
                            ${headers.map(p => `
                                <div class="fila-child">${a[p.toLowerCase()]}</div>
                            `).join("")}
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        contendorDetallesAlumnos.innerHTML = texto;


        return contendorDetallesAlumnos;
    }

    function vistaFichas(alumnos) {
        const contenedorTarjetas = document.createElement('div');
        contenedorTarjetas.classList.add("contenedor-fichas-alumnos");

        function tarjeta(alumno) {
            return `
                <div class="tarjeta">
                    <h2>${alumno.nombre}</h2>
                    <p><strong>DNI:</strong> ${alumno.dni}</p>
                    <p><strong>Curso:</strong> ${alumno.curso}</p>

                    <p><strong>Asignaturas:</strong></p>
                    <ul>
                        ${alumno.asignaturas.map(a => `<li>${a}</li>`).join("")}
                    </ul>

                    <p><strong>Teléfono:</strong> ${alumno.telefono}</p>
                    <p><strong>Email:</strong> ${alumno.email}</p>
                </div>
            `;
        }

        contenedorTarjetas.innerHTML = alumnos.map(a => tarjeta(a)).join("");
        return contenedorTarjetas;
    }


    cabecera.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;
        switch (action) {
            case "vista-detalles":
                limpiarContenido();
                contenedor.appendChild(vistaDetalles(alumnos));
                break;

            case "vista-fichas":
                limpiarContenido();
                contenedor.appendChild(vistaFichas(alumnos));

                const resultado = contenedor.children[1];
                resultado.addEventListener("mouseover", (e) => {
                    const tarjeta = e.target.closest(".tarjeta");
                    if (!tarjeta) return;

                    tarjeta.classList.add("hover");
                });

                resultado.addEventListener("mouseout", (e) => {
                    const tarjeta = e.target.closest(".tarjeta");
                    if (!tarjeta) return;

                    tarjeta.classList.remove("hover");
                });

                break;

            default:
                alert('Error');
        }
    });
});