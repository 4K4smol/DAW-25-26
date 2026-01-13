// LÓGICA DE NEGOCIO - POSTS
const $postNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerPosts(filtro = null) {
        try {
            let url = `${API_BASE}/posts`;
            if (filtro && filtro.userId) {
                url += `?userId=${filtro.userId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener posts:", error.message);
            throw error;
        }
    }

    return {
        obtenerPosts
    };
})();

// LÓGICA DE INTERFAZ
const $postUI = (function () {
    let posts = [];
    let postsFiltrados = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarPosts();
    }

    function cargarPreferencias() {
        const preferencia = localStorage.getItem('posts_itemsPorPagina');
        if (preferencia) {
            elementosPorPagina = parseInt(preferencia);
            document.querySelector('#itemsPorPagina').value = elementosPorPagina;
        }
    }

    function configurarEventos() {
        const filtroInput = document.querySelector('#filtro');
        const itemsPorPagina = document.querySelector('#itemsPorPagina');

        filtroInput.addEventListener('input', function () {
            filtrarPosts(this.value);
        });

        itemsPorPagina.addEventListener('change', function () {
            elementosPorPagina = this.value === 'todos' ? posts.length : parseInt(this.value);
            localStorage.setItem('posts_itemsPorPagina', this.value);
            paginaActual = 1;
            mostrarPosts();
        });
    }

    async function cargarPosts() {
        try {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');

            const contenedor = document.querySelector('#listaPosts');
            contenedor.innerHTML = '<p>Cargando posts...</p>';

            const filtro = userId ? { userId } : null;
            posts = await $postNegocio.obtenerPosts(filtro);
            postsFiltrados = [...posts];

            mostrarPosts();
        } catch (error) {
            mostrarError('Error al cargar los posts. Por favor, intente nuevamente.');
        }
    }

    function filtrarPosts(texto) {
        const textoLower = texto.toLowerCase();
        postsFiltrados = posts.filter(post =>
            post.title.toLowerCase().includes(textoLower)
        );
        paginaActual = 1;
        mostrarPosts();
    }

    function mostrarPosts() {
        const contenedor = document.querySelector('#listaPosts');
        contenedor.innerHTML = '';

        if (postsFiltrados.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron posts.</p>';
            actualizarPaginador();
            return;
        }

        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = elementosPorPagina === posts.length ? postsFiltrados.length : inicio + elementosPorPagina;
        const postsPagina = postsFiltrados.slice(inicio, fin);

        postsPagina.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'item-entidad';
            postDiv.innerHTML = `
                <div class="item-info">
                    <h3>${post.title}</h3>
                    <p>${post.body.substring(0, 100)}...</p>
                    <p><strong>User ID:</strong> ${post.userId}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="$postUI.verDetalles(${post.id})">Ver Detalles</button>
                    <button onclick="$postUI.verComentarios(${post.id})">Ver Comentarios</button>
                </div>
            `;
            contenedor.appendChild(postDiv);
        });

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const totalPaginas = Math.ceil(postsFiltrados.length / elementosPorPagina);
        const paginador = document.querySelector('#paginador');
        paginador.innerHTML = '';

        if (totalPaginas <= 1) return;

        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = 'Anterior';
        btnAnterior.disabled = paginaActual === 1;
        btnAnterior.onclick = () => cambiarPagina(paginaActual - 1);
        paginador.appendChild(btnAnterior);

        const info = document.createElement('span');
        info.textContent = ` Página ${paginaActual} de ${totalPaginas} `;
        paginador.appendChild(info);

        const btnSiguiente = document.createElement('button');
        btnSiguiente.textContent = 'Siguiente';
        btnSiguiente.disabled = paginaActual === totalPaginas;
        btnSiguiente.onclick = () => cambiarPagina(paginaActual + 1);
        paginador.appendChild(btnSiguiente);
    }

    function cambiarPagina(nuevaPagina) {
        paginaActual = nuevaPagina;
        mostrarPosts();
    }

    function verDetalles(id) {
        sessionStorage.setItem('paginaAnterior', window.location.href);
        window.location.href = `postDetalle.html?id=${id}`;
    }

    function verComentarios(postId) {
        window.location.href = `../comment/comment.html?postId=${postId}`;
    }

    function mostrarError(mensaje) {
        const contenedor = document.querySelector('#listaPosts');
        contenedor.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        verDetalles,
        verComentarios
    };
})();

//LOGICA NEGOCIO - POST DETALLE
const $postDetalleNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerPost(id) {
        try {
            const response = await fetch(`${API_BASE}/posts/${id}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener post:", error.message);
            throw error;
        }
    }

    async function actualizarPost(id, datos) {
        try {
            const response = await fetch(`${API_BASE}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al actualizar post:", error.message);
            throw error;
        }
    }

    return {
        obtenerPost,
        actualizarPost
    };
})();

//LOGICA INTERFAZ - POST DETALLE
const $postDetalleUI = (function () {
    let postActual = null;

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            mostrarError('No se especificó un post');
            return;
        }

        try {
            postActual = await $postDetalleNegocio.obtenerPost(id);
            mostrarFormulario();
        } catch (error) {
            mostrarError('Error al cargar el post');
        }
    }

    function mostrarFormulario() {
        const formulario = document.querySelector('#formularioPost');
        formulario.innerHTML = `
                    <div class="form-group">
                        <label for="title">Título:</label>
                        <input type="text" id="title" value="${postActual.title}">
                    </div>
                    <div class="form-group">
                        <label for="body">Contenido:</label>
                        <textarea id="body">${postActual.body}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="userId">User ID:</label>
                        <input type="text" id="userId" value="${postActual.userId}" readonly>
                    </div>
                    <div class="botones">
                        <button class="btn-volver" onclick="$postDetalleUI.volver()">Volver</button>
                        <button class="btn-guardar" onclick="$postDetalleUI.guardar()">Guardar Cambios</button>
                    </div>
                `;
    }

    async function guardar() {
        const datos = {
            title: document.querySelector('#title').value,
            body: document.querySelector('#body').value,
            userId: postActual.userId
        };

        try {
            const resultado = await $postDetalleNegocio.actualizarPost(postActual.id, datos);
            alert(`Post actualizado correctamente:\n\n${JSON.stringify(resultado, null, 2)}`);
        } catch (error) {
            alert('Error al actualizar el post');
        }
    }

    function volver() {
        const paginaAnterior = sessionStorage.getItem('paginaAnterior');
        if (paginaAnterior) {
            window.location.href = paginaAnterior;
        } else {
            window.location.href = 'post.html';
        }
    }

    function mostrarError(mensaje) {
        const formulario = document.querySelector('#formularioPost');
        formulario.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        guardar,
        volver
    };
})();

window.addEventListener('load', () => {
    if (document.querySelector("#formularioPost")) {
        $postDetalleUI.init();
    }

    if (document.querySelector("#listaPosts")) {
        $postUI.init();
    }
});