"use strict"
import { datos } from "../datos-taller.js";

const vehiculos = datos['vehiculos'];
const reparaciones = datos['reparaciones'];
console.log(vehiculos, reparaciones);

class GestionMecanica {
    #clienteBD;
    #contenedor;

    iniciarApp(selector) {
        const app = document.querySelector(selector);
        if (!app) alert('No se pudo iniciar la app.');
        app.innerHTML = this.#generarHTMLBase();
        app.innerHTML += this.#generarHTMLInicio();
        app.innerHTML += this.#generarHTMLVehiculos(vehiculos);
    }

    #generarHTMLBase() {
        return `
            <nav>
                <p><strong>Menú Taller</strong></p>
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

    }

    #generarHTMLReparacionesVehiculo(vehiculoId) {

    }

    generarHTMLReparaciones(repaciones) {

    }

    generarHTMLReparacion(reparacion = 0, vehiculo = 0) {

    }
}

const app = new GestionMecanica();
app.iniciarApp('#contenedor');