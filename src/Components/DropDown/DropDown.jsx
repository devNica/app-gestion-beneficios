import './dropdown.css'

const SimpleDropDown = ({
    id,
    name,
    data,
    handleOnchange,
    currentValue,
    label = '',
    orientation = 'row',
    hasAlternativeLabel = false,
    alternativeLabel = ''

}) => {

    const renderOption = data.map((el, index) => (
        <option key={index} value={el}>{el}</option>
    ))

    return (
        <div className={`simple__dropdown ${orientation}`}>
            {label !== '' ? <label htmlFor={id} className='form__label'>{label}</label> : null}
            <select
                className="simple__dropdown-options"
                name={name}
                id={id}
                value={currentValue}
                onChange={(e) => handleOnchange(e.target.value)}>
                {renderOption}
            </select>
            {hasAlternativeLabel !== null ?
                <span className='simple__dropdown-alternative-label'>
                    {alternativeLabel}
                </span> :
                <></>
            }
        </div>
    )

}

export default SimpleDropDown