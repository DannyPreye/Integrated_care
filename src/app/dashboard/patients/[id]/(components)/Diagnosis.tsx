"use client";
import { useGetPatientHistoryQuery } from "@/redux/services/practitioner.service";
import { Button, SkeletonText, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";

interface DiagnosisProps {
    patientId: string;
}

const Diagnosis: React.FC<DiagnosisProps> = ({ patientId }) => {
    const { data, isLoading, isError } = useGetPatientHistoryQuery(patientId);
    const { onClose, onOpen, isOpen } = useDisclosure();

    console.log(data?.diagnosis);

    return (
        <div className='flex-col flex gap-5'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-base font-montserrat font-bold'>
                        Diagnosis
                    </h2>
                    <Link
                        href={`/dashboard/patients/${patientId}`}
                        className='text-primary font-lato text-sm no-underline'
                    >
                        View All
                    </Link>
                </div>
                <div className='flex flex-col gap-2'>
                    {isLoading && (
                        <div>
                            <SkeletonText mt='4' noOfLines={4} spacing='4' />
                        </div>
                    )}

                    {data?.diagnosis?.map((item: any) => (
                        <div key={item?._id} className='flex flex-col  gap-2'>
                            <span className='text-base font-lato'>
                                {item?.description}
                            </span>
                            <span className='text-[12px] text-[#515151] font-lato'>
                                since {moment(item?.createdAt).fromNow()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-start'>
                <Button
                    onClick={onOpen}
                    variant='ghost'
                    className='text-primary  text-[12px] leading-[20px] font-lato font-semibold'
                >
                    + Add Diagnosis{" "}
                </Button>
            </div>
        </div>
    );
};

export default Diagnosis;
