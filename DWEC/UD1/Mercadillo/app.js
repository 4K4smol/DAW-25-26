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
        return inventario[nombre];
    }

    /**
     * Función para eliminar un producto
     * 
     * @param {string} nombre 
     * @returns {void}
     */
    function eliminarProducto(nombre) {
        if (!inventario[nombre]) return alert("El producto no existe");
        delete inventario[nombre];
    }

    function buscarProducto(nombre) {
        return JSON.stringify(inventario[nombre] ? { nombre, ...inventario[nombre] } : null);
    }

    function actualizarInventario(nombre, cantidad) {
        if (!inventario[nombre]) return alert('El producto no existe');
        if (cantidad <= 0) return alert('Se debe reponer el producto');
        inventario[nombre].cantidad = cantidad;
        return inventario[nombre].cantidad;
    }

    function ordenarProductosPorPrecio() {
        // Devuelve un array de productos [{nombre, categoria, cantidad, precio}] ordenado por precio asc.
        return Object.entries(inventario)
            .map(([nombre, p]) => ({ nombre, ...p }))
            .sort((a, b) => a.precio - b.precio);
    }

    /**
     * Función para devolver inventario con el valor del total => (cantidad * precio)
     * 
     * @returns {JSON} Inventario
     */
    function imprimirInventario() {
        const inventarioTotales = Object.entries(inventario).map(([nombre, producto]) => {
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
        return Object.entries(inventario)
            .filter(([, p]) => (p.categoria || '').toLowerCase().includes(cat))
            .map(([nombre, p]) => ({ nombre, ...p }));
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
