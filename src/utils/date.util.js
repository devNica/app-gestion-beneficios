function getCurrentDateString(separator = '', date) {
    let str = ''
    str = date.slice(-2) + separator + date.slice(5, 7) + separator + date.slice(0, 4)
    return str
}

export {
    getCurrentDateString
}