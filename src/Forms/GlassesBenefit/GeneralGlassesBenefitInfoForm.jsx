import Select from "../../Components/Select/Select"
import CustomInput from "../../Components/CustomInput/CustomInput"
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea"
import Modal from "../../Components/Modal/Modal"
import InvokeModal from "../../Components/Modal/InvokeModal"
import DataTable from "../../Components/DataTable/DataTable"
import PropTypes from "prop-types"

import { useHandleGeneralGlassesBenefitInfoForm } from "../../hooks/forms/glasses/useGeneralInforForm"

import './glasses-benefit-form.css'
import {useBeneficiaryProps} from "../../hooks/useBeneficiary.js";
import {filterData} from "../../utils/object.util.js";

export const GeneralGlassesBenefitInfoForm = ({
    mode,
    clinics,
    paymentTypes,
    authorizers,
    currentIndex,
    updateCurrentIndex,
    authorizedAmount

}) => {

    const { states, actions } = useHandleGeneralGlassesBenefitInfoForm({
        paymentTypes, currentIndex, updateCurrentIndex, authorizedAmount, mode
    })

    const { states: { employeeList } } = useBeneficiaryProps()

    const dataPayload = filterData([], ['employeeId','name', 'surname', 'secondSurname', 'dni'], employeeList)

    const {
        beneficiary, currentAuthorizer, currentClinic,
        isModalOpen, letterRef, memoRef, notes, paymentType, registerDate,
        logger, amountSelected
    } = states

    const {
        handleEmployeeSelection, handleRegisterDate, handleSubmit,
        setCurrentAuthorizer, setCurrentClinic, setNotes,
        setIsModalOpen, updateDocumentRefs, handleKeyDown, handleSetPaymentType,
        setAuthorizedAmount
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
                        label="Fecha:"
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
                        onChange={handleSetPaymentType}
                        label="Tipo Pago:"
                        orientation="row"
                    />

                    <Select
                        id={'clinic'}
                        name={'clinic'}
                        options={clinics}
                        currentValue={currentClinic}
                        onChange={(v) => setCurrentClinic(v)}
                        orientation="row"
                        label="Optica:"
                    />

                </div>

                <div className="form__group-right">


                    <Select
                        id={'amount'}
                        name={'amount'}
                        options={authorizedAmount}
                        currentValue={amountSelected}
                        onChange={(v) => setAuthorizedAmount(v)}
                        orientation="row"
                        label="Monto:"
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

                {
                    paymentType.id === 1 ?

                        <CustomInput
                            id="letterRef"
                            name="letterRef"
                            label="Carta con Ref:"
                            orientation="row"
                            type="text"
                            value={letterRef}
                            handleKeyDown={handleKeyDown}
                            onChange={(e) => updateDocumentRefs(e.target.value)}
                        /> :

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
                }
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
                        dataSource={dataPayload}
                        columnSizes={[10, 25, 25, 25, 15]}
                        showColumns={['employeeId', 'name', 'surname', 'secondSurname', 'dni']}
                        labels={['Emp', 'Nombre', 'P Apellido', 'S Apellido', 'Cedula']}
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

export default GeneralGlassesBenefitInfoForm

GeneralGlassesBenefitInfoForm.propTypes = {
    mode: PropTypes.string,
    clinics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    paymentTypes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    authorizers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    authorizedAmount: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        amount: PropTypes.number,
        symbol: PropTypes.string
    })),
    currentIndex: PropTypes.number,
    updateCurrentIndex: PropTypes.func
}