import { ManejadorEventos } from "./ui/ManejadorEventos.js";
import { alumnos } from "../data/datos.js";

export class GestionarAlumnos {
    #alumnos = alumnos;
    #contenedor = document.querySelector('#contenedor');
    #resultado;

    iniciarApp() {
        this.#generarHTMLBase();
        const manejadorEventos = new ManejadorEventos(this.#contenedor, this);
        manejadorEventos.detectarEventos();
    }

    renderDetalles() {
        this.#resultado.innerHTML = '';
        this.#resultado.append(this.#generarHTMLDetalles());
    }

    #generarHTMLBase() {
        const $alternador = document.createElement('div');
        $alternador.className = 'alternador-vista-alumnos';
        $alternador.id = 'alternador-vista-alumnos';

        const $resultado = document.createElement('div');
        $resultado.className = 'resultado';
        $resultado.id = 'resultado';
        this.#resultado = $resultado;

        const botonDetalles = document.createElement('button');
        botonDetalles.type = 'button';
        botonDetalles.textContent = 'Alumnos Detalles';
        botonDetalles.dataset.action = 'detalles';

        const botonFicha = document.createElement('button');
        botonFicha.type = 'button';
        botonFicha.textContent = 'Alumnos Ficha';
        botonFicha.dataset.action = 'ficha';

        $alternador.append(botonDetalles, botonFicha);


        this.#contenedor.append($alternador,$resultado);
    }

    #generarHTMLDetalles() {
        // Nombre, curso (truncado si es largo), teléfono, email (truncado si es largo).

        const header = ['Nombre', 'Curso', 'Teléfono', 'email'];

        const tabla = document.createElement('div');
        tabla.className = "tabla";
        tabla.id = "tabla";

        const tablaHeader = document.createElement('div');
        tablaHeader.className = "tabla-header";
        tablaHeader.id = "tabla-header";

        // Header
        header.forEach(h => {
            const cellHeader = document.createElement('div');
            cellHeader.className = 'tabla-header-cell';
            cellHeader.textContent = h;

            tablaHeader.append(cellHeader);
        });

        const tablaBody = document.createElement('div');
        tablaBody.className = "tabla-body";
        tablaBody.id = "tabla-body";

        this.#alumnos.forEach(a => {
            const cellBody = document.createElement('div');
            cellBody.className = 'tabla-body-cell';

            const cNombre = document.createElement('div');
            cNombre.className = 'tabla-body-cell-prop'
            cNombre.textContent = a.nombre;

            const cCurso = document.createElement('div');
            cCurso.className = 'tabla-body-cell-prop';
            cCurso.textContent = a.curso.length > 10 ? (a.curso.slice(0, 10) + '...') : a.curso

            const cTlf = document.createElement('div');
            cTlf.className = 'tabla-body-cell-prop';
            cTlf.textContent = a.telefono;

            const cEmail = document.createElement('div');
            cEmail.className = 'tabla-body-cell-prop'
            cEmail.textContent = a.email.length > 10 ? (a.email.slice(0, 10) + '...') : a.email

            cellBody.append(cNombre, cCurso, cTlf, cEmail);
            tablaBody.append(cellBody);
        });

        tabla.append(tablaHeader, tablaBody);

        return tabla;
    }
}