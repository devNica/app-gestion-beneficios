/* eslint-disable react/jsx-key */
import { useState, useEffect, useCallback } from "react"

import Stepper from "../../Components/Stepper/Stepper"
import CustomDialog from "../../Components/Dialog/Dialog"

import GeneralGlassesBenefitInfoForm from "../../Forms/GlassesBenefit/GeneralGlassesBenefitInfoForm"
import OphthalmicForm from '../../Forms/GlassesBenefit/OphthalmicForm'
import ApplicationSupportsForm from "../../Forms/GlassesBenefit/ApplicationSupportsForm"

import { useGlassProps, useGlassesRequestManagement } from "../../hooks/useGlass"
import { useTrackingProps } from "../../hooks/useTracking"

import { useNavigate, useParams } from "react-router-dom"

import CustomLoader from "../../Components/Loader/CustomLoader.jsx"
import { fetchGlassesRequestDetailAPI, fetchPropsForGlassesReqAPI } from "../../service/glasses.api.js"


import '../main-page.css'
import { useAdminProps } from "../../hooks/useProps.js"

export default function GlassesBenefitEditPage() {


    const navigate = useNavigate()
    const { id } = useParams()

    const { userAuthorizers } = useAdminProps()
    const { actions: trackingAct } = useTrackingProps()
    const { actions: glassesAct } = useGlassesRequestManagement()

    const [loading, setLoading] = useState(true)


    const {
        diagnosis,
        lensDetail,
        lensMaterial,
        lensType } = useGlassProps()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const fetching = useCallback(async () => {

      try {
          const [props, requestDetail] = await Promise.all([
              fetchPropsForGlassesReqAPI(),
              fetchGlassesRequestDetailAPI(id)
          ])

          glassesAct.propsRequiredInEditingMode({ props, requestDetail})

          setLoading(false)

      } catch (err){
          console.log(err)
      }
    }, [id, glassesAct])

    useEffect(() => {
        const ownTrack = trackingAct.findTrack({ procIdentity: 'GL-REG' })

        if (ownTrack) {
            setIsOpen(true)
        }

        setLoading(true)

        fetching()

    }, [])

    const multipleComponent = [
        <GeneralGlassesBenefitInfoForm
            mode="edit"
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
            authorizers={userAuthorizers}
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
            mode='edit'
            orderId={id}
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
                    loading ? <CustomLoader/> :
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
