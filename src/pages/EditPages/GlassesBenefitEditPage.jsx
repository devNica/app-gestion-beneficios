import { useState, useEffect } from "react"

import Stepper from "../../Components/Stepper/Stepper"
import CustomDialog from "../../Components/Dialog/Dialog"

import GeneralGlassesBenefitInfoForm from "../../Forms/GlassesBenefit/GeneralGlassesBenefitInfoForm"
import OphthalmicForm from '../../Forms/GlassesBenefit/OphthalmicForm'
import ApplicationSupportsForm from "../../Forms/GlassesBenefit/ApplicationSupportsForm"

import { useGlassProps } from "../../hooks/useGlass"
import { useAdminProps } from "../../hooks/useProps"
import { useTrackingProps } from "../../hooks/useTracking"

import { useNavigate } from "react-router-dom"

import '../main-page.css'

export default function GlassesBenefitEditPage() {

    const { serializedPaymentTypes, serializedAuthorizers } = useAdminProps()
    const { states: trackingSts, actions: trackingAct } = useTrackingProps()

    const navigate = useNavigate()

    const {
        serializedClinics,
        serializedDiagnosis,
        serializedLensDetail,
        serializedLensMaterial,
        serializedLensType } = useGlassProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const ownTrack = trackingAct.findTrack({ procIdentity: 'GL-REG' })

        if (ownTrack) {
            setIsOpen(true)
        }
    }, [])

    const multipleComponent = [
        <GeneralGlassesBenefitInfoForm
            mode="edit"
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

    function onDialog(choose) {
        if (choose) {
            setIsOpen(false)
            trackingAct.trackingUpdate({
                typeAction: 'freeUpSpace',
                space: 'glass'
            })
        } else navigate(-1)
    }

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficios de Lentes - Edicion</h3>
            {
                !isOpen ?
                    <Stepper
                        CurrenComponent={multipleComponent.at(currentIndex)}
                        currentIndex={currentIndex}
                    /> : <></>
            }
            <CustomDialog
                isOpen={isOpen}
                positiveActionTitle="Continuar"
                negativeActionTitle="Cancelar"
                onDialog={onDialog}
                showIcons={true}
                message="Tiene pendiente una solicitud sin salvar"
                question="¿Desea perder los cambios realizados?"
            />
        </div>
    )

}
