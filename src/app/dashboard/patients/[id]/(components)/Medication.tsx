"use client";
import {
    useGetEncounterDetailsQuery,
    useGetPatientHistoryQuery,
} from "@/redux/services/practitioner.service";
import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MdOutlineMedication } from "react-icons/md";
import MedicationModal from "./modals/MedicationModal";

interface Props {
    patientId: string;
    encounterId: string;
}

const Medication: React.FC<Props> = ({ patientId, encounterId }) => {
    const { data, isFetching, isError, refetch } =
        useGetEncounterDetailsQuery(encounterId);
    const { onOpen, isOpen, onClose } = useDisclosure();

    console.log(data);

    return (
        <div>
            <div className='flex items-center border-b-2 border-gray-200 justify-between px-4 py-[10px]'>
                <h2 className='font-semibold text-lg font-montserrat'>
                    Medication
                </h2>
                <Button
                    variant={"ghost"}
                    className='text-primary  text-[12px] leading-[20px] font-lato font-semibold'
                    onClick={onOpen}
                >
                    + Add
                </Button>
            </div>

            <div className='mt-[25px] px-4 '>
                {isFetching ? (
                    <></>
                ) : (
                    <div className='flex flex-col gap-[15px]'>
                        {data?.medications?.map(
                            (medication: any, index: number) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between py-[12px]'
                                >
                                    <div className='flex-1 flex items-center '>
                                        <MdOutlineMedication size={28} />
                                        <span className='ml-[10px] font-lato  text-[16px] leading-[24px] '>
                                            {medication?.drugName}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            <MedicationModal
                isOpen={isOpen}
                onClose={onClose}
                patientId={patientId}
                encounterId={encounterId}
                refetch={refetch}
            />
        </div>
    );
};

export default Medication;
