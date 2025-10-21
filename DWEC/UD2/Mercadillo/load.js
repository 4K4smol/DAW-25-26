window.addEventListener("load", () => {
    // Cachear los elementos fijos
    const $ = {
        // General
        salida: document.getElementById("salida"),

        // Agregar
        agregarNombre: document.getElementById("agregar-nombre"),
        agregarCantidad: document.getElementById("agregar-cantidad"),
        agregarPrecio: document.getElementById("agregar-precio"),
        agregarCategoria: document.getElementById("agregar-categoria"),
        btnAgregar: document.getElementById("btn-agregar"),

        // Eliminar
        eliminarNombre: document.getElementById("eliminar-nombre"),
        btnEliminar: document.getElementById("btn-eliminar"),

        // Actualizar
        actualizarNombre: document.getElementById("actualizar-nombre"),
        actualizarCantidad: document.getElementById("actualizar-cantidad"),
        btnActualizar: document.getElementById("btn-actualizar"),

        // Buscar
        buscarNombre: document.getElementById("buscar-nombre"),
        btnBuscar: document.getElementById("btn-buscar"),

        // Ordenar
        btnOrdenar: document.getElementById("btn-ordenar"),

        // Imprimir
        btnImprimir: document.getElementById("btn-imprimir"),

        // Filtrar
        filtrarCategoria: document.getElementById("filtrar-categoria"),
        btnFiltrar: document.getElementById("btn-filtrar"),
    };

    // Rehacer pintar => para imprimir invenatario (listar, ordenador precio y filtrar categoría)
    const pintar = (dato) => {
        if (typeof dato == "string") {
            $.salida.textContent = dato;
            return;
        }

        let resultado = [];
        for (const key in dato) {
            resultado.push(`${key}: ${dato[key]}`);
        }
        $.salida.textContent = resultado.join(", ");
    };

    // Agregar
    $.btnAgregar.addEventListener("click", () => {
        const resultado = JSON.parse($negocio.agregarProducto(
            $.agregarNombre.value,
            $.agregarCantidad.value,
            $.agregarPrecio.value,
            $.agregarCategoria.value
        ));

        pintar(resultado ?? "No se agregó");
    });

    // Eliminar
    $.btnEliminar.addEventListener("click", () => {
        const nombre = $.eliminarNombre.value;

        if (confirm(`¿Seguro que deseas eliminar "${nombre}"?`)) {
            const resultado = { Valor: $negocio.eliminarProducto(nombre) };
            pintar(resultado);
        }
    });

    // Buscar
    $.btnBuscar.addEventListener("click", () => {
        const resultado = JSON.parse($negocio.buscarProducto($.buscarNombre.value));
        pintar(resultado ?? "No se ha encontrado el producto");
    });

    // Actualizar
    $.btnActualizar.addEventListener("click", () => {
        const resultado = JSON.parse(
            $negocio.actualizarInventario($.actualizarNombre.value, $.actualizarCantidad.value)
        );
        pintar(resultado ?? "No se ha actualizado el producto");
    });

    // Ordenar
    $.btnOrdenar.addEventListener("click", () => {
        const resultado = JSON.parse($negocio.ordenarProductosPorPrecio());
        pintar(resultado ?? "No se ha encontrado ningún producto");
    });

    // Imprimir
    $.btnImprimir.addEventListener("click", () => {
        const resultado = JSON.parse($negocio.imprimirInventario());
        for (const object of resultado) {
            pintar(object);
        }
    });

    // Filtrar Categoria
    $.btnFiltrar.addEventListener("click", () => {
        const resultado = JSON.parse(
            $negocio.filtrarProductosPorCategoria($.filtrarCategoria.value)
        );
        pintar(resultado ?? 'No se ha encontrado el inventario');
    });
});
