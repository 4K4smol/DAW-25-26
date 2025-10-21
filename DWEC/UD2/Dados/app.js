// TO DO
function juegoDados(numeroLados, numeroTiradas) {
    // Variable
    const resultado = { Jugador: [], Maquina: [] };
    let victoriasMáquina = 0;
    let victoriasJugador = 0;

    const tirarDadosInstance = tirarDados(6);
    for (let i = 0; i < promptNumeroTiradas; i++) {
        resultado['Jugador'].push(tirarDadosInstance());
        resultado['Maquina'].push(tirarDadosInstance());
        
        // comprobar victoria
        if ('') {
            ('')
                ? victoriasJugador++
                : victoriasMáquina++; 
        }
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
 * tirarDados
 */
function tirarDados(numeroLados) {
    function tirarDado () {
        return randomEntre(1, numeroLados);
    }

    return function () {
        const dadoResultado = tirarDado();
        return dadoResultado;
    }
}

/**
 * FUNCION PARA GENERAR NUMERO ALEATORIO
 */
function randomEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 */
// aplicar numero

// juegoDados();