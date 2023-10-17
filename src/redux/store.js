import { configureStore,  } from "@reduxjs/toolkit"
import authReducer from "./auth.slice"
import glassReducer from './glass.slice'
import maternityReducer from './maternity.slice'
import deathReducer from './death.slice'
import employeeReducer from './employee.slice'
import notificationReducer from './notification.slice'
import propsReducer from './props.slice'
import trackingReducer from './tracking.slice'

export const store = configureStore({
    reducer: {
        props: propsReducer,
        auth: authReducer,
        glass: glassReducer,
        maternity: maternityReducer,
        death: deathReducer,
        employee: employeeReducer,
        notifications: notificationReducer,
        tracking: trackingReducer
    }
})