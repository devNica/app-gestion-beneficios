import React, { useEffect, useRef } from 'react'
import './custom-component.css'

function calculateStyles (rows, cols, orientation) {
    if (orientation = 'col') {
        return {
            gridTemplateColumns: `repeat(${cols}, 1fr);`,
            gridTemplateRows: `repeat(${rows}, 1fr);`
        }
    }
}

const GridGroup = (props) => {

    const gridRef = useRef(null)
    const { rows = 2, cols = 2, rowSize, columnSize } = props

    return (
        <div
            ref={gridRef} className='grid__group'
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr);`,
                gridTemplateRows: `repeat(${rows}, 1fr);`
            }}>
            {React.Children.map(props.children, (child) => {
                return React.cloneElement(child, { ...props })
            })}
        </div>
    )
}

export default GridGroup