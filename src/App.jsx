import { Routes, Route } from "react-router-dom"
import { MainLayout } from "./Layouts/MainLayout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import PrivateRoute from "./Components/Commons/PrivateRoute"
import SharedRoute from "./Components/Commons/SharedRoute"
import { useManageCredential } from "./hooks/useAuth"
import { useEffect } from "react"
import GlassesBenefitPage from "./pages/benefits/GlassesBenefitPage"
import MaternityBenefitPage from "./pages/benefits/MaternityBenefitPage"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DeathBenefitPage from "./pages/benefits/DeathBenefitPage"
import GlassesRequestHistoryPage from "./pages/historical/GlassesRequestHistoryPage"

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
            <Route path="/glasses/history" element={<GlassesRequestHistoryPage/>}/>
            <Route path="/maternity/insert" element={<MaternityBenefitPage/>}/>
            <Route path="/death/register" element={<DeathBenefitPage/>}/>
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
