import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import PrivateRoute from "./Components/Commons/PrivateRoute"
import SharedRoute from "./Components/Commons/SharedRoute"

import { MainLayout } from "./Layouts/MainLayout"
import HomePage from "./pages/HomePages/HomePage"
import LoginPage from "./pages/auth/LoginPage"

import { useManageCredential } from "./hooks/useAuth"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    DeathBenefitEditPageL,
    DeathBenefitRegisterPageL,
    DeathRequestHistoryPageL,
    GlassesBenefiEditPageL,
    GlassesBenefitRegisterPageL,
    GlassesRequestHistoryPageL,
    GlassesRequestSummaryPageL,
    GlassesWorkListPageL,
    MaternityBenefitEditPageL,
    MaternityBenefitRegisterPageL,
    MaternityRequestHistoryPageL,
    MaternityRequestSummaryPageL, PaymentToClinicPageL,
    ScholarPeriodPageL, ScholarshipBenefitPageL
} from "./LazyComponents.jsx"


function App() {

  const { loadCredential } = useManageCredential()

  useEffect(()=>{
    loadCredential()
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />

            <Route path="/glasses/insert" element={<GlassesBenefitRegisterPageL/>}/>
            <Route path="/glasses/edit/:id" element={<GlassesBenefiEditPageL/>}/>
            <Route path="/glasses/summary/:id" element={<GlassesRequestSummaryPageL/>}/>
            <Route path="/glasses/history" element={<GlassesRequestHistoryPageL/>}/>
            <Route path="/glasses/request" element={<GlassesWorkListPageL/>}/>
            <Route path="/glasses/payment" element={<PaymentToClinicPageL/>}/>


            <Route path="/maternity/insert" element={<MaternityBenefitRegisterPageL/>}/>
            <Route path="/maternity/edit/:id" element={<MaternityBenefitEditPageL/>}/>
            <Route path="/maternity/summary/:id" element={<MaternityRequestSummaryPageL/>}/>
            <Route path="/maternity/history" element={<MaternityRequestHistoryPageL/>}/>

            <Route path="/death/register" element={<DeathBenefitRegisterPageL/>}/>
            <Route path="/death/edit/:id" element={<DeathBenefitEditPageL/>}/>
            <Route path="/death/history" element={<DeathRequestHistoryPageL/>}/>


            <Route path="/study/period" element={<ScholarPeriodPageL/>}/>
            <Route path="/study/insert" element={<ScholarshipBenefitPageL/>}/>

          </Route>
        </Route>
        <Route element={<SharedRoute />}>
          <Route path="/signin" element={<LoginPage />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
