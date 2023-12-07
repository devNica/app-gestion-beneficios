import PropTypes from "prop-types"
import './stepper.css'

function StepHeader({ step, isActive }) {

    return (
        <li className={`step__item ${isActive ? 'active' : ''}`}>
            <div>
                <p className='step__title'>{step}</p>
            </div>
        </li>
    )
}

StepHeader.propTypes = {
    step: PropTypes.string,
    isActive: PropTypes.bool
}

function StepButtons({ currentIndex, numberStep, setCurrentIndex, handleSubmit }) {
    if (currentIndex === 0) {
        return (
            <div className="netx"
                onClick={() => setCurrentIndex(currentIndex + 1)}
            >
                <button type='button' className='btn btn__next'>Siguiente</button>
            </div>
        )
    } else if (currentIndex > 0 && currentIndex < (numberStep - 1)) {
        return (
            <>
                <div className="prev"
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>

                <div className="netx"
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                    <button type='button' className='btn btn__next'>Siguiente</button>
                </div>
            </>
        )
    } else if (currentIndex === (numberStep - 1)) {
        return (
            <>
                <div className="prev"
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                    <button type='button' className='btn btn__prev'>Atras</button>
                </div>

                <div className="done"
                    onClick={handleSubmit}
                >
                    <button type='button' className='btn btn__done'>Listo</button>
                </div>
            </>
        )
    }
}

StepButtons.propTypes = {
    currentIndex: PropTypes.number,
    numberStep: PropTypes.number,
    setCurrentIndex: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default function Stepper(props) {

    const {
        steps = ["A", "B", "C"],
        showNavigation = false,
        CurrenComponent,
        setIndex,
        currentIndex,
        showIndicators = true
    } = props

    return (
        <div className="stepper">
            {
                showIndicators ?
                    <div className="stepper__header">
                        <ul>
                            {
                                steps.map((s, index) =>
                                    <StepHeader
                                        step={s}
                                        key={index}
                                        isActive={index <= currentIndex}
                                    />
                                )
                            }
                        </ul>
                    </div> : <></>
            }

            <div className="stepper__content">
                {CurrenComponent}
            </div>

            {
                showNavigation ?
                    <div className="stepper__buttons">
                        {
                            <StepButtons
                                currentIndex={currentIndex}
                                numberStep={steps.length}
                                setCurrentIndex={setIndex}
                            />
                        }
                    </div> : <></>
            }

        </div>
    )
}

Stepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string),
    showNavigation: PropTypes.bool,
    CurrenComponent: PropTypes.element,
    setIndex: PropTypes.func,
    currentIndex: PropTypes.number
}