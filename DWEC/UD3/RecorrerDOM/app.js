const $recorrerDOM = (() => {

    function obtenerEstructuraJSON() {
        const bodyElement = document.body;
        const contenedor = bodyElement.children;
        const primerContendor = contenedor[0];

        const hijos = [...primerContendor.childNodes].filter(n => n.nodeType === Node.ELEMENT_NODE);

        function procesarNodo(nodo) {
            const clases = nodo.getAttribute('class');
            const listaClases = clases ? clases.split(' ') : [];

            const data = [...nodo.attributes]
                .filter(a => a.name.startsWith("data-"))
                .map(a => {
                    return {
                        nombre: a.name,
                        valor: a.value
                    }
                });

            return {
                etiqueta: nodo.nodeName,
                texto: nodo.textContent,
                tieneId: nodo.getAttribute("id") ? 1 : 0,
                listClass: listaClases,
                listData: data,
                listHijos: nodo.childNodes
            };
        }

        const estructura = [...hijos].map(hijo => procesarNodo(hijo));
        return estructura;
    }

    function imprimirEstructura(selector) {
        const bodyElement = document.body;
        const contenedor = bodyElement.children;
        const primerContendor = contenedor[0];

        const hijos = [...primerContendor.childNodes].filter(n => n.nodeType === Node.ELEMENT_NODE);

        function analizarNodo(nodo) {
            const etiqueta = nodo.nodeName;
            const identificador = nodo.getAttribute('id') ?? 'Sin identificador';
            const clases = nodo.getAttribute('clases') ?? 'Sin clases';
            const texto = nodo.textContent;

            return `${etiqueta}-${identificador}-${clases}-${texto}`;
        }

        let impresion = [];
        for (const hijo in hijos) {
            impresion.push(analizarNodo(hijos[hijo]));

            if (hijos[hijo] === selector) {
                break;
            }
        }
        return impresion.join('\n');
    }

    return {
        obtenerEstructuraJSON,
        imprimirEstructura
    }
})();

window.document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById('tercer-parrafo');
    console.log($recorrerDOM.obtenerEstructuraJSON());
    console.log($recorrerDOM.imprimirEstructura(selector));
});