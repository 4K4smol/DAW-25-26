import "./tablero.css";

export default function Tablero({ cambiarTurno, turno, jugadores }) {
  const tamañoTablero = 3;

  const handleClick = (e) => {
    const casilla = e.target;
    casilla.textContent = jugadores[turno].ficha;
    jugadores[turno].posiciones = [casilla.getAttribute('key')];
    console.log(jugadores);

    cambiarTurno(turno === 1 ? 0 : 1);
  };

  function comprobarCasillas(casillas) {
    let completo = true;

    casillas.forEach((c) => {
      if (c.textContent == "") {
        completo = false;
      }

      // SUMAR PUNTO A AMBOS JUGADORES

    });
  }

  return (
    <>
      {/* Turno */}
      <div className="tablero">
        <span className="turno">Turno de {jugadores[turno].nombre}</span>

        {Array.from({ length: tamañoTablero }).map((_, f) => {
          return (
            <div className="fila" key={f}>
              {Array.from({ length: tamañoTablero }).map((_, c) => {
                return (
                  <div
                    className="casilla"
                    key={`${f}-${c}`}
                    onClick={(e) => handleClick(e)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
