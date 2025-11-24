"use strict"
import { datos } from "../datos-taller.js";
import { BD } from "../modelos/BD.js";

const vehiculos = datos['vehiculos'] ?? null;
const reparaciones = datos['reparaciones'] ?? null;
console.log(vehiculos, reparaciones);

class GestionMecanica {
    #clienteBD;
    #contenedor;

    constructor() {
        this.#clienteBD = new BD(vehiculos, reparaciones);
    }

    iniciarApp(selector) {
        const app = document.querySelector(selector);
        if (!app) {
            alert("No se pudo iniciar la app.");
            return;
        }

        // Iniciar página dinámica
        this.#contenedor = app;
        this.#contenedor.innerHTML = this.#generarHTMLBase();

        // Mostrar contenedores
        const $resultado = this.#contenedor.querySelector("#resultado");
        $resultado.innerHTML = "";

        this.#registrarEventos();
    }

    #registrarEventos() {
        this.#contenedor.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-action]");
            if (!btn) return;

            const action = btn.dataset.action;
            const $resultado = this.#contenedor.querySelector("#resultado");

            switch (action) {
                case "inicio": {
                    $resultado.innerHTML = this.#generarHTMLInicio();
                    break;
                }

                case "buscar": {
                    const texto = document.querySelector('#q').value.trim().toLowerCase();
                    const tipo = document.querySelector('input[name="tipo"]:checked').value;

                    if (texto === '') {
                        $resultado.innerHTML = '<p>Introduce un texto para buscar los vehículos.</p>';
                        break;
                    }

                    if (tipo === 'matricula') {
                        $resultado.innerHTML = this.#generarHTMLVehiculos(
                            this.#clienteBD.obtenerVehiculos().filter(v =>
                                v.matricula.toLowerCase().includes(texto)
                            )
                        );
                        break;
                    }

                    if (tipo === 'telefono') {
                        $resultado.innerHTML = this.#generarHTMLVehiculos(
                            this.#clienteBD.obtenerVehiculos().filter(v =>
                                v.propietario.telefono.toLowerCase().includes(texto)
                            )
                        );
                        break;
                    }
                    break;
                }

                case "listar-vehiculos": {
                    $resultado.innerHTML = this.#generarHTMLVehiculos(
                        this.#clienteBD.obtenerVehiculos()
                    );
                    break;
                }

                case "añadir-vehiculo": {
                    // Formulario de coche con valor nulo para crear
                    $resultado.innerHTML = this.#generarHTMLVehiculo(null);
                    break;
                }

                case "ver-vehiculo": {
                    const fila = btn.closest(".fila");
                    const id = fila?.dataset.id;
                    if (id) {
                        $resultado.innerHTML = this.#generarHTMLVehiculo(id);
                    }
                    break;
                }

                case "ver-propietario": {
                    const fila = btn.closest(".fila");
                    const id = fila?.dataset.id;
                    if (id) {
                        $resultado.innerHTML = this.#generarHTMLPropietario(id);
                    }
                    break;
                }

                case "borrar-vehiculo": {
                    const fila = btn.closest(".fila");
                    const id = fila?.dataset.id;
                    if (!this.#clienteBD.borrarVehiculo(id)) {
                        $resultado.innerHTML = `<br><div>Error al eliminar el vehículo.</div>`;
                        break;
                    }
                    $resultado.innerHTML = `<br><div>Éxito al eliminar el vehículo.</div>`;
                    break;
                }

                case "ver-reparaciones": {
                    const fila = btn.closest(".fila");
                    const vehiculoId = fila?.dataset.id || btn.dataset.vehiculoId;

                    if (vehiculoId) {
                        $resultado.innerHTML = this.#generarHTMLReparacionesVehiculo(vehiculoId);
                    }
                    break;
                }

                case "ver-reparacion": {
                    const reparacionId = btn.dataset.id;
                    if (!reparacionId) break;

                    const reparacion = this.#clienteBD.obtenerReparacion(reparacionId);
                    if (!reparacion) {
                        $resultado.innerHTML = `<p>No se ha encontrado la reparación con ID ${reparacionId}.</p>`;
                        break;
                    }

                    const vehiculo = this.#clienteBD
                        .obtenerVehiculos()
                        .find(v => v.vehiculoId == reparacion.vehiculoId) ?? null;

                    $resultado.innerHTML = this.generarHTMLReparacion(reparacion, vehiculo);
                    break;
                }

                case "guardar-vehiculo": {
                    const form = this.#contenedor.querySelector('form[data-entity="vehiculo"]');
                    if (!form) break;

                    const formData = new FormData(form);

                    // coche
                    const matricula = formData.get("matricula")?.trim();
                    const año = formData.get("año");
                    const marca = formData.get("marca")?.trim();
                    const modelo = formData.get("modelo")?.trim();
                    const motor = formData.get("motor")?.trim();

                    // porpietrario
                    const prop_email = formData.get("prop_email")?.trim();
                    const prop_nombre = formData.get("prop_nombre")?.trim();
                    const prop_telefono = formData.get("prop_telefono")?.trim();

                    if (!matricula || !marca || !modelo || !motor || !prop_nombre) {
                        $resultado.innerHTML = `
                        <p>Rellena todos los campos obligatorios.</p>
                        ${this.#generarHTMLVehiculo(null)}
                    `;
                        break;
                    }

                    const nuevoVehiculo = {
                        vehiculoId: null,
                        matricula,
                        año: año ? Number(año) : null,
                        marca,
                        modelo,
                        motor,
                        propietario: {
                            email: prop_email,
                            nombre: prop_nombre,
                            telefono: prop_telefono
                        }
                    };

                    this.#clienteBD.crearVehiculo(nuevoVehiculo);

                    // volver index
                    $resultado.innerHTML = `
                        <p>Vehículo creado correctamente.</p>
                        ${this.#generarHTMLVehiculos(this.#clienteBD.obtenerVehiculos())}
                    `;
                    break;
                }

                default:
                    console.log("Acción no implementada:", action);
            }
        });
    }


    #generarHTMLBase() {
        return `
            <nav>
                <p><strong>Menú Taller</strong></p>
                <button type="button" data-action="inicio">Incio</button>
                <button type="button" data-action="listar-vehiculos">Listado de vehiculos</button>
                <button type="button" data-action="listar-no-terminadas">No terminadas</button>
                <button type="button" data-action="listar-no-pagadas">No pagadas</button>
                <button type="button" data-action="listar-presupuestos">Listar Presupuestos</button>
            </nav>
            <div id="resultado" class="resultado"></div>
        `;
    }

    #generarHTMLInicio() {
        return `
            <form id="buscador">
                <fieldset>
                    <legend>Buscador</legend>

                    <label for="q">Texto:</label><br>
                    <input type="text" id="q" name="q" required><br><br>

                    <fieldset>
                        <legend>Filtrar por:</legend>
                        <input type="radio" id="f-matricula" name="tipo" value="matricula" checked>
                        <label for="f-matricula">Matrícula</label>

                        <input type="radio" id="f-telefono" name="tipo" value="telefono">
                        <label for="f-telefono">Teléfono</label>
                    </fieldset><br>

                    <button type="button" data-action="buscar">Buscar</button>
                </fieldset>
            </form>
        `;
    }

    #generarHTMLVehiculos(vehiculos) {
        if (!Array.isArray(vehiculos) || vehiculos.length === 0) {
            return `<p>No se han encontrado vehículos.</p>`;
        }

        const header = [
            'Matrícula',
            'Marca',
            'Modelo',
            'Motor',
            'Año',
            'Propietario',
            'Acciones'
        ];

        return `
            <button type="button" data-action="añadir-vehiculo">Añadir Vehículo</button>
            <div class="tabla" id="tabla">
                <div class="header">
                    ${header.map(h => `<div class="header-child">${h}</div>`).join('')}
                </div>

                <div class="filas">
                    ${vehiculos.map(v => `
                        <div class="fila" data-id="${v.vehiculoId}">
                            <div class="fila-child">${v.matricula}</div>
                            <div class="fila-child">${v.marca}</div>
                            <div class="fila-child">${v.modelo}</div>
                            <div class="fila-child">${v.motor}</div>
                            <div class="fila-child">${v.año}</div>
                            <div class="fila-child">${v.propietario.nombre}</div>

                            <div class="fila-child">
                                <button type="button" data-action="ver-vehiculo">Ver</button>
                                <button type="button" data-action="ver-reparaciones">Ver Reparaciones</button>
                                <button type="button" data-action="ver-propietario">Ver Propietario</button>
                                <button type="button" data-action="borrar-vehiculo">Borrar</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }


        #generarHTMLVehiculo(vehiculoId = null) {
            const v = this.#clienteBD
                .obtenerVehiculos()
                .find(v => v.vehiculoId == vehiculoId);

            if (v) return `
                <div class="vehiculo">
                    <h1>Vehículo</h1>
                    <div class="propiedad"><strong>Matrícula:</strong> ${v.matricula}</div>
                    <div class="propiedad"><strong>Marca:</strong> ${v.marca}</div>
                    <div class="propiedad"><strong>Modelo:</strong> ${v.modelo}</div>
                    <div class="propiedad"><strong>Motor:</strong> ${v.motor}</div>
                    <div class="propiedad"><strong>Año:</strong> ${v.año}</div>
                    <div class="propiedad"><strong>Nombre:</strong> ${v.propietario.nombre}</div>
                    <br>
                    <button type="button" data-action="ver-reparaciones" data-vehiculo-id="${v.vehiculoId}">Ver Reparaciones</button>
                    <button type="button" data-action="listar-vehiculos">Volver al listado de vehículos</button>
                </div>
            `;

            return `
                <form data-entity="vehiculo" data-mode="añadir-vehiculo">
                    <fieldset>
                        <legend>Añadir Vehículo</legend>

                        <label>Matrícula</label>
                        <input type="text" name="matricula" required>

                        <label>Año</label>
                        <input type="number" name="año" placeholder="YYYY" min="1900" max="2050">

                        <label>Marca</label>
                        <input type="text" name="marca" required>

                        <label>Modelo</label>
                        <input type="text" name="modelo" required>

                        <label>Motor</label>
                        <input type="text" name="motor" required>

                        <fieldset>
                            <legend>Propietario</legend>

                            <label>Email</label>
                            <input type="email" name="prop_email" required>

                            <label>Nombre</label>
                            <input type="text" name="prop_nombre" required>

                            <label>Teléfono</label>
                            <input type="text" name="prop_telefono" required>
                        </fieldset>

                        <button type="button" data-action="guardar-vehiculo">Guardar</button>
                        <button type="button" data-action="listar-vehiculos">Volver al listado de vehículos</button>
                    </fieldset>
                </form>
            `;
    }


    #generarHTMLPropietario(vehiculoId) {
        const vehiculo = this.#clienteBD
            .obtenerVehiculos()
            .find(v => v.vehiculoId == vehiculoId);

        if (!vehiculo) {
            return `<p>No se ha encontrado el vehículo con ID ${vehiculoId}.</p>`;
        }

        const p = vehiculo.propietario;

        return `
            <div class="propietario">
                <h1>Propietario</h1>

                <div class="propiedad"><strong>Nombre:</strong> ${p.nombre ?? ''}</div>
                <div class="propiedad"><strong>Teléfono:</strong> ${p.telefono ?? ''}</div>
                <div class="propiedad"><strong>Email:</strong> ${p.email ?? ''}</div>

                <br>
                <button type="button" data-action="listar-vehiculos">Volver al listado de vehículos</button>
            </div>
        `;
    }


    #generarHTMLReparacionesVehiculo(vehiculoId) {
        const vehiculo = this.#clienteBD
            .obtenerVehiculos()
            .find(v => v.vehiculoId == vehiculoId);

        if (!vehiculo) {
            return `<p>No se ha encontrado el vehículo con ID ${vehiculoId}.</p>`;
        }

        const reparaciones = this.#clienteBD.obtenerReparaciones("vehiculoId", vehiculoId);

        return `
        <div class="reparaciones-vehiculo">
            <h1>Reparaciones del vehículo ${vehiculo.matricula ?? ""}</h1>
            <div class="propiedad"><strong>Marca:</strong> ${vehiculo.marca ?? ""}</div>
            <div class="propiedad"><strong>Modelo:</strong> ${vehiculo.modelo ?? ""}</div>
            <div class="propiedad"><strong>Motor:</strong> ${vehiculo.motor ?? ""}</div>
            <br>
            ${this.generarHTMLReparaciones(reparaciones)}
            <br>
            <button type="button" data-action="listar-vehiculos">
                Volver al listado de vehículos
            </button>
        </div>
    `;
    }


    generarHTMLReparaciones(reparaciones) {
        if (!Array.isArray(reparaciones) || reparaciones.length === 0) {
            return `<p>No hay reparaciones registradas para este vehículo.</p>`;
        }

        const header = [
            "Fecha",
            "Descripción",
            "Kms",
            "Aprobada",
            "Pagado",
            "Terminado",
            "Acciones"
        ];

        return `
            <div class="tabla reparaciones">
                <div class="header">
                    ${header.map(h => `<div class="header-child">${h}</div>`).join("")}
                </div>

                <div class="filas">
                    ${reparaciones.map(r => `
                        <div class="fila" data-id="${r.reparacionId}">
                            <div class="fila-child">${r.fecha ?? ""}</div>
                            <div class="fila-child">${r.descripcion ?? ""}</div>
                            <div class="fila-child">${r.kilometros ?? ""}</div>
                            <div class="fila-child">${r.aprobada ? "Sí" : "No"}</div>
                            <div class="fila-child">${r.pagado ? "Sí" : "No"}</div>
                            <div class="fila-child">${r.terminado ? "Sí" : "No"}</div>
                            <div class="fila-child">
                                <button type="button" data-action="ver-reparacion" data-id="${r.reparacionId}">
                                    Ver reparación
                                </button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    generarHTMLReparacion(reparacion = 0, vehiculo = 0) {
        if (!reparacion) {
            return `<p>No se ha podido cargar la reparación.</p>`;
        }

        const trabajos = Array.isArray(reparacion.trabajos) ? reparacion.trabajos : [];
        let total = 0;

        trabajos.forEach(t => {
            total += t.totalTrabajo || (t.cantidad * t.precioUnitario) || 0;
        });


        return `
            <div class="reparacion-detalle">
                ${vehiculo ? `
                    <h2>Vehículo ${vehiculo.matricula ?? ""}</h2>
                    <div class="propiedad"><strong>Marca:</strong> ${vehiculo.marca ?? ""}</div>
                    <div class="propiedad"><strong>Modelo:</strong> ${vehiculo.modelo ?? ""}</div>
                    <br>
                ` : ""}

                <div class="propiedad"><strong>Fecha:</strong> ${reparacion.fecha ?? ""}</div>
                <div class="propiedad"><strong>Kilómetros:</strong> ${reparacion.kilometros ?? ""}</div>
                <div class="propiedad"><strong>Descripción:</strong> ${reparacion.descripcion ?? ""}</div>
                <div class="propiedad"><strong>Aprobada:</strong> ${reparacion.aprobada ? "Sí" : "No"}</div>
                <div class="propiedad"><strong>Pagado:</strong> ${reparacion.pagado ? "Sí" : "No"}</div>
                <div class="propiedad"><strong>Terminado:</strong> ${reparacion.terminado ? "Sí" : "No"}</div>

                <h2>Trabajos</h2>
                ${trabajos.length === 0
                ? "<p>No hay trabajos asociados a esta reparación.</p>"
                : `
                        <div class="tabla trabajos">
                            <div class="header">
                                <div class="header-child">Cantidad</div>
                                <div class="header-child">Concepto</div>
                                <div class="header-child">Precio unitario</div>
                                <div class="header-child">Total</div>
                            </div>
                            <div class="filas">
                                ${trabajos.map(t => `
                                    <div class="fila">
                                        <div class="fila-child">${t.cantidad ?? ""}</div>
                                        <div class="fila-child">${t.concepto ?? ""}</div>
                                        <div class="fila-child">${t.precioUnitario ?? ""}</div>
                                        <div class="fila-child">
                                            ${t.totalTrabajo ?? ""}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `
            }

                <h3>Total reparación: ${total} €</h3>

                <br>
                <button type="button" data-action="ver-reparaciones" data-vehiculo-id="${reparacion.vehiculoId}">
                    Volver a reparaciones del vehículo
                </button>
                <button type="button" data-action="listar-vehiculos">
                    Volver al listado de vehículos
                </button>
            </div>
        `;
    }

}

const app = new GestionMecanica();
app.iniciarApp("#contenedor");