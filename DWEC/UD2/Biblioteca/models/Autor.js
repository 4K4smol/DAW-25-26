// modelos/autor.js
export class Autor {
    constructor(autorId = null, nombre = '', nacionalidad = '', biografia = '', libros = []) {
        this.autorId = autorId,
            this.nombre = nombre,
            this.nacionalidad = nacionalidad,
            this.biografia = biografia,
            this.libros = libros
    }

    generarHTMLCreacion() {
        return `
            <form data-entity="autor" data-mode="crear">
                <fieldset>
                <legend>Crear Autor</legend>

                    <label>Nombre</label>
                    <input type="text" name="nombre" required value="">

                    <label>Nacionalidad</label>
                    <input type="text" name="nacionalidad" required value="">

                    <label>Biografía:</label>
                    <textarea name="biografia" rows="10" cols="60"></textarea>

                    <button type="button">Guardar</button>
                </fieldset>
            </form>
        `;
    }

    generarHTMLPropiedades() {
        const libros = this.libros ?? null;
        const headers = (libros != null) ? Object.keys(libros[0]) : null;
        const filas = (libros != null) ? libros.map(l => Object.values(l)) : null;

        return `
            <p>Nombre: ${this.nombre}</p>
            <p>Nacionalidad: ${this.nacionalidad}</p>
            <p>Biografia:</p>
            <textarea>${this.biografia}</textarea>
            <br><br>
            <div class="table">
                <p>Libros:</p>
                <div class="header">
                    ${headers.map(h => `<div class="header-child">${h}</div>`).join('')}
                </div>
                <div class="filas">
                    ${filas.map(fila => `
                        <div class="fila">
                            ${fila.map(f => `<div class="fila-child">${f}</div>`).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generarHTMLEdicion() {
        return `
            <form data-entity="autor" data-mode="crear" data-id="${this.autorId}">
                <fieldset>
                <legend>Crear Autor</legend>

                    <label>Nombre</label>
                    <input type="text" name="nombre" required value="${this.nombre}">

                    <label>Nacionalidad</label>
                    <input type="text" name="nacionalidad" required value="${this.nacionalidad}">

                    <label>Biografía:</label>
                    <textarea name="biografia" rows="10" cols="60">
                        ${this.biografia ?? ""}
                    </textarea>

                    <button type="button">Guardar</button>
                </fieldset>
            </form>
        `;
    }
}