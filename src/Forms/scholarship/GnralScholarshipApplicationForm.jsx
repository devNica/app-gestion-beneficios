import './gnral-scholarship-app.css'
import {useState} from "react";
import CustomInput from "../../Components/CustomInput/CustomInput.jsx";
import Select from "../../Components/Select/Select.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import DataTable from "../../Components/DataTable/DataTable.jsx";

const academicLevels = [
    { id: 1, value: 'Primaria' },
    { id: 2, value: "Secundaria" },
    { id: 3, value: "Universidad" },
    { id: 4, value: "Postgrado" }
]

const courseModality = [
    { id: 1, value: 'Semestral' },
    { id: 2, value: 'Cuatrimestral' },
    { id: 3, value: 'Trimestral' },
]

import dataPayload from '../../data/employee-with-childrens.json'
import degreePayload from '../../data/degree.json'
import collegePayload from '../../data/college.json'

import {filterData} from "../../utils/object.util.js";
import InvokeModal from "../../Components/Modal/InvokeModal.jsx";
import CustomCheckOption from "../../Components/CustomCheckOption/CustomCheckOption.jsx";

const GnralScholarshipApplicationForm = () => {
    
    const [registerDate, setRegisterDate] = useState('')
    const [academicLevel, setAcademicLevel] = useState(academicLevels[0])
    const [degree, setDegree] = useState(null)
    const [modality, setModality] = useState(courseModality[0])
    const [employee, setEmployee] = useState(null)
    const [beneficiaryType, setTypeBeneficiary] = useState('employeeSelected')
    const [relatives, setRelatives] = useState([])
    const [relativeSelected, setRelativeSelected] =useState(null)
    const [beneficiaryLabel, setLabel] = useState('Becario')
    const [institute, setInstitute] = useState(null)
    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [degreeModalOpen, setDegreeModalOpen] = useState(false)
    const [instituteModalOpen, setInstituteModalOpen] = useState(false)
    
    const employeeList = filterData(
        [],
        ['id', 'firstName', 'lastName', 'employeeNumber'], dataPayload)
    
    function handleEmployeeSelection(data){
        setEmployee(data)
        setIsModalOpen(false)
        
        const results = dataPayload.find(dp => dp.employeeNumber === data.employeeNumber).children
        const relatives = results.map(r=>({ id: r.id, value: r.fullname }))
        setRelatives(relatives)
    }
    
    function handleDegreeSelection(data){
        setDegree(data)
        setDegreeModalOpen(false)
    }
    
    function handleInstituteSelection(data){
        setInstitute(data)
        setInstituteModalOpen(false)
    }
    
    function handleChangeBeneficiaryType(v){
        setTypeBeneficiary(v)
        if(v === 'employeeSelected') {
            setLabel('Becario')
        } else {
            setLabel('Beneficiario')
        }
    }
    
    return (
        <div className={'gnral__scholarship__application-form'}>

            <div className={'form__group-top'}>
                <CustomCheckOption
                    id={'employeeSelected'}
                    name={'employeeSelected'}
                    isCheckBox={false}
                    value={'employeeSelected'}
                    currentValue={beneficiaryType}
                    onChange={(v) => handleChangeBeneficiaryType(v)}
                    label="Funcionario:"
                />

                <CustomCheckOption
                    id={'familiarSelected'}
                    name={'familiarSelected'}
                    isCheckBox={false}
                    value={'familiarSelected'}
                    currentValue={beneficiaryType}
                    onChange={(v) => handleChangeBeneficiaryType(v)}
                    label="Familiar:"
                />
            </div>

            <div className={'form__group-middle'}>
                <div className={'form__group-left'}>
                    <CustomInput
                        id="registerDate"
                        name="registerDate"
                        type="date"
                        label="Fecha:"
                        orientation="row"
                        value={registerDate}
                        onChange={(e) => setRegisterDate(e.target.value)}
                    />

                    <Select
                        id={'academicLevel'}
                        name={'academicLevel'}
                        options={academicLevels}
                        currentValue={academicLevel}
                        onChange={(v)=>setAcademicLevel(v)}
                        label="Nivel Academico:"
                        orientation="row"
                    />

                    <CustomInput
                        id="employee"
                        name="employee"
                        label={beneficiaryLabel}
                        orientation="row"
                        editable={false}
                        defaultValue={employee !== null ? `${employee.firstName} ${employee.lastName}` : ''}
                        placeHolder="<<- Funcionario ->>"
                        customStyles="has-child disabled"
                        attachmentElement={
                            <InvokeModal handleClick={setIsModalOpen} />
                        }
                    />

                    {
                        beneficiaryType === 'familiarSelected' ?
                             <Select
                                 id={'relative'}
                                 name={'relative'}
                                 options={relatives}
                                 currentValue={relativeSelected}
                                 onChange={(v)=>setRelativeSelected(v)}
                                 label="Becario:"
                                 orientation="row"
                             /> : <></>
                    }
                   
                </div>
                
                <div className={'form__group-right'}>
                    <CustomInput
                        id="institute"
                        name="institute"
                        label={'Instituto:'}
                        orientation="row"
                        editable={false}
                        defaultValue={institute !== null ? institute.instituteName : ''}
                        placeHolder="<<- Instituto Educativo ->>"
                        customStyles="has-child disabled"
                        attachmentElement={
                            <InvokeModal handleClick={setInstituteModalOpen} />
                        }
                    />
                    
                    <CustomInput
                        id="degree"
                        name="degree"
                        label={'Grado a Cursar:'}
                        orientation="row"
                        editable={false}
                        defaultValue={degree !== null ? degree.course : ''}
                        placeHolder="<<- Grado a Cursar ->>"
                        customStyles="has-child disabled"
                        attachmentElement={
                            <InvokeModal handleClick={setDegreeModalOpen} />
                        }
                    />
                    
                    <Select
                        id={'courseModality'}
                        name={'courseModality'}
                        options={courseModality}
                        currentValue={modality}
                        onChange={(v)=>setModality(v)}
                        label="Modalidad:"
                        orientation="row"
                    />
                </div>
                
            </div>
            
            <Modal
                title='Busqueda de Empleado'
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <DataTable
                        dataSource={employeeList}
                        columnSizes={[10, 30, 30, 30]}
                        labels={['Id', 'Nombre', 'Apellido', 'N Emp']}
                        sortColumn={[0, 1, 2, 3]}
                        entries={[5, 10, 20]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleEmployeeSelection}
                    />
                }
            />
            
            <Modal
                title='Busqueda de Curso a Llevar'
                isOpen={degreeModalOpen}
                onClose={() => setDegreeModalOpen(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <DataTable
                        dataSource={degreePayload}
                        columnSizes={[10, 30, 60]}
                        labels={['Id', 'Curso', 'Grado']}
                        sortColumn={[0, 1]}
                        entries={[5, 10, 20]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleDegreeSelection}
                    />
                }
            />
            
            
            <Modal
                title='Busqueda de Institucion Educativa'
                isOpen={instituteModalOpen}
                onClose={() => setInstituteModalOpen(false)}
                // eslint-disable-next-line react/no-children-prop
                children={
                    <DataTable
                        dataSource={collegePayload}
                        columnSizes={[10, 60, 30]}
                        labels={['Id', 'Instituto', 'Grado']}
                        sortColumn={[0, 1]}
                        entries={[5, 10, 20]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handleInstituteSelection}
                    />
                }
            />
            
            
        </div>
    )
}

export default GnralScholarshipApplicationForm