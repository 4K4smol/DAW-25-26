"use strict"
export class Reparacion {
    constructor(
        reparacionId = null,
        vehiculoId = null,
        aprobada = null,
        descripcion = null,
        fecha = null,
        kilometros = null,
        pagado = null,
        terminado = null,
        trabajos = null
    ) {
        this.reparacionId = reparacionId,
        this.vehiculoId = vehiculoId,
        this.aprobada = aprobada,
        this.descripcion = descripcion,
        this.fecha = fecha,
        this.kilometros = kilometros,
        this.pagado = pagado,
        this.terminado = terminado,
        this.trabajos = trabajos
    }
}