import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    recordTracking: [],
    pendingNumbers: 0
}

const trackingSlice = createSlice({
    name: 'tracking',
    initialState,
    reducers: {
        incrementTracking: (state) => {
            return {
                ...state,
                pendingNumbers: state.pendingNumbers + 1
            }
        },

        decrementTracking: (state) => {
            return {
                ...state,
                pendingNumbers: state.pendingNumbers - 1
            }
        }
    }
})

export const { incrementTracking, decrementTracking } = trackingSlice.actions

export default trackingSlice.reducer