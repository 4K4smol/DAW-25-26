import "./tarea.css";

function Tarea({ tarea, onClickEliminar, onClickCambiarEstado }) {
    return (
        <div className="tarea">
            <p>{tarea.descripcion}</p>
            <p>{tarea.estado == "abierta" ? "Abierta" : "Cerrada"}</p>
            <div className="acciones">
                <button onClick={() => onClickCambiarEstado(tarea.id)}>
                    Cambiar Estado
                </button>
                <button onClick={() => onClickEliminar(tarea.id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Tarea;
