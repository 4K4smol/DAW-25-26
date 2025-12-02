export class Alumno {
    constructor(
        nombre = '',
        dni = '',
        curso = '',
        asignatura = [],
        telefono = '',
        email = ''
    ) {
        this.nombre = nombre,
        this.dni = dni,
        this.curso = curso,
        this.asignatura = asignatura,
        this.telefono = telefono,
        this.email = email
    }
}