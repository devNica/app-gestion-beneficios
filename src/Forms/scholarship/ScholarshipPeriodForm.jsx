import CustomInput from "../../Components/CustomInput/CustomInput.jsx";

import './scholarship.css'
import DataTable from "../../Components/DataTable/DataTable.jsx";

import dataPayload from '../../data/scholar-period.json'
import {useState} from "react";
import CustomCheckOption from "../../Components/CustomCheckOption/CustomCheckOption.jsx";
const ScholarshipPeriodForm = () => {
    
    const [initDate, setInitDate] = useState(null)
    const [evalDate, setEvalDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [reference, setReference] = useState(null)
    const [currentMode, setCurrenMode] = useState('regMode')
    
    function handlePeriodSelection(data){
        const {initDate, evalDate, endDate} = data
        
        const InitDate = initDate.split('/')
        const EvalDate = evalDate.split('/')
        const EndDate = endDate.split('/')
        
        setInitDate(`${InitDate[2]}-${InitDate[1]}-${InitDate[0]}`)
        setEvalDate(`${EvalDate[2]}-${EvalDate[1]}-${EvalDate[0]}`)
        setEndDate(`${EndDate[2]}-${EndDate[1]}-${EndDate[0]}`)
        setReference(data.reference)
        
    }
    
    function handleChangeOption(v){
        setInitDate('')
        setEvalDate('')
        setEndDate('')
        setReference('')
        setCurrenMode(v)
    }
    
    return (
        <div className='scholarship__period-form'>
            
            <div className={'options'}>
                <CustomCheckOption
                    id={'editMode'}
                    name={'editMode'}
                    isCheckBox={false}
                    value={'regMode'}
                    currentValue={currentMode}
                    onChange={(v) => handleChangeOption(v)}
                    label="Nuevo Periodo:"
                />
                
                <CustomCheckOption
                    id={'editMode'}
                    name={'editMode'}
                    isCheckBox={false}
                    value={'editMode'}
                    currentValue={currentMode}
                    onChange={(v) => handleChangeOption(v)}
                    label="Editar Periodo:"
                />
            </div>
            
            <div className='row-1'>
                <CustomInput
                    name={'initDate'}
                    id={'initDate'}
                    label={"Fecha Inicial"}
                    type={'date'}
                    value={initDate ?? ''}
                    onChange={(e)=>setInitDate(e.target.value)}
                />

                <CustomInput
                    name={'evalDate'}
                    id={'evalDate'}
                    label={"Fecha Evaluacion"}
                    type={'date'}
                    value={evalDate ?? ''}
                    onChange={(e)=>setEvalDate(e.target.value)}
                />

                <CustomInput
                    name={'endDate'}
                    id={'endDate'}
                    label={"Fecha Finalizacion"}
                    type={'date'}
                    value={endDate ?? ''}
                    onChange={(e)=>setEndDate(e.target.value)}
                />

                <CustomInput
                    name={'reference'}
                    id={'reference'}
                    label={"Referencia"}
                    type={'text'}
                    value={reference?? ''}
                    customStyles={'has-child'}
                    onChange={(e)=>setReference(e.target.value)}
                    attachmentElement={
                        <button className={`action-btn ${currentMode === 'regMode' ? 'register' : 'edit'}`}>
                           {
                           currentMode === 'regMode' ?  <i className="bi bi-calendar-plus"></i> : <i className="bi bi-pencil-square"></i>
                           }
                        </button>
                    }
                />
            </div>
            
            <div className='row-2'>
                
                    <DataTable
                        dataSource={dataPayload}
                        columnSizes={[10, 20, 20, 20, 15, 15]}
                        labels={['Id', 'Inicio', 'Evaluacion', 'Final', 'Refs', 'Estado']}
                        sortColumn={[0, 4]}
                        entries={[5, 10, 20]}
                        enableSearch={true}
                        enableEntries={true}
                        onSelectedRow={handlePeriodSelection}
                    />
                
                
            </div>
            
            
        </div>
    )
}

export default  ScholarshipPeriodForm