
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authAPI } from "./services/auth.service";



export const store = configureStore({
    reducer: {

        [ authAPI.reducerPath ]: authAPI.reducer,


    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(
        authAPI.middleware,


    )
});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
