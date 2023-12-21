import './payment-plan-form.css'

const cardinals = [
    { id: 1, value: 'Primera' },
    { id: 2, value: 'Segunda' },
    { id: 3, value: 'Tercera' },
    { id: 4, value: 'Cuarta' },
    { id: 5, value: 'Quinta' },
    { id: 6, value: 'Sexta' },
    { id: 7, value: 'Septima' },
    { id: 8, value: 'Octava' },
    { id: 9, value: 'Novena' },
    { id: 10, value: 'Decima' },
    { id: 11, value: 'Decima Primera' },
    { id: 12, value: 'Decima Segunda' }
]


const months = [
    { id: 1, value: 'Enero' },
    { id: 2, value: 'Febrero' },
    { id: 3, value: 'Marzo' },
    { id: 4, value: 'Abril' },
    { id: 5, value: 'Mayo' },
    { id: 6, value: 'Junio' },
    { id: 7, value: 'Julio' },
    { id: 8, value: 'Agosto' },
    { id: 9, value: 'Septiembre' },
    { id: 10, value: 'Octubre' },
    { id: 11, value: 'Noviembre' },
    { id: 12, value: 'Diciembre' },
]


const years = [
    { id: 1, value: '2023' },
    { id: 2, value: '2024' },
    { id: 3, value: '2025' },
    { id: 4, value: '2026' },
    { id: 5, value: '2027' },
    { id: 6, value: '2028' },
    { id: 7, value: '2029' },

]

const PaymentPlanForm = () => {

    const cardinalOptions = cardinals.map(ele =>(
        <option value={ele.value} key={`cardinal-${ele.id}`}>{ele.value}</option>
    ))

    const monthOptions = months.map(ele =>(
        <option value={ele.value} key={`month-${ele.id}`}>{ele.value}</option>
    ))

    const yearOptions = years.map(ele =>(
        <option value={ele.value} key={`year-${ele.id}`}>{ele.value}</option>
    ))

    return (
        <div className="payment__plan__form">

            <table>
                <tbody>
                    <tr className='payment__rows'>
                        <td>
                            <select name="cardinal" id="cardinal">
                                {cardinalOptions}
                            </select>
                        </td>
                        <td>
                            <select name="month" id="month">
                                {monthOptions}
                            </select>
                        </td>
                        <td>
                            <select name="year" id="year">
                                {yearOptions}
                            </select>
                        </td>
                        <td>
                           <input type="text" value={'C$ 233.45'} readOnly  />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}


export default PaymentPlanForm