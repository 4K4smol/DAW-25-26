export class ManejadorEventos {
    #contenedor = null;

    constructor(contenedor) {
        this.#contenedor = contenedor;
    }

    detectarEventos() {
        this.#contenedor.addEventListener("click", () => {

        });
    }

    #manejarEventos(e) {
        const btn = e.target.closest('button[data-action]');
        const row = e.target.closest('');

        if (btn) {
            return;
        }


    }

    #seleccionarAlumno(fila) {
        
    }
}