// LÓGICA DE NEGOCIO - ALBUMS
const $albumNegocio = (function() {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerAlbums(filtro = null) {
        try {
            let url = `${API_BASE}/albums`;
            if (filtro && filtro.userId) {
                url += `?userId=${filtro.userId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener albums:", error.message);
            throw error;
        }
    }

    return {
        obtenerAlbums
    };
})();

// LÓGICA DE INTERFAZ
const $albumUI = (function() {
    let albums = [];
    let albumsFiltrados = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarAlbums();
    }

    function cargarPreferencias() {
        const preferencia = localStorage.getItem('albums_itemsPorPagina');
        if (preferencia) {
            elementosPorPagina = parseInt(preferencia);
            document.querySelector('#itemsPorPagina').value = elementosPorPagina;
        }
    }

    function configurarEventos() {
        const filtroInput = document.querySelector('#filtro');
        const itemsPorPagina = document.querySelector('#itemsPorPagina');

        filtroInput.addEventListener('input', function() {
            filtrarAlbums(this.value);
        });

        itemsPorPagina.addEventListener('change', function() {
            elementosPorPagina = this.value === 'todos' ? albums.length : parseInt(this.value);
            localStorage.setItem('albums_itemsPorPagina', this.value);
            paginaActual = 1;
            mostrarAlbums();
        });
    }

    async function cargarAlbums() {
        try {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');
            
            const contenedor = document.querySelector('#listaAlbums');
            contenedor.innerHTML = '<p>Cargando álbumes...</p>';

            const filtro = userId ? { userId } : null;
            albums = await $albumNegocio.obtenerAlbums(filtro);
            albumsFiltrados = [...albums];
            
            mostrarAlbums();
        } catch (error) {
            mostrarError('Error al cargar los álbumes. Por favor, intente nuevamente.');
        }
    }

    function filtrarAlbums(texto) {
        const textoLower = texto.toLowerCase();
        albumsFiltrados = albums.filter(album => 
            album.title.toLowerCase().includes(textoLower)
        );
        paginaActual = 1;
        mostrarAlbums();
    }

    function mostrarAlbums() {
        const contenedor = document.querySelector('#listaAlbums');
        contenedor.innerHTML = '';

        if (albumsFiltrados.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron álbumes.</p>';
            actualizarPaginador();
            return;
        }

        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = elementosPorPagina === albums.length ? albumsFiltrados.length : inicio + elementosPorPagina;
        const albumsPagina = albumsFiltrados.slice(inicio, fin);

        albumsPagina.forEach(album => {
            const albumDiv = document.createElement('div');
            albumDiv.className = 'item-entidad';
            albumDiv.innerHTML = `
                <div class="item-info">
                    <h3>${album.title}</h3>
                    <p><strong>User ID:</strong> ${album.userId}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="$albumUI.verDetalles(${album.id})">Ver Detalles</button>
                    <button onclick="$albumUI.verFotos(${album.id})">Ver Fotos</button>
                </div>
            `;
            contenedor.appendChild(albumDiv);
        });

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const totalPaginas = Math.ceil(albumsFiltrados.length / elementosPorPagina);
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
        mostrarAlbums();
    }

    function verDetalles(id) {
        sessionStorage.setItem('paginaAnterior', window.location.href);
        window.location.href = `albumDetalle.html?id=${id}`;
    }

    function verFotos(albumId) {
        window.location.href = `../photo/photo.html?albumId=${albumId}`;
    }

    function mostrarError(mensaje) {
        const contenedor = document.querySelector('#listaAlbums');
        contenedor.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        verDetalles,
        verFotos
    };
})();

// LÓGICA DE NEGOCIO - ALBUM DETALLE
const $albumDetalleNegocio = (function() {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerAlbum(id) {
        try {
            const response = await fetch(`${API_BASE}/albums/${id}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener album:", error.message);
            throw error;
        }
    }

    async function actualizarAlbum(id, datos) {
        try {
            const response = await fetch(`${API_BASE}/albums/${id}`, {
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
            console.error("Error al actualizar album:", error.message);
            throw error;
        }
    }

    return {
        obtenerAlbum,
        actualizarAlbum
    };
})();

// LÓGICA DE INTERFAZ - ALBUM DETALLE
const $albumDetalleUI = (function() {
    let albumActual = null;

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            mostrarError('No se especificó un álbum');
            return;
        }

        try {
            albumActual = await $albumDetalleNegocio.obtenerAlbum(id);
            mostrarFormulario();
        } catch (error) {
            mostrarError('Error al cargar el álbum');
        }
    }

    function mostrarFormulario() {
        const formulario = document.querySelector('#formularioAlbum');
        formulario.innerHTML = `
            <div class="form-group">
                <label for="title">Título:</label>
                <input type="text" id="title" value="${albumActual.title}">
            </div>
            <div class="form-group">
                <label for="userId">User ID:</label>
                <input type="text" id="userId" value="${albumActual.userId}" readonly>
            </div>
            <div class="botones">
                <button class="btn-volver" onclick="$albumDetalleUI.volver()">Volver</button>
                <button class="btn-guardar" onclick="$albumDetalleUI.guardar()">Guardar Cambios</button>
            </div>
        `;
    }

    async function guardar() {
        const datos = {
            title: document.querySelector('#title').value,
            userId: albumActual.userId
        };

        try {
            const resultado = await $albumDetalleNegocio.actualizarAlbum(albumActual.id, datos);
            alert(`Álbum actualizado correctamente:\n\n${JSON.stringify(resultado, null, 2)}`);
        } catch (error) {
            alert('Error al actualizar el álbum');
        }
    }

    function volver() {
        const paginaAnterior = sessionStorage.getItem('paginaAnterior');
        if (paginaAnterior) {
            window.location.href = paginaAnterior;
        } else {
            window.location.href = 'album.html';
        }
    }

    function mostrarError(mensaje) {
        const formulario = document.querySelector('#formularioAlbum');
        formulario.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        guardar,
        volver
    };
})();

// Inicialización automática según la página
window.addEventListener('load', function() {
    // Si existe el elemento formularioAlbum, es la página de detalle
    if (document.querySelector('#formularioAlbum')) {
        $albumDetalleUI.init();
    }
    // Si existe el elemento listaAlbums, es la página principal
    else if (document.querySelector('#listaAlbums')) {
        $albumUI.init();
    }
});