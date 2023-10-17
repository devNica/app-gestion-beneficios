import './fake-input.css'

export default function FakeInput ({ title, defaultValue, orientation = 'column' }) {
    return (
        <div className={`fake__input ${orientation}`}>
            <span className="fake__input-title">{title}</span>
            <div className="fake__input-value">
                {defaultValue}
            </div>
        </div>
    )
}