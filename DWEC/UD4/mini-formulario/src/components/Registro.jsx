import "./registro.css";

function Registro({ onClickRegistro }) {
    return (
        <form className="registro" onSubmit={onClickRegistro}>
            <label className="nombre" htmlFor="nombre">
                Nombre:
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Nombre..."
                    required
                />
            </label>

            <label className="contrasena" htmlFor="contrasena">
                Contraseña:
                <input
                    id="contrasena"
                    type="password"
                    name="contrasena"
                    placeholder="Contraseña..."
                    required
                />
            </label>

            <label className="terminos" htmlFor="terminos">
                Aceptar Términos
                <input id="terminos" type="checkbox" name="terminos" required />
            </label>

            <button type="submit">Registrarse</button>
        </form>
    );
}

export default Registro;
