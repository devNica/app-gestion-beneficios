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
import {useBeneficiaryProps} from "../../hooks/useBeneficiary.js";

export default function GlassesBenefitEditPage() {

    const { paymentTypes, serializedAuthorizers } = useAdminProps()
    const { actions: trackingAct } = useTrackingProps()
    const { actions: beneficiaryAct } = useBeneficiaryProps()

    const navigate = useNavigate()

    const {
        clinics,
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType } = useGlassProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const ownTrack = trackingAct.findTrack({ procIdentity: 'GL-REG' })

        if (ownTrack) {
            setIsOpen(true)
        }

        /*establecer lista de empleados */
        beneficiaryAct.setAsyncEmployeeList()

    }, [])

    const multipleComponent = [
        <GeneralGlassesBenefitInfoForm
            mode="edit"
            clinics={clinics}
            paymentTypes={paymentTypes}
            authorizers={serializedAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <OphthalmicForm
            diagnosis={diagnosis}
            lensDetail={lensDetail}
            lensMaterial={lensMaterial}
            lensType={lensType}
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
