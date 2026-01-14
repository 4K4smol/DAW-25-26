import { useState } from "react";
import Marcador from "./components/marcador";
import Tablero from "./components/tablero";

function TresEnRalla() {
  // INICIALIZAR
  let [ronda, setRonda] = useState(1);
  const [turno, setTurno] = useState(0);
  const [jugadores, setJugadores] = useState([
    { nombre: "Jugador 1", puntos: 0, ficha: "X" },
    { nombre: "Jugador 2", puntos: 0, ficha: "O" },
  ]);

  const finalRonda = () => {
    // AÑADIR +1 RONDA
    // 
  }

  return (
    <>
      <Marcador resultado={jugadores.map((j) => j.puntos)}></Marcador>
      <Tablero cambiarTurno={setTurno} turno={turno} jugadores={jugadores} />
    </>
  );
}

export default TresEnRalla;
