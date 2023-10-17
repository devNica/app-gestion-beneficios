import './custom-check-option.css'

const CustomCheckOption = ({
    id,
    name,
    currentValue,
    value,
    checked,
    onChange,
    label = '',
    orientation = 'row',
    isCheckBox = true,
}) => {
    
    return (
        <div className={`custom__check__option ${orientation}`}>
            {label !== '' ? <label htmlFor={id} className='form__label'>{label}</label> : null}
            {
                isCheckBox ?
                    <input
                        type="checkbox"
                        id={id}
                        name={name}
                        className='form__option'
                        checked={checked}
                        onChange={onChange}
                    /> :
                    <input
                        type='radio'
                        id={id}
                        name={name}
                        value={value}
                        className='form__option'
                        checked={currentValue === value}
                        onChange={(e)=>onChange(e.target.value)}
                    />
            }
        </div>
    )
}

export default CustomCheckOption