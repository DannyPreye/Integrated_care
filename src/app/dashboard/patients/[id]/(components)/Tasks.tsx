"use client";
import { TableLoading } from "@/app/dashboard/(overview)/component/PractionerTable";
import {
    useGetEncounterDetailsQuery,
    useGetPatientHistoryQuery,
} from "@/redux/services/practitioner.service";
import {
    Button,
    Checkbox,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import TaskModal from "./modals/TaskModal";

interface TaskProps {
    patientId: string;
    encounterId: string;
}
const Tasks: React.FC<TaskProps> = ({ patientId, encounterId }) => {
    const { data, isFetching, isError, refetch } =
        useGetEncounterDetailsQuery(encounterId);
    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-montserrat font-[500]'>
                    Outstanding Requests
                </h2>

                <Button
                    onClick={onOpen}
                    variant='ghost'
                    className='text-primary  text-[12px] leading-[20px] font-lato font-semibold'
                >
                    + Add
                </Button>
            </div>
            <div>
                <TableContainer>
                    <Table>
                        <Thead className='text-[16px] leading-[24px]  font-lato font-semibold'>
                            <Tr>
                                <Th className='capitalize'></Th>
                                <Th className='capitalize'>Request</Th>
                                <Th className='capitalize'>Prescribed On</Th>
                                <Th className='capitalize'>Prescribed By</Th>
                            </Tr>
                        </Thead>
                        {data?.tasks?.length > 0 && !isFetching && (
                            <Tbody className='text-sm font-lato'>
                                {data?.tasks?.map((task: any) => (
                                    <Tr key={task?._id}>
                                        <Td>
                                            <Checkbox />
                                        </Td>
                                        <Td>{task?.taskName}</Td>
                                        <Td>
                                            {" "}
                                            {moment(task?.createdAt).format(
                                                "DD MMM, YYYY"
                                            )}
                                        </Td>
                                        <Td></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        )}
                    </Table>
                </TableContainer>

                {isFetching && <TableLoading numberOfColumns={3} />}
            </div>

            <TaskModal
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
                patientId={patientId}
                encounterId={encounterId}
            />
        </div>
    );
};

export default Tasks;
