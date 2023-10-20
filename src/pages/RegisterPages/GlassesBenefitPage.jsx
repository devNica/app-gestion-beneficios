import { useEffect, useState } from "react"

import Stepper from "../../Components/Stepper/Stepper"
import CustomDialog from "../../Components/Dialog/Dialog"
import GeneralGlassesBenefitInfoForm from "../../Forms/GlassesBenefit/GeneralGlassesBenefitInfoForm"
import OphthalmicForm from '../../Forms/GlassesBenefit/OphthalmicForm'
import ApplicationSupportsForm from "../../Forms/GlassesBenefit/ApplicationSupportsForm"

import { useAdminProps } from "../../hooks/useProps"
import { useTrackingProps } from "../../hooks/useTracking"
import { useGlassProps } from "../../hooks/useGlass"

import { useNavigate } from "react-router-dom"

import '../main-page.css'


export default function GlassesBenefitPage() {
    const navigate = useNavigate()

    const { serializedPaymentTypes, serializedAuthorizers } = useAdminProps()
    const { states: trackingSts, actions: trackingAct } = useTrackingProps()
    
    const {
        serializedClinics,
        serializedDiagnosis,
        serializedLensDetail,
        serializedLensMaterial,
        serializedLensType } = useGlassProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        /** true --> si hay una solicitud de nuevo registro en seguimiento */
        const ownTrack = trackingAct.glassSpace({ mode: 'register' })
        
        if (!ownTrack && trackingSts.recordTracking.length > 0) {
            setIsOpen(true)
        }

    }, [])

    const multipleComponent = [
        <GeneralGlassesBenefitInfoForm
            mode="register"
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
            <h3 className="bread__crum">Beneficios de Lentes - Registro</h3>

            {
                !isOpen ? <Stepper
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

