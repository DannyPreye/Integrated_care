"use client";
import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Checkbox,
    Skeleton,
    MenuButton,
    IconButton,
    Menu,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { IPatient } from "@/app/types/Ipage";
import moment from "moment";
import { AiOutlineMore } from "react-icons/ai";
import { useRouter } from "next/navigation";
interface PractionerTableProps {
    patients: IPatient[];
}

const PractionerTable: React.FC<PractionerTableProps> = ({ patients }) => {
    const router = useRouter();
    return (
        <TableContainer>
            <Table variant={"simple"}>
                <Thead className='font-lato text-base'>
                    <Tr className='bg-[#EFF9FF]'>
                        <Th></Th>
                        <Th className='capitalize text-center'>Patient ID</Th>
                        <Th className='capitalize text-center'>First Name</Th>
                        <Th className='capitalize text-center'>Last Name</Th>
                        <Th className='capitalize text-center'>Email</Th>
                        <Th className='capitalize text-center'>Last Visit</Th>
                        <Th className='capitalize text-center'></Th>
                    </Tr>
                </Thead>
                <Tbody className='font-lato text-base'>
                    {patients.map((patient) => (
                        <Tr key={patient?._id}>
                            <Td>
                                <Checkbox />
                            </Td>
                            <Td>{patient?.patientId}</Td>
                            <Td>{patient?.firstName}</Td>
                            <Td>{patient?.lastName}</Td>
                            <Td>{patient?.email}</Td>
                            <Td>{moment().format("DD MMM YYYY")}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label={"Options"}
                                        variant={"ghost"}
                                        icon={<AiOutlineMore size={24} />}
                                    />
                                    <MenuList>
                                        <MenuItem onClick={() => router}>
                                            View
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default PractionerTable;

export const TableLoading = () => {
    return (
        <TableContainer>
            <Table variant={"simple"}>
                <Thead>
                    <Tr>
                        {[...Array(5)].map(() => (
                            <Th key={Math.random()}>
                                <Skeleton height='10px' />
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {[...Array(5)].map(() => (
                        <Tr key={Math.random()}>
                            {[...Array(5)].map(() => (
                                <Td key={Math.random()}>
                                    <Skeleton height='10px' />
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
