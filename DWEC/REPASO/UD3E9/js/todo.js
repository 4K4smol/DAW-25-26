// LÓGICA DE NEGOCIO - TODOS
const $todoNegocio = (function() {
    const API_BASE = "https://jsonplaceholder.typicode.com";

    async function obtenerTodos(filtro = null) {
        try {
            let url = `${API_BASE}/todos`;
            if (filtro && filtro.userId) {
                url += `?userId=${filtro.userId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener todos:", error.message);
            throw error;
        }
    }

    async function obtenerTodo(id) {
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener todo:", error.message);
            throw error;
        }
    }

    async function actualizarTodo(id, datos) {
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
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
            console.error("Error al actualizar todo:", error.message);
            throw error;
        }
    }

    return {
        obtenerTodos,
        obtenerTodo,
        actualizarTodo
    };
})();

// LÓGICA DE INTERFAZ - LISTADO
const $todoUI = (function() {
    let todos = [];
    let todosFiltrados = [];
    let paginaActual = 1;
    let elementosPorPagina = 10;

    function init() {
        cargarPreferencias();
        configurarEventos();
        cargarTodos();
    }

    function cargarPreferencias() {
        const preferencia = localStorage.getItem('todos_itemsPorPagina');
        if (preferencia) {
            elementosPorPagina = parseInt(preferencia);
            document.querySelector('#itemsPorPagina').value = elementosPorPagina;
        }
    }

    function configurarEventos() {
        const filtroInput = document.querySelector('#filtro');
        const itemsPorPagina = document.querySelector('#itemsPorPagina');

        filtroInput.addEventListener('input', function() {
            filtrarTodos(this.value);
        });

        itemsPorPagina.addEventListener('change', function() {
            elementosPorPagina = this.value === 'todos' ? todos.length : parseInt(this.value);
            localStorage.setItem('todos_itemsPorPagina', this.value);
            paginaActual = 1;
            mostrarTodos();
        });
    }

    async function cargarTodos() {
        try {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');
            
            const contenedor = document.querySelector('#listaTodos');
            contenedor.innerHTML = '<p>Cargando tareas...</p>';

            const filtro = userId ? { userId } : null;
            todos = await $todoNegocio.obtenerTodos(filtro);
            todosFiltrados = [...todos];
            
            mostrarTodos();
        } catch (error) {
            mostrarError('Error al cargar las tareas. Por favor, intente nuevamente.');
        }
    }

    function filtrarTodos(texto) {
        const textoLower = texto.toLowerCase();
        todosFiltrados = todos.filter(todo => 
            todo.title.toLowerCase().includes(textoLower)
        );
        paginaActual = 1;
        mostrarTodos();
    }

    function mostrarTodos() {
        const contenedor = document.querySelector('#listaTodos');
        contenedor.innerHTML = '';

        if (todosFiltrados.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron tareas.</p>';
            actualizarPaginador();
            return;
        }

        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = elementosPorPagina === todos.length ? todosFiltrados.length : inicio + elementosPorPagina;
        const todosPagina = todosFiltrados.slice(inicio, fin);

        todosPagina.forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.className = 'item-entidad';
            todoDiv.innerHTML = `
                <div class="item-info">
                    <h3>${todo.title}</h3>
                    <p><strong>Estado:</strong> ${todo.completed ? 'Completada' : 'Pendiente'}</p>
                    <p><strong>User ID:</strong> ${todo.userId}</p>
                </div>
                <div class="item-acciones">
                    <button onclick="$todoUI.verDetalles(${todo.id})">Ver Detalles</button>
                </div>
            `;
            contenedor.appendChild(todoDiv);
        });

        actualizarPaginador();
    }

    function actualizarPaginador() {
        const totalPaginas = Math.ceil(todosFiltrados.length / elementosPorPagina);
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
        mostrarTodos();
    }

    function verDetalles(id) {
        sessionStorage.setItem('paginaAnterior', window.location.href);
        window.location.href = `todoDetalle.html?id=${id}`;
    }

    function mostrarError(mensaje) {
        const contenedor = document.querySelector('#listaTodos');
        contenedor.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        verDetalles
    };
})();

// LÓGICA DE INTERFAZ - DETALLE
const $todoDetalleUI = (function() {
    let todoActual = null;

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            mostrarError('No se especificó una tarea');
            return;
        }

        try {
            todoActual = await $todoNegocio.obtenerTodo(id);
            mostrarFormulario();
        } catch (error) {
            mostrarError('Error al cargar la tarea');
        }
    }

    function mostrarFormulario() {
        const formulario = document.querySelector('#formularioTodo');
        formulario.innerHTML = `
            <div class="form-group">
                <label for="title">Título:</label>
                <input type="text" id="title" value="${todoActual.title}">
            </div>
            <div class="form-group">
                <label for="completed">
                    <input type="checkbox" id="completed" ${todoActual.completed ? 'checked' : ''}>
                    Completada
                </label>
            </div>
            <div class="form-group">
                <label for="userId">User ID:</label>
                <input type="text" id="userId" value="${todoActual.userId}" readonly>
            </div>
            <div class="botones">
                <button class="btn-volver" onclick="$todoDetalleUI.volver()">Volver</button>
                <button class="btn-guardar" onclick="$todoDetalleUI.guardar()">Guardar Cambios</button>
            </div>
        `;
    }

    async function guardar() {
        const datos = {
            title: document.querySelector('#title').value,
            completed: document.querySelector('#completed').checked,
            userId: todoActual.userId
        };

        try {
            const resultado = await $todoNegocio.actualizarTodo(todoActual.id, datos);
            alert(`Tarea actualizada correctamente:\n\n${JSON.stringify(resultado, null, 2)}`);
        } catch (error) {
            alert('Error al actualizar la tarea');
        }
    }

    function volver() {
        const paginaAnterior = sessionStorage.getItem('paginaAnterior');
        if (paginaAnterior) {
            window.location.href = paginaAnterior;
        } else {
            window.location.href = 'todo.html';
        }
    }

    function mostrarError(mensaje) {
        const formulario = document.querySelector('#formularioTodo');
        formulario.innerHTML = `<div class="mensaje-error">${mensaje}</div>`;
    }

    return {
        init,
        guardar,
        volver
    };
})();

// Inicializar según la página
window.addEventListener('load', function() {
    // Si existe el elemento listaTodos, estamos en la página de listado
    if (document.querySelector('#listaTodos')) {
        $todoUI.init();
    }
    // Si existe el elemento formularioTodo, estamos en la página de detalle
    else if (document.querySelector('#formularioTodo')) {
        $todoDetalleUI.init();
    }
});