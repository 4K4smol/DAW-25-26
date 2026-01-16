import { useEffect, useState } from "react";
import "./App.css";
import Registro from "./components/Registro.jsx";
import "./core/storage.js";
import { devolverStorage, guardarStorage } from "./core/storage.js";

function App() {
    const [listaRegistrados, setListaRegistrados] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            const data = await devolverStorage("registrados");
            setListaRegistrados(data);
        };

        cargar();
    }, []);

    useEffect(() => {
        if (listaRegistrados.length > 0) {
            guardarStorage("registrados", listaRegistrados);
        }
    }, [listaRegistrados]);

    const handleSubmitRegistro = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const nombre = formData.get("nombre").trim();
        const contrasena = formData.get("contrasena").trim();
        const terminos = !!formData.get("terminos");

        const nuevoRegistro = { nombre, contrasena, terminos };

        setListaRegistrados([...listaRegistrados, nuevoRegistro]);
    };

    return (
        <>
            <Registro onClickRegistro={handleSubmitRegistro} />
        </>
    );
}

export default App;
