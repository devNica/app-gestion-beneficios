import CustomInput from "../../Components/CustomInput/CustomInput"
import Select from "../../Components/Select/Select"
import InvokeModal from "../../Components/Modal/InvokeModal"
import Modal from "../../Components/Modal/Modal"
import DataTable from "../../Components/DataTable/DataTable"
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea"
import CustomCheckOption from '../../Components/CustomCheckOption/CustomCheckOption'
import useGeneralInfoForm from "../../hooks/forms/maternity/useGeneralInfoForm"

import PropTypes from "prop-types"
import './maternity-gnral-info-form.css'
import {filterData} from "../../utils/object.util.js";

const MaternityGeneralInfoForm = ({
    mode,
    authorizers,
    currentIndex,
    updateCurrentIndex
}) => {

    const { states, actions } = useGeneralInfoForm({
        updateCurrentIndex,
        currentIndex,
        mode
    })

    const {
        beneficiary, currentAuthorizer, employeeList, genderSelected,
        isModalOpen, notes, logger, memoRef, couple, paymentType, registerDate,
        paymentTypes
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


                    {
                        genderSelected === 'M' ?
                            <CustomInput
                                id={'partner'}
                                name={'partner'}
                                label="Pareja:"
                                orientation="row"
                                type="text"
                                editable={false}
                                defaultValue={couple}
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
                        labels={['Id', 'Nombre', 'P. Apellido', 'Cedula']}
                        showColumns={['employeeId', 'name', 'surname', 'dni']}
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

MaternityGeneralInfoForm.propTypes = {
    mode: PropTypes.string,
    authorizers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    currentIndex: PropTypes.number,
    updateCurrentIndex: PropTypes.func
}