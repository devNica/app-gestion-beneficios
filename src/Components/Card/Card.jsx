import PropTypes from "prop-types"
import './card.css'

export default function Card({
    Component,
    mageneticIcon = false,
    urlIcon = null,
    title = '',
    handleOnSubmit
}) {
    return (
        <div className="card">
            {
                mageneticIcon ?
                    <div className="magnetic__icon">
                        <img src={urlIcon} alt="icon" className='icon' />
                    </div> : <></>
            }

            {
                title !== '' ?
                    <div className="card__header">
                        <h2 className='title'>{title}</h2>
                    </div> : <>
                    </>
            }
            <div className="card__body">
                {<Component handleOnSubmit={handleOnSubmit}/>}
            </div>
        </div>
    )
}

Card.propTypes = {
    Component: PropTypes.elementType,
    mageneticIcon: PropTypes.bool,
    urlIcon: PropTypes.string,
    title: PropTypes.string,
    handleOnSubmit: PropTypes.func
}