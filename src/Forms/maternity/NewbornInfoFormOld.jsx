import CustomInput from '../../Components/CustomInput/CustomInput'
import SelectTags from '../../Components/Select/SelectTags'
import Select from '../../Components/Select/Select'
import _ from 'lodash'

import PropTypes from "prop-types"
import useNewBornInfoForm from '../../hooks/forms/maternity/useNewBornInfoForm'

import './newborn-info-form.css'


export default function NewbornInfoForm
    ({
        typesBirth,
        maternitySupports,
        authorizedAmountsMathernity,
        updateCurrentIndex,
        currentIndex,
        internalExchange
    }) {
        

    const { states, actions } = useNewBornInfoForm({
        updateCurrentIndex, currentIndex, authorizedAmountsMathernity, 
        typesBirth, internalExchange
    })

    const { support, typeBirth, childrensInfo,
        amountInCS, amountInUS, authorizedAmount
    } = states

    const { 
        handleAddChild, handleBackStep, handleNewBornInfo, handleRemoveChild,
        handleSubmit, handleTypeBirth, setSupport 
    } = actions
    
    
    const renderRows = childrensInfo.map((_nb, index) => (
        <tr key={index} className='row-form'>
            <td>
                <input
                    autoComplete='off'
                    type="text"
                    name={`${index}-firstname`}
                    className='td-input'
                    onChange={handleNewBornInfo}
                    value={childrensInfo[index]?.firstname ?? '?'}
                />
            </td>
            <td>
                <input
                    autoComplete='off'
                    type="text"
                    name={`${index}-lastname`}
                    className='td-input'
                    onChange={handleNewBornInfo}
                    value={childrensInfo[index]?.lastname ?? '?'}
                />
            </td>
            <td>
                <select
                    name={`${index}-sex`}
                    className='td-select'
                    onChange={handleNewBornInfo}
                    value={childrensInfo[index].sex}
                >
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </td>
            <td>
                <input
                    type="date"
                    name={`${index}-birthdate`}
                    className='td-input'
                    onChange={handleNewBornInfo}
                    value={childrensInfo[index]?.birthdate}
                />
            </td>
        </tr>
    ))

    const renderTableOptions = (

        typeBirth.id === 3 ?
            <>
                <td></td>
                <td></td>
                <td></td>
                <td className="td-options">
                    <button className='btn add-row' onClick={handleAddChild}>
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    {
                        childrensInfo.length > 3 ?
                            <button className='btn remove-row' onClick={handleRemoveChild}>
                                <i className="bi bi-dash"></i>
                            </button> : <></>
                    }
                </td>
            </> :
            <></>

    )

    return (
        <div className="newborn__info__form">
            <div className="form__title">
                <h2>Informacion de Neonato</h2>
            </div>

            <div className="form__group-top">
                <SelectTags
                    label='Soportes:'
                    data={maternitySupports}
                    value={support}
                    onChange={(v) => setSupport(v)}
                />

            </div>

            <div className="form__group-middle">
                <div className="row-1">
                    <Select
                        label='Tipo de Parto:'
                        options={typesBirth}
                        currentValue={typeBirth}
                        onChange={handleTypeBirth}
                    />
                    <CustomInput
                        label='Monto Autorizado U$:'
                        type='text'
                        name={'amountInUS'}
                        defaultValue={amountInUS}
                        editable={false}
                        customStyles='disabled'
                    />
                    <CustomInput
                        label='Monto Autorizado C$:'
                        type='text'
                        defaultValue={amountInCS}
                        editable={false}
                        customStyles='disabled'
                    />
                </div>

                <div className="row-2">

                    <table className='newborn__table'>
                        <thead>
                            <tr className='row-headers'>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Sexo</th>
                                <th>Nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows}
                            <tr className='row-options'>
                                {renderTableOptions}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="form__group-actions">
                <div className="prev" onClick={handleBackStep} >
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>
                <div className="netx" onClick={handleSubmit}>
                    <button type='button' className='btn btn__done'>Listo</button>
                </div>
            </div>
        </div>
    )
}

NewbornInfoForm.propTypes ={
    typesBirth: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    maternitySupports: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    authorizedAmountsMathernity: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.number
    })),
    updateCurrentIndex: PropTypes.func,
    currentIndex: PropTypes.number,
    internalExchange: PropTypes.number
}