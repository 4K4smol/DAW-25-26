// LÓGICA DE NEGOCIO - COMMENTS
const $commentNegocio = (function() {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerComments(filtro = null) {
        try {
            let url = `${API_BASE}/comments`;
            if (filtro && filtro.postId) {
                url += `?postId=${filtro.postId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener comments:", error.message);
            throw error;
        }
    }

    return {
        obtenerComments
    };
})();

// LÓGICA DE INTERFAZ
const $commentUI = (function() {
    let comments = [];
    let commentsFiltrados = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarComments();
    }

    function cargarPreferencias() {
        const preferencia = localStorage.getItem('comments_itemsPorPagina');
        if (preferencia) {
            elementosPorPagina = parseInt(preferencia);
            document.querySelector('#itemsPorPagina').value = elementosPorPagina;
        }
    }

    function configurarEventos() {
        const filtroInput = document.querySelector('#filtro');
        const itemsPorPagina = document.querySelector('#itemsPorPagina');

        filtroInput.addEventListener('input', function() {
            filtrarComments(this.value);
        });

        itemsPorPagina.addEventListener('change', function() {
            elementosPorPagina = this.value === 'todos' ? comments.length : parseInt(this.value);
            localStorage.setItem('comments_itemsPorPagina', this.value);
            paginaActual = 1;
            mostrarComments();
        });
    }

    async function cargarComments() {
        try {
            const params = new URLSearchParams(window.location.search);
            const postId = params.get('postId');
            
            const contenedor = document.querySelector('#listaComments');
            contenedor.innerHTML = '<p>Cargando comentarios...</p>';

            const filtro = postId ? { postId } : null;
            comments = await $commentNegocio.obtenerComments(filtro);
            commentsFiltrados = [...comments];
            
            mostrarComments();
        } catch (error) {
            mostrarError('Error al cargar los comentarios. Por favor, intente nuevamente.');
        }
    }

    function filtrarComments(texto) {
        const textoLower = texto.toLowerCase();
        commentsFiltrados = comments.filter(comment => 
            comment.name.toLowerCase().includes(textoLower) ||
            comment.email.toLowerCase().includes(textoLower)
        );
        paginaActual = 1;
        mostrarComments();
    }

    function mostrarComments() {
        const contenedor = document.querySelector('#listaComments');
        contenedor.innerHTML = '';

        if (commentsFiltrados.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron comentarios.</p>';
            actualizarPaginador();
            return;
        }

        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = elementosPorPagina === comments.length ? commentsFiltrados.length : inicio + elementosPorPagina;
        const commentsPagina = commentsFiltrados.slice(inicio, fin);

        commentsPagina.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'item-entidad';
            commentDiv.innerHTML = `
                <div class="item-info">
                    <h3>${comment.name}</h3>
                    <p><strong>Email:</strong> ${comment.email}</p>
                    <p>${comment.body.substring(0, 100)}...</p>
                    <p><strong>Post ID:</strong> ${comment.postId}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="$commentUI.verDetalles(${comment.id})">Ver Detalles</button>
                </div>
            `;
            contenedor.appendChild(commentDiv);
        });

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const totalPaginas = Math.ceil(commentsFiltrados.length / elementosPorPagina);
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
        mostrarComments();
    }

    function verDetalles(id) {
        sessionStorage.setItem('paginaAnterior', window.location.href);
        window.location.href = `commentDetalle.html?id=${id}`;
    }

    function mostrarError(mensaje) {
        const contenedor = document.querySelector('#listaComments');
        contenedor.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        verDetalles
    };
})();

//LOGICA DE NEGOCIO - COMMENT DETALLE
const $commentDetalleNegocio = (function () {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerComment(id) {
        const response = await fetch(`${API_BASE}/comments/${id}`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    }

    async function actualizarComment(id, datos) {
        const response = await fetch(`${API_BASE}/comments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    }

    return {
        obtenerComment,
        actualizarComment
    };
})();

//LOGICA INTERFAZ - COMMENT DETALLE
const $commentDetalleUI = (function () {
    let commentActual = null;

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
            mostrarError("No se especificó un comentario");
            return;
        }

        try {
            commentActual = await $commentDetalleNegocio.obtenerComment(id);
            mostrarFormulario();
        } catch {
            mostrarError("Error al cargar el comentario");
        }
    }

    function mostrarFormulario() {
        const formulario = document.querySelector("#formularioComment");
        formulario.innerHTML = `
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" id="name" value="${commentActual.name}">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" id="email" value="${commentActual.email}">
            </div>
            <div class="form-group">
                <label>Comentario:</label>
                <textarea id="body">${commentActual.body}</textarea>
            </div>
            <div class="form-group">
                <label>Post ID:</label>
                <input type="text" value="${commentActual.postId}" readonly>
            </div>
            <div class="botones">
                <button class="btn-volver" onclick="$commentDetalleUI.volver()">Volver</button>
                <button class="btn-guardar" onclick="$commentDetalleUI.guardar()">Guardar Cambios</button>
            </div>
        `;
    }

    async function guardar() {
        const datos = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            body: document.querySelector("#body").value,
            postId: commentActual.postId
        };

        try {
            const res = await $commentDetalleNegocio.actualizarComment(commentActual.id, datos);
            alert("Comentario actualizado:\n\n" + JSON.stringify(res, null, 2));
        } catch {
            alert("Error al actualizar el comentario");
        }
    }

    function volver() {
        const paginaAnterior = sessionStorage.getItem("paginaAnterior");
        window.location.href = paginaAnterior || "comment.html";
    }

    function mostrarError(mensaje) {
        document.querySelector("#formularioComment").innerHTML =
            `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        guardar,
        volver
    };
})();

window.addEventListener("load", () => {
    if (document.querySelector("#listaComments")) {
        $commentUI.init();
    }

    if (document.querySelector("#formularioComment")) {
        $commentDetalleUI.init();
    }
});
