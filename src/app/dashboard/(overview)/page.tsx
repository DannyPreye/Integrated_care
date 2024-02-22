import { serverSession } from "@/utils/auth";
import React from "react";
import PractitionerOverview from "./component/PractitionerOverview";
import PatientOverview from "./component/PatientOverview";

const page = async () => {
    const session = await serverSession();

    if (session?.user.role == "practitioner") {
        return <PractitionerOverview session={session} />;
    }

    return <PatientOverview />;
};

export default page;
