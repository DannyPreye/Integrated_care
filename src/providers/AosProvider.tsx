"use client";
import React, { useEffect } from "react";

import { IPage } from "@/app/types/Ipage";
import Aos from "aos";

const AosProvider: React.FC<IPage> = ({ children }) => {
    useEffect(() => {
        Aos.init({
            duration: 1500,
            once: true,
        });
        Aos.refresh();
    }, []);

    return <>{children}</>;
};

export default AosProvider;
