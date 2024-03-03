
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
        getPatientByIdFromForm: builder.mutation({
            query: (id) => ({
                url: `/getPatient?patientId=${id}`,
                method: "GET",
            }),
        }),
        getPatient: builder.query({
            query: (id) => ({
                url: `/getPatient?patientId=${id}`,
                method: "GET",
            }),
        }),
        getPatientById: builder.query({
            query: (id) => ({
                url: `/getPatient?patientId=${id}`,
                method: "GET",
            }),
        }),
        getPatientHistory: builder.query({
            query: (id) => ({
                url: `/medicalHistory/${id}`,
                method: "GET",
            }),
        }),
        getPatientEnCounters: builder.query({
            query: (id) => ({
                url: `/medicalHistory/${id}`,
                method: "GET",
            }),
        }),
        getEncounterDetails: builder.query({
            query: (id) => ({
                url: `/getEncounterDetails/${id}`,
                method: "GET",
            }),
        }),
        getColleague: builder.mutation({
            query: (email) => ({
                url: `/getPractitioner?email=${email}`,
                method: "GET",
            }),
        }),
        addPatient: builder.mutation({
            query: (id) => ({
                url: `/addPatient?patientId=${id}`,
                method: "GET",

            }),
        }),
        addPatientAllergy: builder.mutation({
            query: (payload) => ({
                url: `/${payload.encounterId}/addAllergy/${payload.patientId}`,
                method: "POST",
                body: payload.body
            })
        }),
        addPatientEncounter: builder.mutation({
            query: (payload) => ({
                url: `/addEncounter/${payload.patientId}`,
                method: "POST",
                body: payload.body
            }),
        }),
        addPatientInfo: builder.mutation({
            query: (payload) => ({
                url: `/updateBloodData/${payload.encounterId}`,
                method: "PATCH",
                body: payload.body
            }),
        }),
        addDiagnosis: builder.mutation({
            query: (payload) => ({
                url: `/${payload.encounterId}/addDiagnosis/${payload.patientId}`,
                method: "POST",
                body: payload.body
            }),
        }),

        addRequests: builder.mutation({
            query: (payload) => ({
                url: `/${payload.encounterId}/addTask/${payload.patientId}`,
                method: "POST",
                body: payload.body
            }),
        }),
        addMedication: builder.mutation({
            query: (payload) => ({
                url: `/${payload.encounterId}/addMedication/${payload.patientId}`,
                method: "POST",
                body: payload.body
            }),
        }),



    })
});

export const { useGetPractionerQuery,
    useGetPatientQuery,
    useGetPatientByIdQuery,
    useGetPatientHistoryQuery,
    useGetPatientEnCountersQuery,
    useGetEncounterDetailsQuery,
    useAddPatientMutation,
    useGetColleagueMutation,
    useUpdatePractionerMutation,
    useAddPatientAllergyMutation,
    useAddPatientEncounterMutation,
    useAddPatientInfoMutation,
    useAddDiagnosisMutation,
    useAddRequestsMutation,
    useGetPatientByIdFromFormMutation,
    useAddMedicationMutation
} = practitionerApi;
