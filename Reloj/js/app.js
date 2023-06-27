const fecha = new Date();
const mes = fecha.getMonth() + 1;
const mesNombre = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const year = fecha.getFullYear();
const dia = fecha.getDate();
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function cargarHora() {
  const fechaActual = new Date();
  const horas = fechaActual.getHours().toString().padStart(2, '0');
  const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
  const hora = horas + ':' + minutos + ':' + segundos;
  document.getElementById('horaActual').innerHTML = hora;
}

function diaTexto () {
    let diaTexto = new Date();
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let diaNumero = diaTexto.getDay();
    let diaNumerado = diaTexto.getDate();
    let year = diaTexto.getFullYear();
    if (diaNumero == 0) {
        diaTexto = dias[0];
    }
    else if (diaNumero == 1) {
        diaTexto = dias[1];
    }
    else if (diaNumero == 2) {
        diaTexto = dias[2];
    }
    else if (diaNumero == 3) {
        diaTexto = dias[3];
    }
    else if (diaNumero == 4) {
        diaTexto = dias[4];
    }
    else if (diaNumero == 5) {
        diaTexto = dias[6];
    }
    else if (diaNumero == 6) {
        diaTexto = dias[6];
    }
    let mes = new Date();
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let mesNombre = mes.getMonth();
    if (mesNombre == 0) {
        mesNombre = meses[0];
    }
    else if (mesNombre == 1) {
        mesNombre = meses[1];
    }
    else if (mesNombre == 2) {
        mesNombre = meses[2];
    }
    else if (mesNombre == 3) {
        mesNombre = meses[3];
    }
    else if (mesNombre == 4) {
        mesNombre = meses[4];
    }
    else if (mesNombre == 5) {
        mesNombre = meses[5];
    }
    else if (mesNombre == 6) {
        mesNombre = meses[6];
    }
    else if (mesNombre == 7) {
        mesNombre = meses[7];
    }
    else if (mesNombre == 8) {
        mesNombre = meses[8];
    }
    else if (mesNombre == 9) {
        mesNombre = meses[9];
    }
    else if (mesNombre == 10) {
        mesNombre = meses[10];
    }
    else if (mesNombre == 11) {
        mesNombre = meses[11];
    }
    let diaCompleto = `${diaTexto}, ${diaNumerado} de ${mesNombre} del ${year}`;
    document.getElementById('horaTexto').innerHTML = diaCompleto;
    console.log(mesNombre);
}

diaTexto();

function cargarReloj() {
    cargarHora();
    cargarFecha();
}

cargarHora();
setInterval(cargarHora, 1000);