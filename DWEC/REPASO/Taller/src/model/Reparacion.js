'use strict'
import { Trabajo } from "./Trabajo.js";

export class Reparacion {
    constructor(
        reparacionId = null,
        vehiculoId = null,
        descripcion = '',
        fecha = '',
        kilometros = 0,
        presupuesto = 0,
        aprobada = false,
        pagado = false,
        terminado = false,
        trabajos = []
    ) {
        this.reparacionId = reparacionId,
            this.vehiculoId = Number(vehiculoId),
            this.descripcion = String(descripcion),
            this.fecha = new Date(fecha),
            this.kilometros = Number(kilometros),
            this.presupuesto = presupuesto,
            this.aprobada = Boolean(aprobada),
            this.pagado = Boolean(pagado),
            this.terminado = Boolean(terminado),
            this.trabajos = trabajos.map(t => {
                const totalTrabajo = Number(t.precioUnitario * t.cantidad);

                return t instanceof Trabajo
                    ? t
                    : new Trabajo(
                        t.concepto,
                        t.precioUnitario,
                        t.cantidad,
                        totalTrabajo
                    )
            });
    }
}


/**
 * "reparacionId": 1,
            "vehiculoId": 1,
            "descripcion": "Cambio de aceite y revisión general",
            "fecha": "2024-11-10",
            "kilometros": 45000,
            "presupuesto": true,
            "aprobada": false,
            "pagado": false,
            "terminado": false,
            "trabajos": [
                {
                    "concepto": "Aceite sintético",
                    "precioUnitario": 50,
                    "cantidad": 1,
                    "totalTrabajo": 50
                },
                {
                    "concepto": "Filtro de aire",
                    "precioUnitario": 30,
                    "cantidad": 1,
                    "totalTrabajo": 30
                }
            ]
 */