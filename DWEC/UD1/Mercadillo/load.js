window.addEventListener("load", () => {
  const $ = id => document.getElementById(id);
  const salida = $("salida");
  const lista = $("lista-mercadillo");

  // Mostrar inventario en pantalla
  const renderLista = () => {
    lista.innerHTML = "";
    $negocio.listarProductos().forEach(p => {
      const item = document.createElement("div");
      item.className = "mercadillo-item";
      item.innerHTML = `
        <div>${p.nombre}</div>
        <div>${p.categoria}</div>
        <div>${p.cantidad}</div>
        <div>${p.precio} €</div>
        <div class="acciones">
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      `;
      lista.appendChild(item);
    });
  };

  const renderJSON = data => {
    salida.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  };

  $("btn-imprimir").addEventListener("click", () => {
    renderJSON($negocio.imprimirInventario());
  });

  renderLista();
});
