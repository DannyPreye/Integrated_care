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
    const [allergies, setAllergies] = useState<any>([]);

    useEffect(() => {
        if (!isLoading && !isError && data) {
            const filterTasks = data
                .map((item: any) =>
                    item.allergies?.map((med: any) => {
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
            setAllergies(filterTasks);
        }
    }, [isLoading, data]);

    console.log(allergies);

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
                                        Date
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Allergen
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Reaction
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Severity
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Prescribed By
                                    </Th>
                                </Tr>
                            </Thead>
                            {!isLoading &&
                                !isError &&
                                allergies?.length > 0 && (
                                    <Tbody className='font-lato text-base'>
                                        {allergies?.map(
                                            (medication: any, index: any) => (
                                                <Tr key={index}>
                                                    <Td className='text-center'>
                                                        <Checkbox />
                                                    </Td>
                                                    <Td className='text-center'>
                                                        {moment(
                                                            medication?.createdAt
                                                        ).format("DD/MM/YYYY")}
                                                    </Td>
                                                    <Td className='text-center'>
                                                        {medication?.allergen}
                                                    </Td>
                                                    <Td>
                                                        {medication?.reaction}
                                                    </Td>
                                                    <Td>
                                                        <Badge
                                                            variant='subtle'
                                                            textTransform={
                                                                "lower-case"
                                                            }
                                                            className='lower rounded-[8px] p-2'
                                                            colorScheme={
                                                                medication.severity ==
                                                                "severe"
                                                                    ? "red"
                                                                    : medication.severity ==
                                                                      "moderate"
                                                                    ? "yellow"
                                                                    : "green"
                                                            }
                                                        >
                                                            {
                                                                medication?.severity
                                                            }
                                                        </Badge>
                                                    </Td>
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

                    {isLoading && <TableLoading numberOfColumns={5} />}
                    {allergies?.length === 0 && !isLoading && (
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
