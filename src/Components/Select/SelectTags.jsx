import { useRef, useState, useEffect } from 'react'
import { missingItems } from '../../utils/object.util'
// import tags from '../../data/option-tags.json'

import './select-tag.css'

const SelectTags = ({
    data = [],
    onChange,
    value,
    enableSearch = false,
    visualizeTagCounter = false,
    label = '',
    orientation = 'colum'
}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [currentTags, updateCurrentTags] = useState(value.length > 0 ? value: [])
    const [missings, setMissings] = useState(missingItems(data, []).length)
    const selectTagRef = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            if (e.target !== selectTagRef.current) return
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)

                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }
                    break
                }

                case "Escape":
                    setIsOpen(false)
                    break

            }
        }

        selectTagRef.current?.addEventListener('keydown', handler)
        return () => {
            selectTagRef.current?.removeEventListener('keydown', handler)
        }
    }, [isOpen])

    function removeTag(tagId) {

        const tagSelected = document.getElementById(`opt-${tagId}`)
        const updateTags = currentTags.filter(t => t.id !== tagId)

        updateCurrentTags(updateTags)

        /** Retrieve in parent component all selected tags */
        onChange(updateTags)

        tagSelected.classList.remove('active')
        setMissings(prev => prev + 1)
    }

    function addTag(tag) {
        const tagSelected = document.getElementById(`opt-${tag.id}`)
        /**verificar que ya hay tags seleccionados por el usuario */
        if (currentTags.length > 0) {
            /** verifico que el elemento no haya estado seleccionado previamente */
            const oneAlreadyExist = currentTags.some(t => t.id === tag.id)
            if (!oneAlreadyExist) {
                const tagsFiltered = currentTags.filter(t => t.id !== tag.id)
                updateCurrentTags([...tagsFiltered, tag])

                /** Retrieve in parent component all selected tags */
                onChange([...tagsFiltered, tag])


                tagSelected.classList.add('active')

                setMissings(missingItems(tag.data, [...tagsFiltered, tag]).length)

            } else {
                alert('El tag seleccionado ya esta en la lista actual')
            }
        } else {
            updateCurrentTags([tag])

            /** Retrieve in parent component all selected tags */
            onChange([tag])


            tagSelected.classList.add('active')

            setMissings(missingItems(tag.data, [tag]).length)
        }
    }


    const renderTags = data.map((tag) => (
        <div id={`opt-${tag.id}`} key={`${tag.value}-${tag.id}`} className="option" data-value={tag.value} onClick={() => addTag(tag)}>{tag.value}</div>
    ))

    const renderSelectedTag = currentTags.length > 0 ? currentTags.map((t) => (
        <span className="tag" key={`tag-${t.id}`}>
            {t.value}
            <span className="remove-tag" onClick={() => removeTag(t.id)}>&times;</span>
        </span>
    )) : <></>

    return (
        <div
            onClick={()=>setIsOpen(prev => !prev)}
            className={`custom__select__tag ${orientation}`}
        >
            {label !== '' ? <label htmlFor='' className='form__label'>{label}</label> : null}
            <div
                ref={selectTagRef}
                tabIndex={0}
                onBlur={() => setIsOpen(false)}
                className={`form__select__tag ${isOpen ? 'open' : ''}`}
            >
                <div className="select-box">
                    <input type="text" className="tags_input" name="tags" hidden />
                    <div className="selected-options">
                        {
                            renderSelectedTag
                        }
                        {
                            currentTags.length > 0 && visualizeTagCounter ? <span className="tag pending">+{missings}</span> : null
                        }
                    </div>
                    <div className="arrow" onClick={() => setIsOpen(prev => !prev)}>
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
                <div className="options">
                    {enableSearch ?
                        <div className="option-search-tag">
                            <input type="text" className="search-tags" placeholder="Search tags..." />
                            <button type="button" className="clear">
                                <i className="bi bi-x"></i>
                            </button>
                        </div> :
                        <></>
                    }
                    {/* <div className="option all-tags" data-value="All">Select All</div> */}
                    {renderTags}

                    {
                        enableSearch ?
                            <div className="no-result-message" data-value="Yellow">No result match</div> :
                            <></>
                    }

                </div>

                {/* <span className="tag_error-msg error">This field is required</span> */}

            </div>
        </div>
    )
}

export default SelectTags