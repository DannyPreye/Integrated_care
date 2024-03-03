"use client";
import { TableLoading } from "@/app/dashboard/(overview)/component/PractionerTable";
import { useGetPatientEnCountersQuery } from "@/redux/services/practitioner.service";
import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import EncounterModal from "./modals/EncounterModal";
import moment from "moment";

interface Props {
    patientId: string;
}

const Encounters: React.FC<Props> = ({ patientId }) => {
    const { data, isFetching, refetch } =
        useGetPatientEnCountersQuery(patientId);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    console.log(data);

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-montserrat font-[500]'>
                    Encounters
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
                                <Th className='capitalize'>Reason for visit</Th>
                                <Th className='capitalize'>Location</Th>
                                <Th className='capitalize'>Date</Th>
                                <Th className='capitalize'>Practioner</Th>
                            </Tr>
                        </Thead>
                        {data?.length > 0 && !isFetching && (
                            <Tbody className='text-sm font-lato'>
                                {data?.map((encounter: any) => (
                                    <Tr
                                        className='hover:bg-gray-200 cursor-pointer'
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/patients/${patientId}/${encounter?._id}`
                                            )
                                        }
                                        key={encounter?._id}
                                    >
                                        <Td>{encounter?.reasonForVisit}</Td>
                                        <Td>{encounter?.location}</Td>
                                        <Td>
                                            {moment(
                                                encounter?.createdAt
                                            ).format("ll")}
                                        </Td>
                                        <Td>
                                            {encounter?.practitioner?.firstName}{" "}
                                            {encounter?.practitioner?.lastName}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        )}
                    </Table>
                </TableContainer>

                {isFetching && <TableLoading numberOfColumns={4} />}
            </div>

            <EncounterModal
                isOpen={isOpen}
                onClose={onClose}
                refetch={refetch}
                patientId={patientId}
            />
        </div>
    );
};

export default Encounters;
