"use strict";
class NodoInspector {
    #nodoActual = null;

    constructor(nodoInicial = document.body) {
        this.#actualizarNodo(nodoInicial);
    }

    get esRaiz() {
        return this.#nodoActual === document.body;
    }

    get tieneHijos() {
        return this.#nodoActual.firstElementChild.length > 0;
    }

    get esPrimerHijo() {
        const padre = this.#nodoActual.parentElement;
        if (!padre) return true;
        return this.#nodoActual === padre.firstElementChild;
    }

    get esUltimoHijo() {
        const padre = this.#nodoActual.parentElement;
        if (!padre) return true;
        return this.#nodoActual === padre.lastElementChild;
    }

    // Métodos Públicos
    obtenerInfo() {

    }

    irRaiz() {
        if (this.esRaiz) return null;
        this.#actualizarNodo(document.body);
        return this.#nodoActual;
    }

    irPadre() {
        if (this.#nodoActual === document.body) return null;
        const padre = this.#nodoActual.parentElement;
        if (padre) this.#actualizarNodo(padre);
        return this.#nodoActual;
    }

    irPrimerHijo() {
        if (!this.tieneHijos) return null;
        const primerHijo = this.#nodoActual.firstElementChild;
        if (primerHijo) this.#actualizarNodo(primerHijo);
        return this.#nodoActual;
    }

    irUltimoHijo() {
        if (!this.tieneHijos) return null;
        const ultimoHijo = this.#nodoActual.lastElementChild;
        if (ultimoHijo) this.#actualizarNodo(ultimoHijo);
        return this.#nodoActual;
    }

    irAnteriorHermano() {
        if (this.esRaiz) return null;
        const anteriorHermano = this.#nodoActual.previousElementSibling;
        if (anteriorHermano) this.#actualizarNodo(anteriorHermano);
        return this.#nodoActual;
    }

    irSiguienteHermano() {
        if (this.esRaiz) return null;
        const siguienteHermano = this.#nodoActual.nextElementSibling;
        if (siguienteHermano) this.#actualizarNodo(siguienteHermano);
        return this.#nodoActual;
    }

    // Métodos Privados
    #actualizarNodo(nuevoSeleccionado) {
        if (!nuevoSeleccionado || nuevoSeleccionado === this.#nodoActual) return;

        // Quitar resaltado anterior
        if (this.#nodoActual && this.#nodoActual.classList) {
            this.#nodoActual.classList.remove("resaltado");
        }

        this.#nodoActual = nuevoSeleccionado;

        // Aplicar resaltado nuevo
        if (this.#nodoActual.classList) {
            this.#nodoActual.classList.add("resaltado");
        }
    }
}


const $depurador = (() => {
    const panelFlotanteDepurador = document.createElement('div');
    panelFlotanteDepurador.classList.add('panel-depurador'); // clase CSS

    panelFlotanteDepurador.innerHTML = `
        <h1>Depurador</h1>
        <button type="button" data-action="navegar-raiz">Raíz</button>
        <button type="button" data-action="navegar-padre">Padre</button>
        <button type="button" data-action="navegar-primer-hijo">Primer Hijo</button>
        <button type="button" data-action="navegar-ultimo-hijo">Último Hijo</button>
        <button type="button" data-action="navegar-hermano-anterior">Hermano Anterior</button>
        <button type="button" data-action="navegar-hermano-siguiente">Hermano Siguiente</button>
    `;// <button type="button" data-action="activar-desactivar-panel"></button>
    document.body.appendChild(panelFlotanteDepurador);


    panelFlotanteDepurador.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const nodo = new NodoInspector(document.body);

        const action = btn.dataset.action;
        console.log(action);
        switch (action) {
            case "navegar-raiz":
                console.log(nodo.irRaiz());
                break;

            case "navegar-padre":
                console.log(nodo.irPadre());
                break;

            case "navegar-primer-hijo":
                console.log(nodo.irPrimerHijo());
                break;

            case "navegar-ultimo-hijo":
                console.log(nodo.irUltimoHijo());
                break;

            case "navegar-hermano-siguiente":
                console.log(nodo.irSiguienteHermano());
                break;

            case "navegar-hermano-anterior":
                console.log(nodo.irAnteriorHermano());
                break;

            case "activar-desactivar-panel":

                break;

            default:
                alert('Error');
        }
    });

    function activarDepuracion() {
    }

    function desactivarDepuracion() {
        panelFlotanteDepurador.setAttribute("hidden", true);
    }

    return {
        activarDepuracion,
        desactivarDepuracion
    }
})();


