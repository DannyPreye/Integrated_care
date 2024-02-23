import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/patient",
        prepareHeaders: async (headers) =>
        {
            const session = await getSession();
            if (session) {
                headers.set("Authorization", `Bearer ${session?.token}`);
                return headers;
            }


        }

    }),
    endpoints: (builder) => ({
        getPatientProfile: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
        }),
        updatePatientProfile: builder.mutation({
            query: (data) => ({
                url: "/",
                method: "PATCH",
                body: data,
            }),
        }),
        getMedicalHistory: builder.query({
            query: () => ({
                url: "/medicalHistory",
                method: "GET",
            }),
        }),
    })
});

export const { useGetPatientProfileQuery, useUpdatePatientProfileMutation, useGetMedicalHistoryQuery } = patientApi;
