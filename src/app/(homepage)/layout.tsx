import React from "react";
import HomeLayout from "@/layouts/HomeLayout/Home.layout";
import { Session } from "next-auth";
import { IPage } from "../types/Ipage";
import { serverSession } from "@/utils/auth";

const layout: React.FC<IPage> = async ({ children }) => {
    const session = await serverSession();
    return <HomeLayout session={session as Session}>{children}</HomeLayout>;
};

export default layout;
