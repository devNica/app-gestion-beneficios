import { useEffect } from "react"
import SortOption from "./SortOption"
import './custom-table.css'

const CustomTable = ({
    model,
    data,
    isDT,
    columSize,
    handleSelectionRow,
    mutateModel,
    showColums = []
}) => {


    useEffect(() => {
    }, [model])

    const renderHeaders = model.map((el, i) => (
        <th
            key={i}
            style={{ width: `${el.width}%` }}
        >
            <span>{el.label}</span>
            {el.isSort && isDT ?
                <SortOption sortType={el.sortType} handleClick={(value) => mutateModel(value)} ColumnIndex={i} /> : <></>}
        </th>))

    const renderEmpty = (
        <tr className="table-row">
            <td className="table-data" style={{ width: '100%' }}>
                No hay registros coincidentes
            </td>
        </tr>)

    const renderContent = data.map((el, i) => (
        <tr
            className="table-row"
            key={i}
            onClick={() => handleSelectionRow(el)}
        >
            {
                Object.keys(data[0]).map((k, j) => {
                   if(showColums.some(s=>s === k)){
                        return (
                            <td
                                className="table-data"
                                key={j}
                                style={{ width: `${columSize[showColums.indexOf(k)]}%` }}

                                >
                                {el[`${k}`]}
                            </td>
                            )
                    }
                })
            }
        </tr>
    ))

    return (

        <table className='custom__table'>
            <thead>
                <tr className="table-head">{renderHeaders}</tr>
            </thead>
            <tbody>
                {data.length > 0 ? renderContent : renderEmpty}
            </tbody>
        </table>


    )
}

export default CustomTable