import CustomInput from "../../Components/CustomInput/CustomInput"
import Select from "../../Components/Select/Select"
import InvokeModal from "../../Components/Modal/InvokeModal"
import Modal from "../../Components/Modal/Modal"
import DataTable from "../../Components/DataTable/DataTable"
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea"
import CustomCheckOption from '../../Components/CustomCheckOption/CustomCheckOption'
import useGeneralInfoForm from "../../hooks/forms/maternity/useGeneralInfoForm"

import './maternity-gnral-info-form.css'


const MaternityGeneralInfoForm = ({
    mode,
    paymentTypes,
    authorizers,
    currentIndex,
    updateCurrentIndex
}) => {

    const { states, actions } = useGeneralInfoForm({
        updateCurrentIndex,
        currentIndex,
        paymentTypes,
        mode
    })

    const {
        beneficiary, currentAuthorizer, employeeList, genderSelected,
        isModalOpen, notes, logger, memoRef, partner, paymentType, registerDate
    } = states

    const {
        handleEmployeeSelection, setCurrentAuthorizer, handleSubmit, setIsModalOpen,
        handleKeyDown, handleRegisterDate, updateDocumentRefs,
        setNotes, setPaymentType, updateGenderSelected
    } = actions


    return (
        <form className="maternity__gnral__info-form">
            <div className="form__title">
                <h2>Datos Generales</h2>
            </div>

            <div className="form__group-top">
                <CustomCheckOption
                    id={'female'}
                    name={'female'}
                    isCheckBox={false}
                    value={'F'}
                    currentValue={genderSelected}
                    onChange={(v) => updateGenderSelected(v)}
                    label="Mujer:"
                />
                <CustomCheckOption
                    id={'male'}
                    name={'male'}
                    isCheckBox={false}
                    value={'M'}
                    currentValue={genderSelected}
                    onChange={(v) => updateGenderSelected(v)}
                    label="Hombre:"
                />
            </div>

            <div className="form__group-middle">
                <div className="form__group-left">

                    <CustomInput
                        id={'registerDate'}
                        name={'registerDate'}
                        label="Fecha:"
                        type="date"
                        orientation="row"
                        value={registerDate}
                        onChange={(e)=>handleRegisterDate(e.target.value)}
                    />

                    <CustomInput
                        id="employee"
                        name="employee"
                        label="Empleado:"
                        orientation="row"
                        editable={false}
                        defaultValue={beneficiary !== null ? `${beneficiary.first_name} ${beneficiary.last_name}` : ''}
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


                    {
                        genderSelected === 'M' ?
                            <CustomInput
                                id={'partner'}
                                name={'partner'}
                                label="Madre:"
                                orientation="row"
                                type="text"
                                editable={false}
                                defaultValue={partner}
                                customStyles={["disabled"]}
                            /> : <></>
                    }
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
                    onChange={(e)=>updateDocumentRefs(e.target.value)}
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
                children={
                    <DataTable
                        dataSource={employeeList}
                        columnSizes={[10, 30, 30, 30]}
                        labels={['Id', 'Nombre', 'Apellido', 'Email']}
                        sortColumn={[0, 2, 3, 4]}
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

export default MaternityGeneralInfoForm