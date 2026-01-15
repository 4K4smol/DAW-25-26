function Tarea({ descripcion, estado, handleEliminar }) {
    

    return (
        <div className="tarea">
            <p>{descripcion}</p>
            <p>{estado ? 'Sí' : 'No'}</p>
            <button onClick={handleEliminar}>Eliminar</button>
        </div>
    );
}

export default tarea;