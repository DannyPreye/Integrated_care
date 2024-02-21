import { IPage } from "@/app/types/Ipage";
import { Session } from "next-auth";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props extends IPage {
    session: Session;
}
const Home: React.FC<Props> = ({ session, children }) => {
    return (
        <>
            <Header session={session} />
            <main className='w-full min-h-screen'>{children}</main>
            <Footer />
        </>
    );
};

export default Home;
