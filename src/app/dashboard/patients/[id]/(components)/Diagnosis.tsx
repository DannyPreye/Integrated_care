"use client";
import {
    useGetEncounterDetailsQuery,
    useGetPatientHistoryQuery,
} from "@/redux/services/practitioner.service";
import { Button, SkeletonText, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import DiagnosisModal from "./modals/DiagnosisModal";

interface DiagnosisProps {
    patientId: string;
    encounterId: string;
}

const Diagnosis: React.FC<DiagnosisProps> = ({ patientId, encounterId }) => {
    const { data, isLoading, isError, refetch, isFetching } =
        useGetEncounterDetailsQuery(encounterId);
    const { onClose, onOpen, isOpen } = useDisclosure();

    console.log(data);

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
                    {isLoading ||
                        (isFetching && (
                            <div>
                                <SkeletonText
                                    mt='4'
                                    noOfLines={4}
                                    spacing='4'
                                />
                            </div>
                        ))}

                    {!isLoading && !isFetching && (
                        <>
                            {data?.diagnosis?.map((item: any) => (
                                <div
                                    key={item?._id}
                                    className='flex flex-col  gap-2'
                                >
                                    <span className='text-base font-lato'>
                                        {item?.diagnosis}
                                    </span>
                                    <span className='text-[12px] text-[#515151] font-lato'>
                                        since{" "}
                                        {moment(item?.createdAt).fromNow()}
                                    </span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className='flex items-start'>
                <p
                    onClick={onOpen}
                    role='button'
                    className='text-primary  text-[12px] leading-[20px] font-lato font-semibold'
                >
                    + Add Diagnosis{" "}
                </p>
            </div>

            <DiagnosisModal
                isOpen={isOpen}
                onClose={onClose}
                patientId={patientId}
                encounterId={encounterId}
                refetch={refetch}
            />
        </div>
    );
};

export default Diagnosis;
