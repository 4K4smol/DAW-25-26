window.addEventListener("load", () => {
    // Inputs
    const $inputNumeroLados    = document.getElementById("input-numero-lados");
    const $inputNumeroTiradas  = document.getElementById("input-numero-tiradas");

    // Controles
    const $btnTirar = document.getElementById("btn-tirar");

    // Salida
    const $inputResultadoTirada = document.getElementById("resultado-tirada"); // resumen
    const $inputResultados      = document.getElementById("resultados");       // log

    $btnTirar.addEventListener("click", () => {
        tirar();
    });

    function tirar() {
        const numeroLados = $inputNumeroLados.value;
        const numeroTiradas = $inputNumeroTiradas.value;

        // Resultado de la tirada
        const resultado = juegoDados(numeroLados, numeroTiradas);

        const lineas = [];
        for (let i = 0; i < numeroTiradas; i++) {
            // TO DO
        }

        $inputResultados.value = lineas.join("\n");
        $inputResultadoTirada.value =
            `Victorias Jugador: ${resultado.victoriasJugador} | ` +
            `Victorias Máquina: ${resultado.victoriasMaquina} | ` +
            `Empates: ${resultado.empates}`;
    }
});