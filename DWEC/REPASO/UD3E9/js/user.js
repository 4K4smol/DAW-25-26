// LÓGICA DE NEGOCIO - USERS
const $userNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerUsuarios(filtro = null) {
        try {
            let url = `${API_BASE}/users`;
            if (filtro && filtro.userId) {
                url += `?id=${filtro.userId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message);
            throw error;
        }
    }

    async function obtenerUsuario(id) {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener usuario:", error.message);
            throw error;
        }
    }

    async function actualizarUsuario(id, datos) {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`, {
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
            console.error("Error al actualizar usuario:", error.message);
            throw error;
        }
    }

    return {
        obtenerUsuarios,
        obtenerUsuario,
        actualizarUsuario
    };
})();

// Realizo también una autoinvocada para la lógica de la interfaz de usuario
const $userUI = (function () {
    let usuarios = [];
    let usuariosFiltrados = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarUsuarios();
    }

    //Esto, lo utilizo para el paginador y saber cuantos elementos mostrar
    function cargarPreferencias() {
        const preferencia = localStorage.getItem('users_itemsPorPagina');
        if (preferencia) {
            elementosPorPagina = parseInt(preferencia);
            document.querySelector('#itemsPorPagina').value = elementosPorPagina;
        }
    }

    // Aqui configuro tanto el evento para el cambio de items que se muestran por página como
    // los filtros introducidos 
    function configurarEventos() {
        const filtroInput = document.querySelector('#filtro');
        const itemsPorPagina = document.querySelector('#itemsPorPagina');

        filtroInput.addEventListener('input', function () {
            filtrarUsuarios(this.value);
        });

        itemsPorPagina.addEventListener('change', function () {
            elementosPorPagina = this.value === 'todos' ? usuarios.length : parseInt(this.value);
            localStorage.setItem('users_itemsPorPagina', this.value);
            paginaActual = 1;
            mostrarUsuarios();
        });
    }

    //Función para mostrar los usuarios que se han encontrado
    async function cargarUsuarios() {
        try {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');

            const contenedor = document.querySelector('#listaUsuarios');
            contenedor.innerHTML = '<p>Cargando usuarios...</p>';

            const filtro = userId ? { userId } : null;
            usuarios = await $userNegocio.obtenerUsuarios(filtro);
            usuariosFiltrados = [...usuarios];

            mostrarUsuarios();
        } catch (error) {
            mostrarError('Error al cargar los usuarios. Por favor, intente nuevamente.');
        }
    }

    //Como tengo un array global para usuarios filtrados modifico el array introduciendole el filtro
    function filtrarUsuarios(texto) {
        const textoLower = texto.toLowerCase();
        usuariosFiltrados = usuarios.filter(user =>
            user.name.toLowerCase().includes(textoLower)
        );
        paginaActual = 1;
        mostrarUsuarios();
    }

    //Muestro los usuarios, cabe destacar que antes miro si usuariosFiltrados es 0 ya que asi veo si tengo que filtrar o no
    function mostrarUsuarios() {
        const contenedor = document.querySelector('#listaUsuarios');
        contenedor.innerHTML = '';

        if (usuariosFiltrados.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron usuarios.</p>';
            actualizarPaginador();
            return;
        }

        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = elementosPorPagina === usuarios.length ? usuariosFiltrados.length : inicio + elementosPorPagina;
        const usuariosPagina = usuariosFiltrados.slice(inicio, fin);

        usuariosPagina.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'item-entidad';
            userDiv.innerHTML = `
                <div class="item-info">
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Ciudad:</strong> ${user.address.city}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="$userUI.verDetalles(${user.id})">Ver Detalles</button>
                    <button onclick="$userUI.verTodos(${user.id})">Ver Pendientes</button>
                    <button onclick="$userUI.verAlbums(${user.id})">Ver Álbumes</button>
                    <button onclick="$userUI.verPosts(${user.id})">Ver Posts</button>
                </div>
            `;
            contenedor.appendChild(userDiv);
        });

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const totalPaginas = Math.ceil(usuariosFiltrados.length / elementosPorPagina);
        const paginador = document.querySelector('#paginador');
        paginador.innerHTML = '';

        if (totalPaginas <= 1) return;

        // Botón anterior
        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = 'Anterior';
        btnAnterior.disabled = paginaActual === 1;
        btnAnterior.onclick = () => cambiarPagina(paginaActual - 1);
        paginador.appendChild(btnAnterior);

        // Números de página
        const info = document.createElement('span');
        info.textContent = ` Página ${paginaActual} de ${totalPaginas} `;
        paginador.appendChild(info);

        // Botón siguiente
        const btnSiguiente = document.createElement('button');
        btnSiguiente.textContent = 'Siguiente';
        btnSiguiente.disabled = paginaActual === totalPaginas;
        btnSiguiente.onclick = () => cambiarPagina(paginaActual + 1);
        paginador.appendChild(btnSiguiente);
    }

    function cambiarPagina(nuevaPagina) {
        paginaActual = nuevaPagina;
        mostrarUsuarios();
    }

    function verDetalles(id) {
        sessionStorage.setItem('paginaAnterior', window.location.href);
        window.location.href = `userDetalle.html?id=${id}`;
    }

    function verTodos(userId) {
        // Desde views/user/ necesito ir a views/todo/
        window.location.href = `../todo/todo.html?userId=${userId}`;
    }

    function verAlbums(userId) {
        // Desde views/user/ necesito ir a views/album/
        window.location.href = `../album/album.html?userId=${userId}`;
    }

    function verPosts(userId) {
        // Desde views/user/ necesito ir a views/post/
        window.location.href = `../post/post.html?userId=${userId}`;
    }

    function mostrarError(mensaje) {
        const contenedor = document.querySelector('#listaUsuarios');
        contenedor.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        verDetalles,
        verTodos,
        verAlbums,
        verPosts
    };
})();

//LOGICA NEGOCIO - USER DETALLE
const $userDetalleNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerUsuario(id) {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener usuario:", error.message);
            throw error;
        }
    }

    async function actualizarUsuario(id, datos) {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`, {
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
            console.error("Error al actualizar usuario:", error.message);
            throw error;
        }
    }

    return {
        obtenerUsuario,
        actualizarUsuario
    };
})();

//LOFICA INTERFAZ - USER DETALLE
const $userDetalleUI = (function () {
    let usuarioActual = null;

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            mostrarError('No se especificó un usuario');
            return;
        }

        try {
            usuarioActual = await $userDetalleNegocio.obtenerUsuario(id);
            mostrarFormulario();
        } catch (error) {
            mostrarError('Error al cargar el usuario');
        }
    }

    function mostrarFormulario() {
        const formulario = document.querySelector('#formularioUsuario');
        formulario.innerHTML = `
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" id="name" value="${usuarioActual.name}">
                    </div>
                    <div class="form-group">
                        <label for="username">Usuario:</label>
                        <input type="text" id="username" value="${usuarioActual.username}">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" value="${usuarioActual.email}">
                    </div>
                    <div class="form-group">
                        <label for="phone">Teléfono:</label>
                        <input type="text" id="phone" value="${usuarioActual.phone}">
                    </div>
                    <div class="form-group">
                        <label for="website">Website:</label>
                        <input type="text" id="website" value="${usuarioActual.website}">
                    </div>
                    <div class="form-group">
                        <label for="city">Ciudad:</label>
                        <input type="text" id="city" value="${usuarioActual.address.city}">
                    </div>
                    <div class="botones">
                        <button class="btn-volver" onclick="$userDetalleUI.volver()">Volver</button>
                        <button class="btn-guardar" onclick="$userDetalleUI.guardar()">Guardar Cambios</button>
                    </div>
                `;
    }

    async function guardar() {
        const datos = {
            name: document.querySelector('#name').value,
            username: document.querySelector('#username').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value,
            website: document.querySelector('#website').value,
            address: {
                ...usuarioActual.address,
                city: document.querySelector('#city').value
            }
        };

        try {
            const resultado = await $userDetalleNegocio.actualizarUsuario(usuarioActual.id, datos);
            alert(`Usuario actualizado correctamente:\n\n${JSON.stringify(resultado, null, 2)}`);
        } catch (error) {
            alert('Error al actualizar el usuario');
        }
    }

    function volver() {
        const paginaAnterior = sessionStorage.getItem('paginaAnterior');
        if (paginaAnterior) {
            window.location.href = paginaAnterior;
        } else {
            window.location.href = 'user.html';
        }
    }

    function mostrarError(mensaje) {
        const formulario = document.querySelector('#formularioUsuario');
        formulario.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        guardar,
        volver
    };
})();

// Inicializar cuando cargue la página
window.addEventListener('load', function() {
    if (document.querySelector('#listaUsuarios')) {
        $userUI.init();
    }

    if (document.querySelector('#formularioUsuario')) {
        $userDetalleUI.init();
    }
});