import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import authReducer from "./auth.slice"
import glassReducer from './glass.slice'
import maternityReducer from './maternity.slice'
import deathReducer from './death.slice'
import notificationReducer from './notification.slice'
import propsReducer from './props.slice'
import trackingReducer from './tracking.slice'
import beneficiaryReducer from './beneficiary.slice.js'
import scholarShipReducer from './scholarship.slice.js'
import paymentsReducer from './payment.slice.js'
import thunk from 'redux-thunk'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'props']
}

const rootReducer = combineReducers({
    props: propsReducer,
    auth: authReducer,
    beneficiary: beneficiaryReducer,
    glass: glassReducer,
    maternity: maternityReducer,
    death: deathReducer,
    notifications: notificationReducer,
    tracking: trackingReducer,
    scholarship: scholarShipReducer,
    payments: paymentsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
