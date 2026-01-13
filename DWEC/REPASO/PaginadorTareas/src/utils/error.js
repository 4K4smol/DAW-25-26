export class ErrorPersonalizado extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = this.contructor.name;
    }
}