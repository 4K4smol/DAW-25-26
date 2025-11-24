"use strict"

import { Reparacion } from "./Reparacion.js"

export class Vehiculo {
    constructor(
        vehiculoId = null,
        matricula = null,
        año = null,
        marca = null,
        modelo = null,
        motor = null,
        propietario = null,
        reparaciones = null
    ) {
        this.vehiculoId = vehiculoId,
        this.matricula = matricula,
        this.año = año,
        this.marca = marca,
        this.modelo = modelo,
        this.motor = motor,
        this.propietario = propietario
        this.reparaciones = reparaciones.map(r => new Reparacion(r))
    }
}