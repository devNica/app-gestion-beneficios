
export default function BeneficiaryFamilyItemForm({
    data,
    onChange
}) {

    return  data.map((nb, index) => (
        <tr key={index} className='row-form'>
            <td>
                <input
                    type='checkbox'
                    name={`${nb.id}-selected`}
                    className='td-check'
                    checked={nb.selected}
                    onChange={() => onChange(nb.id)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name={`${nb.id}-relationship`}
                    className='td-input'
                    readOnly
                    defaultValue={nb.relationship ?? '?'}
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
                <input
                    type="date"
                    name={`${nb.id}-date`}
                    className='td-input'
                    readOnly
                    value={nb.birthdate}
                />
            </td>
            <td>
                <input
                    type="text"
                    name={`${nb.id}-date`}
                    className='td-input'
                    readOnly
                    value={nb.sex}
                />
            </td>
        </tr>
    ))
}