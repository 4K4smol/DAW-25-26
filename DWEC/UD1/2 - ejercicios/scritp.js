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
    if (cadena === '') return;
    /**
     * Ninguna cadena comienza con ' ' => Espacio
     * Ninguna frase comienza con . => punto | - => raya
     */
    const morse = ['.', '-'].includes(cadena.charAt(0));

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
    let caracteres = cadena.split("  "); // separas letras por doble espacio
    console.log(caracteres);

    for (let caracter of caracteres) {
        caracter = caracter.trim();
        let letra = Object.keys(alfabetoMorse)
            .find(key => alfabetoMorse[key] === caracter);
        cadenaResultado += letra || '';
    }

    return cadenaResultado;
}

console.log(codificarDescodificarMoser('· —  · —'));