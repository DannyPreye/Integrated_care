import { IPage } from "@/app/types/Ipage";
import Image from "next/image";
import React from "react";

interface Props extends IPage {
    Switch?: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children, Switch }) => {
    return (
        <section className='flex items-start justify-start w-full font-montserrat'>
            <aside className='bg-[#002549] w-[680px] h-screen hidden lg:flex flex-col justify-center items-center text-center sticky top-0 left-0'>
                <Image
                    src={"/assets/signup.webp"}
                    alt='image'
                    width={552}
                    height={330}
                    className='object-contain'
                />
                <p className='text-[32px] font-semibold text-white mb-4'>
                    Integrated<span className='text-primary'>Care</span>
                </p>
                <p className='text-lg font-medium text-white'>
                    ...providing centralized repository for all patient
                    information.
                </p>
            </aside>
            <aside className='bg-white mx-auto w-[680px] min-h-screen flex flex-col justify-center items-center gap-16 text-center px-16 py-8'>
                <div>
                    <p className='text-[32px] font-semibold text-black mb-4'>
                        Integrated<span className='text-primary'>Care</span>
                    </p>
                    <p className='mb-2 text-base font-medium text-black'>
                        Welcome Back! Log in to continue..
                    </p>
                    {Switch}
                </div>
                {children}
            </aside>
        </section>
    );
};

export default AuthLayout;
