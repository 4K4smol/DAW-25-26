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
    let anagrama = true;

    if (palabra1.lentgh != palabra2.lentgh) {
        return false;
    }

    console.log(palabra1.split(''))
    for (let i = 0; i < palabra1.lentgh; i++) {

    }

    return false;
}

console.log(comprobarAnagramas('hola', 'bbb'));