"use client";
import { useGetPractionerQuery } from "@/redux/services/practitioner.service";
import { Button, TableContainer, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IoFilter } from "react-icons/io5";
import AddPatientModal from "../(overview)/component/AddPatientModal";
import PractionerTable, {
    TableLoading,
} from "../(overview)/component/PractionerTable";
import Image from "next/image";

const Page: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading, isError, error, refetch } =
        useGetPractionerQuery(null);
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <Button
                    variant='outline'
                    className='flex font-poppins font-[400] text-base justify-center items-center rounded-[10px] h-[44px] w-[87px] border gap-[5px]'
                >
                    <IoFilter className='flex-shrink-0' />
                    Filter
                </Button>
                <Button
                    onClick={onOpen}
                    className='px-3 py-2 text-sm text-white rounded-lg outline-none bg-primary font-lato'
                >
                    + Add Patient
                </Button>
            </div>

            <div className='w-full h-[344px] border border-[#CDCDCD] rounded-lg p-4 lg:p-5'>
                {isLoading ? (
                    <TableLoading />
                ) : (
                    <>
                        {data?.patients?.length > 0 ? (
                            <PractionerTable patients={data?.patients} />
                        ) : (
                            <div className='flex flex-col items-center justify-center gap-2 py-7'>
                                <Image
                                    src={"/assets/folder.webp"}
                                    alt='folder'
                                    width={140}
                                    height={140}
                                />
                                <p className='text-lg font-semibold font-lato'>
                                    You don&apos;t have any patient yet.
                                </p>
                                <p className='font-lato text-base text-[#515151]'>
                                    Start by adding a patient or use the search
                                    button above to find a patient
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
            <AddPatientModal
                refetch={refetch}
                isOpen={isOpen}
                onClose={onClose}
            />
        </div>
    );
};

export default Page;
