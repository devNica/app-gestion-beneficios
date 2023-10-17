import React from 'react'
import './custom-component.css'

const FormGroup = (props) => {
    return (
        <div className={`form__group ${props?.orientation ?? 'column'}`}>
            { React.Children.map(props.children, (child)=>{
                return React.cloneElement(child, {...props})
            })}
        </div>
    )
}

export default FormGroup