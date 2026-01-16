import UsersToolBar from "../components/UsersToolBar";
import UsersTable from "../components/UsersTable";
import UserFormModal from "../components/UserFormModal";
import { useEffect, useMemo, useState } from "react";
import { usersApi } from "../../../shared/api/users.api";
import "./users-page.css";

function UsersPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [textFilter, setTextFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [openModalForm, setOpenModalForm] = useState(false);
    const [userEditar, setUserEditar] = useState(null);

    // Cargar usuarios al iniciarlista
    useEffect(() => {
        const cargar = async () => {
            try {
                setLoading(true);
                const data = await usersApi.list();
                setUsuarios(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        cargar();
    }, []);

    // Manejar texto del input filtro
    const handleInputText = (text) => setTextFilter(text);

    // Abrir y cerrar Modal, set y unset User (edit)
    const handlerModalForm = (user = null) => {
        setOpenModalForm(true);
        setUserEditar(user);
    };

    const closeModalForm = () => {
        setOpenModalForm(false);
        setUserEditar(null);
    };

    // Crear y Editar
    const handleGuardar = async (e, data) => {
        try {
            if (userEditar) {
                const actualizado = await usersApi.update(userEditar.id, data);
                setUsuarios((prev) =>
                    prev.map((u) => (u.id === actualizado.id ? actualizado : u))
                );
            } else {
                const creado = await usersApi.create(data);
                setUsuarios((prev) => [creado, ...prev]);
            }

            closeModalForm();
        } catch (err) {
            console.log(err);
        }
    };

    // Manejador Eliminar User
    const handleEliminarUser = async (id) => {
        try {
            await usersApi.remove(id);
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const mostrarUsuarios = useMemo(() => {
        const q = textFilter.trim().toLowerCase();
        if (!q) return usuarios;
        return usuarios.filter((u) => (u.name ?? "").toLowerCase().includes(q));
    }, [usuarios, textFilter]);

    return (
        <div className="users-page">
            {openModalForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <UserFormModal
                            onClose={closeModalForm}
                            onClickGuardar={handleGuardar}
                            user={userEditar}
                        />
                    </div>
                </div>
            )}

            <UsersToolBar inputText={handleInputText} />
            <button type="button" onClick={() => handlerModalForm(null)}>
                Crear
            </button>

            {loading ? (
                <div>Cargar datos...</div>
            ) : (
                <UsersTable
                    users={mostrarUsuarios}
                    onClickEliminarUser={handleEliminarUser}
                    onClickEditarUser={handlerModalForm}
                />
            )}
        </div>
    );
}

export default UsersPage;
