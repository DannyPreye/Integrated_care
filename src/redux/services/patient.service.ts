import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/patient"
    }),
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => "patients"
        })
    })
});
