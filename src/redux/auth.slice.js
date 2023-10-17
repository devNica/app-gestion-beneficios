import { createSlice } from "@reduxjs/toolkit"

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

export default authSlice.reducer