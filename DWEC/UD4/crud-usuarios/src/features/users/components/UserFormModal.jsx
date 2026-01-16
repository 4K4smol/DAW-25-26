import { useEffect, useState } from "react";

function UserFormModal({ onClose, onClickGuardar, user = null }) {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name ?? "",
                username: user.username ?? "",
                email: user.email ?? "",
            });
        } else {
            setForm({ name: "", username: "", email: "" });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClickGuardar(e, form); // le pasamos también el objeto ya listo
    };

    return (
        <div className="modal-form-users">
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Nombre de Usuario:
                    <input
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <div className="modal-actions">
                    <button type="button" onClick={onClose}>
                        Cancelar
                    </button>

                    <button type="submit">{user ? "Guardar" : "Crear"}</button>
                </div>
            </form>
        </div>
    );
}

export default UserFormModal;
