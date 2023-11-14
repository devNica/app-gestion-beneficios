function getCurrentDateString(separator = '', date) {
    let str = ''
    str = date.slice(-2) + separator + date.slice(5, 7) + separator + date.slice(0, 4)
    return str
}

function convertDateFromISOFormatToLocal(isoDate) {
    // Crear un objeto Date a partir de la cadena original
    let originalDate = new Date(isoDate);

    // Obtener el día, mes y año
    let day = originalDate.getDate();
    let month = originalDate.toLocaleString('default', { month: 'short' });
    let year = originalDate.getFullYear();

    // Construir la nueva cadena de fecha en el formato deseado
    return  day + '-' + month + '-' + year;
}

export {
    getCurrentDateString,
    convertDateFromISOFormatToLocal
}