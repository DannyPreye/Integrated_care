"use client";
import { useGetMedicalHistoryQuery } from "@/redux/services/patient.service";
import {
    Badge,
    Button,
    Checkbox,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TableLoading } from "../../(overview)/component/PractionerTable";
import { NoDataTable } from "../../(overview)/component/PractitionerOverview";

const Page: React.FC = () => {
    const { data, isLoading, isError } = useGetMedicalHistoryQuery(null);
    const [medications, setMedications] = useState<any>([]);

    useEffect(() => {
        if (!isLoading && !isError && data) {
            const filterTasks = data
                .map((item: any) =>
                    item.medication?.map((med: any) => {
                        return {
                            ...med,
                            practitioner: {
                                firstName: item.practitionerId?.firstName,
                                lastName: item.practitionerId?.lastName,
                            },
                        };
                    })
                )
                ?.flat();
            setMedications(filterTasks);
        }
    }, [isLoading, data]);

    console.log(medications);

    console.log(data);

    return (
        <div className='flex flex-col gap-8  '>
            <Button
                variant='outline'
                className='flex font-poppins font-[400] text-base justify-center items-center rounded-[10px] h-[44px] w-[87px] border gap-[5px]'
            >
                <IoFilter className='flex-shrink-0' />
                Filter
            </Button>

            <div>
                <div className='w-full'>
                    <TableContainer>
                        <Table variant={"simple"}>
                            <Thead className='text-white text-base text-center font-lato'>
                                <Tr className='bg-primary '>
                                    <Th></Th>
                                    <Th className='text-white text-center capitalize'>
                                        Medication Name
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Dosage
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Frequency
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Prescribed By
                                    </Th>
                                    {/* <Th className='text-white text-center capitalize'>
                                        Status
                                    </Th> */}
                                </Tr>
                            </Thead>
                            {!isLoading &&
                                !isError &&
                                medications?.length > 0 && (
                                    <Tbody className='font-lato text-base'>
                                        {medications?.map(
                                            (medication: any, index: any) => (
                                                <Tr key={index}>
                                                    <Td className='text-center'>
                                                        <Checkbox />
                                                    </Td>
                                                    <Td className='text-center'>
                                                        {medication?.drugName}
                                                    </Td>
                                                    <Td className='text-center'>
                                                        {medication?.dosage}
                                                    </Td>
                                                    <Th>
                                                        {medication?.frequency}
                                                    </Th>
                                                    <Td className='text-center'>
                                                        {
                                                            medication
                                                                ?.practitioner
                                                                ?.firstName
                                                        }{" "}
                                                        {
                                                            medication
                                                                ?.practitioner
                                                                ?.lastName
                                                        }
                                                    </Td>
                                                </Tr>
                                            )
                                        )}
                                    </Tbody>
                                )}
                        </Table>
                    </TableContainer>

                    {isLoading && <TableLoading numberOfColumns={4} />}
                    {medications?.length === 0 && !isLoading && (
                        <div className='flex justify-center items-center h-[50%]'>
                            <NoDataTable />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
