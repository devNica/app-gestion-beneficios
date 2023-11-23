import CustomCheckOption from "../../Components/CustomCheckOption/CustomCheckOption.jsx";

export default function RegistrationSupport({
    requiredSupport = [],
    onChange
}) {
    
    const renderElements = requiredSupport.map((item, index) => (
        <div key={index}>
            <CustomCheckOption
                id={item.id}
                name={item.fieldName}
                label={item.value}
                orientation={'row'}
                checked={item.selected}
                onChange={onChange}
                justified={'flex-end'}
            />
        </div>
    ))

    return (
        renderElements
    )
}