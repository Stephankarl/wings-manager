import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import api from './middleware/api';

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(api)
    })
}