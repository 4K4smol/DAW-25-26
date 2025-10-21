window.addEventListener("load", () => {
  // info
  const $inputMejorRacha = document.getElementById("mejor-racha");
  const $inputRachaActualAciertos = document.getElementById("racha-actual-aciertos");
  const $inputRachaActualRondas = document.getElementById("racha-actual-rondas");
  const $infoEstadoJuego = document.getElementById("estado-juego");

  // control
  const $btnComenzar = document.getElementById("comenzar");

  // tiempos
  const $segundosEncendido = document.getElementById("s-encendido");
  const $segundosEntre =  document.getElementById("s-entre");

  // botones
  const $btnVerde = document.getElementById("btn-verde");
  const $btnRojo = document.getElementById("btn-rojo");
  const $btnAzul = document.getElementById("btn-azul");
  const $btnAmarillo = document.getElementById("btn-amarillo");

  // obtener datos de segundos
  function aplicarTiempos() {
    const encendidoSegundos = Number($segundosEncendido.value) * 1000;
    const entreSegundos = Number($segundosEntre.value) * 1000;
    $simon.setTiempos(encendidoSegundos, entreSegundos);
  }

  // función que se aplica al final de la partida
  function actualizarPanel() {
    $inputMejorRacha.value = $simon.getMejorRacha();
    $inputRachaActualRondas.value = $simon.getSecuenciaColoresActual().length;
    $inputRachaActualAciertos.value = $simon.getPosicionRachaActual();
  }

  // tiempo, juego, visualizar
  $btnComenzar.addEventListener("click", () => {
    aplicarTiempos();
    $simon.comenzarJuego();
    actualizarPanel();
  });

  // Cambios en los inputs de tiempo
  $segundosEncendido.addEventListener("input", aplicarTiempos);
  $segundosEntre.addEventListener("input", aplicarTiempos);

  // Clicks de colores
  $btnVerde.addEventListener("click", $simon.comprobarUltimoColorPulsado("verde"));
  $btnRojo.addEventListener("click", () => $simon.comprobarUltimoColorPulsado("rojo"));
  $btnAzul.addEventListener("click", () => $simon.comprobarUltimoColorPulsado("azul"));
  $btnAmarillo.addEventListener("click", () => $simon.comprobarUltimoColorPulsado("amarillo"));
});
