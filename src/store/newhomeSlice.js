import { createSlice } from "@reduxjs/toolkit";

export const newhomeSlice = createSlice({
    name: "newhome",
    initialState: {
        urls: {},
        genre: {}
    },
    reducers: {
        newgetApiConfiguration: (state, action) => {
            state.urls = action.payload;
        },
        newgetGenres: (state, action) => {
            state.genre = action.payload;
        }
    }
});

export const { newgetApiConfiguration, newgetGenres } = newhomeSlice.actions

export default newhomeSlice.reducer;