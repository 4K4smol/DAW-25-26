import "./marcador.css";

export default function Marcador({ resultado }) {
  return (
    <>
      <div className="marcador">
        {/* RESULTADOS */}
        <div className="marcador-jugador">
          <span className="marcador-resultado">
            1º Jugador: {resultado.jugador1 ?? 0}
          </span>
        </div>
        <div className="marcador-jugador">
          <span className="marcador-resultado">
            2º Jugador: {resultado.jugador2 ?? 0}
          </span>
        </div>
      </div>
    </>
  );
}
