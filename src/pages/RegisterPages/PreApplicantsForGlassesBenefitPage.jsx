import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { fetchApplicationsInProcess, fetchPropsForGlassesApplications } from '../../service/applications.api.js'
import CustomLoader from '../../Components/Loader/CustomLoader'
import { setPreApplicantsProps } from '../../redux/glass.slice'
import { useAdminProps } from "../../hooks/useProps"
import RegisterGlassesApplication from '../../Forms/GlassesApplication/RegisterGlassesApplication.jsx'
import Stepper from '../../Components/Stepper/Stepper.jsx'

import '../main-page.css'
import ApplicationsGlassesInProcess from '../../Forms/GlassesApplication/ApplicationGlassesInProcess.jsx'

const PreApplicantsForGlassesBenefitPage = () => {

    const dispatch = useDispatch()

    const { userAuthorizers } = useAdminProps()
    
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)

    const initialFetching = useCallback(async () => {
        const result = await fetchPropsForGlassesApplications()

        const { data: applicationsInProcess } = await fetchApplicationsInProcess().finally(() => {
            setLoading(false)
        })

        dispatch(setPreApplicantsProps({
            preApplicants: result.data.preApplicants,
            paymentTypes: result.data.paymentTypes,
            clinics: result.data.clinics,
            applicationTypes: result.data.applicationTypes,
            applicationsInProcess: applicationsInProcess
        }))


    })

    useEffect(() => {
        setLoading(true)
        initialFetching()
    }, [])

    const multipleComponent = [
        <RegisterGlassesApplication
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
            authorizers={userAuthorizers}
        />,
        <ApplicationsGlassesInProcess
            currentIndex={currentIndex}
            updateCurrentIndex={setCurrentIndex}
        />
    ]

    return (
        <div className="content__page">
            <h3 className="bread__crum">Beneficio de Lentes - Formulario de Aplicacion</h3>

            {
                loading
                    ? <CustomLoader />
                    : <Stepper
                        showIndicators={false}
                        CurrenComponent={multipleComponent.at(currentIndex)}
                        currentIndex={currentIndex}
                    />
            }

        </div>
    )
}

export default PreApplicantsForGlassesBenefitPage