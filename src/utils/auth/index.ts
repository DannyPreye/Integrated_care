import axios from "axios";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
            },
            id: "credentials",
            // @ts-ignore
            authorize: async (credentials: { email: string, password: string, remember: boolean; userType: "patient" | "practitioner"; }, req) =>
            {
                const { email, password, remember, userType } = credentials;


                try {
                    if (userType === "patient") {
                        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/login`, {
                            email,
                            password
                        });




                        return { ...data };
                    } else {
                        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/practitioner/login`, {
                            email,
                            password
                        });

                        console.log(data);

                        return { ...data };

                    }

                } catch (error) {
                    if (axios.isAxiosError(error)) {

                        throw new Error(error?.response?.data?.message);
                    } else {
                        throw new Error("Something went wrong");
                    }
                }
            }
        })
    ],
    session: {
        strategy: "jwt",

    },
    callbacks: {
        jwt: async ({ token, user }) =>
        {
            if (user) {

                // @ts-ignore
                const { token: jwt, ...rest } = user;
                // @ts-ignore
                token.user = rest;
                token.token = jwt;


            }

            return token;
        },
        session: async ({ session, token }) =>
        {
            // @ts-ignore
            session.user = token.user;
            session.token = token?.token;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,

    debug: true,
    pages: {
        signIn: "/auth/signin",

    },

};


export const serverSession = (...args:
    | [ GetServerSidePropsContext[ "req" ], GetServerSidePropsContext[ "res" ] ]
    | [ NextApiRequest, NextApiResponse ]
    | []) =>
{
    return getServerSession(...args, authOptions);

};
