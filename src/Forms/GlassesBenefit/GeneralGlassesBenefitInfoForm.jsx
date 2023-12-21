import CustomInput from "../../Components/CustomInput/CustomInput"
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea"
import Select from "../../Components/Select/Select.jsx"
import Modal from "../../Components/Modal/Modal"
import InvokeModal from "../../Components/Modal/InvokeModal"
import DataTable from "../../Components/DataTable/DataTable"
import PropTypes from "prop-types"

import { useHandleGeneralGlassesBenefitInfoForm } from "../../hooks/forms/glasses/useGeneralInforForm"

import CustomCheckOption from "../../Components/CustomCheckOption/CustomCheckOption.jsx"
import './glasses-benefit-form.css'


export const GeneralGlassesBenefitInfoForm = ({
    mode,
    currentIndex,
    updateCurrentIndex,
    authorizers = []
}) => {

    const { states, actions } = useHandleGeneralGlassesBenefitInfoForm({
        currentIndex, updateCurrentIndex, mode
    })

    const {
        applicant, isModalOpen, notes, registerDate,
        clinic, clinics, paymentType, paymentTypes,
        authorizer, applicantList, relativeSelected, relativeModal,
        optionSelected, relatives, requestStatus
    } = states

    const {
        handleApplicantSelection, handleRegisterDate, handleSubmit,
        setNotes, setIsModalOpen, setAuthorizer, setClinic, setPaymentType,
        setRelativeModal, handleOptionSelection, handleRelativeSelection
    } = actions


    return (
        <form action="" className="form__gnral__glasses__benefit__info">

            <div className="form__title">
                <h2>Datos Generales</h2>
            </div>

            <div className="form__group-top">
                <CustomCheckOption
                    id={'employee'}
                    name={'employee'}
                    isCheckBox={false}
                    value={'E'}
                    currentValue={optionSelected}
                    onChange={handleOptionSelection}
                    label="Colaborador:"
                />
                <CustomCheckOption
                    id={'relative'}
                    name={'relative'}
                    isCheckBox={false}
                    value={'P'}
                    currentValue={optionSelected}
                    onChange={handleOptionSelection}
                    label="Pariente:"
                />
            </div>

            <div className="form__group-middle">
                <div className="form__group-left">

                    <CustomInput
                        id="registerDate"
                        name="registerDate"
                        type="date"
                        label="Registro:"
                        orientation="row"
                        value={registerDate}
                        onChange={(e) => handleRegisterDate(e.target.value)}
                    />

                    {
                        mode === 'register' ?
                            <CustomInput
                                id="employee"
                                name="employee"
                                label="Solicitante:"
                                orientation="row"
                                editable={false}
                                defaultValue={applicant !== null ? `${applicant.fullname}` : ''}
                                placeHolder="<<- Solicitante ->>"
                                customStyles="has-child disabled"
                                attachmentElement={
                                    <InvokeModal handleClick={setIsModalOpen} />
                                }
                            /> :

                            <CustomInput
                                id="employee"
                                name="employee"
                                label="Solicitante:"
                                orientation="row"
                                editable={false}
                                defaultValue={applicant !== null ? `${applicant.fullname}` : ''}
                                placeHolder="<<- Beneficiario ->>"
                                customStyles="disabled"
                            />
                    }


                    {
                        optionSelected === 'P' ?
                            mode === 'register' ?
                                <CustomInput
                                    id="relative"
                                    name="relative"
                                    label="Pariente:"
                                    orientation="row"
                                    editable={false}
                                    defaultValue={relativeSelected !== null ? `${relativeSelected.fullname}` : ''}
                                    placeHolder="<<- Pariente ->>"
                                    customStyles="has-child disabled"
                                    attachmentElement={
                                        <InvokeModal handleClick={setRelativeModal} />
                                    }
                                /> :
                                <CustomInput
                                    id="relative"
                                    name="relative"
                                    label="Pariente:"
                                    orientation="row"
                                    editable={false}
                                    defaultValue={relativeSelected !== null ? `${relativeSelected.fullname}` : ''}
                                    placeHolder="<<- Pariente ->>"
                                    customStyles="disabled"
                                />
                            : <></>
                    }

                    {
                        requestStatus.value !== 'SF4' ?

                            <Select
                                id={'clinic'}
                                name={'clinic'}
                                options={clinics}
                                currentValue={clinic}
                                onChange={(v) => setClinic(v)}
                                label="Clinica:"
                                orientation="row"
                            /> :

                            <CustomInput
                                id="clinic"
                                name="clinic"
                                label="Clinica:"
                                orientation="row"
                                editable={false}
                                defaultValue={clinic !== null ? clinic.value : '-'}
                                customStyles="disabled"
                            />
                    }

                </div>

                <div className="form__group-right">

                    {
                        requestStatus.value !== 'SF4' ?

                            <Select
                                id={'paymentType'}
                                name={'paymentType'}
                                options={paymentTypes}
                                currentValue={paymentType}
                                onChange={(v) => setPaymentType(v)}
                                label="Tipo Pago:"
                                orientation="row"
                            /> :

                            <CustomInput
                                id={'paymentType'}
                                name={'paymentType'}
                                label="Tipo Pago:"
                                orientation="row"
                                editable={false}
                                defaultValue={paymentType !== null ? paymentType.value : '-'}
                                customStyles="disabled"
                            />
                    }

                    <CustomTextArea
                        id={'notes'}
                        name={'notes'}
                        label="Notas:"
                        rows={"4"}
                        orientation="row"
                        value={notes}
                        onChange={setNotes}
                    />

                    {
                        requestStatus.value !== 'SF4' ?
                            <Select
                                id={'authorizer'}
                                name={'authorizer'}
                                options={authorizers}
                                currentValue={authorizer}
                                onChange={(v) => setAuthorizer(v)}
                                orientation="row"
                                label="Autorizado:"
                            /> :

                            <CustomInput
                                id={'authorizer'}
                                name={'authorizer'}
                                label="Autorizado:"
                                orientation="row"
                                editable={false}
                                defaultValue={authorizer !== null ? authorizer.value : '-'}
                                customStyles="disabled"
                            />
                    }

                </div>
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
                        dataSource={applicantList}
                        columnSizes={[15, 55, 15, 15]}
                        showColumns={['employeeId', 'fullname', 'range', 'received']}
                        labels={['No Emp', 'Nombre', 'Rango', 'Recibidos']}
                        sortColumn={[0, 1, 2, 3]}
                        entries={[5, 10, 20]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleApplicantSelection}

                    />
                }
            />


            <Modal
                title='Busqueda de Pariente'
                isOpen={relativeModal}
                onClose={() => setRelativeModal(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <DataTable
                        dataSource={relatives}
                        columnSizes={[30, 50, 20]}
                        showColumns={['id', 'fullname', 'relationship']}
                        labels={['ID', 'NOMBRE_COMPLETO', 'PARENTEZCO']}
                        sortColumn={[1, 2]}
                        entries={[5, 10, 15]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleRelativeSelection}

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