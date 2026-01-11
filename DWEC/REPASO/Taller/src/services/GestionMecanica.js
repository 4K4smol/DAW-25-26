import datos from "../data/datos.js";
import { BD } from "../model/BD.js";
import { ManejadorEventos } from "../ui/ManejadorEventos.js";

export class GestorMecanica {
    #clienteBD = new BD(datos.vehiculos, datos.reparaciones);
    #contenedor = null;
    #resultado = null;
    #filtroActualVehiculo = null;
    #valorActualVehiculo = null;

    #filtroActualReparacion = null;
    #valorActualReparacion = null;

    /**
    ##################################################
                    FUNCIONES PÚBLICAS
    ##################################################
    */
    iniciarApp(selector) {
        this.#contenedor = document.querySelector(selector);

        if (this.#contenedor === null) {
            alert('No se ha podido iniciar la App');
            return;
        }
        this.#contenedor.innerHTML = '';
        this.#contenedor.innerHTML = this.#generarHTMLBase();
        this.#resultado = document.querySelector('.gestor-resultado');

        const eventos = new ManejadorEventos(this.#contenedor, this);

        eventos.asignarManejadores();
        this.renderInicio();
    }

    renderInicio() {
        this.#resultado.innerHTML = this.#generarHTMLInicio();
    }

    renderVehiculos() {
        this.#resultado.innerHTML = this.#generarHTMLVehiculos(this.#clienteBD.obtenerVehiculos());
    }

    renderVehiculosFiltro(filtro = null, valor = null) {
        this.#filtroActualVehiculo = filtro;
        this.#valorActualVehiculo = valor;

        this.#resultado.innerHTML = this.#generarHTMLVehiculos(
            this.#clienteBD.obtenerVehiculo(
                this.#filtroActualVehiculo,
                this.#valorActualVehiculo
            ));
    }

    renderVehiculoForm(vehiculoId = null) {
        this.#resultado.innerHTML = this.#generarHTMLVehiculo(vehiculoId);
    }

    guardarVehiculo(data) {
        this.#clienteBD.guardarVehiculo(data);
        this.renderVehiculos();
    }

    borrarVehiculo(vehiculoId) {
        this.#clienteBD.borrarVehiculo(vehiculoId);
        this.renderVehiculos();
    }

    renderReparaciones() {
        this.#filtroActualReparacion = null;
        this.#valorActualReparacion = null;

        this.#resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD.obtenerReparaciones()
        );
    }


    renderReparacionesFiltro(filtro = null, valor = null) {
        this.#filtroActualReparacion = filtro;
        this.#valorActualReparacion = valor;

        this.#resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD.obtenerReparacion(filtro, valor)
        );
    }


    borrarReparacion(reparacionId) {
        this.#clienteBD.borrarReparacion(Number(reparacionId));

        if (this.#filtroActualReparacion != null) {
            this.renderReparacionesFiltro(this.#filtroActualReparacion, this.#valorActualReparacion);
        } else {
            this.renderReparaciones();
        }
    }




    /**
    ##################################################
                    FUNCIONES PRIVADAS
    ##################################################
    */
    #generarHTMLBase() {
        return `
            <div class="gestor-base" id="gestor-base">
                <button type="button" data-action="ir-inicio">Inicio</button>
                <button type="button" data-action="ir-listado-vehiculos">Listado Vehiculos</button>
                <button type="button" data-action="ir-listado-no-terminadas">Listado no terminadas</button>
                <button type="button" data-action="ir-listado-no-pagadas">listado no pagadas</button>
                <button type="button" data-action="ir-listado-presupuestos">listado presupuestos</button>
            </div>

            <div class="gestor-resultado" id="gestor-resultado"></div>
        `;
    }

    #generarHTMLInicio() {
        return `
            <div class="gestor-inicio" id="gestor-inicio">
                <form>
                    <fieldset>
                        <legend>Buscador Vehículo</legend>

                        <input type="text" id="q" required>

                        <input type="radio" id="matricula" name="q" value="matricula" checked>
                        <label for="matricula">Matrícula</label>

                        <input type="radio" id="telefono" name="q" value="telefono">
                        <label for="telefono">Teléfono</label>

                        <button type="button" data-action="buscar-vehiculo">Buscar</button>
                    </fieldset>
                </form>
            </div>
        `;
    }

    #generarHTMLVehiculos(vehiculos = this.#clienteBD.obtenerVehiculos()) {
        if (vehiculos.length < 0) {
            return `No se han encontrado vehículos`;
        }

        const header = ['matricula', 'marca', 'modelo', 'año', 'motor'];
        return `
            <div class="gestor-listado-vehiculos" id="gestor-listado-vehiculos">
                <div class="tabla" id="tabla">
                    <div class="tabla-header" id="tabla-header">
                        ${header.map(h =>
            `<div class="tabla-header-child" id="tabla-header-child">${h}</div>`
        ).join('')}
                        <div class="tabla-header-child" id="tabla-header-child">
                            <button type="button" data-action="crear-vehiculo">Crear</button>
                        </div>
                    </div>


                    <div class="tabla-body" id="tabla-body">
                        ${vehiculos.map(v =>
            `<div class="tabla-body-child" id="tabla-body-child" data-id="${v.vehiculoId}">
                                <div class="tabla-body-child-prop">${v.matricula}</div>
                                <div class="tabla-body-child-prop">${v.marca}</div>
                                <div class="tabla-body-child-prop">${v.modelo}</div>
                                <div class="tabla-body-child-prop">${v.ano}</div>
                                <div class="tabla-body-child-prop">${v.motor}</div>
                                <div class="tabla-body-child-prop">
                                    <button type="button" data-action="ver-vehiculo">Ver Vehículo</button>
                                    <button type="button" data-action="ver-reparaciones">Ver Reparaciones</button>
                                    <button type="button" data-action="borrar-vehiculo">Borrar Vehículo</button>
                                </div>
                            </div>`
        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    #generarHTMLVehiculo(vehiculoId = null) {
        if (vehiculoId === null) {
            return `
                <div class="vehiculo-card" id="vehiculo-card">
                    <form id="form-vehiculo">
                        <fieldset>
                            <legend>Vehículo</legend>

                            <label>Matrícula</label>
                            <input name="matricula" required>

                            <label>Marca</label>
                            <input name="marca" required>

                            <label>Modelo</label>
                            <input name="modelo" required>

                            <label>Año</label>
                            <input name="ano" required>

                            <label>Motor</label>
                            <input name="motor" required>

                            <fieldset>
                                <legend>Propietario</legend>

                                <label>Nombre</label>
                                <input name="nombre" required>

                                <label>Email</label>
                                <input name="email" required>

                                <label>Teléfono</label>
                                <input name="telefono" required>
                            </fieldset>
                        </fieldset>

                        <button type="button" data-action="guardar-vehiculo">Guardar</button>
                    </form>
                </div>
            `;
        }

        const arr = this.#clienteBD.obtenerVehiculo('vehiculoId', Number(vehiculoId));
        const v = arr[0];

        return `
            <div class="vehiculo-card" id="vehiculo-card">
                <form id="form-vehiculo">
                    <fieldset>
                        <legend>Vehículo</legend>
                        <input type="hidden" name="vehiculoId" value="${v.vehiculoId}">

                        <label>Matrícula</label>
                        <input name="matricula" value="${v.matricula}"><br><br>

                        <label>Marca</label>
                        <input name="marca" value="${v.marca}"><br><br>

                        <label>Modelo</label>
                        <input name="modelo" value="${v.modelo}"><br><br>

                        <label>Año</label>
                        <input name="ano" value="${v.ano}"><br><br>

                        <label>Motor</label>
                        <input name="motor" value="${v.motor}">

                        <fieldset>
                            <legend>Propietario</legend>

                            <label>Nombre</label>
                            <input name="nombre" value="${v.propietario.nombre}"><br><br>

                            <label>Email</label>
                            <input name="email" value="${v.propietario.email}"><br><br>

                            <label>Teléfono</label>
                            <input name="telefono" value="${v.propietario.telefono}"><br><br>
                        </fieldset>
                    </fieldset>

                    <button type="button" data-action="guardar-vehiculo">Guardar</button>
                    <button type="button" data-action="ver-reparaciones" data-id="${v.vehiculoId}">Ver Reparaciones</button>
                </form>
            </div>
        `;
    }


    #generarHTMLReparaciones(reparaciones = this.#clienteBD.obtenerReparaciones()) {
        if (!reparaciones.length > 0) {
            return `No se han encontrado reparaciones`;
        }

        const header = [
            'descripcion',
            'fecha',
            'kilometros',
            'presupuesto',
            'aprobada',
            'pagado',
            'terminado'
        ];

        return `
            <div class="gestor-listado-reparaciones" id="gestor-listado-reparaciones">
                <div class="tabla" id="tabla">
                    <div class="tabla-header" id="tabla-header">
                        ${header.map(h =>
            `<div class="tabla-header-child" id="tabla-header-child">${h}</div>`
        ).join('')}
                        <div class="tabla-header-child">
                            <button type="button" data-action="crear-reparacion">Crear</button>
                        </div>
                    </div>

                    <div class="tabla-body" id="tabla-body">
                        ${reparaciones.map(r =>
            `<div class="tabla-body-child" id="tabla-body-child" data-id="${r.reparacionId}">
                                <div class="tabla-body-child-prop">${r.descripcion}</div>
                                <div class="tabla-body-child-prop">${r.fecha.toDateString()}</div>
                                <div class="tabla-body-child-prop">${r.kilometros}</div>
                                <div class="tabla-body-child-prop">${r.presupuesto}</div>
                                <div class="tabla-body-child-prop">${r.aprobada ? 'Sí' : 'No'}</div>
                                <div class="tabla-body-child-prop">${r.pagado ? 'Sí' : 'No'}</div>
                                <div class="tabla-body-child-prop">${r.terminado ? 'Sí' : 'No'}</div>
                                <div class="tabla-body-child-prop">
                                    <button type="button" data-action="ver-reparacion">Ver</button>
                                    <button type="button" data-action="borrar-reparacion">Borrar</button>
                                </div>
                            </div>`
        ).join('')}
                    </div>
                </div>
            </div>
        `
    }
}