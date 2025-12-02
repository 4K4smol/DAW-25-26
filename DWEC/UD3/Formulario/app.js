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
const $resultado = document.getElementById("resultado");

$nombre.addEventListener("input", () => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if ($nombre.value.trim().length < 3) {
        $nombre.setCustomValidity("El nombre debe tener al menos 3 caracteres");
    } else if (!soloLetras.test($nombre.value)) {
        $nombre.setCustomValidity("El nombre solo puede contener letras y espacios");
    } else {
        $nombre.setCustomValidity("");
    }
});

$password.addEventListener("input", () => {
    const tieneMayuscula = /[A-Z]/;
    const tieneNumero = /\d/;
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>_\-+=\[\\\];']/;

    if ($password.value.length < 8) {
        $password.setCustomValidity("La contraseña debe contener una longitud mínima de 8 caracteres");
    } else if (!tieneMayuscula.test($password.value)) {
        $password.setCustomValidity("La contraseña debe contener al menos 1 mayúscula");
    } else if (!tieneNumero.test($password.value)){
        $password.setCustomValidity("La contraseña debe contener al menos 1 número");
    } else if (!tieneEspecial.test($password.value)) {
        $password.setCustomValidity("La contraseña debe contener al menos 1 caracter especial");
    } else {
        $password.setCustomValidity("");
    }
});

$confirmPassword.addEventListener("input", () => {
    if ($password.value !== $confirmPassword.value) {
        $confirmPassword.setCustomValidity("Las contraseñas no son iguales");
    } else {
        $confirmPassword.setCustomValidity("");
    }
})




$fechaNacimiento.addEventListener("input", () => {
    const fechaActual = new Date();
    console.log($fechaNacimiento.value);
    const edad = fechaActual - $fechaNacimiento.value;
    console.log(edad / (1000*3600*24*365));
});

// Envío del formulario
$form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!$form.checkValidity()) {
        $form.reportValidity();
        return;
    }

    $form.reset();
});
