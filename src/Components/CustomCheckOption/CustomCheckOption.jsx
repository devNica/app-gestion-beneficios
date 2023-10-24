import PropTypes from "prop-types"
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
    justified = 'center'
}) => {
    
    return (
        <div className={`custom__check__option ${orientation} ${justified}`}>
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

CustomCheckOption.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    currentValue: PropTypes.any,
    value: PropTypes.any,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    orientation: PropTypes.oneOf(['row', 'column']),
    isCheckBox: PropTypes.bool,
    justified: PropTypes.oneOf(['center', 'flex-end', 'flex-start'])
}