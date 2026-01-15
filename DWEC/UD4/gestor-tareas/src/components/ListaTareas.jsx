import { useEffect } from "react";
import "./listaTareas.css";
import Tarea from "./Tarea";
import { cargaTareas, guardarTareas } from "../core/GuardadoDatos.js";
import { useState } from "react";
import { useRef } from "react";

function siguienteId(tareas) {
    if (!tareas.length) return 1;
    return Math.max(...tareas.map((t) => t.id)) + 1;
}

function ListaTareas() {
    const [listaTareas, setListaTareas] = useState([]);
    const [filtro, setFiltro] = useState("abierta");
    const inputText = useRef(null);

    /**
     * CARGAR LOS DATOS AL CARGAR LA PÁGINA DEL STORAGE
     */
    useEffect(() => {
        const cargar = async () => {
            const tareasGuardadas = await cargaTareas();
            setListaTareas(tareasGuardadas);
        };
        cargar();
    }, []);

    /**
     * GUARDAR EN STOTAGE EN CADA CAMBIO DE LISTA TAREAS
     */
    useEffect(() => {
        if (listaTareas.length > 0) {
            guardarTareas(listaTareas);
        }
    }, [listaTareas]);

    const handlerSubmit = (e) => {
        e.preventDefault();

        inputText.current = e.target.descripcion.value;
        const nuevaTarea = {
            id: siguienteId(listaTareas),
            descripcion: inputText.current,
            estado: "abierta",
        };

        setListaTareas([...listaTareas, nuevaTarea]);

        e.target.descripcion.value = "";
    };

    const handleEliminar = (id) => {
        const ok = confirm("¿Seguro que quieres eliminar esta tarea?");
        if (!ok) return;

        setListaTareas(listaTareas.filter((t) => t.id !== id));
    };

    const handleCambiarEstado = (id) => {
        const nuevaListaTareas = listaTareas.map((t) => {
            if (t.id === id) {
                return {
                    ...t,
                    estado: t.estado === "abierta" ? "cerrada" : "abierta",
                };
            }

            return t;
        });

        setListaTareas(nuevaListaTareas);
    };

    const handleFiltrarEstado = (nuevoFiltro) => {
        setFiltro(nuevoFiltro);
    };

    const tareasMostradas =
        filtro === "todos"
            ? listaTareas
            : listaTareas.filter((t) => t.estado === filtro);

    return (
        <div className="lista-tareas">
            <form id="form-tarea" onSubmit={handlerSubmit}>
                <fieldset>
                    <legend>Crear Tarea</legend>
                    <input
                        name="descripcion"
                        placeholder="Descripción de la tarea..."
                        type="text"
                        required
                    ></input>
                    <button type="submit">Enviar</button>
                </fieldset>
            </form>
            <div className="filtro-lista">
                <button
                    type="button"
                    onClick={() => handleFiltrarEstado("todos")}
                >
                    Todas
                </button>
                <button
                    type="button"
                    onClick={() => handleFiltrarEstado("abierta")}
                >
                    Abiertas
                </button>
                <button
                    type="button"
                    onClick={() => handleFiltrarEstado("cerrada")}
                >
                    Cerradas
                </button>
            </div>
            <div className="lista">
                <div className="header-lista">
                    <div>DESCRIPCIÓN</div>
                    <div>ESTADO</div>
                    <div>ACCIONES</div>
                </div>
                {tareasMostradas.map((t) => (
                    <Tarea
                        key={t.id}
                        tarea={t}
                        onClickEliminar={handleEliminar}
                        onClickCambiarEstado={handleCambiarEstado}
                    />
                ))}
            </div>
        </div>
    );
}

export default ListaTareas;
