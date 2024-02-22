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
} from "@chakra-ui/react";
import { IPatient } from "@/app/types/Ipage";
import moment from "moment";

interface PractionerTableProps {
    patients: IPatient[];
}

const PractionerTable: React.FC<PractionerTableProps> = ({ patients }) => {
    return (
        <TableContainer>
            <Table variant={"simple"}>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Patient ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Last Visit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {patients.map((patient) => (
                        <Tr key={patient?._id}>
                            <Td>
                                <Checkbox />
                            </Td>
                            <Td>{patient?._id}</Td>
                            <Td>{patient?.firstName}</Td>
                            <Td>{patient?.lastName}</Td>
                            <Td>{patient?.email}</Td>
                            <Td>{moment().format("DD MMM YYYY")}</Td>
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
