export class Factura {
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

    imprimirFactura() {
        let salida = `Factura de ${this.clienteNif}<br>`;
        salida += `Fecha: ${this.fecha} ${this.hora}<br>`;
        salida += `Pagada: ${this.pagada ? "Sí" : "No"}<br><br>`;

        if (this.lineas.length === 0) {
            salida += `(Sin líneas)<br>`;
        } else {
            salida += `Líneas:<br>`;
            for (const linea of this.lineas) {
                const subtotal = linea.cantidad * linea.precioUnitario;
                salida += `• ${linea.concepto}: ${linea.cantidad} × ${Number(linea.precioUnitario).toFixed(2)} = ${Number(subtotal).toFixed(2)} €<br>`;
            }

            salida += `<br><strong>Total:</strong> ${Number(this.importeTotal).toFixed(2)} €`;
        }

        return salida;
    }


    agregarLinea(concepto, cantidad, precioUnitario) {
        this.lineas.push(new Linea(concepto, cantidad, precioUnitario));
    }

    eliminarLinea() {
        if (this.numeroArticulos <= 0) return alert("No existen lineas")
        this.lineas.pop();
    }
}

/**
 * Linea (concepto, cantidad (int), precioUnitario)
 */
export class Linea {
    constructor(concepto, cantidad, precioUnitario) {
        this.concepto = String(concepto);                 // Siempre texto
        this.cantidad = Number(cantidad);                 // Fuerza número
        this.precioUnitario = Number(precioUnitario);     // Fuerza número
    }
}


export class Utilidades {
    static serializarFactura(facturaOBJ) {
        return JSON.stringify(facturaOBJ);
    }

    static deserializarFactura(facturaJSON) {
        const obj = JSON.parse(facturaJSON);

        const factura = new Factura(
            obj.clienteNif,
            obj.fecha,
            obj.hora,
            obj.pagada
        );

        // Añadir cada linea
        if (Array.isArray(obj.lineas)) {
            for (const linea of obj.lineas) {
                factura.agregarLinea(linea.concepto, linea.cantidad, linea.precioUnitario);
            }
        }

        return factura;
    }

}