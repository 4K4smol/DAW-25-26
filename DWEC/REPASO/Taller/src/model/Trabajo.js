'use strict'
export class Trabajo {
    constructor(
        concepto = '',
        precioUnitario = 0,
        cantidad = 1
    ) {
        this.concepto = concepto;
        this.precioUnitario = Number(precioUnitario);
        this.cantidad = Number(cantidad);
        this.totalTrabajo = this.precioUnitario * this.cantidad;
    }
}
