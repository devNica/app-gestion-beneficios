import { useEffect, useState } from "react"
import CustomTable from "./CustomTable"
const DataLoader = ({
    data = [],
    showColumns = [],
    columSizes = [],
    sortColumn = [],
    labels = [],
    configSorting = [],
    isDT = false,
    handleSort,
    ...rest }) => {

    const [model, setModel] = useState([])

    useEffect(() => {
        const newModel = []

        labels.forEach((label, index) => {
            newModel.push({
                label: label,
                field: label.toLowerCase(),
                isSort: sortColumn.some(e => e === index),
                sortType: 'unordered',
                width: columSizes[index]
            })
        })

        setModel(newModel)
    }, [labels])

    const mutateModel = (value) => {
        const newModel = model.map((column, index) => {
            if (index === value.index && column.isSort) {
                return {
                    ...column,
                    sortType: value.sort
                }
            } else {
                return {
                    ...column,
                    sortType: 'unordered'
                }
            }
        })

        handleSort(value)

        setModel(newModel)
    }

    return (
        <CustomTable
            data={data}
            {...rest}
            model={model}
            isDT={isDT}
            columSize={columSizes}
            mutateModel={mutateModel}
            showColums={showColumns}
        />
    )

}

export default DataLoader