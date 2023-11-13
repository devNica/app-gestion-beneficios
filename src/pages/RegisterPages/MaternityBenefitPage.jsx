import {useCallback, useEffect, useState} from "react"

import {useNavigate} from "react-router-dom";

import Stepper from "../../Components/Stepper/Stepper"
import MaternityGeneralInfoForm from "../../Forms/maternity/MaternityGeneralInfoForm"
import NewbornInfoForm from "../../Forms/maternity/NewbornInfoForm"

import {useTrackingProps} from "../../hooks/useTracking.js";
import { useAdminProps } from "../../hooks/useProps"

import '../main-page.css'
import CustomDialog from "../../Components/Dialog/Dialog.jsx";
import {useMaternityRequestManagement} from "../../hooks/useMaternity.js";
import {fetchAuthorizedAmountsForMaternity, fetchMaternityApplicants} from "../../service/api.js";
import CustomLoader from "../../Components/Loader/CustomLoader.jsx";
export default function MaternityBenefitPage() {

    const navigate = useNavigate()
    const { actions: trackingAct } = useTrackingProps()
    const { states: maternitySts, actions: maternityAct } = useMaternityRequestManagement()

    const { paymentTypes, userAuthorizers,
         exchangeRate, maternitySupports, typesBirth
    } = useAdminProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetching = useCallback(async()=>{
        try{
            const [applicants, amounts] = await Promise.all([
                fetchMaternityApplicants(),
                fetchAuthorizedAmountsForMaternity()
            ])

            maternityAct.initialDataLoading(applicants, amounts)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }, [])

    useEffect(() => {
        /** true --> si hay una solicitud de edicion en seguimiento */
        const ownTrack = trackingAct.findTrack({ procIdentity: 'MTN-EDIT' })

        if (ownTrack) {
            setIsOpen(true)
        }

        setLoading(true)
        fetching()

    }, [])

    const MultipleComponent = [
        <MaternityGeneralInfoForm
            mode={'register'}
            paymentTypes={paymentTypes}
            authorizers={userAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <NewbornInfoForm
            authorizedAmountsMathernity={maternitySts.authorizedAmount}
            maternitySupports={maternitySupports}
            typesBirth={typesBirth}
            exchangeRate={exchangeRate}
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
                loading ? <CustomLoader/> :
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
