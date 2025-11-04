window.addEventListener("load", () => {
    // Variables
    const $btnCobrar = document.getElementById("btn-cobrar");

    const $inputimporteProducto = document.getElementById("importe-producto");
    const $inputimporteEntregado = document.getElementById("importe-entregado");

    const $inputResultado = document.getElementById("resultado");


    // Resultado
    function printResultado(resultado) {
        $inputResultado.innerHTML = resultado;L
    }

    // Click
    $btnCobrar.addEventListener("click", () => {
        const importeProducto = Number($inputimporteProducto.value);
        const importeEntregado = Number($inputimporteEntregado.value);

        if (importeProducto < 0 || importeEntregado < 0) {
            printResultado("Los importes no pueden ser negativos.");
            return;
        }
        if (importeEntregado < importeProducto) {
            printResultado("El importe entregado es menor al producto.");
            return;
        }

        const res = $maquinaCafe.cambio(importeEntregado - importeProducto);
        let html = `Precio: ${importeProducto}<br>Pago de: ${importeEntregado}<br><hr>`;
        for (let tipo in res) {
            html += (Number(tipo) > 2)
                ? `<strong>Cantidad de billetes de ${tipo}:</strong> ${res[tipo]}<br>`
                : `<strong>Cantidad de Monedas de ${tipo}:</strong> ${res[tipo]}<br>`;
        }
        printResultado(html);
    });
});