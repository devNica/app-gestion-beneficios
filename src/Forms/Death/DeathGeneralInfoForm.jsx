import CustomCheckOption from "../../Components/CustomCheckOption/CustomCheckOption";
import CustomInput from "../../Components/CustomInput/CustomInput";
import Select from "../../Components/Select/Select";
import InvokeModal from '../../Components/Modal/InvokeModal'
import Modal from '../../Components/Modal/Modal'
import DataTable from "../../Components/DataTable/DataTable";
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea";

import useGeneralInfoForm from "../../hooks/forms/death/useGeneralInfoForm";
import PropTypes from "prop-types"

import './death-gnral-info-form.css'


export default function DeathGeneralInfoForm
    ({
        mode,
        updateCurrentIndex,
        currentIndex,
        authorizers
    }) {

    const { states, actions } = useGeneralInfoForm({
        updateCurrentIndex,
        currentIndex,
        mode
    })

    const { beneficiary, currentAuthorizer, relativesOfEmployee, isModalOpen,
        notes, paymentType, registerDate, typeRegister,
        logger, memoRef, paymentTypes
    } = states

    const { handleEmployeeSelection, handleNextStep, handleTypeRegister, setCurrentAuthorizer,
        setNotes, setPaymentType, setIsModalOpen, handleKeyDown, updateDocumentRefs,
        handleRegisterDate

    } = actions


    return (
        <form className="death__gnral__info-form">
            <div className="form__title">
                <h2>Datos Generales</h2>
            </div>

            <div className="form__group-top">
                <CustomCheckOption
                    id={'familiar'}
                    name={'familiar'}
                    isCheckBox={false}
                    value={'F'}
                    currentValue={typeRegister}
                    onChange={handleTypeRegister}
                    label="Familiar:"
                />
                <CustomCheckOption
                    id={'collaborator'}
                    name={'collaborator'}
                    isCheckBox={false}
                    value={'C'}
                    currentValue={typeRegister}
                    onChange={handleTypeRegister}
                    label="Colaborador:"
                />
            </div>

            <div className="form__group-middle">
                <div className="form__group-left">
                    <CustomInput
                        type="date"
                        label="Fecha:"
                        id={'registerDate'}
                        name={'registerDate'}
                        orientation="row"
                        value={registerDate}
                        onChange={(e) => handleRegisterDate(e.target.value)}
                    />

                    <CustomInput
                        id="employee"
                        name="employee"
                        label="Empleado:"
                        orientation="row"
                        editable={false}
                        defaultValue={beneficiary !== null ? `${beneficiary.name} ${beneficiary.surname}` : ''}
                        placeHolder="<<- Beneficiario ->>"
                        customStyles="has-child disabled"
                        attachmentElement={
                            <InvokeModal handleClick={setIsModalOpen} />
                        }
                    />

                    <Select
                        id={'paymentType'}
                        name={'paymentType'}
                        options={paymentTypes}
                        currentValue={paymentType}
                        onChange={(v) => setPaymentType(v)}
                        label="Tipo Pago:"
                        orientation="row"
                    />
                </div>

                <div className="form__group-right">
                    <CustomTextArea
                        id={'notes'}
                        name={'notes'}
                        label="Notas:"
                        rows={"4"}
                        value={notes}
                        onChange={setNotes}
                        orientation="row"
                    />

                    <CustomInput
                        id="producedBy"
                        name="producedBy"
                        label="Generado:"
                        orientation="row"
                        defaultValue={logger !== null ? logger.username : ''}
                        editable={false}
                        customStyles="disabled"
                    />

                    <Select
                        id={'authorizer'}
                        name={'authorizer'}
                        options={authorizers}
                        currentValue={currentAuthorizer}
                        onChange={(v) => setCurrentAuthorizer(v)}
                        orientation="row"
                        label="Autorizado:"
                    />
                </div>

            </div>

            <div className="form__group-bottom">
                <span>Documentos extendidos al solicitante</span>
                <CustomInput
                    id="memoRef"
                    name="memoRef"
                    label="Memo con Ref:"
                    orientation="row"
                    type="text"
                    value={memoRef}
                    handleKeyDown={handleKeyDown}
                    onChange={(e) => updateDocumentRefs(e.target.value)}
                />
            </div>

            <div className="form__group-actions">
                <button
                    onClick={handleNextStep}
                    type='button'
                    className='btn btn__next'>
                    Siguiente
                </button>
            </div>

            {
                mode === 'register' ?
                    <Modal
                        title='Busqueda de Empleado'
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        children={
                            <DataTable
                                dataSource={relativesOfEmployee}
                                columnSizes={[10, 25, 25, 25, 15]}
                                showColumns={['employeeId', 'name', 'surname', 'secondSurname', 'dni']}
                                labels={['Emp', 'Nombre', 'P Apellido', 'S Apellido', 'Cedula']}
                                sortColumn={[0, 2, 3]}
                                entries={[5, 10, 20]}
                                enableSearch={true}
                                enableEntries={true}
                                onSelectedRow={handleEmployeeSelection}
                            />
                        }
                    /> : <></>
            }


        </form>
    )
}

DeathGeneralInfoForm.propTypes = {
    mode: PropTypes.string,
    updateCurrentIndex: PropTypes.func,
    currentIndex: PropTypes.number,
    authorizers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    }))
}