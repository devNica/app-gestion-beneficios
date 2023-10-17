import DataTable from "../../Components/DataTable/DataTable"

const GlassesRequestHistoryPage = () => {
    return (
        <div className="history__page">
            <h1>Historico de Beneficio de Lentes</h1>

            <DataTable
                dataSource={employeeList}
                columnSizes={[20, 40, 40]}
                labels={['Id', 'Nombre', 'Apellido']}
                sortColumn={[0, 2, 3]}
                entries={[5, 10, 20]}
                enableSearch={true}
                enableEntries={true}
                onSelectedRow={handleEmployeeSelection}
            />
        </div>
    )
}

export default GlassesRequestHistoryPage