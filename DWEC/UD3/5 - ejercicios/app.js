"use strict";

/**
 * A partir de la clase Persona, con la siguiente estructura:
 *       • Campos: “nombre”, “nacimiento” (fecha) y “hobbies“ (lista de cadenas).
 *       • Propiedades: “edad” (get), computada a partir de nacimiento.
 *       • Métodos: “Saludar”, devuelve la cadena “Hola, me llamo NOMBRE y me gusta LISTA_HOBBIES”.
 *   Se pide:
 *       Define y prueba la clase “Persona” según los 3 formatos de definición de clases
 *       soportados por JS: objeto literal, función constructora y ES6.
 *
 */

// Objeto
const persona = {
    nombre: "eloy",
    nacimiento: new Date("1970-01-01"),
    hobbies: ['natacion', 'musica', 'baile'],

    get edad() {
        const fechaActual = Date.now(); // milisegundos
        const diffTime = fechaActual - this.nacimiento; // milisegundos
        const edad = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); // convertir ms → años
        return edad;
    },


    saludar: function () {
        return `Hola, me llamo ${this.nombre}, y me gusta ${this.hobbies.join(', ')}`;
    }
}

// console.log(persona.Saludar());

// Constructora
function Persona(nombre, nacimiento, ...hobbies) {
    this.nombre = nombre;
    this.nacimiento = new Date(nacimiento);
    this.hobbies = hobbies;

    this.saludar = function () {
        return `Hola, me llamo ${this.nombre}, y me gusta ${this.hobbies.join(', ')}`;
    }
}

Object.defineProperty(Persona.prototype, "edad", {
    get: function () {
        const fechaActual = Date.now();
        const diffTime = fechaActual - this.nacimiento;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    }
});

const yo = new Persona('eloy', '2004-01-01', 'a', 'b');

// console.log(yo.getEdad());

// Clase
class PersonaES6 {
    constructor(nombre, nacimiento, ...hobbies) {
        this.nombre = nombre;
        this.nacimiento = new Date(nacimiento);
        this.hobbies = hobbies;
    }

    saludar() {
        return `Hola, me llamo ${this.nombre}, y me gusta ${this.hobbies.join(', ')}`;
    }

    get edad() {
        const fechaActual = Date.now();
        const diffTime = fechaActual - this.nacimiento;
        const edad = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        return edad;
    }
}

const persona1 = new PersonaES6('eloy', '2001-12-12', 'a', 'b');

// console.log(persona1.saludar());


/**
 * Primera parte
 *  Crea una función constructora “Animal” que reciba como parámetros el tipo y el nombre.
 *  Contamos con 3 tipos de animal: “animal” (genérico), “perro” y “gato”.
 *  La clase contará con 3 métodos:
 *       • “comer”, devuelve la cadena “nombre está comiendo”.
 *       • “dormir”, devuelve la cadena “nombre está durmiendo”.
 *       • “hacerRuido”, devuelve una cadena distinta según el tipo, por ejemplo,
 *         para el tipo perro “nombre hace guau”.
 *  Codifícalo de la manera más correcta posible
 */
function Animal(tipo, nombre) {
    this.tipo = tipo;
    this.nombre = nombre;

    this.comer = function () {
        return `${this.nombre} esta comiendo`;
    }

    this.dormir = function () {
        return `${this.nombre} esta durmiendo`;
    }

    this.hacerRuido = function () {
        switch (this.tipo) {
            case 'perro':
                return `${this.nombre} esta ladrando`;
            case 'gato':
                return `${this.nombre} esta maullando`;
            default:
                return `${this.nombre} esta haciendo ruido`;
        }
    }
}

const perro1 = new Animal('perro', 'Sanxe');
const gato1 = new Animal('gato', 'POllo');
const pato1 = new Animal('pato', 'si');

// console.log(perro1.hacerRuido());
// console.log(gato1.hacerRuido());
// console.log(pato1.hacerRuido());

// Segunda parte
// Vuelve a codificar la clase Animal empleando herencia con el formato ES6.
// Opcional (aunque recomendado)
// Vuelve a codificar la primera parte empleando herencia en funciones constructoras, te
// recuerdo que hay una propiedad especial llamada “__proto__” (no confundir con
// “prototype”).
// Añade el código necesario para probar el código desarrollado, y no seas cutre borrando
// una parte para desarrollar la siguiente (crea varios ficheros .js).

class Animal {
    constructor(tipo, nombre) {
        this.tipo = tipo;
        this.nombre = nombre;
    }

    comer() {
        return `${this.nombre} esta comiendo`;
    }
    dormir() {
        return `${this.nombre} esta durmiendo`;
    }
    hacerRuido() {
        return `${this.nombre} esta gritando`;
    }
}

class Perro extends Animal {
    constructor(nombre) {
        super('perro', nombre);
    }

    hacerRuido() {
        return `${this.nombre} esta ladrando`;
    }
}
class Gato extends Animal {
    constructor(nombre) {
        super('gato', nombre);
    }

    hacerRuido() {
        return `${this.nombre} esta maullando`;
    }
}