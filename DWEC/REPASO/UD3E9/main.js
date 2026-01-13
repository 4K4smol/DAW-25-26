// LÓGICA DE NEGOCIO
const $negocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";
    // Función genérica para evitar código repetido
    async function obtenerDatos(endpoint) {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }
        return await response.json();
    }
    async function obtenerNumeroUsuarios() {
        const data = await obtenerDatos('/users');
        return data.length;
    }
    async function obtenerNumeroTodos() {
        const data = await obtenerDatos('/todos');
        return data.length;
    }
    async function obtenerNumeroAlbums() {
        const data = await obtenerDatos('/albums');
        return data.length;
    }
    async function obtenerNumeroPhotos() {
        const data = await obtenerDatos('/photos');
        return data.length;
    }
    async function obtenerNumeroPosts() {
        const data = await obtenerDatos('/posts');
        return data.length;
    }
    async function obtenerNumeroComments() {
        const data = await obtenerDatos('/comments');
        return data.length;
    }
    return {
        obtenerNumeroUsuarios,
        obtenerNumeroTodos,
        obtenerNumeroAlbums,
        obtenerNumeroPhotos,
        obtenerNumeroPosts,
        obtenerNumeroComments
    };
})();

// Con esta función obtengo los números que mostraré después en las tarjetas
async function getDatos() {
    const tarjetas = document.querySelectorAll('.tarjeta');

    setTimeout(async () => {
        try {
            const total = await $negocio.obtenerNumeroUsuarios();
            tarjetas[0].querySelector('.contador').textContent = total;
        } catch {
            tarjetas[0].querySelector('.contador').textContent = 'Error';
        }
    }, 0);

    setTimeout(async () => {
        try {
            const total = await $negocio.obtenerNumeroTodos();
            tarjetas[1].querySelector('.contador').textContent = total;
        } catch {
            tarjetas[1].querySelector('.contador').textContent = 'Error';
        }
    }, 0);

    setTimeout(async () => {
        try {
            const total = await $negocio.obtenerNumeroAlbums();
            tarjetas[2].querySelector('.contador').textContent = total;
        } catch {
            tarjetas[2].querySelector('.contador').textContent = 'Error';
        }
    }, 0);

    setTimeout(async () => {
        try {
            const total = await $negocio.obtenerNumeroPhotos();
            tarjetas[3].querySelector('.contador').textContent = total;
        } catch {
            tarjetas[3].querySelector('.contador').textContent = 'Error';
        }
    }, 0);

    setTimeout(async () => {
        try {
            const total = await $negocio.obtenerNumeroPosts();
            tarjetas[4].querySelector('.contador').textContent = total;
        } catch {
            tarjetas[4].querySelector('.contador').textContent = 'Error';
        }
    }, 0);

    setTimeout(async () => {
        try {
            const total = await $negocio.obtenerNumeroComments();
            tarjetas[5].querySelector('.contador').textContent = total;
        } catch {
            tarjetas[5].querySelector('.contador').textContent = 'Error';
        }
    }, 0);
}

// LÓGICA DE USUARIO
window.addEventListener('load', function () {
    getDatos();
    const tarjetas = document.querySelectorAll('.tarjeta');
    const entidades = ['user', 'todo', 'album', 'photo', 'post', 'comment'];

    // Por cada tarjeta añado un evento click y redirijo a su vista
    tarjetas.forEach((tarjeta, index) => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.addEventListener('click', function () {
            window.location.href = `views/${entidades[index]}/${entidades[index]}.html`;
        });
    });
});