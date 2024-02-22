
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authAPI } from "./services/auth.service";
import { patientApi } from "./services/patient.service";
import { practitionerApi } from "./services/practitioner.service";



export const store = configureStore({
    reducer: {

        [ authAPI.reducerPath ]: authAPI.reducer,
        [ patientApi.reducerPath ]: patientApi.reducer,
        [ practitionerApi.reducerPath ]: practitionerApi.reducer,



    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(
        authAPI.middleware,
        patientApi.middleware,
        practitionerApi.middleware


    )
});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
