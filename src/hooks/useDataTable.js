import { useEffect, useCallback, useState } from 'react'

export const useManageDataTable = ({ entries, dataSource }) => {
    const [dataSubSet, setSubSet] = useState([])
    const [dataFilteredSet, setFilteredSet] = useState([])

    const [totalPages, setTotalPages] = useState(0)

    const [stringQuery, setStringQuery] = useState('')

    const [firstPagination, setFirstPagination] = useState(0)
    const [lastPagination, setLastPagination] = useState(entries[0])
    const [numberResults, setNumberResults] = useState(entries[0])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setTotalPages(Math.ceil((dataSource.length / entries[0])))
    }, [])

    useEffect(() => {
        if (dataFilteredSet.length > 0) {
            setSubSet(dataFilteredSet.slice(firstPagination, lastPagination))
        } else {
            setSubSet(dataSource.slice(firstPagination, lastPagination))
        }
    }, [lastPagination, firstPagination])

    function handleSelectionRow(data) {
        console.log(data)
    }

    /** this function handle change in subset produced by selection number results */
    const handleChangeInSubSet = useCallback(async (value) => {

        // si tengo datos filtrados en su acumulador proceso el numero de paginas respecto a este
        if (dataFilteredSet.length > 0) {

            // establecer el nuevo numero de resultados
            setNumberResults(Number(value))
            // reestablecer indice inicial de la paginacion
            setFirstPagination((currentPage - 1) * Number(value))
            // reestablecer indice final de la paginacion
            setLastPagination(Number(value) * currentPage)

            setTotalPages(Math.ceil((dataFilteredSet.length / Number(value))))
        } else {

            // establecer el nuevo numero de resultados
            setNumberResults(Number(value))
            // reestablecer indice inicial de la paginacion
            setFirstPagination(0)
            // reestablecer indice final de la paginacion
            setLastPagination(Number(value))

            setCurrentPage(1)

            // si no tengo datos filtrados en el acumulador proceso el numero de paginas
            // respecto al total de datos
            setTotalPages(Math.ceil((dataSource.length / Number(value))))
        }

    }, [lastPagination, dataSubSet, dataFilteredSet, firstPagination])

    /** this function handle change produced by selection page */
    const handlePageChange = useCallback((value) => {

        setCurrentPage(Number(value))
        setFirstPagination((Number(value) - 1) * numberResults)
        setLastPagination(Number(value) * numberResults)
    }, [numberResults])


    /** this function handle results from query to original data source */
    const handleQuery = useCallback((e) => {
        setStringQuery(e)
        if (e.length > 2) {
            const result = dataSource.filter((el) => {
                for (const key in el) {
                    if (el[key] !== null && el[key].toString().toLowerCase().includes(e)) {
                        return true
                    }
                }

                return false
            })

            setFilteredSet(result)
            setSubSet(result.slice(firstPagination, lastPagination))
            setTotalPages(Math.ceil((result.length / numberResults)))
            setCurrentPage(1)
        } else {
            setFilteredSet([])
            setSubSet(dataSource.slice(firstPagination, lastPagination))
            setTotalPages(Math.ceil((dataSource.length / numberResults)))
        }

    }, [numberResults])


    function handleSort(value) {

        dataSubSet.sort((a, b) => {

            const valorA =
                typeof (a[`${Object.keys(a)[`${value.index}`]}`]) === 'number' ?
                    a[`${Object.keys(a)[`${value.index}`]}`] :
                    a[`${Object.keys(a)[`${value.index}`]}`].toUpperCase()

            const valorB =
                typeof (b[`${Object.keys(b)[`${value.index}`]}`]) === 'number' ?
                    b[`${Object.keys(b)[`${value.index}`]}`] :
                    b[`${Object.keys(b)[`${value.index}`]}`].toUpperCase()

            if (value.sort === 'desc') {
                if (valorA < valorB) return 1
                if (valorA > valorB) return -1
                return 0
            } else {
                if (valorA < valorB) return -1
                if (valorA > valorB) return 1
                return 0
            }
        })
    }


    return {
        states: {
            dataSubSet,
            dataFilteredSet,
            totalPages,
            firstPagination,
            lastPagination,
            currentPage,
            numberResults,
            stringQuery
        },
        actions: {
            handleSelectionRow,
            handleChangeInSubSet,
            handlePageChange,
            handleQuery,
            handleSort
        }
    }
}