function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function currencyToNumber(amountInStringFormat) {
    return parseFloat(amountInStringFormat.replace(/,/g, ''));
}

export {
    formatNumberWithCommas,
    currencyToNumber
}