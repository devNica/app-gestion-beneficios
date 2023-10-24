
export default function ExtendedToCollaborator({
    data,
    typeRegister,
    onChange,
    handleDate,
}) {

    return data.map((nb, index) => (
        <tr key={index} className='row-form'>
            <td>
                <input
                    type={typeRegister === 'F' ? 'checkbox' : 'radio'}
                    name={`${nb.id}-selected`}
                    className='td-check'
                    checked={nb?.selected || false}
                    onChange={() => onChange(nb.id)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name={`${nb.id}-relationship`}
                    className='td-input'
                    readOnly
                    defaultValue={nb.relationShip ?? '?'}
                />
            </td>
            <td>
                <input
                    type="text"
                    name={`${nb.id}-fullname`}
                    className='td-input'
                    readOnly
                    defaultValue={nb.fullname ?? '?'}
                />
            </td>
            <td>
                {
                    nb?.selected ?
                        <input
                            type="date"
                            name={`${nb.id}-date`}
                            className='td-input'
                            onChange={(e) => handleDate(e)}
                            value={nb.date}
                        /> : 
                        <input
                            type="date"
                            name={`${nb.id}-date`}
                            className='td-input'
                            readOnly
                            value={''}
                        />
                }
            </td>
            <td>
                <input
                    type="text"
                    name={`${nb.id}-amount`}
                    className='td-input'
                    readOnly
                    defaultValue={nb.selected ? `U$ ${nb.amount}` : ''}
                />
            </td>

        </tr>
    ))
}