"use strict";

export class Trabajo {
    constructor(
        cantidad = 0,
        concepto = "",
        precioUnitario = 0,
        totalTrabajo = null
    ) {
        this.cantidad = cantidad;
        this.concepto = concepto;
        this.precioUnitario = precioUnitario;
        this.totalTrabajo = totalTrabajo ?? (cantidad * precioUnitario);
    }
}
