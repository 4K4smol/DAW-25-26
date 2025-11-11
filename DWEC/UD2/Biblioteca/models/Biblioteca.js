// modelos/Biblioteca.js
export class Biblioteca {
    constructor(bibliotecaId, nombre, ubicacion, ...libros) {
        this.bibliotecaId = bibliotecaId,
        this.nombre = nombre,
        this.ubicacion = ubicacion,
        this.libros = libros
    }

    generarHTMLCreacion() {
        const form = `
            <form>
                <fieldset>
                    <legend>Crear Biblioteca</legend>
                    <input type="hidden" id="bibliotecaId">

                    <label>Nombre</label>
                    <input type="text" id="nombre" required><br><br>

                    <label>Ubicación</label>
                    <input type="text" id="ubicacion" required><br><br>

                    <button type="button" id="btn-guardar">Guardar</button>
                </fieldset>
            </form>
        `;
        return form;
    }

    generarHTMLEdicion() {

    }
}