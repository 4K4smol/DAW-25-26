class Factura {
    constructor(clienteNif, fecha, hora, pagada, ...lineas) {
        this.clienteNif = clienteNif,
        this.fecha = fecha,
        this.hora = hora,
        this.pagada = pagada,
        this.lineas = lineas
    }

    get importeTotal() {
        let importe = 0;
        for (const linea of this.lineas) {
            importe += linea.cantidad * linea.precioUnitario;
        }

        return importe;
    }

    get numeroArticulos() {
        return this.lineas.length;
    }

    imprimirFactura () {
        return `Cliente DNI: ${this.clienteNif}` +
        `Fecha: ${fecha}` +
        `Hora: ${hora}` +
        `Pagada: ${pagada}` +
        `${this.importeTotal}` +
        `Líneas: ${this.lineas}`;
    }

    agregaLinea(concepto, cantidad, precioUnitario) {
        this.lineas.push(Linea(concepto, cantidad, precioUnitario));
    }

    eliminarLinea() {
        this.lineas.pop();
    }
}

/**
 * Linea (concepto, cantidad (int), precioUnitario)
 */
class Linea {
    constructor(concepto, cantidad, precioUnitario) {
        this.concepto = concepto,
        this.cantidad = cantidad,
        this.precioUnitario = precioUnitario
    }
}

class Utilidades {
    static serializarFactura(facturaOBJ) {
        return JSON.stringify(facturaOBJ);
    }

    static deserializarFactura(facturaJSON) {
        return JSON.parse(facturaJSON);
    }
}