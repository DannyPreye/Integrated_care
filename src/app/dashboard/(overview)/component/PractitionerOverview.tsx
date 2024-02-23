"use client";
import { useGetPractionerQuery } from "@/redux/services/practitioner.service";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import Calendar from "react-calendar";
import PractionerTable, { TableLoading } from "./PractionerTable";
import AddPatientModal from "./AddPatientModal";

interface Props {
    session: Session;
}
const PractitionerOverview: React.FC<Props> = ({ session }) => {
    const { data, isLoading, refetch } = useGetPractionerQuery(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log(data);

    return (
        <section className='flex flex-col items-end justify-start w-full px-6 py-8 gap-14'>
            <div>
                <Button
                    onClick={onOpen}
                    className='px-3 py-2 text-sm text-white rounded-lg outline-none bg-primary font-lato'
                >
                    + Add Patient
                </Button>
            </div>
            <section className='w-full lg:h-[230px] bg-[#0025490D] flex flex-col lg:flex-row justify-start items-start gap-6 rounded-2xl py-4 px-3'>
                <Image
                    src={"/assets/pana.webp"}
                    alt='doctor'
                    width={560}
                    height={320}
                    className='-translate-y-[104px]'
                />
                <div className='flex  flex-col gap-3 items-center lg:text-left text-center lg:items-start justify-center  h-full '>
                    <h1 className='text-lg lg:text-[36px] font-montserrat font-semibold text-black capitalize'>
                        Welcome{" "}
                        {`${session?.user?.firstName} ${session?.user?.lastName}`}
                    </h1>
                    <p className='font-lato font-normal text-base text-[#383838]'>
                        IntegratedCare provides you with all the data you need
                    </p>
                </div>
            </section>
            <section className='grid w-full grid-cols-1 lg:grid-cols-3 gap-10'>
                <aside className='flex flex-col items-start justify-start w-full col-span-2 gap-6'>
                    <div className='flex items-center justify-between w-full'>
                        <p className='text-xl font-semibold leading-7 font-montserrat'>
                            Recent Patients
                        </p>
                        <button className='text-sm bg-transparent text-primary disabled:text-blue-300'>
                            View all
                        </button>
                    </div>
                    <section className='w-full h-[344px] border border-[#CDCDCD] rounded-lg '>
                        {/* display for when no patients. remember to set the conditions */}
                        {isLoading ? (
                            <TableLoading />
                        ) : (
                            <>
                                {data?.patients?.length > 0 ? (
                                    <PractionerTable
                                        patients={data?.patients}
                                    />
                                ) : (
                                    <NoDataTable />
                                )}
                            </>
                        )}
                    </section>
                </aside>
                <aside className='flex flex-col items-start justify-start col-span-1 gap-6'>
                    <p className='text-xl font-semibold leading-7 font-montserrat'>
                        Calender
                    </p>
                    <section>
                        <Calendar
                            className={
                                "w-full h-[344px] border border-[#CDCDCD] rounded-lg overflow-hidden "
                            }
                        />
                    </section>
                </aside>
            </section>
            <AddPatientModal
                refetch={refetch}
                isOpen={isOpen}
                onClose={onClose}
            />
        </section>
    );
};

export default PractitionerOverview;

export const NoDataTable = ({
    heading,
    paragraph,
}: {
    heading?: string;
    paragraph?: string;
}) => {
    return (
        <div className='flex flex-col items-center text-center justify-center gap-2'>
            <Image
                src={"/assets/folder.webp"}
                alt='folder'
                width={140}
                height={140}
            />
            <p className='text-lg font-semibold  font-lato'>
                {heading || "You don't have any patient yet."}
            </p>
            <p className='font-lato  text-base text-[#515151]'>
                {paragraph ||
                    `Start by adding a patient or use the search button above to find
                a patient`}
            </p>
        </div>
    );
};
