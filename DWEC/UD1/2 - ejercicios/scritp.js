/**
 * Escribe una función que reciba dos palabras y retorne verdadero o falso según sean o no
 * anagramas.
 *   Un Anagrama consiste en formar una palabra reordenando todas las letras de otra palabra
 *   inicial.
 *   Ten en cuenta que:
 *   • Las palabras pueden ser inventadas.
 *   • Dos palabras exactamente iguales no son anagrama.
 */
function comprobarAnagramas(palabra1, palabra2) {
    if (palabra1 === palabra2) return false;
    if (palabra1.length !== palabra2.length) return false;

    const sorted1 = palabra1.split('').sort();
    const sorted2 = palabra2.split('').sort();
    return String(sorted1) === String(sorted2);
}

// console.log(comprobarAnagramas('hola', 'hoal'));


/**
 * Escribe una función que reciba un número entero y devuelva un array del tamaño del
 * número indicado relleno con los primeros valores de la sucesión de Fibonacci.
 * La sucesión de Fibonacci se compone de una serie de valores en el que cada valor es la
 * suma de los dos valores previos. Por ejemplo:
 * 0, 1, 1, 2, 3, 5, 8, 13, 21…
 */
function sucesionFibonacci(entero) {
    // Sucesión
    const sucesion = [];

    if (!Number.isInteger(entero) || entero === 0) return;

    let siguienteNumero = 0;
    do {
        --entero;
        sucesion.push(siguienteNumero);

        if (entero === 0) break;

        // Se necesitan los dos primeros valores para la sucesión
        if (sucesion[1] === undefined) {
            ++siguienteNumero;
            continue;
        }

        siguienteNumero = sucesion[sucesion.length - 2] + sucesion[sucesion.length - 1];
    } while (true);

    return sucesion;
}

// console.log(sucesionFibonacci(1));

/**
 * Escribe una función que codifique/decodifique el código morse. La función detectara
 * automáticamente el tipo antes de realizar la conversión.
 * En morse se soporta 3 símbolos para representar la información:
 *   • Raya “-“
 *   • Punto “.”
 *   • Espacio “ “.
 * Entre cada carácter se incluye 1 espacio, entre palabras 2 espacios.
 * El alfabeto morse está disponible en https://es.wikipedia.org/wiki/C%C3%B3digo_morse
 */
function codificarDescodificarMoser(multiCadena) {
    // Alfabeto Morse
    const alfabetoMorse = {
        "A": "· —",
        "B": "— · · ·",
        "C": "— · — ·",
        "CH": "— — — —",
        "D": "— · ·",
        "E": "·",
        "F": "· · — ·",
        "G": "— — ·",
        "H": "· · · ·",
        "I": "· ·",
        "J": "· — — —",
        "K": "— · —",
        "L": "· — · ·",
        "M": "— —",
        "N": "— ·",
        "Ñ": "— — · — —",
        "O": "— — —",
        "P": "· — — ·",
        "Q": "— — · —",
        "R": "· — ·",
        "S": "· · ·",
        "T": "—",
        "U": "· · —",
        "V": "· · · —",
        "W": "· — —",
        "X": "— · · —",
        "Y": "— · — —",
        "Z": "— — · ·",
        "0": "— — — — —",
        "1": "· — — — —",
        "2": "· · — — —",
        "3": "· · · — —",
        "4": "· · · · —",
        "5": "· · · · ·",
        "6": "— · · · ·",
        "7": "— — · · ·",
        "8": "— — — · ·",
        "9": "— — — — ·",
        ".": "· — · — · —",
        ",": "— — · · — —",
        "?": "· · — — · ·",
    };
    let cadenaResultado = '';
    let cadena = multiCadena.trim().toUpperCase();
    console.log(cadena);
    if (cadena === '') return;
    /**
     * Ninguna cadena comienza con ' ' => Espacio
     * Ninguna frase comienza con . => punto | - => raya
     */
    const morse = ['·', '—'].includes(cadena.charAt(0));

    // texto => Morse
    if (!morse) {
        for (let i = 0; i < cadena.length; i++) {
            let caracter = cadena.charAt(i);

            if (caracter === " ") {
                // separador de palabras
                cadenaResultado += "  "; // por ejemplo 3 espacios
            } else if (alfabetoMorse[caracter]) {
                cadenaResultado += alfabetoMorse[caracter] + "";
            }
            // si no está en el diccionario, no añadimos nada
        }


        return cadenaResultado;
    }

    // Morse => Texto
    let caracteres = cadena.split("  "); // separa morse por dobles espacios

    for (let caracter of caracteres) {
        caracter = caracter.trim();
        let letra = Object.keys(alfabetoMorse)
            .find(asd => alfabetoMorse[asd] === caracter);
        cadenaResultado += letra || '';
    }

    return cadenaResultado;
}

// console.log(codificarDescodificarMoser('· —  · —'));

/**
 * 
 * Escribe una función que compruebe si los paréntesis, llaves y corchetes de una expresión
 * están equilibrados. Es decir, si cada símbolo de apertura se corresponde con un símbolo
 * de cierre en orden. 
 *
 */
function expresionEquilibrada(expresion) {
    const abiertos = ['[', '{', '('];
    const cerrados = [']', '}', ')'];

    const cadenaFiltro = expresion.trim().split('').sort();
    for (let i = 0; i < cadenaFiltro.length; i++) {
        if (abiertos.includes(cadenaFiltro[i])) {
            if (cerrados.includes(cadenaFiltro[i + 1])) {
                i++
                continue;
            }
            return false;
        }
        if (cerrados.includes(cadenaFiltro[i])) {
            return false;
        }
    }

    return true;
}

// console.log(expresionEquilibrada('{ a * [ ( c + d ) ] - 5 }'));

/**
 * Escribe una función que calcule el factorial de un número dado de manera recursiva.
 * 
 */
function factorialRecursivo(numero) {
    if (numero === 0 || numero === 1) {
        return 1;
    }
    return numero * factorialRecursivo(numero - 1);
}

// console.log(factorialRecursivo(5));

/**
 * Escribe un programa para jugar al tres en raya. Divídelo en funciones.
 *  • comprobarEstado(matriz) devuelve x si ganan las x, o si ganan los o, “empate” si
 * no ha ganado ninguno, cadena vacía en otro caso.
 *  • ponerMaquina(matriz, ficha) actualiza la matriz añadiendo en una celda vacía
 * una ficha, comprobará si al poner la ficha puede realizar un tres en raya. Seguido
 * comprobará si el puede impedir que el otro jugador haga un tres en raya. Por
 * último, colocara la ficha de manera aleatoria.
 *  • ponerHumano(matriz, x, y, ficha) actualiza la matriz posicionando la ficha en la
 * posición x,y comprobando que esta esté libre. Devuelve true cuando se coloca la
 * ficha con éxito, false en caso contrario.
 *  • dibujarTablero(matriz) representa la matriz.
 * Reglas adicionales.
 * Siempre comienzan las “X”, de manera aleatoria se elegirá si comienza el humano o la máquina.
 */
function tresRaya() {
    const fichas = ['x', 'y'];
    const matriz = [['', '', ''], ['', '', ''], ['', '', '']];
    const tipoJugador = ['jugador', 'maquina'];

    // Quien empiza
    let jugadorEmpieza = randomEntre(0, 1);

    let terminar = false;

    do {
        tipoJugador[jugadorEmpieza] == 'jugador'
            ? ponerHumano()
            : ponerMaquina();

    

    } while (!terminar);



}
function comprobarEstado(matriz) {

}

function ponerMaquina(matriz, ficha) {
    // impedir cruz en raya
    const obtenerPosicionesJugador = [];

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            if (matriz[i][j] == ficha) {
                obtenerPosicionesJugador.push([i, j]);
            }
        }
    }
    // [0, 1], [1, 0], [1, 2], [2, 1]
    // [0, 0], [0, 2], [2, 0], [2, 2]
    // [1, 1] Centro
    let centro = false;
    // let intermedio = false;
    // let esquinas = false;
    for (let posiciones of obtenerPosicionesJugador) {
        if (posiciones[0] + posiciones[1] == 2) {

        }
    }

    let x = 0;
    let y = 0;

    do {
        x = randomEntre(0, 2);
        y = randomEntre(0, 2);
    } while (matriz[x][y] != '');

    return matriz[x][y].push(ficha);
}

function ponerHumano(matriz, x, y, ficha) {
    return matriz[x][y].push(ficha);
}

function dibujarTablero(matriz) {
    return matriz;
}

console.log(dibujarTablero([['', '', ''], ['', '', ''], ['', '', '']]));

function randomEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}