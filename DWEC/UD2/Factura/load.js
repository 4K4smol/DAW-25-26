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

    // Impresion
    const $impresion = document.getElementById("impresion");

    let factura = new Factura(
        $inputClienteNif.value,
        $inputFecha.value,
        $inputHora.value,
        $inputPagada.value
    );

    $btnActualizar.addEventListener("click", () => {
        
    });

    $btnAgregarLinea.addEventListener("click", () => {

    });
});