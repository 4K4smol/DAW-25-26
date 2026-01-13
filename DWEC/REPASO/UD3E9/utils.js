const $utils = (function () {

    // Funciones para localStorage
    function guardarEnLocal(clave, valor) {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    function obtenerDeLocal(clave) {
        try {
            const valor = localStorage.getItem(clave);
            return valor ? JSON.parse(valor) : null;
        } catch (error) {
            console.error('Error al obtener de localStorage:', error);
            return null;
        }
    }

    // Funciones para sessionStorage
    function guardarEnSession(clave, valor) {
        try {
            sessionStorage.setItem(clave, JSON.stringify(valor));
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }
    }

    function obtenerDeSession(clave) {
        try {
            const valor = sessionStorage.getItem(clave);
            return valor ? JSON.parse(valor) : null;
        } catch (error) {
            console.error('Error al obtener de sessionStorage:', error);
            return null;
        }
    }

    // Funciones para manipulación del DOM
    function crearElemento(tag, clases = [], contenido = '') {
        const elemento = document.createElement(tag);
        if (clases.length > 0) {
            elemento.classList.add(...clases);
        }
        if (contenido) {
            elemento.textContent = contenido;
        }
        return elemento;
    }

    function mostrarError(mensaje, contenedor) {
        const errorDiv = crearElemento('div', ['mensaje-error'], mensaje);
        contenedor.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    function limpiarContenedor(contenedor) {
        contenedor.innerHTML = '';
    }

    // Función para obtener parámetros de la URL
    function obtenerParametrosURL() {
        const params = new URLSearchParams(window.location.search);
        const resultado = {};
        for (const [key, value] of params.entries()) {
            resultado[key] = value;
        }
        return resultado;
    }

    // Función para navegar con parámetros
    function navegarA(pagina, params = {}) {
        const url = new URL(pagina, window.location.origin);
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        window.location.href = url.toString();
    }

    return {
        guardarEnLocal,
        obtenerDeLocal,
        guardarEnSession,
        obtenerDeSession,
        crearElemento,
        mostrarError,
        limpiarContenedor,
        obtenerParametrosURL,
        navegarA
    };
})();