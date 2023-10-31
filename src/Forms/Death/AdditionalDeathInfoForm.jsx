import CustomInput from '../../Components/CustomInput/CustomInput'
import FamilyDetail from './FamilyDetail'
import { useAdditionalInfoForm } from "../../hooks/forms/death/useAdditionalInfoForm.js"

import PropTypes from "prop-types"

import RegistrationSupport from "./RegistrationSupportForm.jsx";
import './additional-death-info-form.css'

export default function AdditionalDeathInfoForm({
    updateCurrentIndex,
    currentIndex,
    internalExchange
}) {

    const { states, actions } = useAdditionalInfoForm({ updateCurrentIndex, currentIndex, internalExchange })

    const { typeRegister, amountInCS, amountInUS, relativesConfirmed, supportsConfirmed } = states
    const { handleBackStep, handleDate, handleSelectItem, handleSupportConfirmation } = actions

    return (
        <div className="additional__death__info-form">
            <div className="form__title">
                <h2>Informacion Adicional</h2>
            </div>

            <div className="form__group-supports">
                <span className='group-title'>
                    Soportes
                </span>
                <div className="row-0">
                    <RegistrationSupport
                        requiredSupport={supportsConfirmed}
                        onChange={handleSupportConfirmation}
                    />
                </div>
            </div>

            <div className="form__group-middle">

                <div className="row-1">
                    <div className="amounts">
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
                </div>


                <div className="row-2">
                    <table className='family__table'>
                        <thead>
                            <tr className='row-headers'>
                                <th>Sel</th>
                                <th>Parentezco:</th>
                                {typeRegister === 'F' ? <th>En favor de:</th> : <th>Extendido a:</th>}
                                {typeRegister === 'F' ? <th>Fallecido el:</th> : <th>Entregado el:</th>}
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                <FamilyDetail
                                    data={relativesConfirmed}
                                    typeRegister={typeRegister}
                                    onChange={handleSelectItem}
                                    handleDate={handleDate}
                                />
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="form__group-actions">
                <div className="prev" onClick={handleBackStep}>
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>
                <div className="netx">
                    <button type='button' className='btn btn__done'>Listo</button>
                </div>
            </div>

        </div>
    )
}

AdditionalDeathInfoForm.propTypes = {
    updateCurrentIndex: PropTypes.func,
    currentIndex: PropTypes.number,
    internalExchange: PropTypes.number
}
