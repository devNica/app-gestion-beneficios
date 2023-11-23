import _ from 'lodash'

function isNull(data) {
    return data !== null ? true : false
}

function hasEmptyAttr(obj) {
    return obj.some(el => {
        return Object.values(el).some(v => v === '')
    })
}

function missingItems(mayorArray, menorArray) {
    const setMayor = new Set(mayorArray)
    const setMenor = new Set(menorArray)

    const result = [...setMayor].filter(ele => !setMenor.has(ele))

    return result
}

function returnPaginationRange({ totalPages, currentPage, numberResults, siblings }) {
    let totalPagesElementInArray = 7 + siblings

    /**
     * si el numero total de elementos de la paginacion
     * es mayor que el numero total de paginas
     */
    if (totalPagesElementInArray >= totalPages) {
        return _.range(1, totalPages + 1)
    }

    let leftSiblingsIndex = Math.max(currentPage - siblings, 1)
    let rightSiblingsIndex = Math.min(currentPage + siblings, totalPages)

    let showLeftDots = leftSiblingsIndex > 2
    let showRightDots = rightSiblingsIndex < totalPages - 2

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings
        let leftRange = _.range(1, leftItemsCount + 1)
        return [...leftRange, " ...", totalPages]
    } else if (showLeftDots && !showRightDots) {

        let rightItemsCount = 3 + 2 * siblings
        let rightRange = _.range(totalPages - rightItemsCount + 1, totalPages + 1)
        return [1, "... ", ...rightRange]
    } else {

        let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)
        return [1, "... ", ...middleRange, " ...", totalPages]
    }
}

function filterData(queryFields=[], returnFields, data) {
    let filteredData = null

    // Filtra los datos que cumplan con los criterios de consulta
    if (queryFields.length > 0) {
        filteredData = data.filter(row => {
            return queryFields.every(queryField => {
                const [key, value] = Object.entries(queryField)[0]
                return row[key] === value
            })
        })
    }

    else {
        filteredData = data
    }

    // Mapea los datos filtrados para obtener solo los campos especificados en returnFields
    const result = filteredData.map(row => {
        const results = {}
        returnFields.forEach(fieldName => {
            if (row.hasOwnProperty(fieldName)) {
                results[fieldName] = row[fieldName];
            }
        })
        return results;
    })

    return result
}

function converToBoolean(value) {
    return value === 1 ? true : value === 0 ? false : undefined
}

export {
    converToBoolean,
    filterData,
    missingItems,
    isNull,
    hasEmptyAttr,
    returnPaginationRange
}