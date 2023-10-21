import Select from '../../Components/Select/Select'
import SelectTags from '../../Components/Select/SelectTags'

import OphthalmicResultEntryCells from './OpthalmicResultEntryCells'
import { useHandleOphthalmicForm } from '../../hooks/forms/glasses/useOphthalmicForm'
import PropTypes from "prop-types";

import './ophthalmic-form.css'


const OphthalmicForm = ({
    diagnosis,
    lensMaterial,
    lensDetail,
    lensType,
    currentIndex,
    updateCurrentIndex
}) => {

    const { states, actions } = useHandleOphthalmicForm({ currentIndex, updateCurrentIndex })

    const {detail,leftEye, len, material, rightEye, currentDiagnosis } = states
    const { handleBackStep, handleLeftChange, handleNextStep, handleRightChange, 
        setCurrentDetail, setCurrentLen, setCurrentMaterial, setDiagnosisList } = actions

    
    return (
        <div className="form__ophthalmic">
            <div className="form__title">
                <h2>
                    Resultados de Examen Oftalmico
                </h2>
            </div>
            <div className="form__middle">
                <OphthalmicResultEntryCells
                    handleRightChange={handleRightChange}
                    handleLeftChange={handleLeftChange}
                    rightEyeValues={rightEye}
                    leftEyeValue={leftEye}
                />
            </div>

            <div className="glass__spec">

                <div className="row_1">

                    <Select
                        id={'lenType'}
                        options={lensType}
                        currentValue={len}
                        onChange={(v) => setCurrentLen(v)}
                        label='Caracteristicas:'
                    />

                    <Select
                        id={'lenMaterial'}
                        options={lensMaterial}
                        currentValue={material}
                        onChange={(v) => setCurrentMaterial(v)}
                        label='Material:'
                    />

                    <Select
                        id={'lenDetail'}
                        options={lensDetail}
                        currentValue={detail}
                        onChange={(v) => setCurrentDetail(v)}
                        label='Tipo Detalle:'
                    />

                </div>

                <div className="row_2">
                    <SelectTags
                        label='Diagnostico:'
                        data={diagnosis}
                        value={currentDiagnosis}
                        onChange={(v)=> setDiagnosisList(v)}
                    />
                </div>
            </div>

            <div className="form__group-actions">
                <div className="prev"
                    onClick={handleBackStep}
                >
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>

                <div className="netx"
                    onClick={handleNextStep}
                >
                    <button type='button' className='btn btn__next'>Siguiente</button>
                </div>
            </div>
        </div>
    )
}

export default OphthalmicForm

OphthalmicForm.propTypes = {
    diagnosis: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string
    })),
    lensMaterial: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    lensDetail: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    lensType: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })),
    currentIndex: PropTypes.number,
    updateCurrentIndex: PropTypes.func
}