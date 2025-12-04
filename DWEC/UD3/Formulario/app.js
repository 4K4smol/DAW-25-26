"use strict";

const $form = document.forms.form;
const $nombre = $form.elements.nombre;
const $email = $form.elements.email;
const $password = $form.elements.password;
const $confirmPassword = $form.elements.confirmPassword;
const $fechaNacimiento = $form.elements.fechaNacimiento;
const $telefono = $form.elements.telefono;
const $genero = $form.elements.genero;
const $terminos = $form.elements.terminos;
const $resultado = document.getElementById('resultado');
const $button = $form.elements.buttonRegistrar;

$nombre.addEventListener("input", () => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if ($nombre.value.trim().length < 3) {
        $nombre.setCustomValidity("El nombre debe tener al menos 3 caracteres");
    } else if (!soloLetras.test($nombre.value)) {
        $nombre.setCustomValidity("El nombre solo puede contener letras y espacios");
    } else {
        $nombre.setCustomValidity("");
    }

    actualizarEstadoCampo($nombre);
});

$email.addEventListener("input", () => {
    actualizarEstadoCampo($email);
});

$password.addEventListener("input", () => {
    const tieneMayuscula = /[A-Z]/;
    const tieneNumero = /\d/;
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>_\-+=\[\\\];']/;

    if ($password.value.length < 8) {
        $password.setCustomValidity("La contraseña debe contener una longitud mínima de 8 caracteres");
    } else if (!tieneMayuscula.test($password.value)) {
        $password.setCustomValidity("La contraseña debe contener al menos 1 mayúscula");
    } else if (!tieneNumero.test($password.value)) {
        $password.setCustomValidity("La contraseña debe contener al menos 1 número");
    } else if (!tieneEspecial.test($password.value)) {
        $password.setCustomValidity("La contraseña debe contener al menos 1 caracter especial");
    } else {
        $password.setCustomValidity("");
    }

    actualizarEstadoCampo($password);
});

$confirmPassword.addEventListener("input", () => {
    if ($password.value !== $confirmPassword.value) {
        $confirmPassword.setCustomValidity("Las contraseñas no son iguales");
    } else {
        $confirmPassword.setCustomValidity("");
    }

    actualizarEstadoCampo($confirmPassword);
})

$fechaNacimiento.addEventListener("input", () => {
    const fechaActual = new Date();
    const fechaBirth = new Date($fechaNacimiento.value);
    const edad = Math.floor((fechaActual - fechaBirth) / (1000 * 60 * 60 * 24 * 365));

    if (edad < 16) {
        $fechaNacimiento.setCustomValidity("La edad debe de ser 16 o más");
    } else {
        $fechaNacimiento.setCustomValidity("");
    }

    actualizarEstadoCampo($fechaNacimiento);
});

$telefono.addEventListener("input", () => {
    const nueveDigitos = /^\d{9}$/;

    if (!nueveDigitos.test($telefono.value)) {
        $telefono.setCustomValidity("El tlf debe de tener 9 dígitos");
    } else {
        $telefono.setCustomValidity("");
    }

    actualizarEstadoCampo($telefono);
});

// Géneros
const opcionMasculino = document.createElement('option');
opcionMasculino.text = 'Hombre';
opcionMasculino.value = 'hombre';

const opcionFemenino = document.createElement('option');
opcionFemenino.text = 'Mujer';
opcionFemenino.value = 'mujer';

$genero.appendChild(opcionMasculino);
$genero.appendChild(opcionFemenino);

$genero.addEventListener("input", () => {
    if ($genero.value === '') {
        $genero.setCustomValidity("Seleccione un género");
    } else {
        $genero.setCustomValidity("");
    }

    actualizarEstadoCampo($genero);
});

$terminos.addEventListener("input", () => {
    if (!$terminos.checked) {
        $terminos.setCustomValidity("Debe de aceptar los términos para continuar");
    } else {
        $terminos.setCustomValidity("");
    }
    actualizarEstadoCampo($terminos);
});

function actualizarEstadoCampo(campo) {
    const spanError = campo.nextElementSibling;

    if (spanError && spanError.classList.contains("error")) {
        spanError.textContent = campo.validationMessage;
    }

    if (campo.validity.valid) {
        campo.classList.add("valid");
        campo.classList.remove("invalid");
        if ($form.checkValidity()) {
            $button.disabled = false;
        }
    } else {
        campo.classList.add("invalid");
        campo.classList.remove("valid");
        $button.disabled = true;
    }
}

// Envío del formulario
$form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!$form.checkValidity()) {
        $form.reportValidity();
        return;
    }

    const datos = {
        nombre: $nombre.value.trim(),
        email: $email.value.trim(),
        password: $password.value,
        fechaNacimiento: $fechaNacimiento.value,
        telefono: $telefono.value.trim(),
        genero: $genero.value,
        terminos: $terminos.checked
    };

    /**
     * Get form data { array }
     */
    $resultado.textContent = JSON.stringify(datos);

    $form.reset();
});
