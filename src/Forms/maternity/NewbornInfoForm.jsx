import CustomInput from '../../Components/CustomInput/CustomInput'
import SelectTags from '../../Components/Select/SelectTags'

import PropTypes from "prop-types"
import useNewBornInfoForm from '../../hooks/forms/maternity/useNewBornInfoForm'

import './newborn-info-form.css'
import BeneficiaryFamilyItemForm from './BeneficiaryFamilyItemForm'


export default function NewbornInfoForm
    ({
        typesBirth,
        maternitySupports,
        authorizedAmountsMathernity,
        updateCurrentIndex,
        currentIndex,
        orderId,
        mode
    }) {


    const { states, actions } = useNewBornInfoForm({
        authorizedAmountsMathernity,
        typesBirth,
        currentIndex,
        updateCurrentIndex,
        orderId,
        mode
    })

    const {  amountInUS, support, typeBirth, confirmedChildren } = states
    const { handleBackStep, handleSelectItem, handleSubmit, setSupport } = actions


    return (
        <div className="newborn__info__form">
            <div className="form__title">
                <h2>Informacion Familiar a Detalle</h2>
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
                    <CustomInput
                        name={'typeBirth'}
                        id={'typeBirth'}
                        label='Tipo de Parto:'
                        defaultValue={typeBirth}
                        customStyles={'disabled'}
                        editable={false}
                    />
                    <CustomInput
                        label='Monto Autorizado U$:'
                        type='text'
                        name={'amountInUS'}
                        defaultValue={amountInUS}
                        editable={false}
                        customStyles='disabled'
                    />
                </div>

                <div className="row-2">

                    <table className='newborn__table'>
                        <thead>
                            <tr className='row-headers'>
                                <th>Confirmacion</th>
                                <th>Parentezco</th>
                                <th>Nombre Completo</th>
                                <th>Nacimiento</th>
                                <th>Sexo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                <BeneficiaryFamilyItemForm
                                    data={confirmedChildren}
                                    onChange={handleSelectItem}
                                />
                            }
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

NewbornInfoForm.propTypes = {
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
        amount: PropTypes.number,
        symbol: PropTypes.string,
        amountInCurrency: PropTypes.string
    })),
    updateCurrentIndex: PropTypes.func,
    currentIndex: PropTypes.number,
    mode: PropTypes.oneOf(['register', 'edit']),
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}