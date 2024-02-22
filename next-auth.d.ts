import NextAuth from "next-auth";

interface IUser
{
    firstName: string,
    lastName: string,
    registrationNumber: string,
    specialty: string,
    workAddress: string,
    workPhoneNumber: number,
    email: string,
    confirmed: boolean,
    token: string;

}

declare module "next-auth" {
    interface User
    {
        user: IUser;
    }

    interface Session
    {
        user: IUser;
        token: string;

    }
}


declare module "next-auth/jwt" {
    interface JWT
    {
        user: IUser;
        token: string;
    }
}
