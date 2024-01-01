

const PaymentPlanToBeConfirmed = ({ele, index}) => {
    return (
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
    )
}

export default PaymentPlanToBeConfirmed