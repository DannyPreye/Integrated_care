import { IPage } from "@/app/types/Ipage";
import { Link } from "@chakra-ui/react";
import React from "react";

const leftLinks = [
    {
        title: "Tasks",
        link: "/dashboard/my-records",
    },
    {
        title: "Medication",
        link: "/dashboard/my-records/medication",
    },
    // {
    //     title: "Test Results",
    //     link: "/dashboard/my-records/test-results",
    // },
    {
        title: "Diagnosis",
        link: "/dashboard/my-records/diagnosis",
    },
    {
        title: "Allergies",
        link: "/dashboard/my-records/allergies",
    },
];
const layout: React.FC<IPage> = ({ children }) => {
    return (
        <div className='flex w-full'>
            <div className='w-1/5 h-screen overflow-y-auto gap-[32px] py-4 items-center sticky left-0 top-0  border-r-2 flex flex-col '>
                {leftLinks.map((item) => (
                    <Link
                        className='font-lato text-base '
                        key={item.link}
                        href={item.link}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className=' px-4 w-full lg:w-4/5'>{children}</div>
        </div>
    );
};

export default layout;
