const $simon = (() => {
    // Estado del juego
    const Estado = { PARADO: "parado", JUGANDO: "jugando" };

    // Variables
    let estadoJuego = Estado.PARADO;
    let secuencia = [];
    let posicionActual = 0;
    let mejorRacha = 0;
    let mostrandoSecuencia = false;
    let tiempoEncendidoSegundos = 0;
    let tiempoEntreSegundos = 0;
    const colores = ["verde", "rojo", "azul", "amarillo"];

    function getSecuenciaColoresActual() { return [...secuencia]; }
    function getMejorRacha() { return mejorRacha; }
    function getPosicionRachaActual() { return posicionActual; }
    function getEstadoJuego() { return estadoJuego; }

    // recoger los segundos
    function setTiempos(encendidoSegundos, entreSegundos) {
        tiempoEncendidoSegundos = encendidoSegundos;
        tiempoEntreSegundos = entreSegundos;
    }

    function comenzarJuego() {
        if (estadoJuego === Estado.JUGANDO) return;
        secuencia = [];
        posicionActual = 0;
        estadoJuego = Estado.JUGANDO;
        nuevaRonda();
    }

    function nuevaRonda() {
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        secuencia.push(colorAleatorio);
        posicionActual = 0;
        mostrarSecuencia();
    }

    function mostrarSecuencia() {
        console.log(tiempoEntreSegundos);
        mostrandoSecuencia = true; // Impide pulsaciones mientras se muestra

        const botones = {
            verde: document.getElementById("btn-verde"),
            rojo: document.getElementById("btn-rojo"),
            azul: document.getElementById("btn-azul"),
            amarillo: document.getElementById("btn-amarillo"),
        };

        // Apaga todos los botones antes de empezar
        Object.values(botones).forEach(btn => btn.classList.remove("activo"));

        let indice = 0;
        function iluminarSiguiente() {
            // No se puede jugar hasta que se deje de mostrar
            if (indice >= secuencia.length) {
                mostrandoSecuencia = false;
                return;
            }

            const colorActual = secuencia[indice];
            const boton = botones[colorActual];

            // Ilumina el botón
            boton.classList.add("activo");

            setTimeout(() => {
                boton.classList.remove("activo");
                indice++; // pasa al siguiente color

                // Ilumina el siguiente del indice
                setTimeout(iluminarSiguiente, tiempoEntreSegundos);
            }, tiempoEncendidoSegundos);
        }

        // Inicia la secuencia tras una pequeña pausa inicial
        setTimeout(iluminarSiguiente, tiempoEntreSegundos);
    }


    function comprobarUltimoColorPulsado(color) {
        if (estadoJuego !== Estado.JUGANDO || mostrandoSecuencia) return;

        const esperado = secuencia[posicionActual];

        if (color === esperado) {
            posicionActual++;

            // Se llega al final al final de la secuencia
            if (posicionActual === secuencia.length) {
                mejorRacha = Math.max(mejorRacha, secuencia.length);
                nuevaRonda();
            }
        } else {
            // mostrara secuencia
            alert("¡Has fallado! La secuencia era: " + secuencia.join(", "));
            estadoJuego = Estado.PARADO;
        }
    }

    return {
        // getters
        getSecuenciaColoresActual,
        getMejorRacha,
        getPosicionRachaActual,
        getEstadoJuego,
        // setter
        setTiempos,
        // acciones
        comenzarJuego,
        comprobarUltimoColorPulsado,
    };
})();
