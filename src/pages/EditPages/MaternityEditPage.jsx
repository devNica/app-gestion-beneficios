import {useCallback, useEffect, useState} from "react"

import {useNavigate, useParams} from "react-router-dom";

import CustomDialog from "../../Components/Dialog/Dialog.jsx";
import Stepper from "../../Components/Stepper/Stepper"
import MaternityGeneralInfoForm from "../../Forms/maternity/MaternityGeneralInfoForm"
import NewbornInfoForm from "../../Forms/maternity/NewbornInfoForm"

import {useTrackingProps} from "../../hooks/useTracking.js";
import { useAdminProps } from "../../hooks/useProps"

import '../main-page.css'
import {useMaternityRequestManagement} from "../../hooks/useMaternity.js";
import {
    fetchAuthorizedAmountsForMaternity,
    fetchMaternityApplicants,
    fetchMaternityRequestDetail
} from "../../service/api.js";
import CustomLoader from "../../Components/Loader/CustomLoader.jsx";

export default function MaternityEditPage() {

    const navigate = useNavigate()
    const { id } = useParams()
    const { actions: trackingAct } = useTrackingProps()

    const { paymentTypes, userAuthorizers,
        exchangeRate, maternitySupports, typesBirth
    } = useAdminProps()

    const { states: maternitySts, actions: maternityAct } = useMaternityRequestManagement()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetching = useCallback(async()=>{
        try{
            const [applicants, amounts, record] = await Promise.all([
                fetchMaternityApplicants('edit'),
                fetchAuthorizedAmountsForMaternity(),
                fetchMaternityRequestDetail(id)
            ])

            maternityAct.initialDataLoading(applicants, amounts, 'edit', record)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }, [])

    useEffect(() => {
        /** true --> si hay una solicitud de edicion en seguimiento */
        const ownTrack = trackingAct.findTrack({ procIdentity: 'MTN-REG' })

        if (ownTrack) {
            setIsOpen(true)
        }

        setLoading(true)
        fetching()

    }, [])

    const MultipleComponent = [
        <MaternityGeneralInfoForm
            mode={'edit'}
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
            mode={'edit'}
            orderId={id}
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
