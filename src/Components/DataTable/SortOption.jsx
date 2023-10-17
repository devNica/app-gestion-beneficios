import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import './sort.css'

const SortOption = ({ sortType, handleClick, ColumnIndex }) => {

    const index = ColumnIndex

    const updateCurrentSortType = (state) => {
        handleClick({
            sort: state,
            index
        })
    }

    const renderSort = <>

        {
            sortType === 'unordered' ?
                <span className='sort' onClick={() => updateCurrentSortType('asc')}>
                    <FaSort />
                </span> :
                sortType === 'asc' ?
                    <span className='sort active' onClick={() => updateCurrentSortType('desc')}>
                        <FaSortUp />
                    </span> :
                    sortType === 'desc' ?
                        <span className='sort active' onClick={() => updateCurrentSortType('unordered')}>
                            <FaSortDown />
                        </span> :
                        <></>
        }
    </>

    return (
        <>
            {renderSort}
        </>
    )
}

export default SortOption