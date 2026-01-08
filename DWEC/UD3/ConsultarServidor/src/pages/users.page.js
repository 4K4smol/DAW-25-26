import $ from '../utils/dom.js';
import { http } from '../utils/http.js';

(() => {
    const BASE = "https://jsonplaceholder.typicode.com";

    const $limit = Number($('#limit').n.value);
    const $status = $('#status');

    init();

    async function init() {
        try {
            setStatus('Cargando datos...');

            const registros = await cargarRegistros($limit);
            renderRegistros(registros);
            setStatus('');
        } catch (err) {
            console.error(err);
            $('#status').n.textContent = 'Error cargando usuarios';
        }
    }

    async function cargarRegistros(limite) {
        const results = await http.get(`${BASE}/users`);

        if (!limite || limite === 0) return results;

        return results.slice(0, limite);
    }

    function renderRegistros(registros) {
        const $tbody = $('#tbody').n;
        $tbody.innerHTML = '';

        registros.forEach(u => {
            $tbody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td>${u.address?.city ?? ''}</td>
                    <td><a href="${BASE}/users/${u.id}">Ver</a></td>
                </tr>
            `);
        });
    }


    function setStatus(msg) {
        if ($status.n) $status.n.textContent = msg || "";
    }
})();