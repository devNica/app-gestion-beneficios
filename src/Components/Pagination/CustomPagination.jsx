import { BiSolidChevronsLeft, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'
import { useManagePagination } from '../../hooks/usePagination.js'
import { returnPaginationRange } from '../../utils/object.util.js'

import './pagination.css'

const CustomPagination = ({ totalPages = 1, handlePageChange, currentPage, limitResults }) => {

    const arrayNav = returnPaginationRange({
        totalPages,
        currentPage,
        limitResults,
        siblings: 1

    })

    const { states, actions } = useManagePagination({ handlePageChange, totalPages, currentPage })

    const { isMaxPage, isMinPage } = states
    const { 
        handleOnClick, 
        handleDecrementPagination, 
        handleGoToFirstElement, 
        handleGoToLastElement, 
        handleIncrementPagination} = actions

    const renderNumberPages = arrayNav.map((el, index) => (
        <li
            className={`pagination-nav ${el === currentPage ? 'active' : ''}`}
            key={index}
            value={el}
            onClick={() => handleOnClick(el)}
        >
            {el}
        </li>
    ))

    return (
        <ul className='custom__pagination'>
            <li className={`pagination-nav first`} onClick={handleGoToFirstElement}>
                <span className='pagination-icon'><BiSolidChevronsLeft /></span>
            </li>
            <li className={`pagination-nav prev ${isMinPage ? 'limit-active' : ''}`} onClick={handleDecrementPagination}>
                <span className='pagination-icon'><BiSolidChevronLeft/></span>
            </li>

            {renderNumberPages}

            <li className={`pagination-nav next ${isMaxPage ? 'limit_active' : ''}`} onClick={handleIncrementPagination}>
                <span className='pagination-icon'><BiSolidChevronRight /></span>
            </li>
            <li className={`pagination-nav last`} onClick={handleGoToLastElement}>
                <span className='pagination-icon'><BiSolidChevronsRight /></span>
            </li>
        </ul>
    )
}

export default CustomPagination