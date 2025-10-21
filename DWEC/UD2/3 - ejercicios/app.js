function juegoDados() {
    // Variables
    const tiradas = [];
    const resultado = { Jugador: [], Maquina: [] };
    let victoriasMáquina = 0;
    let victoriasJugador = 0;

    let promptNumeroLados;
    let promptNumeroTiradas;
    do {
        promptNumeroLados = Number(prompt('Indique el número de lados:'));
        promptNumeroTiradas = Number(prompt('Indique el número de tiradas:'));
        if (promptNumeroLados <= 0 || promptNumeroTiradas <= 0) { 
            alert('Indique un número mayor a 0 en ambos casos');
        }
    } while (promptNumeroLados <= 0 || promptNumeroTiradas <= 0);

    const tirarDados = jugarDados(6);
    for (let i = 0; i < promptNumeroTiradas; i++) {
        tiradas.push(tirarDados());
        if (tiradas[i][0] != tiradas[i][1]) {
            (tiradas[i][0] > tiradas[i][1])
                ? victoriasJugador++
                : victoriasMáquina++; 
        }

        resultado['Jugador'].push(tiradas[i][0]);
        resultado['Maquina'].push(tiradas[i][1]);
    }
    alert(
        `Resultados:\n` +
        `Jugador: ${resultado.Jugador.join(', ')}\n` +
        `Máquina: ${resultado.Maquina.join(', ')}\n\n` +
        `Victorias Jugador: ${victoriasJugador}\n` +
        `Victorias Máquina: ${victoriasMáquina}`
    );
}

/**
 * jugarDados
 */
function jugarDados(numeroLados) {
    function tirarDado () {
        return randomEntre(1, numeroLados);
    }

    return function () {
        const dado1 = tirarDado();
        const dado2 = tirarDado();
        return [dado1, dado2];
    }
}

/**
 * FUNCION PARA GENERAR NUMERO ALEATORIO
 */
function randomEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

juegoDados();