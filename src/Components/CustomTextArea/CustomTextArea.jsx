import PropTypes from "prop-types"
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

CustomTextArea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    key: PropTypes.any,
    cols: PropTypes.string,
    rows: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.string),
    editable: PropTypes.bool,
    placeHolder: PropTypes.string,
    label: PropTypes.string,
    orientation: PropTypes.oneOf(['row', 'column']),
    children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.any]),
    value: PropTypes.any,
    onChange: PropTypes.func
}