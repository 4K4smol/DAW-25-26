const $simon = (() => {
    // Datos generales
    const Estado = {
        PARADO: "parado",
        JUGANDO: "jugando",
    };
    const estadoJuego = Estado.PARADO;
    const sesionRachas = [];


    /**
     * Función que recoge los colores actuales
     * 
     * @param 
     * @returns
     */
    function getSecuenciaColoresActual() {

    }

    function comprobarUltimoColorPulsado() {

    }

    /**
     * Función para obtener la mejor racha
     * 
     * @param {string} array Array de las mejores rachas
     * @returns {number} Racha más alta
     */
    function getMejorRacha() {

    }

    function getPosicionRachaActual() {

    }

    function comenzarJuego() {
        estadoJuego = Estado.JUGANDO;
    }

    function getEstadoJuego(estadoJuego) {
        return estadoJuego;
    }

    return {
        getEstadoJuego,
        getSecuenciaColoresActual,
        getMejorRacha,
        getPosicionRachaActual,
        comprobarUltimoColorPulsado,
        comenzarJuego,
    };
});