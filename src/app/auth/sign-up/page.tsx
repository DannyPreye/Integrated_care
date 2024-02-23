import React from "react";

import PractionerForm from "./(component)/PractionerForm";
import { redirect } from "next/navigation";
import AuthLayout from "@/layouts/Auth.layout";
import PatientForm from "./(component)/PatientForm";

interface IProps {
    searchParams: any;
}

const page: React.FC<IProps> = ({ searchParams }) => {
    const { type } = searchParams;

    // if (type !== "practioner" || type !== "patient")
    //     redirect("/auth/selection");

    return (
        <AuthLayout paragraph='Create your account'>
            {type === "practioner" ? <PractionerForm /> : <PatientForm />}
        </AuthLayout>
    );
};

export default page;
