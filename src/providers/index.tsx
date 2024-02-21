"use client";
import React, { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Next13ProgressBar } from "next13-progressbar";
import { store } from "@/redux";
import { IPage } from "@/app/types/Ipage";

const Providers: React.FC<IPage> = ({ children }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                <Next13ProgressBar color='#010C80' height={"4px"} />
                <ChakraProvider>{children}</ChakraProvider>
            </Provider>
        </SessionProvider>
    );
};

export default Providers;
