// modelos/libro.js
export class Libro {
    constructor(libroId = null, titulo = '', ISBN = '', autorId = null, bibliotecaId = null, estaDisponible = 0, prestamos = []) {
        this.libroId = libroId,
        this.titulo = titulo,
        this.ISBN = ISBN,
        this.autorId = autorId,
        this.bibliotecaId = bibliotecaId,
        this.estaDisponible = estaDisponible,
        this.prestamos = prestamos
    }

    generarHTMLCreacion() {
        return `
            <form data-entity="libro" data-mode="crear">
                <fieldset>
                <legend>Crear Libro</legend>

                <label>Título</label>
                <input type="text" name="titulo" required>

                <label>ISBN</label>
                <input type="text" name="isbn" required>

                <label>Autor:</label>
                <select name="autorId" required>
                    <option value="">-- Selecciona un autor --</option>
                    ${autores.map(a => `
                        <option value="${a.autorId}">${a.nombre}</option>
                    `).join("")}
                </select>

                <label>Biblioteca:</label>
                <select name="bibliotecaId" required>
                    <option value="">-- Selecciona una biblioteca --</option>
                    ${bibliotecas.map(b => `
                        <option value="${b.bibliotecaId}">${b.nombre}</option>
                    `).join("")}
                </select>

                <button type="submit">Guardar</button>
                </fieldset>
            </form>
    `;

    }


    generarHTMLPropiedades() {

    }

    generarHTMLEdicion() {
        return `
            <form data-entity="libro" data-mode="editar" data-id="${this.libroId}">
                <fieldset>
                    <legend>Crear Libro</legend>

                    <label>Título</label>
                    <input type="text" name="titulo" required value="${this.titulo}">

                    <label>ISBN</label>
                    <input type="text" name="isbn" required value="${this.ISBN}">

                    <label>Autor:</label>
                    <select name="autorId" required value="${this.autorId}">
                        ${autores.map(a =>
            `<option value="${a.autorId}" ${a.autorId === this.autorId ? "selected" : ""}>
                                ${a.nombre}
                            </option>`
        ).join("")}
                    </select>

                    <label>Biblioteca:</label>
                    <select name="bibliotecaId" required value="${this.bibliotecaId}">
                        ${bibliotecas.map(b =>
            `<option value="${b.bibliotecaId}" ${b.bibliotecaId === this.bibliotecaId ? "selected" : ""}>
                                ${b.nombre}
                            </option>`
        ).join("")}
                    </select>

                    <button type="submit">Guardar</button>
                </fieldset>
            </form>
        `;
    }

    generarHTMLListadoPrestamos() {

    }
}