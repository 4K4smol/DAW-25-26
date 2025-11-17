class BD {
    #vehiculos = [];
    #reparaciones = [];
    #siguienteVehiculoId = 1;
    #siguienteReparacionId = 1;

    obtenerVehiculos() {
        return this.#vehiculos;
    }

    crearVehiculo(vehiculo) {
        vehiculo.vehiculoId = this.#siguienteVehiculoId++;

        this.#vehiculos.push(v);
    }

    crearVehiculo(vehiculo) {

    }
    borrarVehiculo(vehiculoId) {
        const index = this.#vehiculos.findIndex(v =>
            v.vehiculoId == vehiculoId
        );
        if (index === -1) return;
        this.#vehiculos.splice(index, 1);
    }

    obtenerReparaciones(filtro, valor) {
        return this.#reparaciones;
    }

    obtenerReparacion(reparacionId) {
        const reparacion = this.#reparaciones.find(r =>
            r.reparacionId == reparacionId
        );
        return reparacion;
    }
    crearReparacion(vehiculoId, reparacion) {
        reparacion.reparacionId = this.#siguienteReparacionId++;

        this.#reparaciones.push(reparacion);
    }
    borrarReparacion(reparacionId) {
        const index = this.#vehiculos.findIndex(r =>
            r.reparacionId == reparacionId
        );
        if (index === -1) return;
        this.#reparaciones.splice(index, 1);
    }
}