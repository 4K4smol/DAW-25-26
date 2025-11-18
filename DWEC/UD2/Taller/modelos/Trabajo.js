"use strict"
export class Trabajo {
    constructor(
        cantidad = null,
        concepto = null,
        precioUnitario = null,
        totalTrabajo = null
    ) {
        this.cantidad = cantidad,
        this.concepto = concepto,
        this.precioUnitario = precioUnitario,
        this.totalTrabajo = totalTrabajo
    }
}