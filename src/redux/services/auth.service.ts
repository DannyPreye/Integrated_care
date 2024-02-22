import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,

    }),
    endpoints: (builder) => ({
        patientRegister: builder.mutation({
            query: (body) => ({
                url: "/patient",
                method: "POST",
                body
            })
        }),
        practionerRegister: builder.mutation({
            query: (body) => ({
                url: "/practitioner",
                method: "POST",
                body
            })
        }),

        resendVerificationEmail: builder.mutation({
            query: (body) => ({
                url: "/resend-email",
                method: "POST",
                body
            })
        }),
        verifyEmail: builder.mutation({
            query: (body) => ({
                url: "/verify-email",
                method: "POST",
                body
            })
        })

    })
});


export const { usePatientRegisterMutation, usePractionerRegisterMutation, useResendVerificationEmailMutation, useVerifyEmailMutation } = authAPI;
