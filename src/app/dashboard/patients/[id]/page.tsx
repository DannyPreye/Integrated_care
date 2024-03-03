import { serverSession } from "@/utils/auth";
import { Avatar, Box, Card, CardBody, Divider, Stack } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React from "react";
import Allergies from "./(components)/Allergies";
import Diagnosis from "./(components)/Diagnosis";
import Tasks from "./(components)/Tasks";
import PatientDetails from "./(components)/PatientDetails";
import Medication from "./(components)/Medication";
import Encounters from "./(components)/Encounters";

interface Props {
    params: any;
}

const page: React.FC<Props> = async ({ params }) => {
    const { id } = params;

    return (
        <div className='flex flex-col lg:flex-row gap-4 w-full'>
            <Card rounded={"8px"} className='w-full px-0  shadow-md lg:w-2/5'>
                <CardBody className='px-0'>
                    <Stack divider={<Divider h={"2px"} />} spacing={4}>
                        <div className='px-4 lg:px-[30px]'>
                            <PatientDetails id={id} />
                        </div>
                    </Stack>
                </CardBody>
            </Card>

            <div className='w-full lg:w-3/5 flex flex-col gap-[28px] '>
                <Card rounded={"8px"} className='w-full flex-1  shadow-md '>
                    <CardBody>
                        <Encounters patientId={id} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default page;
