// gestorBiblioteca.js
import { Libro } from './models/Libro.js';
import { Autor } from './models/Autor.js';
import { Biblioteca } from "./models/Biblioteca.js";
import { datos } from "./datos.js";

const bibliotecas = datos.bibliotecas;
const autores = datos.autores;
const libros = datos.libros;

console.log(bibliotecas[0], autores, libros);

window.addEventListener('DOMContentLoaded', () => {
    const $menu = document.querySelector('#menu');
    const $buscador = document.querySelector('#buscador');
    const $app = document.querySelector('#app');



    function renderBibliotecas(text) {
        $app.innerHTML = text;
    }

    // menú
    $menu.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const a = btn.dataset.action;
        switch (a) {
            case 'listar-autores':
                renderBibliotecas($biblio.generarHTMLListadoAutores(autores));

                const $tabla = document.querySelector('.table');
                console.log($tabla);

                break;
            case 'listar-libros':
                renderBibliotecas($biblio.generarHTMLListadoLibros(libros));
                break;
            case 'listar-bibliotecas':
                renderBibliotecas($biblio.generarHTMLListadoBibliotecas(bibliotecas));
                break;
            default:
                break;
        }
    });

});


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
        if (!autores || autores.length === 0) {
            return `<p>No hay autores registrados.</p>`;
        }

        const headers = ["Nombre", "Nacionalidad", "Biografia", "Acciones"];

        return `
            <h2>Listado de Autores</h2>
            <button type="button" data-action="autor-crear">Añadir Autor</button><br><br>

            <div class="table" data-entity="autor">

                <div class="header">
                    ${headers.map(h => `<div class="header-child">${h}</div>`).join('')}
                </div>

                <div class="filas">
                    ${autores.map(a => `
                        <div class="fila" data-id="${a.autorId}">
                            <div class="fila-child">${a.nombre}</div>
                            <div class="fila-child">${a.nacionalidad}</div>
                            <div class="fila-child">${a.biografia}</div>

                            <div class="fila-child">
                                <button data-action="autor-ver" data-id="${a.autorId}">Ver</button>
                                <button data-action="autor-editar" data-id="${a.autorId}">Editar</button>
                                <button data-action="autor-borrar" data-id="${a.autorId}">Borrar</button>
                            </div>
                        </div>
                    `).join('')}
                </div>

            </div>
        `;
    }

    function generarHTMLListadoBibliotecas(bibliotecas) {
        if (!bibliotecas || bibliotecas.length === 0) {
            return `<p>No hay bibliotecas registradas.</p>`;
        }

        const headers = ["Nombre", "Ubicación", "Acciones"];

        return `
            <h2>Listado de Bibliotecas</h2>
            <button type="button" data-action="biblio-crear">Añadir biblioteca</button><br><br>
            <div class="table" data-entity="biblioteca">

                <div class="header">
                    ${headers.map(h => `<div class="header-child">${h}</div>`).join('')}
                </div>

                <div class="filas">
                    ${bibliotecas.map(b => `
                        <div class="fila" data-id="${b.bibliotecaId}">
                            <div class="fila-child">${b.nombre}</div>
                            <div class="fila-child">${b.ubicacion}</div>

                            <div class="fila-child">
                                <button data-action="biblio-ver" data-id="${b.bibliotecaId}">Ver</button>
                                <button data-action="biblio-editar" data-id="${b.bibliotecaId}">Editar</button>
                                <button data-action="biblio-borrar" data-id="${b.bibliotecaId}">Borrar</button>
                            </div>
                        </div>
                    `).join('')}
                </div>

            </div>
        `;
    }


    function generarHTMLListadoLibros() {
        if (!libros || libros.length === 0) {
            return `<p>No hay libros registradas.</p>`;
        }

        const headers = ["Titulo", "ISBN", "Acciones"];

        return `
            <h2>Listado de Libros</h2>
            <button type="button" data-action="libro-crear">Añadir Libro</button><br><br>

            <div class="table" data-entity="libro">

                <div class="header">
                    ${headers.map(h => `<div class="header-child">${h}</div>`).join('')}
                </div>

                <div class="filas">
                    ${libros.map(l => `
                        <div class="fila" data-id="${l.libroId}">
                            <div class="fila-child">${l.titulo}</div>
                            <div class="fila-child">${l.ISBN}</div>

                            <div class="fila-child">
                                <button data-action="libro-ver" data-id="${l.libroId}">Ver</button>
                                <button data-action="libro-editar" data-id="${l.libroId}">Editar</button>
                                <button data-action="libro-borrar" data-id="${l.libroId}">Borrar</button>
                            </div>
                        </div>
                    `).join('')}
                </div>

            </div>
        `;
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
        const ultimoId = libros.length > 0
            ? Math.max(...libros.map(l => l.libroId))
            : 0;

        libro.libroId = ultimoId + 1;
        libros.push(libro);
    }

    function crearAutor(autor) {
        const ultimoId = autores.length > 0
            ? Math.max(...autores.map(a => a.autorId))
            : 0;

        autor.autorId = ultimoId + 1;
        autores.push(autor);
    }

    function crearBiblioteca(biblioteca) {
        const ultimoId = bibliotecas.length > 0
            ? Math.max(...bibliotecas.map(b => b.bibliotecaId))
            : 0;

        biblioteca.bibliotecaId = ultimoId + 1;
        bibliotecas.push(biblioteca);
    }

    function borrarLibro(libroId) {
        const index = libros.findIndex(l => l.libroId == libroId);
        if (index === -1) return;
        libros.splice(index, 1);
    }

    function borrarAutor(autorId) {
        const index = autores.findIndex(a => a.autorId == autorId);
        if (index === -1) return;
        autores.splice(index, 1);
    }

    function borrarBiblioteca(bibliotecaId) {
        const index = bibliotecas.findIndex(b => b.bibliotecaId == bibliotecaId);
        if (index === -1) return;
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