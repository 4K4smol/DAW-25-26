"use strict"

export class PersonalizadoError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = this.contructor.name;
    }
};