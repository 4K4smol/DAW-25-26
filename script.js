/**
 * 1-Crea un programa en el que crees 4 variables: 2 cadenas y 2 números, con los siguientes
 *   valores: tu nombre, tu apellido, tu edad y tu año de nacimiento.
 *    • Muestra en un alert las variables introducidas con formato clave valor en donde los
 *      valores cadena aparezcan envueltos entre comillas dobles y los valores numéricos
 *      entre comillas simples.
 *    • Muestra en un alert tu nombre y apellidos separados por un salto de línea.
 *    • Muestra en un alert la suma de las variables edad y año de nacimiento.
 *    • Muestra en un alert la suma de todas las variables. 
 */
function crearVariables() {
    let cadena1 = 'Eloy';
    let cadena2 = 'Cuesta Lahera';

    let numero1 = 21;
    let numero2 = 2004;

    alert(
        `Nombre: "${cadena1}"` + "\n" +
        `Apellido: "${cadena2}"` + "\n" +
        `Edad: "${numero1}"` + "\n" +
        `Nacimiento: "${numero2}"`
    );

    alert(
        `Nombre: "${cadena1}"` + "\n" +
        `Apellido: "${cadena2}"`
    );

    alert(
        `Suma Edad + Nacimiento: "${numero1 + numero2}"` 
    )

    alert(
        `Suma variables: "${cadena1 + cadena2 + numero1 + numero2}"`
    )
}

crearVariables();



// function cuadrado (tamañao) {
//     let linea = [];
//     for(let i = 0; i < tamañao; i++) {
//         linea[i] = []
//         for(let j = 0; j < tamañao; j++) {
//             linea[i] += '+';
//         }
//     }
//     console.log(linea.join("\n"));
// }

// cuadrado(4);


// function triangulo(altura) {
//     let linea = [];

//     let cantidad_signo = 1;
//     let espacio = altura - 1;
//     let signo = '*';

//     for (let i = 0; i < altura; i++) {
//         let fila = '';

//         for (let j = 0; j < espacio; j++) {
//             fila += ' ';
//         }

//         for (let j = 0; j < cantidad_signo; j++) {
//             fila += signo;
//         }

//         linea.push(fila);

//         cantidad_signo += 2;
//         espacio -= 1;
//     }

//     console.log(linea.join("\n"));
// }


// triangulo(4);



// function cuadradoVacio(lado, signo = '*') {
//     let lineas = [];

//     for (let i = 0; i < lado; i++) {
//         let linea = '';
//         for (let j = 0; j < lado; j++) {
//             if (i === 0 || i === lado - 1 || j === 0 || j === lado - 1) {
//                 linea += signo;
//             } else {
//                 linea += ' ';
//             }
//         }
//         lineas.push(linea);
//     }

//     console.log(lineas.join('\n'));
// }

// cuadradoVacio(4, '[');

// /** Triángulo vacío */
// function trianguloVacio(base, signo = '*') {
//     if (base < 3 || base % 2 == 0) {
//         alert('no no no');
//         return;
//     }

//     // Array del dibujo
//     let lineas = [];

//     // Base
//     let linea_base = [];
//     linea_base.push(...signo.repeat(base));




// }

// rombo(5);