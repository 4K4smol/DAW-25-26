window.addEventListener("load", () => {
    // botones
    $btnListar = document.getElementById("btn-listar");
    $btnListarSuspensos = document.getElementById("btn-listar-suspensos");
    $btnEstadisticaModulo = document.getElementById("btn-estadisticas-modulo");


    $btnListar.addEventListener("click", () => {
        console.log($yedra.devolverDatos());            // JSON con todos
    });
});