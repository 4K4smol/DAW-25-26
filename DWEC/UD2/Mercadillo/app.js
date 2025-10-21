const $negocio = (() => {
    // Definir Variables
    // Usamos objeto en lugar de array para claves por nombre
    const inventario = {};

    /**
     * Función para añadir un producto
     * 
     * @param {string} nombre 
     * @param {number} cantidad 
     * @param {number} precio 
     * @param {string} categoria 
     * @returns {Array<Object>} Inventario
     */
    function agregarProducto(nombre, cantidad, precio, categoria) {
        if (inventario[nombre]) return alert('Ya existe este producto');
        inventario[nombre] = { categoria, cantidad, precio };
        return JSON.stringify(inventario[nombre] ? { nombre, ...inventario[nombre] } : null);
    }

    /**
     * Función para eliminar un producto
     * 
     * @param {string} nombre 
     * @returns {void}
     */
    function eliminarProducto(nombre) {
        if (!inventario[nombre]) return alert("El producto no existe");
        return delete inventario[nombre];
    }

    /**
     * Función para buscar un objeto por su nombre
     *
     * @param {string} nombre 
     * @returns 
     */
    function buscarProducto(nombre) {
        return JSON.stringify(inventario[nombre] ? { nombre, ...inventario[nombre] } : null);
    }

    /**
     * Función para actualizar la cantidad de un producto
     * 
     * @param {string} nombre 
     * @param {number} cantidad 
     * @returns 
     */
    function actualizarInventario(nombre, cantidadNueva) {
        if (inventario[nombre] == undefined) return null;
        inventario[nombre].cantidad = cantidadNueva;
        return JSON.stringify(inventario[nombre] ? { nombre, ...inventario[nombre] } : null);
    }

    /**
     * Función para ordenar el inventario
     *
     * @returns 
     */
    function ordenarProductosPorPrecio() {
        const InventarioOrdenado = Object.entries(inventario).map(([nombre, producto]) => ({ nombre, ...producto }))
            .sort((a, b) => a.precio - b.precio);
        return JSON.stringify(InventarioOrdenado);
    }

    /**
     * Función para devolver inventario con el valor del total => (cantidad * precio)
     * 
     * @returns {JSON} Inventario
     */
    function imprimirInventario() {
        const inventarioTotales = Object.entries(inventario).map(([nombre, ...producto]) => {
            const total = producto.cantidad * producto.precio;
            return {
                nombre,
                categoria: producto.categoria,
                cantidad: producto.cantidad,
                precio: producto.precio,
                total: Number(total.toFixed(2))
            };
        });
        return JSON.stringify(inventarioTotales);
    }

    /**
     * Función que devuelve los productos según categoría.
     * 
     * @param {string} categoria Categoría de los productos a filtrar
     */
    function filtrarProductosPorCategoria(categoria) {
        const cat = String(categoria || '').toLowerCase();
        const inventarioFiltradoCategoria = Object.entries(inventario)
            .filter(([, producto]) => (producto.categoria || '').toLowerCase().includes(cat))
            .map(([nombre, producto]) => ({ nombre, ...producto }));
        return JSON.stringify(inventarioFiltradoCategoria);
    }

    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        ordenarProductosPorPrecio,
        imprimirInventario,
        filtrarProductosPorCategoria,
    };
})();
