import { createSlice } from "@reduxjs/toolkit"

// recordTracking: [{
//     message: '',  // anything
//     space: '', // employee, glass, death ...
//     mode: '', // edit or register,
//     procIdentity: '', //GL-EDIT, GL-REG 
// }],

const initialState = {
    recordTracking: [],
    spool: 0
}

const trackingSlice = createSlice({
    name: 'tracking',
    initialState,
    reducers: {
        setTracking(_state, action) {
            return {
                recordTracking: action.payload.tracks,
                spool: action.payload.spool
            }
        }
    }
})

//export const { addTracking, updateTrackingSpace, removeTracking } = trackingSlice.actions

export const addTracking = (data) => (dispatch, getState) => {
    const currentTracks = getState().tracking.recordTracking
    
    let updTracks = []

    if(currentTracks.length > 0) {
        updTracks = [...currentTracks, data]
    } else {
        updTracks.push(data)
    }

    dispatch(setTracking({
        tracks: updTracks,
        spool: updTracks.length
    }))
}

export const removeTracking = (procIdentity) => (dispatch, getState) => {
    const currentTracks = getState().tracking.recordTracking
    const filtered = currentTracks.filter(track => track.procIdentity !== procIdentity)

    dispatch(setTracking({
        tracks: filtered,
        spool: filtered.length
    }))
}

export const updateTrackingSpace = (space) => (dispatch, getState) => {
    const currentTracks = getState().tracking.recordTracking
    const filtered = currentTracks.filter(track => track.space !== space)

    dispatch(setTracking({
        tracks: filtered,
        spool: filtered.length
    }))
}

const { setTracking } = trackingSlice.actions


export default trackingSlice.reducer