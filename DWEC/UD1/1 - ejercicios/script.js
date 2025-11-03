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

    if (typeof (media) != Number) {
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
            if (i == 0 || j == 0 || j == lado - 1 || i == lado - 1) {
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

    for (let i = diagonalMenor; i > 0; i--) {
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
            linea[j] = `${i} * ${j} = ${j * i}\n`
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
    let operacion = '';
    let resultado = 1;

    // Solicitar un número mayor a 1
    do {
        numero = Number(prompt(
            'Seleccione una opcione:\n\t[0] => Salir\n\tCualquier número mayor a 1'
        ));

        // Validación
        if ((numero < 1) && numero != 0) {
            alert('¿No sabe usted leer?')
        }
    } while (numero < 0)

    for (let i = numero; i > 0; i--) {
        operacion += (i == 1) ? `${i}` : `${i}x`;
        resultado *= i;
    }

    operacion += ` = ${resultado}`;

    alert(operacion);
}

// calcularFactorial()


/**
 * 9-Crea una función que reciba un número variable de parámetros y que los agrupe por tipo.
 * Después por cada tipo se mostrará el tipo y la colección de parámetros de ese tipo incluyendo
 * la posición original entre los parámetros.
 * Añade el código auxiliar necesario para probar la aplicación
 */
function discriminarVariables(...args) {
    let variablesAgrupadas = {};

    args.map((valor, index) => {
        if (!variablesAgrupadas[typeof valor]) {
            variablesAgrupadas[typeof (valor)] = [];
        }

        variablesAgrupadas[typeof (valor)].push({
            'valor': valor,
            'index': index
        });
    });

    console.log(variablesAgrupadas);
}

// discriminarVariables('hola', true, 3.1, 4);

/**
 * 10-Crea una función que reciba una cadena de texto y que cuente el número de apariciones de
 * cada carácter. Debe devolver un objeto de tipo clave-valor con el resultado.
 * Añade el código auxiliar necesario para probar la aplicación
 */
function contadorCaracteres(cadena) {
    let caracteresContador = [];

    for (let i = 0; i < cadena.length; i++) {
        if (!caracteresContador[cadena[i]]) {
            caracteresContador[cadena[i]] = 0;
        }

        caracteresContador[cadena[i]] += 1;
    }

    return caracteresContador;
}

// console.log(contadorCaracteres('holaaahlll    -ñ+ * 中文'));

/**
 * 11- Crea una función que reciba un rango, para cada valor en el rango se informará de si el
 * número es múltiplo de 3, si es múltiplo de 5 y si es número primo. Sólo mostrar información de
 * los números que cumplan alguna de las condiciones.
 * Añade el código auxiliar necesario para probar la aplicación.
 */
function informarRango(rango) {
    let multiplo5 = false;
    let multiplo3 = false;
    let primo = false;
    let modulo = 0;
    let resultado = [];

    if (rango == 0) {
        console.log('El rango es incorrecto');
    }

    rango.map((valor) => {
        multiplo5 = false;
        multiplo3 = false;
        primo = false;
        modulo = 0;
        resultado = '';

        for (let i = valor; i > 0; i--) {
            if (i == valor) {
                if (valor % 5 == 0) multiplo5 = true;
                if (valor % 3 == 0) multiplo3 = true;
            }
            if (valor % i == 0) modulo += 1;
        }
        if (modulo <= 2) primo = true;

        if (multiplo5) resultado += (`El número ${valor} es múltiplo de 5\n`);
        if (multiplo3) resultado += (`El número ${valor} es múltiplo de 3\n`);
        if (primo) resultado += (`El número ${valor} es primico\n`);

        if (resultado) {
            console.log(resultado + "\n");
        }
    });
}

function rango(inicio, fin) {
    let numeros = [];
    for (let i = inicio; i <= fin; i++) {
        numeros.push(i);
    }
    return numeros;
}

// informarRango(rango(1, 10));

/**
 * 12-Juego acertar número.
 * Calcula un numero aleatorio entre 1 y 100, este número permanecerá secreto. Pide al usuario
 * un numero en rango, el programa le dirá si es mayor o menor que el número secreto. Si el
 * usuario acierta el número secreto gana. El usuario dispondrá de 5 intentos para acertar el
 * número secreto, tras lo cual, el programa dirá que ha perdido y le mostrará el número secreto.
 * Añade el código auxiliar necesario para probar la aplicación.
 */
function acertarNumero() {
    let numeroMisterioso = randomEntre(1, 100)
    let intentos = 0;
    let terminar = false; // Variable para terminar juego
    do {
        intentos++;
        let numeroElegido = Number(prompt(`Nº de Intento: ${intentos}\n\tAcierte el número misterioso:`));

        if (numeroElegido == numeroMisterioso) {
            alert(`Has acertado el misterioso número era el ${numeroMisterioso}`);
            terminar = true;
            continue;
        }

        (numeroElegido > numeroMisterioso)
            ? alert(`El número ${numeroElegido} es mayor al número misterioro`)
            : alert(`El número ${numeroElegido} es inferior al número misterioso`);

        if (intentos == 5) {
            terminar = true;
        }

    } while (!terminar);
}

// acertarNumero();

/**
 * FUNCION PARA GENERAR NUMERO ALEATORIO
 */
function randomEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 13-Juego mates
 * Crea un programa que genere dos números aleatorios entre 1 y 10, y un operador aritmético.
 * Se ofrecerá al usuario los valores para que calcule el resultado, y el programa le dirá si el
 * resultado es correcto o incorrecto.
 * Las preguntas, respuesta del usuario y si ha acertado o fallado se almacenarán ordenadamente
 * en un array.
 * Se preguntas se realizarán en lotes de 4, tras lo cual se consultará al usuario si desea continuar.
 * Cuando el usuario no desee seguir jugando se mostrará un resumen de las preguntas (número,
 * pregunta y acierto) así como el total de preguntas acertadas y el total de falladas.
 * Añade el código auxiliar necesario para probar la aplicación
 */
function juegoMates() {
    // Variables fijas.
    let numero1 = randomEntre(1, 10);
    let numero2 = randomEntre(1, 10);
    let operadorRandom = randomEntre(1, 4);
    let operacion = ['+', '*', '/', '-'];

    // Variables graciosas
    let resultado = 0;
    let repeticion = 1;
    let terminar = false;
    let resumen = [];


    do {
        switch (operadorRandom) {
            case 1:
                resultado = numero1 + numero2;
                break;
            case 2:
                resultado = numero1 * numero2;
                break;
            case 3:
                resultado = numero1 / numero2;
                break;
            case 4:
                resultado = numero1 - numero2;
                break;
            default:
                break;
        }

        let pregunta = `El calcule el resultado de ${numero1} ${operacion[operadorRandom - 1]} ${numero2}`;
        let resultadoUsuario = Number(prompt(`${pregunta}`));
        let acierto = false;
        if (resultadoUsuario == resultado) {
            acierto = true;
        }

        resumen.push({
            Iteración: repeticion,
            Pregunta: pregunta,
            Acierto: acierto
        });

        if (repeticion == 4) {
            let continuarUsuario;
            do {
                continuarUsuario = prompt('¿Desea Continuar?\n\t(s) => Continuar\n\t(n) => Quit');
                if (continuarUsuario.toLowerCase() == 's') {
                    repeticion = 0;

                    // Generar nuevos números y operador para la siguiente iteración
                    numero1 = randomEntre(1, 10);
                    numero2 = randomEntre(1, 10);
                    operadorRandom = randomEntre(1, 4);

                    break;
                } else if (continuarUsuario.toLowerCase() == 'n') {
                    terminar = true;
                    break;
                }
            } while (true);
        }

        repeticion++;
        operadorRandom = randomEntre(1, 4);
    } while (!terminar);

    console.log(resumen);

}


// juegoMates();

/**
 * 14-Crea un programa de gestión académica.
 * Teniendo en cuenta:
 *   • El objeto JSON de tipo alumno tiene las propiedades “nombre” y “asignaturas”.
 *   • El objeto JSON de tipo asignatura tiene las propiedades “modulo” y “nota”. 
 *   • Disponemos módulos de “DWEC”, “DIW”, “DWES” y “DAW”.
 * Partiendo de un array de al menos 3 alumnos debidamente inicializados. 
 * Crea una función que reciba el array de alumnos y que para cada alumno añada las siguientes 
 * propiedades:
 *    • promociona, valor true si todos los módulos están aprobados, falso en caso contrario.
 *    • media, valor medio del expediente del alumno.
 * Crea una función que reciba el array de alumnos modificado e imprima el listado de alumnos 
 * que promocionan con el formato “Índice-Nombre-Media”.
 * Crea una función que reciba el array de alumnos modificados e imprima el listado de alumnos 
 * que no promocionan con el formato “Índice-Nombre-Pendientes:[pendiente1, pendiente2, etc..]”.
 * Añade el código auxiliar necesario para probar la aplicación
 */
function gestionAcademica() {
    // Objeto Json de alumno
    let alumno1 = {
        nombre: 'Pablo',
        asignaturas: [
            { modulo: 'DWEC', nota: '1', },
            { modulo: 'DIW', nota: '3', },
            { modulo: 'DWES', nota: '6', },
            { modulo: 'DAW', nota: '6' }
        ]
    };
    let alumno2 = {
        nombre: 'Jose',
        asignaturas: [
            { modulo: 'DWEC', nota: '6', },
            { modulo: 'DIW', nota: '9', },
            { modulo: 'DWES', nota: '1', },
            { modulo: 'DAW', nota: '6' }
        ]
    };
    let alumno3 = {
        nombre: 'Antonio',
        asignaturas: [
            { modulo: 'DWEC', nota: '7', },
            { modulo: 'DIW', nota: '7', },
            { modulo: 'DWES', nota: '7', },
            { modulo: 'DAW', nota: '5' }
        ]
    };

    // Array de alumnos
    let alumnos = [alumno1, alumno2, alumno3];

    promociona(alumnos);
    imprimirPromocion(alumnos);
    imprimirNoPromocion(alumnos);
}

function promociona(alumnos) {
    alumnos.map(alumno => {
        let promocion = true;
        let media = 0;
        let suma = 0;
        alumno.asignaturas.map(asignatura => {
            suma += Number(asignatura.nota);
            if (asignatura.nota < 5) {
                promocion = false;
            }
            alumno.promocion = promocion;
        });
        media = suma / 4;
        alumno.media = media;
    });
}

function imprimirPromocion(alumnos) {
    let impresion = [];
    alumnos.map((alumno, index) => {
        if (alumno.promocion === true) {
            impresion.push(`Indice: ${index} - Nombre: ${alumno.nombre} - Media ${alumno.media}`);
        }
    });

    console.log(impresion);
}

function imprimirNoPromocion(alumnos) {
    let impresion = [];

    alumnos.map((alumno, index) => {
        let linea = '';
        if (alumno.promocion === false) {
            linea = `Indice: ${index} - Nombre: ${alumno.nombre} - Pendientes[`;

            alumno.asignaturas.map(asignatura => {
                if (Number(asignatura.nota) < 5) {
                    linea += `${asignatura.modulo}, `;
                }
            });

            // Borrar última coma, no se hacer split()
            if (linea.endsWith(', ')) {
                linea = linea.slice(0, -2);
            }

            linea += ']';
            impresion.push(linea);
        }
    });

    console.log(impresion.join('\n'));

}

// gestionAcademica();


/**
 * 15-Crea un programa de gestión de personal.
 * La entidad “trabajador” tiene las propiedades: “código”, “nombre”, “categoría”,
 * “contratación”.
 * Donde:
 *  • Propiedad “código” tiene el formato “E01”, “E02” y es un valor único identificativo del
 * trabajador. Se asigna automáticamente al crear el trabajador y no puede modificarse.
 *  • Propiedad “nombre” es el nombre del trabajador.
 *  • Propiedad “categoría” puede tomar los valores, 1, 2, 3 y representa el salario base a
 * percibir. Donde 1-1100€, 2-1400€, 3-1900€
 *  • Propiedad “contratación” indica el año de contratación, necesario para calcular la
 * antigüedad.
 *  • El importe de la nomina se calcula en base a la categoría más un 4% por cada año de
 * antigüedad.
 * Se pide:
 * Almacenar en un array los datos de mis trabajadores.
 *  • Listar trabajadores.
 *  • Crear trabajador.
 *  • Borrar trabajador, solicitando el código y confirmación.
 *  • Modificar trabajador, solicitando el código y ofreciendo como valor por defecto el valor actual.
 *  • Calcular nóminas. Listado ordenado por categorías de nominas con un resumen del
 *      importe total de las nóminas de cada categoría, así como el resumen final del importe
 *      total de todas las nóminas de la empresa.
 * Consideraciones:
 *  • Puede/debes tener datos cacheados.
 *  • Implementa un menú para interactuar con la aplicación. Incluye la opción de terminar.
 *  • Añade validaciones.
 *  • Estructura y comenta el código.
 */

// Datos globales
const trabajadores = [];

/**
 * Fución para gestionar personal
 *  Lista - crear - editar - borrar
 */
function gestorPersonal() {
    // Generar Menú
    let peticionUsuario = 0;
    do {
        peticionUsuario = Number(prompt(
            "Gestor de Personal\n" +
            "\t[1] Listar trabajadores\n" +
            "\t[2] Crear trabajador\n" +
            "\t[3] Editar trabajador\n" +
            "\t[4] Borrar trabajador\n" +
            "\t[5] Calcular Nóminas\n" +
            "\t[0] Salir"
        ));

        switch (peticionUsuario) {
            case 1:
                listarTrabajadores();
                break;
            case 2:
                crearTrabajador();
                break;
            case 3:
                editarTrabajador();
                break;
            case 4:
                borrarTrabajador();
                break;
            case 5:
                calcularNominas();
                break;
            case 0:
                alert('Hasta Luego');
                break;

            default:
                alert('El menú no contempla esa acción.');
                break;
        }

    } while (peticionUsuario !== 0);

}

/**
 * Función para listar trabajadores
 */
function listarTrabajadores() {
    if (trabajadores.length === 0) {
        alert("No hay trabajadores.");
        return;
    }

    const lista = trabajadores.map(t =>
        `| Codigo: ${t.codigo} | Nombre: ${t.nombre} | Categoria: ${t.categoria} | Año Contratación ${t.contratacion} |`
    ).join('\n');

    console.log(lista);
}

/**
 * Función para modificar trabajadores
 */
function editarTrabajador() {
    let peticionCodigo = String(prompt('Indique el código del trabajador a modificar'));

    // Hace referencia por lo que si cambia t cambia el objeto del array !!!
    const t = trabajadores.find(x => x.codigo === peticionCodigo);

    if (!t) {
        alert('Trabajador no encontrado');
        return;
    }

    alert(`Modificar trabajador ${t.codigo}`);

    let nombre = prompt('Introduce el nombre del trabajador:', `${String(t.nombre)}`);
    if (!validarNombre(nombre.trim())) {
        alert('El nombre no puede estar vacío.');
        return;
    }

    let categoria = prompt('Introduce la categoría (1, 2, 3):', `${String(t.categoria)}`);
    if (categoria === null) return;
    if (!validarCategoria(Number(categoria))) {
        alert('Categoría inválida. Debe ser 1, 2 o 3.');
        return;
    }

    let anio = prompt('Introduce el año de contratación (ej. 2020):', `${String(t.contratacion)}`);
    if (anio === null) return;

    if (!validarAnio(Number.parseInt(anio, 10))) {
        alert('Año de contratación inválido.');
        return;
    }

    // se modifica los valores
    t.nombre = nombre;
    t.categoria = categoria;
    t.contratacion = anio;

    alert('Se ha modificado el trabajador');
}

/**
 * Funcion para crear trabajadores
 */
function crearTrabajador() {
    let nombre = prompt('Introduce el nombre del trabajador:');
    if (!validarNombre(nombre.trim())) {
        alert('El nombre no puede estar vacío.');
        return;
    }

    let categoria = prompt('Introduce la categoría (1, 2, 3):');
    if (categoria === null) return;
    if (!validarCategoria(Number(categoria))) {
        alert('Categoría inválida. Debe ser 1, 2 o 3.');
        return;
    }

    let anio = prompt('Introduce el año de contratación (ej. 2020):');
    if (anio === null) return;

    // HACER DECIMAL
    if (!validarAnio(Number.parseInt(anio, 10))) {
        alert('Año de contratación inválido.');
        return;
    }

    const codigo = generarCodigo();

    trabajadores.push({
        codigo,
        nombre,
        categoria,
        contratacion: anio,
    });

    alert(`Trabajador creado con código ${codigo}`);
}

/**
 * Funcion para Borrar
 */
function borrarTrabajador() {
    let peticionCodigo = String(prompt('Indique el código del trabajador a modificar'));

    // Hace referencia por lo que si cambia t cambia el objeto del array !!!
    const i = trabajadores.findIndex(x => x.codigo === peticionCodigo);

    if (i === -1) {
        alert('Trabajador no encontrado');
        return;
    }

    const respuesta = confirm(`¿Quiere borrar el trabajador ${trabajadores[i].codigo}?`);

    if (respuesta) {
        trabajadores.splice(i, 1);
        alert('Se ha borrado con éxito el trabajador');
        return;
    }

    alert('No se ha eliminado el trabajador');
}

/**
 * Función calcular nóminas
 */
function calcularNominas() {
    if (trabajadores.length === 0) {
        alert("No hay trabajadores.");
        return;
    }
    // Variables
    const categorias = [undefined, 1100, 1400, 1900];
    let listaPorCategorias = '';
    let sumarTotal = 0;

    for (let i = 1; i < categorias.length; i++) {
        let sumaNominaCategoria = 0;

        listaPorCategorias += `Categoria ${i}:\n`;
        trabajadores.forEach(t => {
            let nomina = 0;
            if (t.categoria == i) {
                listaPorCategorias += `\t   | Codigo: ${t.codigo} | Nombre: ${t.nombre} | Categoria: ${t.categoria} | Año Contratación ${t.contratacion} | `

                // Calculo Nóminas
                nomina = (categorias[i] * (0.04 * diferenciaFechaActual(t.contratacion))) + categorias[i];
                listaPorCategorias += `Nómina: ${nomina.toFixed(2)}$\n`;
                sumaNominaCategoria += Number(nomina.toFixed(2));
            }
        });
        listaPorCategorias += `Total Nóminas: ${sumaNominaCategoria}$\n\n`;

        sumarTotal += Number(sumaNominaCategoria);
    }

    listaPorCategorias += `Total Nóminas Empresa: ${sumarTotal}$`;

    console.log(listaPorCategorias);
}

/**
 * Generar el código identificatorio
 */
function generarCodigo() {
    let ultimoCodigo = 0;

    if (trabajadores.length === 0) return 'E01';

    trabajadores.forEach(trabajador => {
        let num = trabajador.codigo.slice(1); // quito la 'E'
        if (num.charAt(0) === '0') {
            num = num.slice(1);
        }

        if (ultimoCodigo < Number(num)) {
            ultimoCodigo = Number(num);
        }
    });

    return 'E' + (ultimoCodigo + 1 < 10
        ? String(ultimoCodigo + 1).padStart(2, '0')
        : String(ultimoCodigo + 1)
    );
}

/**
 * Función diferencia de años fecha
 */
function diferenciaFechaActual(fecha) {
    let fechaActual = new Date();
    return Math.floor((fechaActual - new Date(String(fecha))) / (1000 * 60 * 60 * 24 * 365));
}

/**
 * Validar Categoria
 */
function validarCategoria(categoria) {
    return Number.isInteger(categoria) && [1, 2, 3].includes(categoria);
}

/**
 * Validar año
 */
function validarAnio(anio) {
    const current = new Date().getFullYear();
    return Number.isInteger(anio) && anio >= 1970 && anio <= current;
}

/**
 * Validar nombre
 */
function validarNombre(nombre) {
    return nombre.trim().length > 0;
}

// gestorPersonal();


function cruzBorgoña(tamaño, figura = 'X') {
    const altura = tamaño;
    const dibujo = [];

    let linea = [];

    for (let i = 0; i <= altura; i++) {
        linea = '';
        for (let j = altura; j >= 0; j--) {
            if ((j - i == 0) || (j + i == altura)) {
                linea += figura;
            } else {
                linea += '   ';
            }
        }
        dibujo.push(linea);
    }

    console.log(dibujo.join('\n'));
    /**
     * [0, 0] [0, 9]
     * [1, 1] [1, 8]
     * [2, 2] [2, 7]
     */
    
}

cruzBorgoña(13, 'X');