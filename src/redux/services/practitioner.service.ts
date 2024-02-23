
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from 'next-auth/react';

export const practitionerApi = createApi({
    reducerPath: "PractitionerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/practitioner",
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
        getPractioner: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),

        }),
        updatePractioner: builder.mutation({
            query: (body) => ({
                url: "/profile",
                method: "PATCH",
                body,
            }),
        }),
        getPatient: builder.query({
            query: (id) => ({
                url: `/getPatient?patientId=${id}`,
                method: "GET",
            }),
        }),
        getPatientById: builder.mutation({
            query: (id) => ({
                url: `/getPatient?patientId=${id}`,
                method: "GET",
            }),
        }),
        addPatient: builder.mutation({
            query: (id) => ({
                url: `/addPatient?patientId=${id}`,
                method: "GET",

            }),
        }),
        addPatientEncounter: builder.mutation({
            query: (payload) => ({
                url: `/addEncounter/${payload.patientId}`,
                method: "POST",
                body: payload.body
            }),
        }),
        getColleague: builder.mutation({
            query: (email) => ({
                url: `/getPractitioner?email=${email}`,
                method: "GET",
            }),
        }),
    })
});

export const { useGetPractionerQuery, useUpdatePractionerMutation, useGetPatientQuery, useAddPatientMutation, useGetColleagueMutation, useGetPatientByIdMutation } = practitionerApi;
