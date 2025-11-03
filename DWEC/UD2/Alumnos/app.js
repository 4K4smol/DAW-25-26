const $yedra = (() => {
    let alumnos = [
        { nombre: "Lucía", nota: 3.5, modulo: "DWEC", convocatorias: 1 },
        { nombre: "Pedro", nota: 6.7, modulo: "DWES", convocatorias: 2 },
        { nombre: "Sofía", nota: 9.2, modulo: "DWEC", convocatorias: 1 },
        { nombre: "Raúl", nota: 4.3, modulo: "DWES", convocatorias: 3 },
        { nombre: "Marta", nota: 7.0, modulo: "DWEC", convocatorias: 2 },
        { nombre: "Héctor", nota: 2.5, modulo: "DWES", convocatorias: 4 }
    ];

    function listaAlumnosSuspensos(datos = alumnos) {
        return JSON.stringify(datos.filter(a => a.nota < 5).map(a => ({
            nombre: a.nombre,
            nota: a.nota,
            modulo: a.modulo
        })).sort((a, b) => a.nombre.localeCompare(b.nombre)));
    }

    // console.log(listaAlumnosSuspensos(alumnos));

    function estadisticaPorModulo(datos = alumnos) {
        const estadisticasModulos = {};

        datos.forEach(a => {
            if (!estadisticasModulos[a.modulo]) {
                estadisticasModulos[a.modulo] = {
                    notas: [], convocatorias: [], cantidadAlumnos: 0
                };
            }
            estadisticasModulos[a.modulo].notas.push(a.nota);
            estadisticasModulos[a.modulo].convocatorias.push(a.convocatorias);
            estadisticasModulos[a.modulo].cantidadAlumnos++;
        });

        const resultado = Object.entries(estadisticasModulos).map(([modulo, datos]) => {
            let sumaNota = 0;
            let sumaConvocatoria = 0;
            for (const nota of datos.notas) {
                sumaNota += nota;
            }
            for (const convocatoria of datos.convocatorias) {
                sumaConvocatoria += convocatoria;
            }

            return {
                nombre: modulo,
                notaMedia: (sumaNota / datos.cantidadAlumnos).toFixed(2),
                convocatoriasMedia: (sumaConvocatoria / datos.cantidadAlumnos).toFixed(2),
                cantidadAlumnos: datos.cantidadAlumnos
            };
        }).sort((a, b) => b.convocatoriasMedia - a.convocatoriasMedia);

        return JSON.stringify(resultado);
    }

    // console.log(estadisticaPorModulo(alumnos));

    function devolverDatos(datos = alumnos) {
        return JSON.stringify(datos);
    }

    // console.log(devolverDatos(alumnos));

    function cargarJSON(cadenaJSON) {
        try {
            const datos = JSON.parse(cadenaJSON);

            // Si no es un array
            if (!Array.isArray(datos)) {
                throw new Error("El JSON no contiene un array de alumnos");
            }
            // Si todo va bien, guardas los nuevos datos
            return JSON.stringify(alumnos = datos);
        } catch (error) {
            alert("Error al cargar el JSON: " + error.message);
        }
    }

    return {
        listaAlumnosSuspensos,
        estadisticaPorModulo,
        devolverDatos,
        cargarJSON,
    }
})();
