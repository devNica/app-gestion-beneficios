import { formatNumberWithCommas } from "../../utils/number.util"
import PaymentPlanToBeConfirmed from "./PaymentPlanToBeConfirmed"


const UnConfirmedPaymentPlan = ({
    setInitialMonth,
    setInitialYear,
    initialCardinal,
    initialMonth,
    initialYear,
    monthOptions,
    yearOptions,
    installments,
    plan = []
}) => {

    const renderPlan = plan.map((ele, index) => <PaymentPlanToBeConfirmed ele={ele} index={index} />)

    return (
        <tbody>
            {
                installments !== undefined ?
                    <tr className='payment__rows'>
                        <td>
                            <input type="text" value={initialCardinal} readOnly />
                        </td>
                        <td>
                            <select
                                name="month" id="month"
                                onChange={(e) => setInitialMonth(e.target.value)}
                                value={initialMonth !== null ? initialMonth : ''}
                            >
                                {monthOptions}
                            </select>
                        </td>
                        <td>
                            <select name="year" id="year"
                                onChange={(e) => setInitialYear(e.target.value)}
                                value={initialYear !== null ? initialYear : ''}
                            >
                                {yearOptions}
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={`C$ ${formatNumberWithCommas(installments[0])}`}
                                readOnly
                            />
                        </td>
                    </tr> : <></>
            }
            {
                renderPlan
            }
        </tbody>
    )
}

export default UnConfirmedPaymentPlan