import { useState } from "react";

export default function CustomInputCurrency({
    decimalSeparator = '.',
    thousandsSeparator = ',',
    fractionSize = 2,
    data = null,
    padding = "0000000"
}) {

    const [value, setValue] = useState(data.split(decimalSeparator).join(""))
    const [init, setInit] = useState(data || "0" + decimalSeparator + padding.substring(0, fractionSize))

    function handleKeyDownEvent(event) {
        event.preventDefault();

        let newValue = value;

        let parsedValue = "";

        let divisor = parseInt("1" + padding.substring(0, fractionSize), 10);

        if (event['key'].match(/[0-9]/g) && newValue.length < 16) {
            newValue += event['key'];
            parsedValue = parse(parseInt(newValue) / divisor);
            setInit(parsedValue)
            setValue(newValue)
        }
        else if (event['keyCode'] === 8) {
            value = newValue.slice(0, -1);
            parsedValue = newValue ? parse(parseInt(value) / divisor) : "0" + decimalSeparator + padding.substring(0, fractionSize);
            setInit(parsedValue)
            setValue(value)
        }
    }
    
    function parse(value) {
        let [integer, fraction = ""] = (value || "").toString().split(".");

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator) || "0";

        fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
            ? decimalSeparator + (fraction + padding).substring(0, fractionSize)
            : decimalSeparator + padding.substring(0, fractionSize);

        return integer + fraction;
    }

    return (
        <input
            type="text"
            value={init}
            onKeyDown={handleKeyDownEvent}
        />

    )
}
