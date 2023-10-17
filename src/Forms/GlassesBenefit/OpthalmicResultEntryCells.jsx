import ophthalmicIndicators from '../../data/ophthalmic-indicators.json'
import './ophthalmic-form.css'

export default function OphthalmicResultEntryCells({
    handleRightChange,
    handleLeftChange,
    rightEyeValues,
    leftEyeValue
}) {
    return (
        <>
            <div className='form-indicators'>
                {
                    ophthalmicIndicators.indicators.map((indicator, indexI) => (
                        <div key={indexI} className='indicator-name'>
                            <span>{indicator.name}</span>
                        </div>
                    ))
                }

            </div>

            <div className='form-eye-right'>
                {
                    ophthalmicIndicators.indicators.map((indicator, indexC) => (
                        <div key={`re-${indexC}`} className='indicator-right'>

                            {
                                indexC > 0 ?
                                    <input
                                        value={Object.values(rightEyeValues[indexC - 1])}
                                        onChange={(e) => handleRightChange(e)}
                                        name={`er${indicator.partialName}`}
                                        id={`rev-${indexC}`}
                                        type="text"
                                        className='form__input-indicator'
                                    /> :
                                    <span>Derecho</span>
                            }
                        </div>
                    ))
                }
            </div>

            <div className='form-eye-left'>
                {
                    ophthalmicIndicators.indicators.map((indicator, indexC) => (
                        <div key={`le-${indexC}`} className='indicator-left'>
                            {
                                indexC > 0 ?
                                    <input
                                        value={Object.values(leftEyeValue[indexC - 1])}
                                        onChange={(e) => handleLeftChange(e)}
                                        name={`el${indicator.partialName}`}
                                        id={`lev-${indexC}`}
                                        type="text"
                                        className='form__input-indicator'
                                    /> :
                                    <span>Izquierdo</span>
                            }
                        </div>
                    ))
                }
            </div>

        </>
    )
}