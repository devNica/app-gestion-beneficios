import { useRef, useState, useEffect } from 'react'
import './custom-select.css'

export default function Select({
    id,
    name,
    currentValue,
    onChange,
    options,
    customWidth = false,
    adjust = '0px',
    label = '',
    orientation = 'column',
    addEasyClearButton = false
}) {

    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    const containerRef = useRef(null)

    useEffect(() => {
        if (customWidth) {
            containerRef.current.style.width = `calc(100% - ${adjust})`
        } else {
            containerRef.current.style.width = `100%`
        }
    })

    useEffect(() => {
        const handler = (e) => {
            if (e.target !== containerRef.current) return
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }

                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                }

                case "Escape":
                    setIsOpen(false)
                    break

            }
        }


        containerRef.current?.addEventListener('keydown', handler)

        return () => {
            containerRef.current?.removeEventListener('keydown', handler)
        }

    }, [isOpen, highlightedIndex, options])

    function clearOptions() {
        onChange(undefined)
    }

    function selectOption(option) {
        if (option !== currentValue) onChange(option)
    }

    function isOptionSelected(option) {
        return option === currentValue
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])


    return (
        <div ref={containerRef}
            className={`custom__select ${orientation}`}
            tabIndex={0}
            onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
            id={id}
        >
            {label !== '' ? <label className='form__label'>{label}</label> : null}

            <div className="form__select">
                <span className="form__select-value">{currentValue?.value}</span>
                {
                    addEasyClearButton ?
                        <button
                            className="clear__btn"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                clearOptions()
                            }}
                        >
                            &times;
                        </button> : <></>
                }
                <div className="form__select-divider"></div>
                <div className="form__select-caret"></div>
                <ul className={`options ${isOpen ? 'show' : ''}`}>
                    {
                        options.map((option, index) => (
                            <li
                                className={`option ${isOptionSelected(option) ? 'selected' : ''} ${highlightedIndex === index ? 'highlighted' : ''}`}
                                key={option.id}

                                onMouseEnter={() => setHighlightedIndex(index)}

                                onClick={e => {
                                    e.stopPropagation()
                                    selectOption(option)
                                    setIsOpen(false)
                                }}
                            >
                                {option.value}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}