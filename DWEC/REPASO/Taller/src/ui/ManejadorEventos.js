export class ManejadorEventos {
    #contenedor = null;
    #gestor = null;

    constructor(contenedor, gestor) {
        this.#contenedor = contenedor;
        this.#gestor = gestor;
    }

    asignarManejadores() {
        this.#contenedor.addEventListener("click", (e) => {
            this.manejarClick(e);
        });
    }

    manejarClick(e) {
        const btn = e.target.closest("button[data-action]");

        if (!btn) return;

        const accion = btn.dataset.action;
        const id = btn.dataset.id ?? btn.closest("[data-id]")?.dataset?.id ?? null;

        switch (accion) {
            case 'ir-inicio':
                return this.#gestor.renderInicio();

            case 'ir-listado-vehiculos':
                return this.#gestor.renderVehiculos();

            case 'ir-listado-no-terminadas':
                return this.#gestor.renderReparacionesFiltro('terminado', false);

            case 'ir-listado-no-pagadas':
                return this.#gestor.renderReparacionesFiltro('pagado', false);

            case "ir-listado-presupuestos":

                break;

            case "buscar-vehiculo":
                const tipo = document.querySelector('input[name="q"]:checked').value;
                const q = this.#contenedor.querySelector('#q').value;

                this.#gestor.renderVehiculosFiltro(String(tipo), String(q));
                break;

            case "ver-vehiculo":
                this.#gestor.renderVehiculoForm(id);
                break;

            case "crear-vehiculo":
                this.#gestor.renderVehiculoForm();
                break;

            case "borrar-vehiculo":
                this.#gestor.borrarVehiculo(id);
                break;

            case "guardar-vehiculo":
                const form = this.#contenedor.querySelector('#form-vehiculo');

                if (!form) return;

                const formData = new FormData(form);

                const vehiculoId = Number(formData.get("vehiculoId")) || null;

                const data = {
                    vehiculoId,
                    matricula: formData.get('matricula') || '',
                    marca: formData.get('marca') || '',
                    modelo: formData.get('modelo') || '',
                    ano: Number(formData.get('ano')) || '',
                    motor: formData.get('motor') || '',
                    nombre: formData.get('nombre') || '',
                    telefono: formData.get('telefono') || '',
                    email: formData.get('email') || '',
                    propietario: {
                        nombre: formData.get('nombre') || '',
                        telefono: formData.get('telefono') || '',
                        email: formData.get('email') || '',
                    }
                };

                this.#gestor.guardarVehiculo(data);
                break;

            case "ver-reparaciones":
                return this.#gestor.renderReparacionesFiltro("vehiculoId", Number(id));


            case "borrar-reparacion":
                this.#gestor.borrarReparacion(id);
                break;

            default:

                break;
        }
    }
}