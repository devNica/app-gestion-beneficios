import {useCallback, useEffect, useState} from 'react'
import { useAdminProps } from '../../hooks/useProps'

import Stepper from '../../Components/Stepper/Stepper'
import DeathGeneralInfoForm from '../../Forms/Death/DeathGeneralInfoForm'

import '../main-page.css'
import AdditionalDeathInfoForm from '../../Forms/Death/AdditionalDeathInfoForm'
import CustomDialog from "../../Components/Dialog/Dialog.jsx";
import {useNavigate} from "react-router-dom";
import {useTrackingProps} from "../../hooks/useTracking.js";
import {useDeathRequestManagement} from "../../hooks/useDeath.js";
import { fetchDeathBenefitApplicantsFromAPI, fetchDeathBenefitPropsFromAPI } from '../../service/death.api.js'
import CustomLoader from '../../Components/Loader/CustomLoader.jsx'

export default function DeathBenefitPage() {

    const navigate = useNavigate()

    const { actions: trackingAct } = useTrackingProps()
    const { actions: deathAct} = useDeathRequestManagement()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const {
        paymentTypes,
        userAuthorizers } = useAdminProps()

    const fetching = useCallback(async()=>{
        try {
            const [applicants, props] =  await Promise.all([
                fetchDeathBenefitApplicantsFromAPI(),
                fetchDeathBenefitPropsFromAPI() ])
            deathAct.initialDataLoading(applicants, props, 'register')
            setLoading(false)
        } catch (err){
            console.log(err)
        }
    },[])

    useEffect(() => {
        /** true --> si hay una solicitud de edicion en seguimiento */
        const ownTrack = trackingAct.findTrack({ procIdentity: 'DAH-EDIT' })

        if (ownTrack) {
            setIsOpen(true)
        }

        setLoading(true)
        fetching()

    }, [])

    const MultipleComponent = [
        <DeathGeneralInfoForm
            mode={'register'}
            paymentTypes={paymentTypes}
            authorizers={userAuthorizers}
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />,
        <AdditionalDeathInfoForm
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
            mode='register'
            orderId={''}
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
                loading ?
                    <CustomLoader/> :
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