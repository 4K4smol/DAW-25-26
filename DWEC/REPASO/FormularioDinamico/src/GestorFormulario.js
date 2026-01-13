"use strict"
import { alumnos } from "./data/datos.js";
import { qs, qsa, createEl } from "./utils/DOM.js";

export class GestorFormulario {
    #alumnos = null;
    #alumnosSeleccionados = null;
    #contenedor = null;

    constructor() {
        this.#alumnos = alumnos;
        this.#alumnosSeleccionados = [{ alumnoId: 10, nombre: "Ana López", ciclo: "DAW" }, { alumnoId: 11, nombre: "Ana López", ciclo: "DAW" }];
        this.#contenedor = qs('.contenedor');
    }

    iniciarFormulario() {
        const resultado = createEl(
            'div',
            {
                class: 'resultado',
            }
        );

        this.#contenedor.append(this.#generarHTMLFiltro());
        this.#contenedor.appendChild(resultado);

        resultado.append(...this.#generarFormularioDinamico());
    }

    #generarHTMLFiltro() {
        const ciclos = ['Todos', 'DAM', 'DAW', 'ASIR'];

        const filtro = createEl(
            'div',
            {
                class: 'filtro-ciclo',
            }
        )

        const formFiltro = createEl(
            'form',
            {
                attrs: {
                    name: 'form-filtro',
                    id: 'form-filtro'
                }
            }
        )

        const labelFiltro = createEl(
            'label',
            {
                text: 'Ciclo Filtro:',
                attrs: {
                    for: 'filtro-ciclo'
                }
            }
        );

        const selectorFiltro = createEl(
            'select',
            {
                attrs: {
                    id: 'filtro-ciclo'
                }
            }
        );

        ciclos.forEach(c => {
            const optionCiclo = createEl(
                'option',
                {
                    text: c,
                    attrs: {
                        value: c.toLowerCase()
                    }
                }
            );

            selectorFiltro.append(optionCiclo);
        });

        formFiltro.append(labelFiltro, selectorFiltro)
        filtro.append(formFiltro);
        return filtro;
    }

    #generarFormularioDinamico() {
        return [this.#primerBloque(), this.#segundoBloque(), this.#tercerBloque()];
    }

    #primerBloque() {
        // Primer Bloque //
        return this.#generarTablaAlumnos(this.#alumnos);
    }

    #segundoBloque() {
        const botonesSeleccion = createEl(
            'div',
            {
                class: 'botones-seleccion',
            }
        )

        const botonSeleccionar = createEl(
            'button',
            {
                text: '-->',
                class: 'boton-seleccionar',
                attrs: {
                    type: 'button'
                },
                dataset: {
                    action: 'seleccionar'
                }
            }
        )

        const botonDeseleccionar = createEl(
            'button',
            {
                text: '<--',
                class: 'boton-deseleccionar',
                attrs: {
                    type: 'button'
                },
                dataset: {
                    action: 'deseleccionar'
                }
            }
        )

        botonesSeleccion.append(botonSeleccionar, botonDeseleccionar);
        return botonesSeleccion;
    }

    #tercerBloque() {
        const listado = this.#generarTablaAlumnos(this.#alumnosSeleccionados, true);

        const form = createEl(
            'form',
            {
                attrs: {
                    id: 'form-alumnos'
                }
            }
        );

        const ids = this.#alumnosSeleccionados.map(a => a.alumnoId);
        const nombres = this.#alumnosSeleccionados.map(a => a.nombre);
        const ciclos = this.#alumnosSeleccionados.map(a => a.ciclo);

        const inputAlumnosIds = createEl('input', {
            attrs: {
                type: 'hidden',
                name: 'alumnosIds',
                value: ids.join(',')
            }
        });

        const inputAlumnosNombres = createEl('input', {
            attrs: {
                type: 'hidden',
                name: 'alumnosNombres',
                value: nombres.join(',')
            }
        });

        const inputAlumnosCiclos = createEl('input', {
            attrs: {
                type: 'hidden',
                name: 'alumnosCiclos',
                value: ciclos.join(',')
            }
        });

        form.append(inputAlumnosIds, inputAlumnosNombres, inputAlumnosCiclos);

        listado.append(form);
        return listado;
    }

    #generarTablaAlumnos(alumnos, seleccionados = false) {
        if (seleccionados === false) {
            const alumnosLista = createEl(
                'div',
                {
                    class: 'alumnos-lista',
                    attrs: {
                        id: 'alumnos-lista'
                    }
                }
            );

            const tituloTabla = createEl(
                'div',
                {
                    class: 'titulo-tabla-alumnos-lista',
                    html: '<h1>Lista Alumnos</h1>'
                }
            );

            const headerTabla = createEl(
                'div',
                {
                    class: 'header-tabla-alumnos-lista',
                }
            );

            let headerCampos = ['Nombre', 'Ciclo'];
            headerCampos.forEach(h => {
                const header = createEl(
                    'p',
                    {
                        class: 'campo-header-tabla-alumnos-lista',
                        text: h
                    }
                )

                headerTabla.append(header);
            });

            const bodyTabla = createEl(
                'div',
                {
                    class: 'body-tabla-alumnos-lista',
                }
            );

            alumnos.forEach(a => {
                const row = createEl(
                    'div',
                    {
                        class: 'row-body-tabla-alumnos-lista',
                        dataset: {
                            id: a.alumnoId
                        }
                    }
                )

                const bodyCampos = ['nombre', 'ciclo'];
                bodyCampos.forEach(c => {
                    const cell = createEl(
                        'div',
                        {
                            class: 'cell-body-tabla-alumnos-lista',
                            text: a[c]
                        }
                    )

                    row.append(cell);
                })

                bodyTabla.append(row);
            });

            alumnosLista.append(tituloTabla, headerTabla, bodyTabla);
            return alumnosLista;
        }

        const alumnosLista = createEl(
            'div',
            {
                class: 'alumnos-lista',
            }
        );

        const tituloTabla = createEl(
            'div',
            {
                class: 'titulo-tabla-alumnos-lista',
                html: '<h1>Lista Alumnos</h1>'
            }
        );

        const headerTabla = createEl(
            'div',
            {
                class: 'header-tabla-alumnos-lista',
            }
        );

        let headerCampos = ['Nombre', 'Ciclo', 'Acciones'];
        headerCampos.forEach(h => {
            const header = createEl(
                'p',
                {
                    class: 'campo-header-tabla-alumnos-lista',
                    text: h
                }
            )

            headerTabla.append(header);

        });

        const bodyTabla = createEl(
            'div',
            {
                class: 'body-tabla-alumnos-lista',
            }
        );

        alumnos.forEach(a => {
            const row = createEl(
                'div',
                {
                    class: 'row-body-tabla-alumnos-lista',
                    dataset: {
                        id: a.alumnoId
                    }
                }
            )

            const bodyCampos = ['nombre', 'ciclo', 'acciones'];
            bodyCampos.forEach(c => {
                const cell = createEl(
                    'div',
                    {
                        class: 'cell-body-tabla-alumnos-lista',
                        text: a[c]
                    }
                )

                if (c === 'acciones') {
                    const buttonMas = createEl(
                        'button',
                        {
                            text: '+',
                            dataset: {
                                action: '+'
                            }
                        }
                    )

                    const buttonMenos = createEl(
                        'button',
                        {
                            text: '-',
                            dataset: {
                                action: '-'
                            }
                        }
                    )

                    cell.append(buttonMas, buttonMenos);
                }

                row.append(cell);
            });



            bodyTabla.append(row);
        });

        alumnosLista.append(tituloTabla, headerTabla, bodyTabla);
        return alumnosLista;
    }
}