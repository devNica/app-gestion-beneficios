import { useState } from 'react'
import { useAdminProps } from '../../hooks/useProps'

import Stepper from '../../Components/Stepper/Stepper'
import DeathGeneralInfoForm from '../../Forms/Death/DeathGeneralInfoForm'

import '../main-page.css'
import AdditionalDeathInfoForm from '../../Forms/Death/AdditionalDeathInfoForm'

export default function DeathBenefitPage() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const { 
        serializedPaymentTypes, 
        serializedAuthorizers } = useAdminProps()

    const MultipleComponent = [
        <DeathGeneralInfoForm
            paymentTypes={serializedPaymentTypes}
            authorizers={serializedAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <AdditionalDeathInfoForm
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />
    ]

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficio por Defuncion</h3>

            <Stepper
                CurrenComponent={MultipleComponent.at(currentIndex)}
                steps={["1", "2"]}
                currentIndex={currentIndex}
            />

        </div>
    )
}