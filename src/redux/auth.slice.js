import { createSlice } from "@reduxjs/toolkit"
import {fetchAdminPropsFromAPI, loginUserDM} from "../service/api.js";
import {setProps} from "./props.slice.js";
import {setNotification} from "./notification.slice.js";

const initialState = {
    isAuth: false,
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        reload (state) {
            return {
                ...state,
                isAuth: true
            }
        },

        loginSuccess(state, action) {

            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', action.payload.token)

            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                token: action.payload.token

            }
        },

        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                isAuth: false,
                user: null,
                token: null
            }
        },


        loginFailed(state) {
            return {
                ...state,
                isAuth: false,
                user: null
            }
        }
    }
})

export const { loginSuccess, loginFailed, logout, reload } = authSlice.actions

export const asyncLoginThunk = payload => async dispatch => {
    try {

        const { data: meta } = await loginUserDM({
            username: payload.username,
            password: payload.password
        })

        if (meta?.error) {
            dispatch(setNotification({
                type: 'error',
                delay: 1500,
                message: meta.message
            }))

            return
        }

        dispatch(loginSuccess({
            user: {
                id: meta.id,
                username: meta.username,
                email:meta.username,
                isAuthorizer: meta.isAuthorizer
            },
            token: meta.token
        }))

        const {data} = await fetchAdminPropsFromAPI()

        dispatch(setProps({
            paymentTypes: data.paymentTypes,
            internalExchange: data.internalExchange,
            supports: data.requiredSupports,
            authorizedAmounts: data.authorizedAmounts,
            userAuthorizers: data.authorizers
        }))


    } catch (err) {
        throw new Error(err)
    }
}

export default authSlice.reducer