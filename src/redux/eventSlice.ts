import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:4000/events";

const initialState = {
    loading: false,
    events: [] as Event[],
    error: ''
}

export const fetchEvents = createAsyncThunk(BASE_URL, async () => {
    const response = await fetch(BASE_URL);
    return await response.json();
});

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.loading = false,
            state.events = action.payload,
            state.error = ''
        })
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.loading = false,
            state.events = [],
            state.error = action.error.message as string
        })
    }
});

export default eventSlice.reducer;