import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        genres: {},
        popUp: false,
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
        getPopUp: (state, action) => {
            state.popUp = action.payload;
        }
    }
});

export const { getApiConfiguration, getGenres, getPopUp } = homeSlice.actions

export default homeSlice.reducer;