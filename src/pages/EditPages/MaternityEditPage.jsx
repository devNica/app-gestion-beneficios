import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom";

import CustomDialog from "../../Components/Dialog/Dialog.jsx";
import Stepper from "../../Components/Stepper/Stepper"
import MaternityGeneralInfoForm from "../../Forms/maternity/MaternityGeneralInfoForm"
import NewbornInfoForm from "../../Forms/maternity/NewbornInfoForm"

import {useTrackingProps} from "../../hooks/useTracking.js";
import { useAdminProps } from "../../hooks/useProps"
import {useBeneficiaryProps} from "../../hooks/useBeneficiary.js";

import '../main-page.css'

export default function MaternityEditPage() {

    const navigate = useNavigate()
    const { actions: trackingAct } = useTrackingProps()

    const { actions: beneficiaryAct} = useBeneficiaryProps()

    const { paymentTypes, serializedAuthorizers, maternityAmounts,
        internalExchange, maternitySupports, typesBirth
    } = useAdminProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        /** true --> si hay una solicitud de edicion en seguimiento */
        const ownTrack = trackingAct.findTrack({ procIdentity: 'MTN-REG' })

        if (ownTrack) {
            setIsOpen(true)
        }

        /* establecer lista de empleados con hijos*/
        beneficiaryAct.setAsyncEmployeeWithChildrens()

    }, [])

    const MultipleComponent = [
        <MaternityGeneralInfoForm
            mode={'edit'}
            paymentTypes={paymentTypes}
            authorizers={serializedAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
            />,
        <NewbornInfoForm
            authorizedAmountsMathernity={maternityAmounts}
            maternitySupports={maternitySupports}
            typesBirth={typesBirth}
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
                space: 'maternity'
            })
        } else navigate(-1)
    }

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficio de Maternidad</h3>

            {
            !isOpen ?
                <Stepper
                    CurrenComponent={MultipleComponent.at(currentIndex)}
                    steps={["1", "2"]}
                    currentIndex={currentIndex}
                />: <></>
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
