function printTriangulo(signo = '*', alto) {

    if (alto < 3 || alto > 15) {
        alert('Debe tener una altura mayor a 3 y menor a 15');
        return;
    }

    let espacio = alto - 1;
    let signos_cantidad = 1;
    let linea = [];

    for (let i = 0; i < alto; i++) {
        linea[i] = '';

        for (let e = espacio; e > 0; e--) {
            linea[i] += ' ';
        }
        for (let s = signos_cantidad; s > 0; s--) {
            linea[i] += signo;
        }
        for (let e = espacio; e > 0; e--) {
            linea[i] += ' ';
        }

        espacio = espacio - 1;
        signos_cantidad = signos_cantidad + 2;
    }

    console.log(linea.join('\n'));

}

printTriangulo('P', 15);
