import React from 'react'
import DataLoader from './DataLoader'
import { useManageDataTable } from '../../hooks/useDataTable'
import SimpleDropDown from '../DropDown/DropDown'
import CustomInput from '../CustomInput/CustomInput'
import CustomPagination from '../Pagination/CustomPagination'

import './datatable.css'

const DataTable = ({
    dataSource = [],
    entries = [5, 10, 15],
    showColumns,
    labels = [],
    columnSizes = [],
    sortColumn = [],
    enableSearch = true,
    enableEntries = true,
    onSelectedRow
}) => {
    
    const { states, actions } = useManageDataTable({ entries, dataSource})

    const {
        stringQuery,
        dataSubSet,
        numberResults,
        currentPage,
        totalPages } = states

    const {
        handleChangeInSubSet,
        handlePageChange,
        handleQuery,
        handleSort
    } = actions


    return (
        <div className="custom__datatable">
            {
                dataSource !== undefined && dataSource.length > 0 ?
                    <>
                        <div className="datatable-top">
                            <SimpleDropDown
                                data={enableEntries ? entries : [10]}
                                handleOnchange={handleChangeInSubSet}
                                currentValue={numberResults}
                                label='Resultados:'
                            />
                            {enableSearch ?
                                <CustomInput
                                    id={'searchDT'}
                                    name={'searchDT'}
                                    onChange={(e)=>handleQuery(e.target.value)}
                                    orientation='row'
                                    type='search'
                                    placeHolder='Digite para filtrar...'
                                    value={stringQuery}
                                /> : <></>}

                        </div>

                        <DataLoader
                            isDT={true}
                            data={dataSubSet}
                            showColumns={showColumns}
                            labels={labels}
                            sortColumn={sortColumn}
                            columSizes={columnSizes}
                            handleSelectionRow={onSelectedRow}
                            handleSort={handleSort}
                        />
                        <div className="datatable-bottom">
                            <CustomPagination
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                                totalPages={totalPages}
                                limitResults={numberResults}
                            />
                        </div>
                    </> :
                    <></>
            }

        </div>
    )
}

export default React.memo(DataTable)