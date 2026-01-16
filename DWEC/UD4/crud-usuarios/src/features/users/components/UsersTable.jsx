import "./users-table.css";

function UsersTable({ users, onClickEliminarUser, onClickEditarUser }) {
    return (
        <div className="tabla-users">
            {/* HEADER */}
            <div className="header-users">
                <div className="campo-header-users">Nombre</div>
                <div className="campo-header-users">Nombre de Usuario</div>
                <div className="campo-header-users">Email</div>
                <div className="campo-header-users">Acciones</div>
            </div>

            {/* BODY */}
            <div className="body-users">
                {users.map((u) => (
                    <div className="row-user-body" key={u.id}>
                        <div className="campo-body-users">{u.name}</div>
                        <div className="campo-body-users">{u.username}</div>
                        <div className="campo-body-users">{u.email}</div>
                        <div className="campo-body-users">
                            <button
                                type="button"
                                onClick={() => onClickEliminarUser(u.id)}
                            >
                                Borrar
                            </button>
                            <button
                                type="button"
                                onClick={() => onClickEditarUser(u)}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UsersTable;
