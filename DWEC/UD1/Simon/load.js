window.addEventListener("load", () => {
  const $ = {
    // info
    inputMejorRacha: document.getElementById("mejor-racha"),
    inputRachaActualAciertos: document.getElementById("racha-actual-aciertos"),
    inputRachaActualRondas: document.getElementById("racha-actual-rondas"),

    // control
    btnComenzar: document.getElementById("comenzar"),

    // tiempos
    msEncendido: document.getElementById("ms-encendido"),
    msEntre: document.getElementById("ms-entre"),

    // botones
    btnVerde: document.getElementById("btn-verde"),
    btnRojo: document.getElementById("btn-rojo"),
    btnAzul: document.getElementById("btn-azul"),
    btnAmarillo: document.getElementById("btn-amarillo"),
  };

  // obtener datos de segundos
  function aplicarTiempos() {
    const encendidoSegundos = Number($.msEncendido.value) * 1000;
    const entreSegundos = Number($.msEntre.value) * 1000;
    $simon.setTiempos(encendidoSegundos, entreSegundos);
  }

  // función que se aplica al final de la partida
  function actualizarPanel() {
    $.inputMejorRacha.value = $simon.getMejorRacha();
    $.inputRachaActualRondas.value = $simon.getSecuenciaColoresActual().length;
    $.inputRachaActualAciertos.value = $simon.getPosicionRachaActual();
  }

  // Comenzar: aplica tiempos y arranca
  $.btnComenzar.addEventListener("click", () => {
    aplicarTiempos();
    $simon.comenzarJuego();
    actualizarPanel();
  });

  // Cambios en los inputs de tiempo (se aplican al vuelo)
  $.msEncendido.addEventListener("input", aplicarTiempos);
  $.msEntre.addEventListener("input", aplicarTiempos);

  // Clicks de colores (versión simple y clara)
  $.btnVerde.addEventListener("click", () => { $simon.comprobarUltimoColorPulsado("verde"); actualizarPanel(); });
  $.btnRojo.addEventListener("click", () => { $simon.comprobarUltimoColorPulsado("rojo"); actualizarPanel(); });
  $.btnAzul.addEventListener("click", () => { $simon.comprobarUltimoColorPulsado("azul"); actualizarPanel(); });
  $.btnAmarillo.addEventListener("click", () => { $simon.comprobarUltimoColorPulsado("amarillo"); actualizarPanel(); });
});
