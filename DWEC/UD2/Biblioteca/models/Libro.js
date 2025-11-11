// modelos/libro.js
export class Libro {
    constructor(libroId, titulo, ISBN, autorId, bibliotecaId, estaDisponible, ...prestamos) {
        this.libroId = libroId,
        this.titulo = titulo,
        this.ISBN = ISBN,
        this.autorId = autorId,
        this.bibliotecaId = bibliotecaId,
        this.estaDisponible = estaDisponible,
        this.prestamos = prestamos
    }

    generarHTMLCreacion() {
        const form = `
            <form>
                <fieldset>
                    <legend>Crear Libro</legend>
                    <input type="hidden" id="libroId">
                    <input type="hidden" id="estaDisponible" value="0">

                    <label>Titulo</label>
                    <input type="text" id="titulo" required><br><br>

                    <label>ISBN</label>
                    <input type="text" id="isbn" required><br><br>

                    <label>Autor:</label><br>
                    <select id="selector-autor" required>

                    </select><br><br>
                    <label>Biblioteca:</label><br>
                    <select id="selector-biblioteca" required>

                    </select><br><br>
                    <button type="button" id="btn-guardar">Guardar</button>
                </fieldset>
            </form>
        `;
        return form;
    }

    generarHTMLPropiedades() {

    }

    generarHTMLEdicion() {

    }

    generarHTMLListadoPrestamos() {

    }
}