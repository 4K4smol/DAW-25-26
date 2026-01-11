'use strict'
import { Reparacion } from "./Reparacion.js";
import { Vehiculo } from "./Vehiculo.js";

export class BD {
    #vehiculos = [];
    #reparaciones = [];
    #siguienteVehiculoId = 0;
    #siguienteRepearacionId = 0;

    constructor(vehiculos = [], reparaciones = []) {
        this.#vehiculos = vehiculos.map(v =>
            v instanceof Vehiculo
                ? v
                : new Vehiculo(
                    v.vehiculoId,
                    v.matricula,
                    v.marca,
                    v.modelo,
                    v.año,
                    v.motor,
                    Object.values(v.propietario)
                )
        );
        this.#reparaciones = reparaciones.map(r =>
            r instanceof Reparacion
                ? r
                : new Reparacion(
                    r.reparacionId,
                    r.vehiculoId,
                    r.descripcion,
                    r.fecha,
                    r.kilometros,
                    r.presupuesto,
                    r.aprobada,
                    r.pagado,
                    r.terminado,
                    Object.values(r.trabajos)
                )
        );

        this.#siguienteVehiculoId = this.#vehiculos.length > 0
            ? Math.max(...this.#vehiculos.map(v => v.vehiculoId))
            : 0

        this.#siguienteRepearacionId = this.#reparaciones.length > 0
            ? Math.max(...this.#reparaciones.map(r => r.reparacionId))
            : 0
    }

    #generarVehiculoId() {
        return ++this.#siguienteVehiculoId;
    }

    #generarReparacionId() {
        return ++this.#siguienteRepearacionId;
    }

    /**
    ##################################################
                        VEHÍCULOS
    ##################################################
    */
    obtenerVehiculos() {
        return [...this.#vehiculos];
    }

    obtenerVehiculo(filtro, valor) {
        const camposFiltrado = ['vehiculoId', 'matricula', 'telefono'];
        if (!camposFiltrado.includes(filtro)) return false;

        return this.#vehiculos.filter(v => {
            if (filtro === 'telefono') {
                return v.propietario?.telefono === valor;
            }
            return v[filtro] === valor;
        });
    }

    guardarVehiculo(data) {
        if (data.vehiculoId === null) {
            const vehiculo = new Vehiculo(
                this.#generarVehiculoId(),
                data.matricula,
                data.marca,
                data.modelo,
                data.ano,
                data.motor,
                Object.values(data.propietario)
            );

            this.#vehiculos.push(vehiculo);
            return;
        }

        const idx = this.#vehiculos.findIndex(v => v.vehiculoId === Number(data.vehiculoId));

        this.#vehiculos[idx] = {
            ...this.#vehiculos[idx],
            ...data
        }
    }

    borrarVehiculo(vehiculoId) {
        const idx = this.#vehiculos.findIndex(v => v.vehiculoId === Number(vehiculoId));

        if (idx === -1) {
            return false;
        }

        this.#vehiculos.splice(idx, 1);
        return true;
    }

    /**
    ##################################################
                        REPARACIONES
    ##################################################
    */
    obtenerReparaciones() {
        return [...this.#reparaciones];
    }

    obtenerReparacion(filtro, valor) {
        const camposFiltrado = ['vehiculoId', 'fecha', 'pagado', 'terminado'];
        if (!camposFiltrado.includes(String(filtro))) return false;

        return this.#reparaciones.filter(r => r[filtro] == valor);
    }


    guardarReparacion(data) {
        if (data.reparacionId === null) {
            const reparacion = new Reparacion(
                this.#generarReparacionId(),
                data.vehiculoId,
                data.descripcion,
                data.fecha,
                data.kilometros,
                data.presupuesto,
                data.aprobada,
                data.pagado,
                data.terminado,
                data.trabajos
            )

            this.#reparaciones.push(reparacion);
            return;
        }

        const idx = this.#reparaciones.findIndex(r => r.reparacionId === data.reparacionId);

        if (idx === -1) {
            return;
        }

        this.#reparaciones[idx] = {
            ...this.#reparaciones[idx],
            data
        }
    }

    borrarReparacion(reparacionId) {
        const idx = this.#reparaciones.findIndex(r => r.reparacionId === Number(reparacionId));

        if (idx === -1) {
            return false;
        }

        this.#reparaciones.splice(idx, 1);
        return true;
    }
}