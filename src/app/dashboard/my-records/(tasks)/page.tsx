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
import { BiTask } from "react-icons/bi";

const dummyTask = [
    {
        date: Date.now(),
        task_type: "Annual Checkup",
        description: "Schedule Annual Checkup",
        health_practioner: "Dr. Susanna Fields",
        status: "pending",
    },
    {
        date: Date.now(),
        task_type: "Flu Vaccination",
        description: "Recieve annual flu vaccination",
        health_practioner: "Dr. Susanna Fields",
        status: "In Progress",
    },
];

const Page: React.FC = () => {
    const { data, isLoading, isError } = useGetMedicalHistoryQuery(null);
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        if (!isLoading && !isError && data) {
            const filterTasks = data
                .map((item: any) =>
                    item.task?.map((task: any) => {
                        return {
                            ...task,
                            practitioner: {
                                firstName: item.practitionerId?.firstName,
                                lastName: item.practitionerId?.lastName,
                            },
                        };
                    })
                )
                ?.flat();
            setTasks(filterTasks);
        }
    }, [isLoading, data]);

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
                                        Task Type
                                    </Th>
                                    {/* <Th className='text-white text-center capitalize'>
                                        Description
                                    </Th> */}
                                    <Th className='text-white text-center capitalize'>
                                        Health Practitioner
                                    </Th>
                                    {/* <Th className='text-white text-center capitalize'>
                                        Status
                                    </Th> */}
                                </Tr>
                            </Thead>
                            {!isLoading && !isError && tasks?.length > 0 && (
                                <Tbody className='font-lato text-base'>
                                    {tasks?.map((task: any, index: any) => (
                                        <Tr key={index}>
                                            <Td className='text-center'>
                                                <Checkbox />
                                            </Td>
                                            <Td className='text-center'>
                                                {moment(task?.createdAt).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </Td>
                                            <Td className='text-center'>
                                                {task?.taskName}
                                            </Td>
                                            {/* <Th>{task?.description}</Th> */}
                                            <Td className='text-center'>
                                                {task?.practitioner?.firstName}{" "}
                                                {task?.practitioner?.lastName}
                                            </Td>
                                            {/* <Th>
                                                <Badge
                                                    variant={"subtle"}
                                                    colorScheme={
                                                        task.status ===
                                                        "completed"
                                                            ? "blue"
                                                            : task.status ==
                                                              "severe"
                                                            ? "green"
                                                            : ""
                                                    }
                                                >
                                                    {task.status}
                                                </Badge>
                                            </Th> */}
                                        </Tr>
                                    ))}
                                </Tbody>
                            )}
                        </Table>
                    </TableContainer>

                    {isLoading && <TableLoading numberOfColumns={3} />}
                    {tasks?.length === 0 && !isLoading && (
                        <div className='flex justify-center items-center h-[50%]'>
                            <NoDataTable
                                heading='You don’t have any  requests yet.'
                                paragraph='All your requests will appear here'
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
