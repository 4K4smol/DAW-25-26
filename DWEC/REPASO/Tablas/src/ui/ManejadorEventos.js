"use strict"

export class ManejadorEventos {
    #contenedor = null;
    #gestor = null;

    constructor(contenedor, gestor) {
        this.#contenedor = contenedor;
        this.#gestor = gestor;
    }

    detectarEventos() {
        this.#contenedor.addEventListener('click', (e) => {
            this.#manejarEventos(e);
        });
        this.#contenedor.addEventListener('mouseover', (e) => {
            this.#manejarHovers(e);
        });
    }

    #manejarEventos(e) {
        const btn = e.target.closest('button[data-action]');
        const row = e.target.closest('.tabla-body-cell');

        if (!btn && !row) return;

        // Click en botones
        if (btn) {
            const accion = btn.dataset.action;

            switch (accion) {
                case 'detalles':
                    this.#gestor.renderDetalles();
                    return;
                case 'ficha':
                    this.#gestor.renderFicha?.();
                    return;
                default:
                    return;
            }
        }

        // Filas
        if (row) {
            if (row.classList.contains('selected-click')) {
                row.classList.remove('selected-click');
            } else {
                const selectedClick = this.#contenedor.querySelector('.selected-click');
                if (selectedClick)  {
                    selectedClick.classList.remove('selected-click');
                    selectedClick.classList.remove('selected');
                }

                row.classList.add('selected-click');
            }
        }
    }

    #manejarHovers(e) {
        const row = e.target.closest('.tabla-body-cell');
        const selected = this.#contenedor.querySelector('.selected-click');

        if (row && !selected) {
            if (row.classList.contains('selected')) {
                row.classList.remove('selected');
            } else {
                const selected = this.#contenedor.querySelector('.selected');
                if (selected) selected.classList.remove('selected');

                row.classList.add('selected');
            }
        }
    }

}