import {useEffect, useState} from 'react'
import { useAdminProps } from '../../hooks/useProps'

import Stepper from '../../Components/Stepper/Stepper'
import DeathGeneralInfoForm from '../../Forms/Death/DeathGeneralInfoForm'

import '../main-page.css'
import AdditionalDeathInfoForm from '../../Forms/Death/AdditionalDeathInfoForm'
import CustomDialog from "../../Components/Dialog/Dialog.jsx";
import {useNavigate} from "react-router-dom";
import {useTrackingProps} from "../../hooks/useTracking.js";
import {useBeneficiaryProps} from "../../hooks/useBeneficiary.js";
import {useDeathRequestManagement} from "../../hooks/useDeath.js";

export default function DeathBenefitPage() {

    const navigate = useNavigate()
    const { actions: trackingAct } = useTrackingProps()

    const { actions: beneficiaryAct} = useBeneficiaryProps()
    const { actions: deathAct} = useDeathRequestManagement()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const {
        internalExchange,
        paymentTypes,
        serializedAuthorizers } = useAdminProps()

    useEffect(() => {
        /** true --> si hay una solicitud de edicion en seguimiento */
        const ownTrack = trackingAct.findTrack({ procIdentity: 'DAH-EDIT' })

        if (ownTrack) {
            setIsOpen(true)
        }

        deathAct.setRequiredSupport()
        beneficiaryAct.setAsyncEmployeeWithRelatives()

    }, [])

    const MultipleComponent = [
        <DeathGeneralInfoForm
            mode={'register'}
            paymentTypes={paymentTypes}
            authorizers={serializedAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <AdditionalDeathInfoForm
            internalExchange={internalExchange}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />
    ]

    function onDialog(choose) {
        if (choose) {
            setIsOpen(false)
            trackingAct.trackingUpdate({
                typeAction: 'freeUpSpace',
                space: 'death'
            })
        } else navigate(-1)
    }

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficio por Defuncion</h3>

           {
            !isOpen ?
                 <Stepper
                     CurrenComponent={MultipleComponent.at(currentIndex)}
                     steps={["1", "2"]}
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