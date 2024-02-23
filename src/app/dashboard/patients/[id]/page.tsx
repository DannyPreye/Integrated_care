import { serverSession } from "@/utils/auth";
import { Avatar, Box, Card, CardBody, Divider, Stack } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React from "react";
import Allergies from "./(components)/Allergies";
import Diagnosis from "./(components)/Diagnosis";
import Tasks from "./(components)/Tasks";

interface Props {
    params: any;
}

const page: React.FC<Props> = async ({ params }) => {
    const { id } = params;
    const session = await serverSession();

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/practitioner/getPatient?patientId=${id}`,
        {
            headers: {
                Authorization: `Bearer ${session?.token}`,
            },
        }
    );

    console.log(data);

    return (
        <div className='flex gap-4 w-full'>
            <Card rounded={"8px"} className='w-full  shadow-md lg:w-2/5'>
                <CardBody>
                    <Stack px={0} divider={<Divider />} spacing={4}>
                        <div>
                            <div className='flex flex-col gap-3 items-center'>
                                <Avatar
                                    name={
                                        data?.firstName + " " + data?.lastName
                                    }
                                    src={data?.profilePicture}
                                />
                                <p className='font-montserrat text-lg font-[500] text-center'>
                                    {data?.firstName + " " + data?.lastName}
                                </p>
                            </div>

                            <div className='grid grid-cols-2 gap-4 mt-4 font-lato'>
                                <p className='text-base'>Gender:</p>
                                <p className='font-semibold'>{data?.gender}</p>
                                <p className='text-base'>Age:</p>
                                <p className='font-semibold'>{data?.age}</p>
                                <p className='text-base'>Blood Type:</p>
                                <p className='font-semibold'>
                                    {data?.bloodType}
                                </p>
                                <p className='text-base'>Weight:</p>
                                <p className='font-semibold'>{data?.weight}</p>
                                <p className='text-base'>Height:</p>
                                <p className='font-semibold'>{data?.height}</p>
                                <p className='text-base'>Patient ID:</p>
                                <p className='font-semibold'>
                                    {data?.patientId}
                                </p>
                                <p className='text-base'>Last Visit:</p>
                                <p className='font-semibold'>
                                    {moment(data?.updatedAy).format(
                                        "Do MMM, YYYY"
                                    )}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Allergies patientId={id} />
                        </div>
                        <Diagnosis patientId={id} />
                    </Stack>
                </CardBody>
            </Card>

            <div className='w-full lg:w-3/5 flex flex-col '>
                <Card rounded={"8px"} className='w-full  shadow-md '>
                    <CardBody>
                        <Tasks patientId={id} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default page;
