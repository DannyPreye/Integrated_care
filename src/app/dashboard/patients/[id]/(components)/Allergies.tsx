"use client";
import {
    useGetEncounterDetailsQuery,
    useGetPatientHistoryQuery,
} from "@/redux/services/practitioner.service";
import { Button, SkeletonText, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AddAllergiesModal from "./modals/AddAllergies";

interface AllergiesProps {
    patientId: string;
    encounterId: string;
}

const Allergies: React.FC<AllergiesProps> = ({ patientId, encounterId }) => {
    const { data, isLoading, refetch, isFetching } =
        useGetEncounterDetailsQuery(encounterId);
    const { onClose, onOpen, isOpen } = useDisclosure();

    return (
        <div className='flex-col flex gap-5'>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-base font-montserrat font-bold'>
                        Allergies
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

                    {!isFetching && !isLoading && (
                        <>
                            {data?.allergies?.map((item: any) => (
                                <div
                                    key={item?.allergen}
                                    className='flex items-center gap-2'
                                >
                                    <span
                                        className={`w-[8px] h-[8px] rounded-full ${
                                            item?.severity === "severe"
                                                ? "bg-red-500"
                                                : item?.severity === "moderate"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                    ></span>{" "}
                                    <span className='text-base font-lato'>
                                        {item?.allergen}
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
                    + Add Allergy{" "}
                </p>
            </div>

            <AddAllergiesModal
                patientId={patientId}
                refetch={refetch}
                isOpen={isOpen}
                onClose={onClose}
                encounterId={encounterId}
            />
        </div>
    );
};

export default Allergies;
