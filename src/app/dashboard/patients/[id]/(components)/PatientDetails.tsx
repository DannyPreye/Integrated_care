"use client";
import { useGetPatientByIdQuery } from "@/redux/services/practitioner.service";
import {
    Avatar,
    Button,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import UpdatePatientInfoModal from "./modals/UpdatePatientInfoModal";

interface Props {
    id: string;
}
const PatientDetails: React.FC<Props> = ({ id }) => {
    const { data, isLoading, isFetching, isError, refetch } =
        useGetPatientByIdQuery(id);
    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log(data);

    return (
        <div>
            <div className='flex flex-col gap-3 items-center'>
                {isFetching || isLoading ? (
                    <SkeletonCircle size='10' />
                ) : (
                    <Avatar
                        name={data?.firstName + " " + data?.lastName}
                        src={data?.profilePicture}
                    />
                )}
                {isFetching || isLoading ? (
                    <Skeleton height={2} w={20} />
                ) : (
                    <p className='font-semibold text-2xl'>
                        {data?.firstName + " " + data?.lastName}
                    </p>
                )}
            </div>

            <div className='grid grid-cols-2 gap-4 mt-4 font-lato'>
                {isFetching || isLoading ? (
                    <>
                        {[...Array(8)].map((i) => (
                            <Skeleton key={i} height={2} />
                        ))}
                    </>
                ) : (
                    <>
                        <p className='text-base'>Gender:</p>
                        <p className='font-semibold'>{data?.gender}</p>
                        <p className='text-base'>Age:</p>
                        <p className='font-semibold'>{data?.age}</p>
                        <p className='text-base'>Blood Type:</p>
                        <p className='font-semibold'>{data?.bloodType}</p>
                        <p className='text-base'>Weight:</p>
                        <p className='font-semibold'>{data?.weight}</p>
                        <p className='text-base'>Height:</p>
                        <p className='font-semibold'>{data?.height}</p>
                        <p className='text-base'>Patient ID:</p>
                        <p className='font-semibold'>{data?.patientId}</p>
                        <p className='text-base'>Last Visit:</p>
                        <p className='font-semibold'>
                            {moment(data?.updatedAy).format("Do MMM, YYYY")}
                        </p>
                    </>
                )}
            </div>
            <p
                onClick={onOpen}
                className='text-primary mt-[15px] cursor-pointer
            text-[12px] leading-[20px] font-lato font-semibold'
            >
                + Add
            </p>

            <UpdatePatientInfoModal
                refetch={refetch}
                isOpen={isOpen}
                onClose={onClose}
                patientId={id}
                encounterId='ee'
            />
        </div>
    );
};

export default PatientDetails;
