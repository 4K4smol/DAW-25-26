"use strict"
export class Propietario {
    constructor(
        email = null,
        nombre = null,
        telefono = null
    ) {
        this.email = email,
        this.nombre = nombre,
        this.telefono = telefono
    }
}