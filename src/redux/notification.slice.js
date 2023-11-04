import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    type: null,
    message: null,
    delay: 0
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        resetNotification () {
            return {
                type: null,
                message: null,
                delay: 0
            }
        },

        setNotification (state, action) {
            return {
                ...state,
                type: action.payload.type,
                message: action.payload.message,
                delay: action.payload.delay
            }
        }
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions

export default notificationSlice.reducer