import { configureStore,  } from "@reduxjs/toolkit"
import authReducer from "./auth.slice"
import glassReducer from './glass.slice'
import maternityReducer from './maternity.slice'
import deathReducer from './death.slice'
import notificationReducer from './notification.slice'
import propsReducer from './props.slice'
import trackingReducer from './tracking.slice'
import beneficiaryReducer from './beneficiary.slice.js'

export const store = configureStore({
    reducer: {
        props: propsReducer,
        auth: authReducer,
        beneficiary: beneficiaryReducer,
        glass: glassReducer,
        maternity: maternityReducer,
        death: deathReducer,
        notifications: notificationReducer,
        tracking: trackingReducer
    }
})