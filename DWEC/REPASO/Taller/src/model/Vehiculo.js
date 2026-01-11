'use strict'
import { Propietario } from "./Propietario.js";

export class Vehiculo {
    constructor(
        vehiculoId = null,
        matricula = '',
        marca = '',
        modelo = '',
        ano = '',
        motor = '',
        propietario = null
    ) {
        this.vehiculoId = Number(vehiculoId),
        this.matricula = String(matricula),
        this.marca = String(marca),
        this.modelo = String(modelo),
        this.ano = Number(ano),
        this.motor = String(motor),
        this.propietario = propietario instanceof Propietario
            ? propietario
            : new Propietario(...propietario)
    }
}