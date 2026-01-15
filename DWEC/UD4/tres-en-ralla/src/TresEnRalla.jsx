import { useState } from "react";
import Marcador from "./components/Marcador";
import Tablero from "./components/Tablero";
import "./app.css";

// Tablero de juego inicial
const EMPTY_BOARD = Array(9).fill("");

/**
 * Comprobar si se ha gandado
 * Devuelve el ganador | null
 */
function checkWinner(board) {
    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // obtener las posiciones que tengan X y O
    // Convertir objeto, filtro objeto por ficha y
    // saco los indices del objeto como array
    const posicionesEquis = board
        .map((ficha, indice) => ({ ficha, indice }))
        .filter((item) => item.ficha === "X")
        .map((item) => item.indice);

    const posicionesCirculo = board
        .map((ficha, indice) => ({ ficha, indice }))
        .filter((item) => item.ficha === "O")
        .map((item) => item.indice);

    // Comprobar si las fichas forma una linea ganadora
    let ganador = null;
    winLines.forEach((wl) => {
        if (wl.every((elemento) => posicionesEquis.includes(elemento))) {
            ganador = "X";
        }

        if (wl.every((elemento) => posicionesCirculo.includes(elemento))) {
            ganador = "O";
        }
    });

    return ganador;
}

/**
 * Comprueba si se ha llenado y nadie gana
 */
function comprobarBoardCompleta(board) {
    return board.filter((c) => c === "").length === 0 ? true : false;
}

function TresEnRalla() {
    // INICIALIZAR
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [turno, setTurno] = useState("X");
    const [ronda, setRonda] = useState(1);
    const [ganadores, setGanadores] = useState([]);

    const handleCellClick = (index) => {
        /**
         *  Autorellena el board y mete la ficha del turno
         *  en el index que se obtenga.
         *  Cambiar turno cuando se coloca una ficha.
         */
        const pintar = board.map((c, i) => {
            if (i === index && c === "") {
                setTurno(turno === "X" ? "O" : "X");
                return turno;
            } else {
                return c;
            }
        });
        setBoard(pintar);

        if (checkWinner(pintar) !== null) {
            const nuevosGanadores = [...ganadores, checkWinner(pintar)];
            setGanadores(nuevosGanadores);
            setBoard(EMPTY_BOARD);
            setRonda(ronda + 1);
        }

        // Comprobar si se ha rellenado entera sin ganador
        if (comprobarBoardCompleta(pintar) === true) {
            setBoard(EMPTY_BOARD);
            setRonda(ronda + 1);
        }
    };

    /**
     * Resetear tabla, ronda y puntos
     */
    const reiniciarJuego = () => {
        setBoard(EMPTY_BOARD);
        setGanadores([]);
        setRonda(1);
    };

    return (
        <div className="juego">
            <Marcador ronda={ronda} turno={turno} ganadores={ganadores} />
            <Tablero board={board} onCellClick={handleCellClick} />
            <div className="boton-reiniciar">
                <button onClick={reiniciarJuego}>Reiniciar</button>
            </div>
        </div>
    );
}

export default TresEnRalla;
