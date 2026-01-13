// LÓGICA DE NEGOCIO - PHOTOS
const $photoNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerPhotos(filtro = null) {
        try {
            let url = `${API_BASE}/photos`;
            if (filtro && filtro.albumId) {
                url += `?albumId=${filtro.albumId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener photos:", error.message);
            throw error;
        }
    }

    return {
        obtenerPhotos
    };
})();

// LÓGICA DE INTERFAZ
const $photoUI = (function () {
    let photos = [];
    let photosFiltradas = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarPhotos();
    }

    function cargarPreferencias() {
        const preferencia = localStorage.getItem('photos_itemsPorPagina');
        if (preferencia) {
            elementosPorPagina = parseInt(preferencia);
            document.querySelector('#itemsPorPagina').value = elementosPorPagina;
        }
    }

    function configurarEventos() {
        const filtroInput = document.querySelector('#filtro');
        const itemsPorPagina = document.querySelector('#itemsPorPagina');

        filtroInput.addEventListener('input', function () {
            filtrarPhotos(this.value);
        });

        itemsPorPagina.addEventListener('change', function () {
            elementosPorPagina = this.value === 'todos' ? photos.length : parseInt(this.value);
            localStorage.setItem('photos_itemsPorPagina', this.value);
            paginaActual = 1;
            mostrarPhotos();
        });
    }

    async function cargarPhotos() {
        try {
            const params = new URLSearchParams(window.location.search);
            const albumId = params.get('albumId');

            const contenedor = document.querySelector('#listaPhotos');
            contenedor.innerHTML = '<p>Cargando fotos...</p>';

            const filtro = albumId ? { albumId } : null;
            photos = await $photoNegocio.obtenerPhotos(filtro);
            photosFiltradas = [...photos];

            mostrarPhotos();
        } catch (error) {
            mostrarError('Error al cargar las fotos. Por favor, intente nuevamente.');
        }
    }

    function filtrarPhotos(texto) {
        const textoLower = texto.toLowerCase();
        photosFiltradas = photos.filter(photo =>
            photo.title.toLowerCase().includes(textoLower)
        );
        paginaActual = 1;
        mostrarPhotos();
    }

    function mostrarPhotos() {
        const contenedor = document.querySelector('#listaPhotos');
        contenedor.innerHTML = '';

        if (photosFiltradas.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron fotos.</p>';
            actualizarPaginador();
            return;
        }

        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = elementosPorPagina === photos.length ? photosFiltradas.length : inicio + elementosPorPagina;
        const photosPagina = photosFiltradas.slice(inicio, fin);

        photosPagina.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'item-entidad item-photo';
            photoDiv.innerHTML = `
                <img src="${photo.thumbnailUrl}" alt="${photo.title}" class="thumbnail">
                <div class="item-info">
                    <h3>${photo.title}</h3>
                    <p><strong>Album ID:</strong> ${photo.albumId}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="$photoUI.verDetalles(${photo.id})">Ver Detalles</button>
                </div>
            `;
            contenedor.appendChild(photoDiv);
        });

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const totalPaginas = Math.ceil(photosFiltradas.length / elementosPorPagina);
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
        mostrarPhotos();
    }

    function verDetalles(id) {
        sessionStorage.setItem('paginaAnterior', window.location.href);
        window.location.href = `photoDetalle.html?id=${id}`;
    }

    function mostrarError(mensaje) {
        const contenedor = document.querySelector('#listaPhotos');
        contenedor.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        verDetalles
    };
})();

//LOGICA DE NEGOCIO - PHOTO DETALLE
const $photoDetalleNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerPhoto(id) {
        try {
            const response = await fetch(`${API_BASE}/photos/${id}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener photo:", error.message);
            throw error;
        }
    }

    async function actualizarPhoto(id, datos) {
        try {
            const response = await fetch(`${API_BASE}/photos/${id}`, {
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
            console.error("Error al actualizar photo:", error.message);
            throw error;
        }
    }

    return {
        obtenerPhoto,
        actualizarPhoto
    };
})();

//LOGICA DE INTERFAZ - PHOTO DETALLE
const $photoDetalleUI = (function () {
    let photoActual = null;

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            mostrarError('No se especificó una foto');
            return;
        }

        try {
            photoActual = await $photoDetalleNegocio.obtenerPhoto(id);
            console.log(photoActual);
            mostrarFormulario();
        } catch (error) {
            mostrarError('Error al cargar la foto');
        }
    }

    function mostrarFormulario() {
        const formulario = document.querySelector('#formularioPhoto');
        formulario.innerHTML = `
                    <div class="thumbnail-container">
                        <img src="${photoActual.thumbnailUrl}" alt="${photoActual.title}" id="thumbnail">
                    </div>
                    <div class="form-group">
                        <label for="title">Título:</label>
                        <input type="text" id="title" value="${photoActual.title}">
                    </div>
                    <div class="form-group">
                        <label for="albumId">Album ID:</label>
                        <input type="text" id="albumId" value="${photoActual.albumId}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="url">URL:</label>
                        <input type="text" id="url" value="${photoActual.url}" readonly>
                    </div>
                    <div class="botones">
                        <button class="btn-volver" onclick="$photoDetalleUI.volver()">Volver</button>
                        <button class="btn-guardar" onclick="$photoDetalleUI.guardar()">Guardar Cambios</button>
                    </div>
                `;
    }

    async function guardar() {
        const datos = {
            title: document.querySelector('#title').value,
            albumId: photoActual.albumId,
            url: photoActual.url,
            thumbnailUrl: photoActual.thumbnailUrl
        };

        try {
            const resultado = await $photoDetalleNegocio.actualizarPhoto(photoActual.id, datos);
            alert(`Foto actualizada correctamente:\n\n${JSON.stringify(resultado, null, 2)}`);
        } catch (error) {
            alert('Error al actualizar la foto');
        }
    }

    function volver() {
        const paginaAnterior = sessionStorage.getItem('paginaAnterior');
        if (paginaAnterior) {
            window.location.href = paginaAnterior;
        } else {
            window.location.href = 'photo.html';
        }
    }

    function mostrarError(mensaje) {
        const formulario = document.querySelector('#formularioPhoto');
        formulario.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        guardar,
        volver
    };
})();

window.addEventListener('load', () => {
    if (document.querySelector("#formularioPhoto")) {
        $photoDetalleUI.init();
    }

    if (document.querySelector("#listaPhotos")) {
        $photoUI.init();
    }
});