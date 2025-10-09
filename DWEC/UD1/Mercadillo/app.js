const $negocio = (() => {
    // Definir Variables
    const inventario = [];

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
        if (inventario[nombre] > 0) return alert('Ya existe este producto');

        return inventario[nombre] = { categoria, cantidad, precio };
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
        return jsonString = JSON.stringify(inventario[nombre] ? { nombre, ...inventario[nombre] } : null);
    }

    function actualizarInventario(nombre, cantidad) {
        if (inventario[nombre] == 0) return alert('El producto no existe'); 
        if (cantidad <= 0) return alert('Se debe reponer el producto');
        const productoActualizar = inventario.findIndex(producto => producto.nombre === nombre);
        return inventario[productoActualizar].cantidad = cantidad
    }

    function ordenarProductosPorPrecio() {

    }

    /**
     * Función para devolver inventario con el valor del total => (cantidad * precio)
     * 
     * @returns {JSON} Inventario
     */
    function imprimirInventario() {
        inventarioTotales = Object.entries(inventario).map(([nombre, producto]) => {
            const total = producto.cantidad * producto.precio
            return {
                nombre,
                categoria: producto.categoria,
                cantidad: producto.cantidad,
                precio: producto.precio,
                total: Number(total.toFixed(2))
            };
        });
        return jsonString = JSON.stringify(inventarioTotales);
    }

    /**
     * Función que devuelve los productos según categoría.
     * 
     * @param {string} categoria Categoría de los productos a filtrar
     */
    function filtrarProductosPorCategoria(categoria) {
        
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
