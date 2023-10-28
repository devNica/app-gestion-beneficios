import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import PrivateRoute from "./Components/Commons/PrivateRoute"
import SharedRoute from "./Components/Commons/SharedRoute"

import { MainLayout } from "./Layouts/MainLayout"
import HomePage from "./pages/HomePages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import GlassesBenefitPage from "./pages/RegisterPages/GlassesBenefitPage"
import MaternityBenefitPage from "./pages/RegisterPages/MaternityBenefitPage"
import MaternityRequestHistoryPage from "./pages/HistoryPages/MaternityRequestHistoryPage.jsx";
import DeathBenefitPage from "./pages/RegisterPages/DeathBenefitPage"
import GlassesRequestHistoryPage from "./pages/HistoryPages/GlassesRequestHistoryPage"
import GlassesBenefitEditPage from "./pages/EditPages/GlassesBenefitEditPage"

import { useManageCredential } from "./hooks/useAuth"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MaternityEditPage from "./pages/EditPages/MaternityEditPage.jsx";
import DeathRequestHistoryPage from "./pages/HistoryPages/DeathRequestHistoryPage.jsx";

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

            <Route path="/glasses/insert" element={<GlassesBenefitPage/>}/>
            <Route path="/glasses/edit/:id" element={<GlassesBenefitEditPage/>}/>
            <Route path="/glasses/history" element={<GlassesRequestHistoryPage/>}/>

            <Route path="/maternity/insert" element={<MaternityBenefitPage/>}/>
            <Route path="/maternity/edit/:id" element={<MaternityEditPage/>}/>
            <Route path="/maternity/history" element={<MaternityRequestHistoryPage/>}/>

            <Route path="/death/register" element={<DeathBenefitPage/>}/>
            <Route path="/death/edit/:id" element={<DeathBenefitPage/>}/>
            <Route path="/death/history" element={<DeathRequestHistoryPage/>}/>
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
