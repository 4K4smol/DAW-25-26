window.addEventListener("load", () => {
    // cachear
    const $ = {
        // Tablero
        tablero: document.getElementById("tablero"),

        // Información
        inputMejorRacha: document.getElementById("mejor-racha"),
        inputRachaActualAciertos: document.getElementById("racha-actual-aciertos"),
        inputRachaActualRondas: document.getElementById("racha-actual-rondas"),

        // Comenzar
        btnComenzar: document.getElementById("comenzar"),

        // Colores
        btnVerde: document.getElementById("btn-verde"),
        btnRojo: document.getElementById("btn-rojo"),
        btnAzul: document.getElementById("btn-azul"),
        btnAmarillo: document.getElementById("btn-amarillo"),
    };

    $.btnComenzar.addEventListener("click", () => {
        $simon.comenzarJuego();
    });

    
});