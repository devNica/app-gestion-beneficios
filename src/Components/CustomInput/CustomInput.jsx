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
    attachmentElement = null
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
                        className={customStyles !== null ? `form__input ${customStyles}` : `form__input`}
                    /> :

                    <input
                        defaultValue={defaultValue}
                        id={id}
                        name={name}
                        key={key}
                        type={type}
                        readOnly
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