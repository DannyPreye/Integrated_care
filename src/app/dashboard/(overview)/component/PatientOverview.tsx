"use client";
import { useGetPatientProfileQuery } from "@/redux/services/patient.service";
import {
    Checkbox,
    Skeleton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";
import { CgHashtag } from "react-icons/cg";
import { CiDroplet } from "react-icons/ci";
import { BiTask } from "react-icons/bi";
import { MdOutlineHeight } from "react-icons/md";
import { TableLoading } from "./PractionerTable";

const dummyData = [
    {
        name: "Blood Test",
        prescribedOn: Date.now(),
        status: "Completed",
        prescribedBy: "Dr. John Harrison",
    },
    {
        name: "Scaling and polishing",
        prescribedOn: Date.now(),
        status: "Pending",
        prescribedBy: "Dr. Ayobami Jonathan",
    },
];

const PatientOverview = () => {
    const { isLoading, data, error } = useGetPatientProfileQuery(null);
    console.log(data);
    return (
        <div className='flex flex-col lg:gap-10 gap-4'>
            {isLoading ? (
                <div className='flex justify-between gap-4 items-center'>
                    {[...Array(4)].map((i) => (
                        <Skeleton
                            key={i}
                            height='150px'
                            width='265px'
                            borderRadius='10px'
                        />
                    ))}
                </div>
            ) : (
                <div className='gap-4 flex lg:flex-nowrap flex-wrap  justify-between items-center'>
                    <PatientCard
                        icon={<CgHashtag size={30} />}
                        title='Identification Number'
                        value={data?.patientId}
                    />
                    <PatientCard
                        icon={<CiDroplet size={30} />}
                        title='Blood Group'
                        value={"O+"}
                    />
                    <PatientCard
                        icon={<BiTask size={30} />}
                        title='Outstanding Task'
                        value={"3"}
                    />
                    <PatientCard
                        icon={<MdOutlineHeight size={30} />}
                        title='Height'
                        value={"180cm"}
                    />
                </div>
            )}

            <div className='flex flex-col gap-4 lg:mt-[70px] mt-4'>
                <h2 className='text-[#002549] text-[18px] font-montserrat leading-[24px] font-semibold'>
                    Oustanding Task
                </h2>

                <div className='w-full font-lato'>
                    {isLoading ? (
                        <TableLoading />
                    ) : (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr className='bg-[#EFF9FF] font-semibold font-base'>
                                        <Th></Th>
                                        <Th>Name</Th>
                                        <Th>Prescribed On</Th>
                                        <Th>Prescribed By</Th>
                                        <Th>Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody className='text-[14px]'>
                                    {dummyData.map((data, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                <Checkbox />
                                            </Td>
                                            <Td>{data.name}</Td>
                                            <Td>{data.prescribedOn}</Td>
                                            <Td>{data.prescribedBy}</Td>
                                            <Td>
                                                <span
                                                    className={`p-2 w-[85px] text-center block border rounded-[4px] ${
                                                        data.status ===
                                                        "Completed"
                                                            ? "border-green-500 text-green-500"
                                                            : data.status ===
                                                              "Pending"
                                                            ? "border-[#F59E0B] text-[#F59E0B]"
                                                            : "border-red-500 text-red-500"
                                                    }`}
                                                >
                                                    {data.status}
                                                </span>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientOverview;

interface PatientCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}
const PatientCard: React.FC<PatientCardProps> = ({ icon, title, value }) => {
    return (
        <div className=' w-full font-lato h-[150px] rounded-[10px] bg-[#EFF9FF] flex items-start py-[31px] px-[19px]'>
            <div className='bg-[#002549] text-white w-[41px] h-[39px] rounded-[3px] flex justify-center items-center'>
                {icon}
            </div>
            <div className='flex flex-col justify-center ml-[20px] gap-3'>
                <p className='text-[#002549] text-[16px] font-semibold'>
                    {title}
                </p>
                <p className='text-[#002549] font-montserrat text-[20px] leading- font-semibold'>
                    {value}
                </p>
            </div>
        </div>
    );
};
