import { useState} from 'react'

import GnralScholarshipApplicationForm from "../../Forms/scholarship/GnralScholarshipApplicationForm.jsx";
import Stepper from "../../Components/Stepper/Stepper.jsx";

import '../main-page.css'

const ScholarshipApplicationPage = () => {
    
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const multipleComponent = [
        <GnralScholarshipApplicationForm/>
    ]
    
    return (
        <div className={'content__page'}>
            <h3 className="bread__crum">Beneficios de Becas - Registro de Becarios</h3>
            
            <Stepper
                CurrenComponent={multipleComponent.at(currentIndex)}
                steps={["1", "2"]}
                currentIndex={currentIndex}
            /> : <></>
            
        </div>
    )
}

export default  ScholarshipApplicationPage