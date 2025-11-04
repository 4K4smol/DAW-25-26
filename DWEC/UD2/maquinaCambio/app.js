const $maquinaCafe = (() => {

    function cambio(importe) {
        let valor = importe;
        let tipoMoneda = ['200', '100', '50', '10', '5','2', '1'];
        let resultado = [];

        for (let tipo of tipoMoneda) {
            if (valor > 0) {
                if (valor >= Number(tipo)) {
                    resultado[tipo] = Math.floor(valor/Number(tipo))
                    valor%=Number(tipo);
                }
            }
        }
        return resultado;
    }

    return {
        cambio
    }
}) ();