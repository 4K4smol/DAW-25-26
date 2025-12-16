// Clase validación
class ValidacionError extends Error {
    constructor(mensaje, campo) {
        super(mensaje);
        this.campo = campo;
        this.name = "ValidacionError";
    }
}



/**
 * Validaciones
 */

function validarNombre(valor, callback) {
    if (valor.length < 3) {
        return callback(null, new ValidacionError(
            "El nombre debe tener al menos 3 caracteres",
            "nombre"
        ));
    }

    // Comprobar expresión NO NÚMEROS { /\d/ }
    if (/\d/.test(valor)) {
        return callback(null, new ValidacionError(
            "El nombre no puede contener números",
            "nombre"
        ));
    }

    callback(valor, null);
}


function validarPassword(valor, callback) {
    let mayus = false;
    let minus = false;
    let num = false;

    if (valor.length < 8) {
        return callback(null, new ValidacionError(
            "La contraseña debe tener al menos 8 caracteres",
            "password"
        ));
    }

    for (let c of valor) {
        if (c >= "A" && c <= "Z") mayus = true;
        else if (c >= "a" && c <= "z") minus = true;
        else if (!isNaN(c)) num = true;
    }

    if (!mayus || !minus || !num) {
        return callback(null, new ValidacionError(
            "La contraseña debe incluir mayúscula, minúscula y número",
            "password"
        ));
    }

    callback(valor, null);
}

function validarEmail(valor, callback) {
    const partes = valor.split("@");

    if (partes.length !== 2) {
        return callback(null, new ValidacionError(
            "El email debe contener una única @",
            "email"
        ));
    }

    const dominio = partes[1].split(".");
    if (dominio.length !== 2 || dominio[1].length < 2 || dominio[1].length > 3) {
        return callback(null, new ValidacionError(
            "El email debe terminar en .xx o .xxx",
            "email"
        ));
    }

    callback(valor, null);
}

function validarFecha(valor, callback) {
    const nacimiento = new Date(valor);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    if (edad < 18 || edad > 24) {
        return callback(null, new ValidacionError(
            "La edad debe estar entre 18 y 24 años",
            "fecha"
        ));
    }

    callback(valor, null);
}

function mostrarError(error) {
    limpiarErrores();
    const campo = document.getElementById(error.campo);
    campo.classList.add("error");
    alert(error.message);
}

function limpiarErrores() {
    document.querySelectorAll(".error").forEach(el => {
        el.classList.remove("error");
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const datos = localStorage.getItem("formulario");

    if (datos) {
        const obj = JSON.parse(datos);
        nombre.value = obj.nombre;
        password.value = obj.password;
        email.value = obj.email;
        fecha.value = obj.fecha;
    }
});

const form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    validarNombre(nombre.value, (nombreValor, err) => {
        if (err) return mostrarError(err);

        validarPassword(password.value, (passwordValor, err) => {
            if (err) return mostrarError(err);

            validarEmail(email.value, (emailValor, err) => {
                if (err) return mostrarError(err);

                validarFecha(fecha.value, (fechaValor, err) => {
                    if (err) return mostrarError(err);

                    alert("Formulario validado correctamente ✅");

                    const datos = {
                        nombre: nombreValor,
                        password: passwordValor,
                        email: emailValor,
                        fecha: fechaValor
                    };

                    localStorage.setItem("formulario", JSON.stringify(datos));
                });
            });
        });
    });
});
