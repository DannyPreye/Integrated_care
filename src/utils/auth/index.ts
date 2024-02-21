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
            authorize: async (credentials: { email: string, password: string, remember: boolean; }, req) =>
            {
                const { email, password, remember } = credentials;

                try {
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`, {
                        email,
                        password
                    });

                    return { ...data };

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
                token.user = user;
            }

            return token;
        },
        session: async ({ session, token }) =>
        {

            // @ts-ignore
            session.user = token.user;
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
