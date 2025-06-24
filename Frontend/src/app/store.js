import {configureStore} from '@reduxjs/toolkit';
import reducer from '../Slice/todoSlice';

export const store = configureStore({
    reducer:reducer
});
