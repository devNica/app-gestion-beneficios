import { useEffect, useState } from 'react';
import CustomInput from '../../Components/CustomInput/CustomInput.jsx';
import DataTable from '../../Components/DataTable/DataTable'
import Modal from '../../Components/Modal/Modal.jsx';

import './pre-applicants-form.css'
import InvokeModal from '../../Components/Modal/InvokeModal.jsx';

import Select from '../../Components/Select/Select.jsx';
import { fetchRelativesApplicant } from '../../service/api.js';
import CustomNotification from '../../Components/Notification/CustomNotification.jsx';
import { setNotification } from '../../redux/notification.slice.js';
import { useDispatch } from 'react-redux'
import { registerApplication } from "../../service/applications.api.js";
import { updApplicantsAndApplications } from "../../redux/glass.slice.js";
import { useGlassesRequestManagement } from '../../hooks/useGlass.js';
import { isEmpty } from 'lodash';
import { getCurrentDateString } from '../../utils/date.util.js';

const PreApplicantsBenefitForm = ({ }) => {

    const { states: { clinics, preApplicants, applicationTypes, applicationsInProcess } } = useGlassesRequestManagement()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [applicant, setApplicant] = useState(null)
    const [registerDate, setRegisterDate] = useState(new Date().toISOString().slice(0, 10))
    const [applicationType, setApplicationType] = useState([])
    const [currentClinic, setClinic] = useState([])
    const [relatives, setRelatives] = useState([])
    const [relativeSelected, setRelativeSel] = useState(null)
    const [relativeModal, setRelativeModal] = useState(false)
    const [letterRef, setLetterRef] = useState('')
    const [hashDate, setHashDate] = useState(getCurrentDateString('.',new Date().toISOString().slice(0, 10)))


    CustomNotification()
    const dispatch = useDispatch()

    useEffect(() => {
    }, [applicationsInProcess])


    function resetFields() {
        setRegisterDate(new Date().toISOString().slice(0, 10))
        setApplicant(null)
        setRelatives([])
        setRelativeSel(null)
        setClinic(clinics[0])
        setApplicationType(applicationTypes[0])
    }

    async function handleEmployeeSelection(data) {
        setApplicant(data)
        setIsModalOpen(false)

        setApplicationType(null)
        setClinic(null)

        const result = await fetchRelativesApplicant(data.employeeId)
        setRelatives(result.data)

        setRelativeSel(null)
    }

    async function handleOnSubmit() {

        if (applicant === null) {
            dispatch(setNotification({
                message: 'No ha seleccionado un Solicitante',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (letterRef === null || letterRef === '') {
            dispatch(setNotification({
                message: 'La referencia de la carta no puede ser nulo',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        if (applicationType === 3 && relativeSelected === null) {
            dispatch(setNotification({
                message: 'No ha seleccionado el Familiar del Solicitante',
                type: 'warning',
                delay: 1500
            }))

            return
        }

        const payload = {
            clinicId: currentClinic.id,
            applicantId: applicant.employeeId,
            qualification: applicant.agreement,
            receivedInLastyear: applicant.received,
            applicationTypeId: applicationType.id,
            registerDate: registerDate,
            relativeId: relativeSelected?.id || '0',
            letterRef: letterRef
        }

        try {
            const result = await registerApplication(payload)

            resetFields()

            const applicants = preApplicants.filter(data => data.employeeId !== applicant.employeeId)

            dispatch(updApplicantsAndApplications({
                preApplicants: applicants,
                list: result.data
            }))

            dispatch(setNotification({
                message: 'Solicitud Registrada',
                type: 'success',
                delay: 1500
            }))


        } catch (error) {
            dispatch(setNotification({
                message: 'Error al registrar la solicitud',
                type: 'danger',
                delay: 1500
            }))
        }
    }

    function handleRelativeSelection(data) {
        setRelativeSel(data)
        setRelativeModal(false)
    }

    function handleSetApplicationType(value) {

        if (applicant === null) {
            dispatch(setNotification({
                message: 'No ingresado informacion del aplicante',
                type: 'warning',
                delay: 1500
            }))
            return
        }

        if (applicant.agreement === 'Fuera' && value.id === 1) {
            dispatch(setNotification({
                message: 'Esta opcion no esta permitida para colaboradores fuera de convenio',
                type: 'warning',
                delay: 1500
            }))

            return
        } else if (applicant.agreement === 'Dentro' && value.id === 1) {
            setApplicationType(value)
        } else if (applicant.agreement === 'Dentro' && value.id !== 1) {
            dispatch(setNotification({
                message: 'Esta opcion no esta permitida para colaboradores dentro del convenio',
                type: 'warning',
                delay: 1500
            }))

            return
        } else if (applicant.agreement === 'Fuera' && value.id !== 1) {
            setApplicationType(value)
        }

        if (value.id !== 3) {
            setRelativeSel(null)
        }
    }

    function handleSelectionClinic(value) {
        setClinic(value)
    }

    function handleRegisterDate(value) {
        const prevDate = getCurrentDateString('.', registerDate)
        const postDate = getCurrentDateString('.', value)

        setRegisterDate(value)
        setHashDate(postDate)


        setLetterRef(prev => prev.replace(prevDate, postDate))

    }

    function handleKeyDown(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setLetterRef(prev => {
                const hash = prev.slice(0, (prev.length - 11))
                if (hash.length === 0 || hash.length === 1) {
                    return ''
                } else if (hash.length > 1) {
                    return hash
                }
            })
        }
    }

    function updateDocumentRefs(value) {
        setLetterRef(prev => {
            if (isEmpty(prev)) {
                return value + '.' + hashDate
            } else {
                return value.replace(`.${hashDate}`, '') + '.' + hashDate
            }
        })
    }

    return (
        <div className='pre__applicants-form'>

            <div className="general__information">

                <div className='group__form'>
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
                        defaultValue={applicant !== null ? `${applicant.employeeName} ${applicant.surname}` : ''}
                        placeHolder="<<- Aplicante ->>"
                        customStyles="has-child disabled"
                        attachmentElement={
                            <InvokeModal handleClick={setIsModalOpen} />
                        }
                    />


                    <Select
                        id={'applicationType'}
                        name={'applicationType'}
                        options={applicationTypes}
                        currentValue={applicationType}
                        onChange={handleSetApplicationType}
                        label="Tipo Solicitud:"
                        orientation="row"
                    />

                    <Select
                        id={'clinic'}
                        name={'clinic'}
                        options={clinics}
                        currentValue={currentClinic}
                        onChange={handleSelectionClinic}
                        label="Clinica:"
                        orientation="row"
                    />

                    {
                        applicationType !== null && applicationType.id === 3 ?
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
                            /> : <></>
                    }

                    <CustomInput
                        id="letterRef"
                        name="letterRef"
                        label="Carta con Ref:"
                        orientation="row"
                        type="text"
                        value={letterRef}
                        handleKeyDown={handleKeyDown}
                        onChange={(e) => updateDocumentRefs(e.target.value)}
                    />

                    <button className='btn btn-save' onClick={handleOnSubmit}>
                        Guadar
                        <i className="bi bi-floppy"></i>
                    </button>

                </div>

                <div className="records">
                    <DataTable
                        dataSource={applicationsInProcess}
                        columnSizes={[15, 40, 10, 15, 10, 10]}
                        showColumns={['serie', 'fullname', 'employeeId', 'registerDate', 'applicationType', 'applicationStatus']}
                        labels={['Serie', 'Nombre', 'No Emp', 'Fecha', 'Tipo', 'Estado']}
                        sortColumn={[0, 1, 4, 5]}
                        entries={[6, 12, 24]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={() => { }}
                    />

                    <div className={'definitions'}>
                        <div className={'types'}>
                            <p><strong>CVN:</strong>Solicitud Bajo Convenio</p>
                            <p><strong>SPA:</strong>Solicitud Fuera de Convenio a Colaborador</p>
                            <p><strong>SPB:</strong>Solicitud Fuera de Convenio a Parientes</p>
                        </div>
                        <div className={'status'}>
                            <p><strong>R:</strong>Requiere Aprobacion</p>
                            <p><strong>A:</strong>Solicitud Aprobada</p>
                            <p><strong>D:</strong>Solicitud Denegada</p>
                        </div>

                    </div>
                </div>

            </div>





            <Modal
                title='Busqueda de Empleado'
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <DataTable
                        dataSource={preApplicants}
                        columnSizes={[10, 20, 20, 20, 15, 15]}
                        showColumns={['employeeId', 'employeeName', 'surname', 'secondSurname', 'agreement', 'received']}
                        labels={['Emp', 'Nombre', 'P Apellido', 'S Apellido', 'Convenio', 'Recibidos']}
                        sortColumn={[0, 1, 4, 5]}
                        entries={[3, 15, 50]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleEmployeeSelection}

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


        </div>
    )
}

export default PreApplicantsBenefitForm