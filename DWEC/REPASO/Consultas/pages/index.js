"use strict"
import { request } from '../utils/https.js';

const $API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * OBTENER LOS DATOS DE CADA ENTIDAD
 * INSERTAR LOS DATOS EN LA ENTIDAD LONGITUD
 * REALIZRA CLICK EN LA TARJETA PARA VIAJAR A CADA ENTIDAD .html
 */

const $logicaIndex = (() => {
    async function obtenerDatos(entidad) {
        const data = await request(`${$API_URL}/${entidad}`);
        return data;
    }

    return {
        obtenerDatos
    };
})();

// UI //
window.addEventListener('load', () => {
    const $tarjetas = document.querySelectorAll('.tarjeta');

    $tarjetas.forEach(t => {
        const entidad = t.firstElementChild.textContent.trim().toLowerCase();
        const $contadorTarjeta = t.lastElementChild;

        $logicaIndex
            .obtenerDatos(entidad)
            .then((res) => $contadorTarjeta.textContent = res.length)
            .catch((err) => console.error("ERROR:", err));

        t.addEventListener('click', () => {
            window.location.href = `./views/${entidad}/${entidad}.html`;
        });
    });
});