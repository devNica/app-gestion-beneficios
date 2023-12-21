import React from 'react'

import './records.css'

const Records = ({ data = [], handleSelectionRow }) => {

    const rows = data.map(app => (
        <tr className="records-info" key={app.glassesRequestId}>
            <td>
                <input 
                    type="checkbox" 
                    name="" 
                    id="" 
                    onChange={()=> handleSelectionRow(app)}
                    />
            </td>
            <td>{app.serie}</td>
            <td>{app.clinicName}</td>
            <td>{app.employeeName}</td>
            <td>{app.invoiceDate}</td>
            <td>{app.invoice}</td>
            <td>{app.amountNio}</td>
        </tr>
    ))

    return (
        <table className="request__pending__payment">
            <thead>
                <tr className="records-titles">
                    <th> -|-</th>
                    <th>SERIE</th>
                    <th>OPTICA</th>
                    <th>BENEFICIARIO</th>
                    <th>FECHA FACTURA</th>
                    <th>NO. FAC</th>
                    <th>MONTO</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default React.memo(Records)