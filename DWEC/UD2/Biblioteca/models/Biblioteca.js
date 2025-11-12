// modelos/Biblioteca.js
export class Biblioteca {
    constructor(bibliotecaId = null, nombre = '', ubicacion = '', libros = []) {
        this.bibliotecaId = bibliotecaId,
            this.nombre = nombre,
            this.ubicacion = ubicacion,
            this.libros = libros
    }

    generarHTMLCreacion() {
        return `
            <form data-entity="biblioteca" data-mode="crear">
                <fieldset>
                <legend>Crear Biblioteca</legend>

                <label>Nombre</label>
                <input type="text" name="nombre" required value="">

                <label>Ubicación</label>
                <input type="text" name="ubicacion" required value="">

                <button type="button">Guardar</button>
                </fieldset>
            </form>
        `;
    }

    generarHTMLEdicion() {
        return `
            <form data-entity="biblioteca" data-mode="editar" data-id="${this.id}">
                <fieldset>
                <legend>Editar Biblioteca #${this.id}</legend>

                <label>Nombre</label>
                <input type="text" name="nombre" required value="${this.nombre}">

                <label>Ubicación</label>
                <input type="text" name="ubicacion" required value="${this.ubicacion}">

                <button type="button">Actualizar</button>
                <button type="button" data-action="cancelar-edicion">Cancelar</button>
                </fieldset>
            </form>
        `;
    }

}