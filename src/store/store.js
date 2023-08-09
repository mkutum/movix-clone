import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
import newhomeSlice from './newhomeSlice';



export const store = configureStore({
    reducer: {
        home: homeSlice,
        newhomesss: newhomeSlice
    },
})