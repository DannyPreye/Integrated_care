import React from "react";
import { IPage } from "../types/Ipage";
import { serverSession } from "@/utils/auth";
import Practitioner from "@/layouts/Practitioner.layout";
import PatientLayout from "@/layouts/Patient.layout";
import { Session } from "next-auth";

const layout: React.FC<IPage> = async ({ children }) => {
    const session = await serverSession();
    if (session?.user.role === "practitioner") {
        return <Practitioner session={session}>{children}</Practitioner>;
    }
    return (
        <PatientLayout session={session as Session}>{children}</PatientLayout>
    );
};

export default layout;
