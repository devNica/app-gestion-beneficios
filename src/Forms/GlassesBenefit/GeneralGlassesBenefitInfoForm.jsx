import Select from "../../Components/Select/Select"
import CustomInput from "../../Components/CustomInput/CustomInput"
import CustomTextArea from "../../Components/CustomTextArea/CustomTextArea"
import Modal from "../../Components/Modal/Modal"
import InvokeModal from "../../Components/Modal/InvokeModal"
import DataTable from "../../Components/DataTable/DataTable"

import { useEmployeeProps } from '../../hooks/useEmployee'

import { useHandleGeneralGlassesBenefitInfoForm } from "../../hooks/forms/glasses/useGeneralInforForm"

import './glasses-benefit-form.css'

export const GeneralGlassesBenefitInfoForm = ({
    mode,
    clinics,
    paymentTypes,
    authorizers,
    currentIndex,
    updateCurrentIndex

}) => {

    const { states, actions } = useHandleGeneralGlassesBenefitInfoForm({
        paymentTypes, currentIndex, updateCurrentIndex, mode
    })

    const { getEmployeeList } = useEmployeeProps()
    const employeeList = getEmployeeList({
        queryFields: [{ gender: 'M' }],
        returnFields: ['id', 'first_name', 'last_name', 'email']
    })

    const {
        beneficiary, currentAuthorizer, currentClinic,
        isModalOpen, letterRef, memoRef, notes, paymentType, registerDate,
        logger
    } = states

    const {
        handleEmployeeSelection, handleRegisterDate, handleSubmit,
        setCurrentAuthorizer, setCurrentClinic, setNotes,
        setIsModalOpen, updateDocumentRefs, handleKeyDown, handleSetPaymentType
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

                    <CustomInput
                        id="amount"
                        name="amount"
                        label="Monto:"
                        orientation="row"
                        editable={false}
                        defaultValue={'C$ 1,200.00'}
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

export default GeneralGlassesBenefitInfoForm