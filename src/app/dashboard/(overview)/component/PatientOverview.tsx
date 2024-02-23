"use client";
import {
    useGetMedicalHistoryQuery,
    useGetPatientProfileQuery,
} from "@/redux/services/patient.service";
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
import React, { useEffect, useState } from "react";
import { CgHashtag } from "react-icons/cg";
import { CiDroplet } from "react-icons/ci";
import { BiTask } from "react-icons/bi";
import { MdOutlineHeight } from "react-icons/md";
import { TableLoading } from "./PractionerTable";
import { FaTasks } from "react-icons/fa";
import moment from "moment";
import { NoDataTable } from "./PractitionerOverview";

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

    const {
        data: tasksData,
        isLoading: taskDataLoading,
        isError,
    } = useGetMedicalHistoryQuery(null);
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        if (!taskDataLoading && !isError && tasksData) {
            const filterTasks = tasksData
                ?.map((item: any) =>
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
    }, [taskDataLoading, tasksData]);

    return (
        <div className='flex flex-col lg:gap-10 gap-4'>
            {isLoading ? (
                <div className='flex justify-between lg:flex-nowrap flex-wrap gap-4 items-center'>
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
                    {taskDataLoading ? (
                        <TableLoading />
                    ) : (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr className='bg-[#EFF9FF] capitalize font-semibold text-base'>
                                        <Th></Th>
                                        <Th className='text-center capitalize'>
                                            Name
                                        </Th>
                                        <Th className='text-center capitalize'>
                                            Prescribed On
                                        </Th>
                                        <Th className='text-center capitalize'>
                                            Prescribed By
                                        </Th>
                                        {/* <Th>Status</Th> */}
                                    </Tr>
                                </Thead>
                                {tasks?.length > 0 ? (
                                    <>
                                        {" "}
                                        <Tbody className='text-[14px]'>
                                            {tasks.map(
                                                (task: any, index: number) => (
                                                    <Tr key={index}>
                                                        <Td>
                                                            <Checkbox />
                                                        </Td>
                                                        <Td className='text-center'>
                                                            {moment(
                                                                task?.createdAt
                                                            ).format(
                                                                "DD/MM/YYYY"
                                                            )}
                                                        </Td>
                                                        <Td className='text-center'>
                                                            {task?.taskName}
                                                        </Td>
                                                        {/* <Th>{task?.description}</Th> */}
                                                        <Td className='text-center'>
                                                            {
                                                                task
                                                                    ?.practitioner
                                                                    ?.firstName
                                                            }{" "}
                                                            {
                                                                task
                                                                    ?.practitioner
                                                                    ?.lastName
                                                            }
                                                        </Td>
                                                    </Tr>
                                                )
                                            )}
                                        </Tbody>
                                    </>
                                ) : (
                                    <div className='flex justify-center items-center h-[50%]'>
                                        <NoDataTable />
                                    </div>
                                )}
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
