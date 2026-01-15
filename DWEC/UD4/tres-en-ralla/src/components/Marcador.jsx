import "./marcador.css";

export default function Marcador({ ronda, turno, ganadores = [] }) {
    // Comprobar cuantas veces se repite una ficha (jugador)
    const puntosX = ganadores.filter((ficha) => ficha === "X").length;
    const puntosO = ganadores.filter((ficha) => ficha === "O").length;

    return (
        <div className="marcador">
            {/* Información */}
            <div className="marcador-informacion">
                <p>Ronda: {ronda}</p>
                <p>Turno: {turno}</p>
            </div>

            <div className="resultados">
                {/* RESULTADOS */}
                <div className="marcador-jugador">
                    <span className="marcador-resultado">
                        1º Jugador: {puntosX}
                    </span>
                </div>
                <div className="marcador-jugador">
                    <span className="marcador-resultado">
                        2º Jugador: {puntosO}
                    </span>
                </div>
            </div>
        </div>
    );
}
