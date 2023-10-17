import { useState } from "react"
import Stepper from "../../Components/Stepper/Stepper"

import GeneralGlassesBenefitInfoForm from "../../Forms/GlassesBenefit/GeneralGlassesBenefitInfoForm"
import OphthalmicForm from '../../Forms/GlassesBenefit/OphthalmicForm'
import ApplicationSupportsForm from "../../Forms/GlassesBenefit/ApplicationSupportsForm"

import { useGlassProps } from "../../hooks/useGlass"

import { useAdminProps } from "../../hooks/useProps"

import './main-page.css'


export default function GlassesBenefitPage() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const {
        serializedClinics,
        serializedDiagnosis,
        serializedLensDetail,
        serializedLensMaterial,
        serializedLensType } = useGlassProps()

    const { serializedPaymentTypes, serializedAuthorizers} = useAdminProps()

    const multipleComponent = [
        <GeneralGlassesBenefitInfoForm
            clinics={serializedClinics}
            paymentTypes={serializedPaymentTypes}
            authorizers={serializedAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <OphthalmicForm
            diagnosis={serializedDiagnosis}
            lensDetail={serializedLensDetail}
            lensMaterial={serializedLensMaterial}
            lensType={serializedLensType}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <ApplicationSupportsForm
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />
    ]

    
    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficios de Lentes</h3>
            <Stepper
                CurrenComponent={multipleComponent.at(currentIndex)}
                currentIndex={currentIndex}
            />
        </div>
    )
}

