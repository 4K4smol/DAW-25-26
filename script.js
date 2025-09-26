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

    if (diagonalMenor % 2 == 0 || diagonalMenor < 3) {
        alert('El tamaño de la diagonal menor debe ser mayor a 3 e impar');
        return;
    }

    let lineas = [] // Array de candeas (Completo)
    let lineas1 = []; // Array de cadenas (parte inferior)
    let lineas2 = [] // Array de cadenas (parte superior)
    let linea = []; // Cadenas a agrupar
    let espacio_incremental = 0; // Espacio al principio y final lineas

    for (let i = diagonalMenor; i > 0 ; i--) {
        linea[i] = '';

        linea[i] = ' '.repeat(espacio_incremental) + signo.repeat(diagonalMenor) + ' '.repeat(espacio_incremental);
        lineas1.push(linea[i]);
        diagonalMenor -= 2;
        if (diagonalMenor < 0) {
            break;
        }
        espacio_incremental++;
    }

    /**
     * Copiar array entero excepto el primer elemento (base)
     * Darle la vuelta porque es la parte superior
     * Añadir dos arrays seguidos concatenar
     */
    lineas2 = lineas1.slice(1).reverse();
    lineas = lineas2.concat(lineas1);

    console.log(lineas.join('\n'));
}

// rombo();


/**
 * 6-Crea una función que dibuje en un alert la figura geométrica indicada por parámetro. Donde
 * el primer parámetro será la función que genera el polígono y el segundo parámetro el número
 * que indica el tamaño del polígono.
 * Deberás definir un menú que solicite el polígono a representar: cuadrado hueco, triangulo,
 * rombo. Y después solicitar el tamaño al usuario. Incluye una opción de terminar.
 * Añade el código auxiliar necesario para probar la aplicación.
 */
function figuraGeometrica() {
    let seleccion = 0;
    do {
        seleccion = Number(prompt(
            'Seleccione una opcione:\n\t[0] => Salir\n\t[1] => Triángulo\n\t[2] => Rectángulo Hueco\n\t[3] => Rombo'
        ));

        switch (seleccion) {
            case 0:
                alert('Hasta nunca');
                break;
            
            case 1:
                triangulo();
                break;
            
            case 2:
                rectanguloHueco();
                break;
            
            case 3:
                rombo();
                break;

            default:
                alert('No sabes leer chavalín w(ﾟДﾟ)w')
                break;
        }

    } while (seleccion != 0)
}

// figuraGeometrica();


/**
 * 7-Crea una función que reciba un número e imprima la tabla de multiplicar.
 * Crea una función que solicite dos números entre 0 y 10, y que imprima las tablas de multiplicar
 * entre los números indicados. Las tablas aparecerán desde el número más pequeño al mayor
 * (aquí hay validaciones).
 * Añade el código auxiliar necesario para probar la aplicación.
 */
function tablaMultiplicarPorNumero() {
    let valor1 = 0; // Primer valor a ingresar
    let valor2 = 0; // Segundo valor a ingresar
    let menor = 0; // Número menor
    let mayor = 0; // Número mayor
    let tabla = [];
    let linea = [];


    do {
        valor1 = prompt("Ingrese el primer valor: ");
        if (valor1 < 1) alert('Añade un valor mayor a 1');
        if (valor1 > 10) alert('Añade un valor menor a 10');
    } while (valor1 < 1 || valor1 > 9)

    do {
        valor2 = Number(prompt("Ingrese el segundo valor: "));
        if (valor2 < 1) alert('Añade un valor mayor a 1');
        if (valor2 > 10) alert('Añade un valor menor a 10');
    } while (valor2 < 1 || valor2 > 9)

    menor = valor1 > valor2 ? valor2 : valor1;
    mayor = valor1 > valor2 ? valor1 : valor2;

    for (let i = menor; i <= mayor; i++) {
        tabla[i] = '';
        for (let j = 1; j < 10; j++) {
            linea[j] = `${i} * ${j} = ${j*i}\n`
            tabla[i] += linea[j];
        }
        tabla[i] += '\n';
    }

    console.log(tabla.join('\n'));
}

// tablaMultiplicarPorNumero();

/**
 * 8-Crea una función que reciba un número y calcule su factorial, la función devolverá una
 * cadena con el desarrollo del factorial. Por ejemplo, para una entrada de 4 devolverá la cadena
 * “4x3x2x1=24”.
 * Añade el código auxiliar necesario para probar la aplicación. El script solicitará números al
 * usuario hasta que no desee continuar
 */
function calcularFactorial() {
    let numero = 0;

    do {
        numero = Number(prompt(
            'Seleccione una opcione:\n\t[0] => Salir\n\tCualquier número entre 100 y 1'
        ));

        if (numero < 1 || numero > 99) {

        }

    } while (numero != 0)


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