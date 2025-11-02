window.addEventListener("load", () => {
    // Inputs
    const $inputNumeroLados = document.getElementById("input-numero-lados");
    const $inputNumeroTiradas = document.getElementById("input-numero-tiradas");

    // Controles
    const $btnTirar = document.getElementById("btn-tirar");
    const $btnComenzar = document.getElementById("btn-comenzar");

    // Salida
    const $inputDatosTirada = document.getElementById("datos-tirada");
    const $inputInfo = document.getElementById("info");
    const $inputLog = document.getElementById("log");
    const $inputRodas = document.getElementById("rondas");
    const $inputResumenTirada = document.getElementById("resumen-tirada"); // resumen
    const $inputResultados = document.getElementById("resultado-tirada");  // log

    // Variables de juego
    let tirarDados = null;
    let tiradasRestantes = 0;
    let victoriasJugador = 0;
    let victoriasMaquina = 0;

    $btnComenzar.addEventListener("click", () => {
        // Variables
        const numeroLados = parseInt($inputNumeroLados.value);
        const numeroTiradas = parseInt($inputNumeroTiradas.value);

        tirarDados = jugarDados(numeroLados);

        // Reiniciar contadores
        tiradasRestantes = numeroTiradas;
        victoriasJugador = 0;
        victoriasMaquina = 0;

        console.log(tiradasRestantes, victoriasJugador, victoriasMaquina);
        $inputDatosTirada.style.display = "none";
        $inputInfo.style.display = "block";
        $inputLog.innerHTML = "";
        $inputLog.textContent = "¡Partida lista! Pulsa 'Tirar' para empezar.";
    });

    $btnTirar.addEventListener("click", () => {
        tiradasRestantes--;

        // Datos
        $inputRodas.innerHTML = "";
        $inputRodas.textContent = `Quedan ${tiradasRestantes} ronda/s`;

        // Tiradas
        const jugador = tirarDados();
        const maquina = tirarDados();

        const victoria = victoriaDados(jugador, maquina);

        if (victoria === 1) {
            victoriasJugador++;
            $inputResultados.innerHTML = "";
            $inputResultados.textContent = "Victoria Jugador";
        } else if (victoria === 2) {
            victoriasMaquina++;
            $inputResultados.innerHTML = "";
            $inputResultados.textContent = "Victoria Maquina";
        } else {
            $inputResultados.innerHTML = "";
            $inputResultados.textContent = "Empate!";
        }

        $inputResumenTirada.innerHTML = "";
        $inputResumenTirada.textContent = `Jugador: ${jugador}`+ "\n" + `Maquina: ${maquina}`;
        $inputLog.textContent = `Victorias Jugador: ${victoriasJugador} \n Victorias Máquina: ${victoriasMaquina}`;

        if (tiradasRestantes === 0) {
            alert("Se acabaron las rondas");
        }
    });
});