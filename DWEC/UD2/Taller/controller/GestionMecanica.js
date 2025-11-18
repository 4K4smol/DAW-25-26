"use strict"
import { datos } from "../datos-taller.js";
import { BD } from "../modelos/BD.js";

const vehiculos = datos['vehiculos'];
const reparaciones = datos['reparaciones'];
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

                    console.log(texto);

                    if (texto === '') {
                        $resultado.innerHTML = '<p>Introduce un texto para buscar los vehículos.</p>'
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

                case "listar-vehiculos":
                    $resultado.innerHTML = this.#generarHTMLVehiculos(
                        this.#clienteBD.obtenerVehiculos()
                    );
                    break;

                case "ver-vehiculo": {
                    const fila = btn.closest(".fila");
                    const id = fila?.dataset.id;
                    if (id) {
                        $resultado.innerHTML = this.#generarHTMLVehiculo(id);
                    }
                    break;
                }

                case "ver-repeticiones": {
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
                        $resultado.innerHTML = `Error al eliminar el vehículo ID: ${id}`;
                        break;
                    }
                    $resultado.innerHTML = `Éxito al eliminar el vehículo ID: ${id}`;
                    break;
                }

                case "ver-repeticiones": {
                    break;
                }

                case "ver-repeticiones": {
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
        if (!Array.isArray(vehiculos) || vehiculos.length === 0) return `<p>No se han encontrado vehículos.</p>`

        const header = ['Matrícula', 'Marca', 'Modelo', 'Motor', 'Año', 'Propietario', 'Acciones']

        return `
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
                                <button data-action="ver-vehiculo">Ver</button>
                                <button data-action="ver-reparaciones">Ver Reparaciones</button>
                                <button data-action="ver-propietario">Ver Propietario</button>
                                <button data-action="borrar-vehiculo">Borrar</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    #generarHTMLVehiculo(vehiculoId = null) {
        const v = vehiculos.find(v => v.vehiculoId == vehiculoId);
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
                <button data-action="ver-reparaciones">Ver Repaciones</button>
                <button type="button" data-action="listar-vehiculos">Volver al listado de vehículos</button>
            </div>
        `;

        return `
            <form data-entity="vehiculo" data-mode="añadir-vehiculo">
                <fieldset>
                <legend>Añadir Vehiculo</legend>
                    <label>Matrícula</label>
                    <input type="text" name="matricula" required value="">

                    <label>Año</label>
                    <input type="number" placeholder="YYYY" min="1900" max="2050">

                    <label>Marca</label>
                    <input type="text" name="marca" required value="">

                    <label>Modelo</label>
                    <input type="text" name="modelo" required value="">

                    <label>Motor</label>
                    <input type="text" name="motor" required value="">

                    <form data-entity="propietario" data-mode="añadir-propietario">
                        <fieldset>
                        <legend>Propietario</legend>
                            <label>Email</label>
                            <input type="email" name="email" required value="">

                            <label>Nombre</label>
                            <input type="text" name="nombre" required value="">

                            <label>Teléfono</label>
                            <input type="text" name="telefono" required value="">
                        </fieldset>
                    </form>


                    <button type="button">Guardar</button>
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

        if (!p) {
            return `<p>El vehículo con matrícula ${vehiculo.matricula} no tiene propietario asociado.</p>`;
        }

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

    }

    generarHTMLReparaciones(repaciones) {

    }

    generarHTMLReparacion(reparacion = 0, vehiculo = 0) {

    }
}

const app = new GestionMecanica();
app.iniciarApp("#contenedor");