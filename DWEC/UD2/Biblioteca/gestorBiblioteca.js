// gestorBiblioteca.js
import { Libro } from './models/Libro.js';
import { Autor } from './models/Autor.js';
import { Biblioteca } from "./models/Biblioteca.js";
import { datos } from "./datos.js";

const bibliotecas = datos.bibliotecas;
const autores = datos.autores;
const libros = datos.libros;

console.log(bibliotecas[0], autores, libros);

/**
 * • generarHTMLListadoAutores(): Listado con los autores. Incluye opciones de
menú para: crear, ver, editar, borrar.
• generarHTMLListadoBibliotecas(): Listado con las bibliotecas. Incluye opciones
de menú para: crear, ver, editar, borrar.
• generarHTMLListadoLibros(): Listado con los libros. Incluye opciones de menú
para: crear, ver, editar, borrar.
• buscarLibrosPorTitulo(parámetro/s), buscarLibrosPorAutor(parámetro/s):
Devuelven la colección de libros o autores que cumplen con los criterios de
filtrado.
• generarHTMLResultadoBuscador(parámetro/s): Listado con los resultados de
una búsqueda, el formato varía según el tipo de búsqueda.
• buscarLibro(libroId), buscarAutor(autorId), buscarBiblioteca(bibliotecaId):
Buscan en las colecciones el objeto correspondiente según su ID.
• crearLibro(libro), crearAutor(autor), crearBiblioteca(biblioteca): Añade en las
colecciones el objeto correspondiente. Debes gestionar con un incremental por
clase el valor del ID.
• borrarLibro(libroId), borrarAutor(autorId), borrarBiblioteca(bibliotecaId):
Elimina en las colecciones el objeto correspondiente según su ID.
• devolverPrestamo(libro), crearPrestamo(libro): Devuelve el libro si actualmente
está prestado. Crea un nuevo préstamo si el libro esta disponible. 
 */
const $biblio = (() => {

    function generarHTMLListadoAutores() {

    }

    function generarHTMLListadoBibliotecas() {

    }

    function generarHTMLListadoLibros() {

    }

    function buscarLibrosPorTitulo(params) {

    }
    function buscarLibrosPorAutor(params) {

    }

    function generarHTMLResultadoBuscador(params) {

    }
    function buscarLibro(libroId) {
        const libro = libros.find(l => l.libroId == libroId);
        return libro;
    }
    function buscarAutor(autorId) {
        const autor = autores.find(a => a.autorId == autorId);
        return autor;
    }
    function buscarBiblioteca(bibliotecaId) {
        const biblioteca = bibliotecas.find(b => b.bibliotecaId == bibliotecaId);
        return biblioteca;
    }
    function crearLibro(libro) {
        const ultimoId = libros.length > 0 ? Math.max(libros.map(a => a.autorId)) : 1;
        libro.libroId = ultimoId++;
        libros.push(libro);
    }
    function crearAutor(autor) {
        const ultimoId = autores.length > 0 ? Math.max(autores.map(a => a.autorId)) : 1;
        autor.autorId = ultimoId++;
        autores.push(autor);
    }
    function crearBiblioteca(biblioteca) {
        const ultimoId = bibliotecas.length > 0 ? Math.max(bibliotecas.map(a => a.autorId)) : 1;
        biblioteca.bibliotecaId = ultimoId++;
        bibliotecas.push(biblioteca);
    }
    function borrarLibro(libroId) {
        const index = libros.map(l => l.libroId).indexOf(libroId);
        libros.splice(index, 1);
    }
    function borrarAutor(autorId) {
        const index = autores.map(a => a.autorId).indexOf(autorId);
        autores.splice(index, 1);
    }
    function borrarBiblioteca(bibliotecaId) {
        const index = bibliotecas.map(b => b.bibliotecaId).indexOf(bibliotecaId);
        bibliotecas.splice(index, 1);
    }
    function devolverPrestamo(libro) {

    }
    function crearPrestamo(libro) {

    }

    return {
        generarHTMLListadoAutores,
        generarHTMLListadoBibliotecas,
        generarHTMLListadoLibros,
        buscarLibrosPorTitulo,
        buscarLibrosPorAutor,
        generarHTMLResultadoBuscador,
        buscarLibro,
        buscarAutor,
        buscarBiblioteca,
        crearLibro,
        crearAutor,
        crearBiblioteca,
        borrarLibro,
        borrarAutor,
        borrarBiblioteca,
        devolverPrestamo,
        crearPrestamo
    }
})();