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

// crearVariables();

/**
 * 2-Realiza un programa que solicite números al usuario hasta que introduzca un 0. Y que
 *   muestre los valores: máximo, mínimo, suma, media y total de números introducidos.
 */
function solicitarNumeros() {
    let maximo = 0;
    let minimo = 0;
    let suma = 0;
    let media = 0;
    let total = 0;
    let numeroIngresado = 0;

    do {
        numeroIngresado = Number(prompt("Ingrese 0 => SALIR\nIngrese un número:"));

        if (numeroIngresado !== 0) {
            if (numeroIngresado > maximo) {
                maximo = numeroIngresado;
            }

            if (minimo === 0) {
                minimo = numeroIngresado;
            } else if (numeroIngresado < minimo) {
                minimo = numeroIngresado;
            }

            suma += numeroIngresado;
            total++;
        }

    } while (numeroIngresado !== 0);

    media = suma / total;

    if (typeof(media) != Number) {
        alert('Sin datos suficientes');
        return;
    }
    alert(
        `Máximo: ${maximo}\nMínimo: ${minimo}\nSuma: ${suma}\nMedia: ${media}\nTotal: ${total}`
    );
}

// solicitarNumeros();


/**
 * 3-Crea una función reciba un número y que dibuje un rectángulo hueco de lado del tamaño del número
 * indicado. El valor devuelto será un array con cada una de las cadenas que forman el rectángulo.
 * Añade el código auxiliar necesario para probar la aplicación.
 */
function rectanguloHueco(signo = '*') {

    let lado = Number(prompt('Indique el lado del rectángulo'));

    let lineas = [];
    let linea = [];
    for (let i = 0; i < lado; i++) {
        linea[i] = '';
        for (let j = 0; j < lado; j++) {
            if (i == 0 || j == 0 || j == lado-1 || i == lado-1) {
                linea[i] += signo;
            } else {
                linea[i] += ' ';
            }
        }

        lineas.push(linea[i]);
    }

    console.log(lineas.join("\n"));
}

// rectanguloHueco('*');

/**
 * 4- Crea una función reciba un número y que dibuje un triángulo de altura el tamaño del
 * número indicado. El valor devuelto será un array con cada una de las cadenas que forman el
 * rectángulo.
 * Añade el código auxiliar necesario para probar la aplicación
 */
function triangulo(signo = '*') {
    let altura = Number(prompt('Indique la altura del triángulo:'));

    if (altura < 3 || altura % 2 === 0) {
        alert('La altura debe ser impar y mayor que 3');
        return;
    }

    let lineas = [];

    for (let i = 0; i < altura; i++) {
        let espacios = ' '.repeat(altura - i - 1);
        let simbolos = signo.repeat(2 * i + 1);
        lineas.push(espacios + simbolos + espacios);
    }

    console.log(lineas.join('\n'));
}

// triangulo();


/**
 * 5- Crea una función reciba un número y que dibuje un rombo de diagonal del tamaño del
 * número indicado. El valor devuelto será un array con cada una de las cadenas que forman el rombo.
 * Añade el código auxiliar necesario para probar la aplicación.
 */
function rombo(signo = '*') {
    let diagonalMenor = Number(prompt('Indique la diagonal menor del rombo:'));

    let lineas = [];
    let linea = [];

}

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