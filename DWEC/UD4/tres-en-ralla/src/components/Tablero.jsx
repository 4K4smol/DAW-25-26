import "./tablero.css";

export default function Tablero({ board, onCellClick }) {
    return (
        <>
            <div className="tablero">
                {board.map((valor, index) => (
                    <div
                        className="casilla"
                        key={index}
                        onClick={() => onCellClick(index)}
                    >
                        {valor}
                    </div>
                ))}
            </div>
        </>
    );
}
