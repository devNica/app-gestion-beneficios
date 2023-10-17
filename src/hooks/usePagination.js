import { useState } from 'react'

export const useManagePagination = ({ handlePageChange, totalPages, currentPage }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMinPage, setIsMinPage] = useState(true)
    const [isMaxPage, setIsMaxPage] = useState(false)


    function handleGoToFirstElement() {
        handlePageChange(Number(1))
        setIsMinPage(true)
        setIsMaxPage(false)
    }

    function handleGoToLastElement() {
        handlePageChange(totalPages)
        setIsMinPage(false)
        setIsMaxPage(true)
    }

    function handleOnClick(value) {

        let selected = 0

        if (Number(value) === 1 || value === "... ") {
            setIsMinPage(true)
            setIsMaxPage(false)

            selected = 1

            handlePageChange(selected)

        } else if (Number(value) === totalPages || value === ' ...') {
            setIsMinPage(false)
            setIsMaxPage(true)

            selected = totalPages

            handlePageChange(selected)

        } else {
            setIsMinPage(false)
            setIsMaxPage(false)
            handlePageChange(Number(value))
            setActiveIndex(Number(value - 1))
        }

    }

    function handleIncrementPagination() {

        if (currentPage + 1 <= totalPages) {
            handlePageChange(currentPage + 1)

            setIsMinPage(false)

            if (currentPage + 1 === totalPages) {
                setIsMaxPage(true)
            }
        }
    }

    function handleDecrementPagination() {

        if (currentPage - 1 > 0) {
            handlePageChange(currentPage - 1)

            setIsMaxPage(false)

            if (currentPage - 1 === 1) {
                setIsMinPage(true)
            }
        }
    }

    return {
        states: {
            activeIndex,
            isMaxPage,
            isMinPage
        },

        actions: {
            handleGoToFirstElement,
            handleGoToLastElement,
            handleOnClick,
            handleIncrementPagination,
            handleDecrementPagination
        }
    }
}