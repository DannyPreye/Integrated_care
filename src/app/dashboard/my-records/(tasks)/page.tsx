import {
    Badge,
    Button,
    Checkbox,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { IoFilter } from "react-icons/io5";

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

const page: React.FC = () => {
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
                                    <Th className='text-white text-center capitalize'>
                                        Description
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Health Practitioner
                                    </Th>
                                    <Th className='text-white text-center capitalize'>
                                        Status
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody className=''>
                                {dummyTask.map((task, index) => (
                                    <Tr key={index}>
                                        <Th>
                                            <Checkbox />
                                        </Th>
                                        <Th>
                                            {moment(task.date).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </Th>
                                        <Th>{task.task_type}</Th>
                                        <Th>{task.description}</Th>
                                        <Th>{task.health_practioner}</Th>
                                        <Th>
                                            <Badge
                                                variant={"subtle"}
                                                colorScheme={
                                                    task.status === "completed"
                                                        ? "blue"
                                                        : task.status ==
                                                          "severe"
                                                        ? "green"
                                                        : ""
                                                }
                                            >
                                                {task.status}
                                            </Badge>
                                        </Th>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default page;
