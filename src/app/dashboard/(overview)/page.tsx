import { serverSession } from "@/utils/auth";
import React from "react";
import PractitionerOverview from "./component/PractitionerOverview";

const page = async () => {
    const session = await serverSession();

    if (session?.user.role == "practitioner") {
        return <PractitionerOverview session={session} />;
    }

    return <div>page</div>;
};

export default page;
