window.addEventListener("load", () => {
    // Botones
    const $btnActualizar = document.getElementById("btn-actualizar");
    const $btnAgregarLinea = document.getElementById("btn-agregar-linea");
    const $btnEliminarLinea = document.getElementById("btn-eliminar-linea");
    const $btnSerializar = document.getElementById("btn-serializar");
    const $btnDeserializar = document.getElementById("btn-deserializar");

    // Inputs
    const $inputClienteNif = document.getElementById("cliente-nif");
    const $inputFecha = document.getElementById("fecha");
    const $inputHora = document.getElementById("hora");
    const $inputPagada = document.getElementById("pagada");

    const $inputConcepto = document.getElementById("concepto");
    const $inputCantidad = document.getElementById("cantidad");
    const $inputPrecioUnitario = document.getElementById("precio-unitario");

    const $inputSerializarSalida = document.getElementById("serializar-json");
    const $inputDeserializarEntrada = document.getElementById("deserializar-json");

    // Impresion
    const $impresion = document.getElementById("impresion");

    let factura;
    $btnActualizar.addEventListener("click", () => {
        if (
            $inputClienteNif.value.trim() === '' ||
            $inputFecha.value.trim() === '' ||
            $inputHora.value.trim() === '' ||
            $inputPagada.checked === false
        ) {
            return alert("Primero crea la factura");
        }

        console.log($inputClienteNif.value);
        factura = new Factura(
            $inputClienteNif.value,
            $inputFecha.value,
            $inputHora.value,
            $inputPagada.checked
        );
        $impresion.innerHTML = factura.imprimirFactura();
    });

    $btnAgregarLinea.addEventListener("click", () => {
        if (!factura) return alert("Primero actualiza la factura.");
        if (
            $inputConcepto.value.trim() === '' ||
            $inputCantidad.value === '' ||
            $inputPrecioUnitario.value === ''
        ) {
            return alert("Primero añade todos los datos de la línea");
        }
        factura.agregarLinea(
            $inputConcepto.value,
            $inputCantidad.value,
            $inputPrecioUnitario.value
        );

        $impresion.innerHTML = factura.imprimirFactura();
    });

    $btnEliminarLinea.addEventListener("click", () => {
        if (!factura) return alert("Primero actualiza la factura.");
        factura.eliminarLinea();
        $impresion.innerHTML = factura.imprimirFactura();
    });



    $btnSerializar.addEventListener("click", () => {
        const stringJSON = Utilidades.serializarFactura(factura);
        $inputSerializarSalida.innerHTML = stringJSON;
    });

    /**
     * {
            "clienteNif": "12345678Z",
            "fecha": "2025-10-30",
            "hora": "21:15",
            "pagada": true,
            "lineas": [
                { "concepto": "Teclado mecánico", "cantidad": 2, "precioUnitario": 45.5 },
                { "concepto": "Ratón gaming", "cantidad": 1, "precioUnitario": 29.99 }
            ]
        }
    */
    $btnDeserializar.addEventListener("click", () => {
        const json = $inputDeserializarEntrada.value.trim();
        if (!json) return alert("Introduce un JSON en el campo de deserialización");

        factura = Utilidades.deserializarFactura(json);
        $impresion.innerHTML = factura.imprimirFactura();
    });
});
