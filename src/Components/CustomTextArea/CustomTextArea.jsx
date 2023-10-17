import './custom-textarea.css'

const CustomTextArea = ({
    id,
    name,
    key,
    cols = '30',
    rows = '9',
    styles = [],
    editable = true,
    placeHolder = '',
    label = '',
    orientation = 'column',
    children = null,
    value,
    onChange
}) => {
    return (
        <div className={`custom__textarea ${orientation}`}>
            {label !== '' ? <label htmlFor={id} className='form__label'>{label}</label> : null}
            <textarea
                name={name}
                id={id}
                cols={cols}
                rows={rows}
                className='form__textarea'
                value={value}
                onChange={(e)=>onChange(e.target.value)}
            >
            </textarea>
        </div>
    )
}

export default CustomTextArea