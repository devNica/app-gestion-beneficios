import CustomInput from "../../Components/CustomInput/CustomInput"
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea"
import Modal from "../../Components/Modal/Modal"
import InvokeModal from "../../Components/Modal/InvokeModal"
import DataTable from "../../Components/DataTable/DataTable"
import PropTypes from "prop-types"

import { useHandleGeneralGlassesBenefitInfoForm } from "../../hooks/forms/glasses/useGeneralInforForm"

import './glasses-benefit-form.css'
import { useBeneficiaryProps } from "../../hooks/useBeneficiary.js";

export const GeneralGlassesBenefitInfoForm = ({
    mode,
    currentIndex,
    updateCurrentIndex
}) => {

    const { states, actions } = useHandleGeneralGlassesBenefitInfoForm({
        currentIndex, updateCurrentIndex, mode
    })

    const { states: { employeeList } } = useBeneficiaryProps()

    const {
        beneficiary, isModalOpen, notes, registerDate, logger
    } = states

    const {
        handleEmployeeSelection, handleRegisterDate, handleSubmit,
        setNotes, setIsModalOpen
    } = actions


    return (
        <form action="" className="form__gnral__glasses__benefit__info">

            <div className="form__title">
                <h2>Datos Generales</h2>
            </div>

            <div className="form__group-middle">
                <div className="form__group-left">

                    <CustomInput
                        id="registerDate"
                        name="registerDate"
                        type="date"
                        label="Fecha Examen:"
                        orientation="row"
                        value={registerDate}
                        onChange={(e) => handleRegisterDate(e.target.value)}
                    />

                    {
                        mode === 'register' ?
                             <CustomInput
                                 id="employee"
                                 name="employee"
                                 label="Empleado:"
                                 orientation="row"
                                 editable={false}
                                 defaultValue={beneficiary !== null ? `${beneficiary.fullname}` : ''}
                                 placeHolder="<<- Beneficiario ->>"
                                 customStyles="has-child disabled"
                                 attachmentElement={
                                    <InvokeModal handleClick={setIsModalOpen} />
                                    }
                             />  :

                            <CustomInput
                                id="employee"
                                name="employee"
                                label="Empleado:"
                                orientation="row"
                                editable={false}
                                defaultValue={beneficiary !== null ? `${beneficiary.fullname}` : ''}
                                placeHolder="<<- Beneficiario ->>"
                                customStyles="disabled"
                            />
                    }



                    <CustomInput
                        id={'paymentType'}
                        name={'paymentType'}
                        label="Tipo Pago:"
                        orientation="row"
                        defaultValue={beneficiary !== null ? beneficiary.paymentType : ''}
                        editable={false}
                        customStyles="disabled"
                    />

                    <CustomInput
                        id={'clinic'}
                        name={'clinic'}
                        label="Optica:"
                        orientation="row"
                        defaultValue={beneficiary !== null ? beneficiary.clinic : ''}
                        editable={false}
                        customStyles="disabled"
                    />

                </div>

                <div className="form__group-right">


                    <CustomInput
                        id="amount"
                        name="amount"
                        label="Monto Autorizado:"
                        orientation="row"
                        defaultValue={beneficiary !== null ? beneficiary.authorizedAmount : ''}
                        editable={false}
                        customStyles="disabled"
                    />

                    <CustomTextArea
                        id={'notes'}
                        name={'notes'}
                        label="Notas:"
                        rows={"4"}
                        orientation="row"
                        value={notes}
                        onChange={setNotes}
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

                    <CustomInput
                        id={'authorizer'}
                        name={'authorizer'}
                        label="Autorizado:"
                        orientation="row"
                        defaultValue={beneficiary !== null ? beneficiary.authorizer : ''}
                        editable={false}
                        customStyles="disabled"
                    />



                </div>
            </div>

            <div className="form__group-bottom">
                <span>Documentos extendidos al solicitante</span>

                <CustomInput
                    id="letterRef"
                    name="letterRef"
                    label="Carta con Ref:"
                    orientation="row"
                    defaultValue={beneficiary !== null ? beneficiary.letterRef : ''}
                    editable={false}
                    customStyles="disabled"
                />

            </div>

            <div className="form__group-actions">
                <button
                    onClick={handleSubmit}
                    type='button'
                    className='btn btn__next'>
                    Siguiente
                </button>
            </div>

            <Modal
                title='Busqueda de Empleado'
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <DataTable
                        dataSource={employeeList}
                        columnSizes={[10, 55, 20, 15]}
                        showColumns={['employeeId', 'fullname', 'applicationType', 'dni']}
                        labels={['Emp', 'Nombre', 'Tipo Sol', 'Cedula.']}
                        sortColumn={[0, 1, 2, 3]}
                        entries={[5, 10, 20]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleEmployeeSelection}

                    />
                }
            />

        </form>
    )
}

export default GeneralGlassesBenefitInfoForm

GeneralGlassesBenefitInfoForm.propTypes = {
    mode: PropTypes.string,
    currentIndex: PropTypes.number,
    updateCurrentIndex: PropTypes.func
}