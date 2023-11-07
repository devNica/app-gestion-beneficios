import { lazy } from "react";

const GlassesBenefitRegisterPageL = lazy(() => import('./pages/RegisterPages/GlassesBenefitPage.jsx'))
const GlassesBenefiEditPageL = lazy(() => import('./pages/EditPages/GlassesBenefitEditPage.jsx'))
const GlassesRequestHistoryPageL = lazy(() => import('./pages/HistoryPages/GlassesRequestHistoryPage.jsx'))

const MaternityBenefitRegisterPageL = lazy(() => import('./pages/RegisterPages/MaternityBenefitPage.jsx'))
const MaternityBenefitEditPageL = lazy(() => import('./pages/EditPages/MaternityEditPage.jsx'))
const MaternityRequestHistoryPageL = lazy(() => import('./pages/HistoryPages/MaternityRequestHistoryPage.jsx'))

const DeathBenefitRegisterPageL = lazy(()=> import('./pages/RegisterPages/DeathBenefitPage.jsx'))
const DeathBenefitEditPageL = lazy(()=>import('./pages/EditPages/DeathBenefitEditPage.jsx'))
const DeathRequestHistoryPageL = lazy(()=>import('./pages/HistoryPages/DeathRequestHistoryPage.jsx'))

export {
    GlassesBenefitRegisterPageL,
    GlassesBenefiEditPageL,
    GlassesRequestHistoryPageL,
    MaternityBenefitRegisterPageL,
    MaternityBenefitEditPageL,
    MaternityRequestHistoryPageL,
    DeathBenefitRegisterPageL,
    DeathBenefitEditPageL,
    DeathRequestHistoryPageL
}