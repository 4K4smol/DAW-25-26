"use strict";

import { Propietario } from "../modelos/Propietario.js";
import { Reparacion } from "../modelos/Reparacion.js";
import { Vehiculo } from "../modelos/Vehiculo.js";
import { Trabajo } from "../modelos/Trabajo.js";

export class BD {
    #vehiculos = [];
    #reparaciones = [];
    #siguienteVehiculoId = 1;
    #siguienteReparacionId = 1;

    constructor(vehiculos = [], reparaciones = []) {
        this.#vehiculos = [...vehiculos];
        this.#reparaciones = [...reparaciones];

        if (this.#vehiculos.length > 0) {
            const maxIdVehiculo = Math.max(
                ...this.#vehiculos.map(v => v.vehiculoId ?? 0)
            );
            this.#siguienteVehiculoId = maxIdVehiculo + 1;
        }

        if (this.#reparaciones.length > 0) {
            const maxIdReparacion = Math.max(
                ...this.#reparaciones.map(r => r.reparacionId ?? 0)
            );
            this.#siguienteReparacionId = maxIdReparacion + 1;
        }
    }

    #generarVehiculoId() {
        return this.#siguienteVehiculoId++;
    }

    #generarReparacionId() {
        return this.#siguienteReparacionId++;
    }

    obtenerVehiculos() {
        return [...this.#vehiculos];
    }

    crearVehiculo(vehiculo) {
        vehiculo.vehiculoId = this.#generarVehiculoId();
        this.#vehiculos.push(vehiculo);
        return vehiculo;
    }

    borrarVehiculo(vehiculoId) {
        const index = this.#vehiculos.findIndex(v => v.vehiculoId == vehiculoId);
        if (index === -1) return false;
        this.#vehiculos.splice(index, 1);

        this.#reparaciones = this.#reparaciones.filter(
            r => r.vehiculoId != vehiculoId
        );
        return true;
    }

    obtenerReparaciones(filtro = null, valor = null) {
        if (!filtro || valor == null) {
            return [...this.#reparaciones];
        }

        return this.#reparaciones.filter(r => r[filtro] == valor);
    }


    obtenerReparacion(reparacionId) {
        return this.#reparaciones.find(r => r.reparacionId == reparacionId) ?? null;
    }

    crearReparacion(vehiculoId, reparacion) {
        reparacion.reparacionId = this.#generarReparacionId();
        reparacion.vehiculoId = vehiculoId;
        this.#reparaciones.push(reparacion);
        return reparacion;
    }

    borrarReparacion(reparacionId) {
        const index = this.#reparaciones.findIndex(
            r => r.reparacionId == reparacionId
        );
        if (index === -1) return false;
        this.#reparaciones.splice(index, 1);
        return true;
    }
}
