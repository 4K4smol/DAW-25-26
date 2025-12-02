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

        // Truncar
        const MAX_CURSO = 15;
        const MAX_EMAIL = 15;

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
                            ${headers.map(p => {
                                let valor = a[p.toLowerCase()];

                                // Truncar curso
                                if (valor.length > MAX_CURSO) {
                                    return `<div class="fila-child" data-full="${valor}">
                                        ${valor.slice(0, MAX_CURSO)}...
                                    </div>`;
                                }

                                // Truncar email
                                if (valor.length > MAX_EMAIL) {
                                    return `<div class="fila-child" data-full="${valor}">
                                        ${valor.slice(0, MAX_EMAIL)}...
                                    </div>`;
                                }

                                return `<div class="fila-child">${valor}</div>`;
                            }).join("")}
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
        let resultado = null; // bloque

        const action = btn.dataset.action;
        switch (action) {
            case "vista-detalles":
                limpiarContenido();
                contenedor.appendChild(vistaDetalles(alumnos));

                resultado = contenedor.children[1];

                resultado.addEventListener("click", (e) => {
                    const fila = e.target.closest(".fila");
                    if (!fila) return;

                    const estabaAbierta = fila.classList.contains("click");

                    // Cerrar todas las filas abiertas
                    resultado.querySelectorAll(".fila.click").forEach(f => {
                        f.classList.remove("click");
                        f.classList.remove("hover");
                        f.querySelectorAll(".fila-child").forEach(celda => {
                            const full = celda.dataset.full ?? '';
                            if (full) {
                                celda.textContent = full.slice(0, 15) + '...';
                            }
                        });
                    });

                    // Si la fila no estaba abierta, la abrimos
                    if (!estabaAbierta) {
                        fila.classList.add("click");
                        fila.querySelectorAll(".fila-child").forEach(celda => {
                            const full = celda.dataset.full ?? '';
                            if (full) {
                                celda.textContent = full;
                            }
                        });
                    }
                });

                resultado.addEventListener("mouseover", (e) => {
                    if (resultado.querySelector(".fila.click")) return;

                    const fila = e.target.closest(".fila");
                    if (!fila) return;

                    fila.classList.add('hover');
                    fila.querySelectorAll(".fila-child").forEach(celda => {
                        const full = celda.dataset.full ?? '';
                        if (full) {
                            celda.textContent = full;
                        }
                    });
                });
                resultado.addEventListener("mouseout", (e) => {
                    if (resultado.querySelector(".fila.click")) return;

                    const fila = e.target.closest(".fila");
                    if (!fila) return;

                    fila.classList.remove('hover');
                    fila.querySelectorAll(".fila-child").forEach(celda => {
                        const full = celda.dataset.full ?? '';
                        if (full) {
                            celda.textContent = full.slice(0, 15) + '...';
                        }
                    });
                });
                break;

            case "vista-fichas":
                limpiarContenido();
                contenedor.appendChild(vistaFichas(alumnos));

                resultado = contenedor.children[1];

                resultado.addEventListener("click", (e) => {
                    const tarjeta = e.target.closest(".tarjeta");
                    if (!tarjeta) return;

                    const estabaAbierta = tarjeta.classList.contains("click");

                    // Remove toditos
                    resultado.querySelectorAll(".tarjeta.click").forEach(t => {
                        t.classList.remove("click");
                        t.classList.remove("hover");
                    });

                    if (!estabaAbierta) {
                        tarjeta.classList.add("click");
                        tarjeta.classList.add("hover");
                    }
                });

                resultado.addEventListener("mouseover", (e) => {
                    if (resultado.querySelector(".tarjeta.click")) return;

                    const tarjeta = e.target.closest(".tarjeta");
                    if (!tarjeta) return;

                    tarjeta.classList.add("hover");
                });
                resultado.addEventListener("mouseout", (e) => {
                    if (resultado.querySelector(".tarjeta.click")) return;

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