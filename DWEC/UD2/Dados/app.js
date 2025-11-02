// Closure
function jugarDados(numeroLados) {
    function tirarDado () {
        return randomEntre(1, numeroLados);
    }

    return function () {
        const dadoResultado = [tirarDado(), tirarDado()];
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
 * Indicar ganador
 * @param {*} resultado1 
 * @param {*} resultado2 
 * @returns 
 */
function victoriaDados(resultado1, resultado2) {
    if ((resultado1[0] + resultado1[1]) > (resultado2[0] + resultado2[1])) {
        return 1;
    }

    if ((resultado1[0] + resultado1[1]) < (resultado2[0] + resultado2[1])) {
        return 2;
    }
}