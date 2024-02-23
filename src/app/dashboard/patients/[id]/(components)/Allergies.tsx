"use client";
import { useGetPatientHistoryQuery } from "@/redux/services/practitioner.service";
import { Button, SkeletonText, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AddAllergiesModal from "./modals/AddAllergies";

interface AllergiesProps {
    patientId: string;
}

const Allergies: React.FC<AllergiesProps> = ({ patientId }) => {
    const { data, isLoading, refetch } = useGetPatientHistoryQuery(patientId);
    const { onClose, onOpen, isOpen } = useDisclosure();

    console.log(data?.allergies);

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
                    {isLoading && (
                        <div>
                            <SkeletonText mt='4' noOfLines={4} spacing='4' />
                        </div>
                    )}

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
                </div>
            </div>
            <div className='flex items-start'>
                <Button
                    onClick={onOpen}
                    variant='ghost'
                    className='text-primary  text-[12px] leading-[20px] font-lato font-semibold'
                >
                    + Add Allergy{" "}
                </Button>
            </div>

            <AddAllergiesModal
                patientId={patientId}
                refetch={refetch}
                isOpen={isOpen}
                onClose={onClose}
            />
        </div>
    );
};

export default Allergies;
