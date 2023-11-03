/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"

import Stepper from "../../Components/Stepper/Stepper"
import CustomDialog from "../../Components/Dialog/Dialog"
import GeneralGlassesBenefitInfoForm from "../../Forms/GlassesBenefit/GeneralGlassesBenefitInfoForm"
import OphthalmicForm from '../../Forms/GlassesBenefit/OphthalmicForm'
import ApplicationSupportsForm from "../../Forms/GlassesBenefit/ApplicationSupportsForm"

import { useAdminProps } from "../../hooks/useProps"
import { useTrackingProps } from "../../hooks/useTracking"
import {useFetchGlassesProps, useGlassProps} from "../../hooks/useGlass"

import { useNavigate } from "react-router-dom"

import '../main-page.css'
import {useBeneficiaryProps} from "../../hooks/useBeneficiary.js";


export default function GlassesBenefitPage() {
    const navigate = useNavigate()

    const { paymentTypes, userAuthorizers, authorizedAmoutForGlassBenefit } = useAdminProps()
    const { actions: trackingAct } = useTrackingProps()
    const { actions: beneficiaryAct } = useBeneficiaryProps()

    useFetchGlassesProps()

    const {
        clinics,
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType } = useGlassProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        /** true --> si hay una solicitud de edicion en seguimiento */
        const ownTrack = trackingAct.findTrack({ procIdentity: 'GL-EDIT' })

        if (ownTrack) {
            setIsOpen(true)
        }

        /*establecer lista de empleados */
        beneficiaryAct.setGlassesApplicants()
    }, [])

    const multipleComponent = [
        <GeneralGlassesBenefitInfoForm
            mode="register"
            clinics={clinics}
            paymentTypes={paymentTypes}
            authorizers={userAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
            authorizedAmount={authorizedAmoutForGlassBenefit}
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

