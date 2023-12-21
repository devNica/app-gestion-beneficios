import PropTypes from "prop-types"
import './custom-input.css'

const CustomInput = ({
    id,
    name,
    key,
    type = 'text',
    editable = true,
    placeHolder = '',
    label = '',
    orientation = 'column',
    value = '',
    defaultValue = null,
    autoComplete = 'off',
    onChange,
    handleKeyDown,
    customStyles = '',
    attachmentElement = null,
    handleOnBlur= ()=> {}
}) => {


    return (
        <div className={`custom__input ${orientation}`}>

            {label !== '' ? <label htmlFor={id} className='form__label'>{label}</label> : null}
            {
                editable ?
                    <input
                        onKeyDown={handleKeyDown}
                        id={id}
                        name={name}
                        key={key}
                        type={type}
                        placeholder={placeHolder}
                        autoComplete={autoComplete}
                        value={value}
                        onChange={onChange}
                        onBlur={handleOnBlur}
                        className={customStyles !== null ? `form__input ${customStyles}` : `form__input`}
                    /> :

                    <input
                        value={defaultValue}
                        id={id}
                        name={name}
                        key={key}
                        type={type}
                        readOnly
                        onChange={()=>{}}
                        placeholder={placeHolder}
                        className={customStyles !== null ? `form__input ${customStyles}` : `form__input`}
                    />
            }


            {attachmentElement !== null ?
                <div className='attachment-element'>
                    {attachmentElement}
                </div> :
                <></>
            }
        </div>
    )
}

export default CustomInput

CustomInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    key: PropTypes.any,
    type: PropTypes.oneOf(['text', 'checkbox', 'radio', 'date', 'search']),
    editable: PropTypes.bool,
    placeHolder: PropTypes.string,
    label: PropTypes.string,
    orientation: PropTypes.oneOf(['row', 'column']),
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    handleKeyDown: PropTypes.func,
    customStyles: PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    attachmentElement: PropTypes.oneOfType([PropTypes.elementType, PropTypes.any])
}