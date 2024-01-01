

const ConfirmedPaymentPlan = ({ confirmed, paymentPlan = [] }) => {

    const renderConfirmedPlan = confirmed  && paymentPlan !== undefined ?  paymentPlan.map((ele, index) => (
        <tr className='payment__rows' key={`rw-${index}`}>
            <td>
                <input type="text" value={ele.cardinal} readOnly />
            </td>
            <td>
                <input type="text" value={ele.iteratedMonth} readOnly />
            </td>
            <td>
                <input type="text" value={ele.period} readOnly />
            </td>
            <td>
                <input type="text" value={ele.amount} readOnly />
            </td>
        </tr>
    )) : <></>

    return(
        <tbody>
            {renderConfirmedPlan}
        </tbody>
    )
}


export default ConfirmedPaymentPlan