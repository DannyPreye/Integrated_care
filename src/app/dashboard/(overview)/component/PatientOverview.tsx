"use client";
import { useGetPatientProfileQuery } from "@/redux/services/patient.service";
import { Skeleton } from "@chakra-ui/react";
import React from "react";

const PatientOverview = () => {
    const { isLoading, data, error } = useGetPatientProfileQuery(null);
    console.log(data);
    return (
        <div>
            {isLoading ? (
                <div className='flex justify-between items-center'>
                    {[...Array(4)].map((i) => (
                        <Skeleton
                            key={i}
                            height='150px'
                            width='265px'
                            borderRadius='10px'
                        />
                    ))}
                </div>
            ) : (
                <div className='gap-4 flex lg:flex-nowrap flex-wrap  justify-between items-center'>
                    <PatientCard
                        icon={<></>}
                        title='Identification Number'
                        value={data?.patientId}
                    />
                    <PatientCard
                        icon={<></>}
                        title='Blood Group'
                        value={"O+"}
                    />
                    <PatientCard
                        icon={<></>}
                        title='Outstanding Task'
                        value={"3"}
                    />
                    <PatientCard icon={<></>} title='Height' value={"180cm"} />
                </div>
            )}
        </div>
    );
};

export default PatientOverview;

interface PatientCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}
const PatientCard: React.FC<PatientCardProps> = ({ icon, title, value }) => {
    return (
        <div className=' w-full font-lato h-[150px] rounded-[10px] bg-[#EFF9FF] flex items-start py-[31px] px-[19px]'>
            <div className='bg-[#002549] w-[41px] h-[39px] rounded-[3px] flex justify-center items-center'>
                {icon}
            </div>
            <div className='flex flex-col justify-center ml-[20px] gap-3'>
                <p className='text-[#002549] text-[16px] font-semibold'>
                    {title}
                </p>
                <p className='text-[#002549] text-[20px] leading- font-semibold'>
                    {value}
                </p>
            </div>
        </div>
    );
};
