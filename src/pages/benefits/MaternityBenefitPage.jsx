import { useState } from "react"
import Stepper from "../../Components/Stepper/Stepper"
import MaternityGeneralInfoForm from "../../Forms/maternity/MaternityGeneralInfoForm"
import { useAdminProps } from "../../hooks/useProps"
import NewbornInfoForm from "../../Forms/maternity/NewbornInfoForm"

import './main-page.css'

export default function MaternityBenefitPage() {

    const [currentIndex, setCurrentIndex] = useState(0)

    const { serializedPaymentTypes, serializedAuthorizers,
        authorizedAmountsMathernity, internalExchange, maternitySupports, typesBirth
    } = useAdminProps()

    const MultipleComponent = [
        <MaternityGeneralInfoForm
            paymentTypes={serializedPaymentTypes}
            authorizers={serializedAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <NewbornInfoForm
            authorizedAmountsMathernity={authorizedAmountsMathernity}
            maternitySupports={maternitySupports}
            typesBirth={typesBirth}
            internalExchange={internalExchange}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />

    ]

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficio de Maternidad</h3>

            <Stepper
                CurrenComponent={MultipleComponent.at(currentIndex)}
                steps={["1", "2"]}
                currentIndex={currentIndex}
            />

        </div>
    )
}
