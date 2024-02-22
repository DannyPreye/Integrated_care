import React from "react";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { hideEmail } from "@/utils/hideEmail.utils";

interface Props {
    searchParams: any;
}
const page: React.FC<Props> = ({ searchParams }) => {
    const { email } = searchParams;
    const formattedEmail = hideEmail(email);

    return (
        <div className='flex flex-col items-center mx-auto h-screen justify-center max-w-[520px] w-full'>
            <Image
                src='/assets/email-verify.png'
                alt='verify-email'
                width={80}
                height={80}
            />
            <div className='mt-[40px] text-center flex flex-col items-center'>
                <h1 className='font-montserrat text-[32px] font-bold leading-[40px]'>
                    Check your mail!
                </h1>
                <p className=' font-lato font-[600] leading-[24px]'>
                    Check your email, we have sent a password recovery
                    instruction to {formattedEmail}
                </p>
            </div>
            <Button className='bg-primary rounded-[8px] mt-[80px] text-white w-full'>
                Open Email App
            </Button>
            <p className='text-[16px] leading-[24px] text-center mt-[24px]'>
                Didn&apos;t receive the mail? Check your spam folder.
            </p>
        </div>
    );
};

export default page;
