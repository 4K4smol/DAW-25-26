// modelos/autor.js
export class Autor {
    constructor(autorId, nombre, nacionalidad, biografia, ...libros) {
        this.autorId = autorId,
            this.nombre = nombre,
            this.nacionalidad = nacionalidad,
            this.biografia = biografia,
            this.libros = libros
    }

    generarHTMLCreacion() {
        const form = `
            <fieldset>
                <legend>Crear Autor</legend>
                <input type="hidden" id="autorId">

                <label>Nombre</label>
                <input type="text" id="nombre" required><br><br>

                <label>Nacionalidad</label>
                <input type="text" id="nacionalidad" required><br><br>

                <label>Biografía:</label><br>
                <textarea id="biografia" rows="10" cols="60"></textarea><br><br>
                <button type="button" id="btn-guardar">Guardar</button>
            </fieldset>
        `;
        return form;
    }

    generarHTMLPropiedades() {

    }

    generarHTMLEdicion() {

    }
}