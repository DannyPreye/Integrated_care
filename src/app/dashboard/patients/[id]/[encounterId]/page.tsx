import { Card, CardBody, Divider, Stack } from "@chakra-ui/react";
import React from "react";
import PatientDetails from "../(components)/PatientDetails";
import Allergies from "../(components)/Allergies";
import Diagnosis from "../(components)/Diagnosis";
import Tasks from "../(components)/Tasks";
import Medication from "../(components)/Medication";

interface Props {
    params: any;
}
const Page: React.FC<Props> = ({ params }) => {
    const { id:patientId, encounterId } = params;

    return (
        <div className='flex gap-4 w-full'>
            <Card rounded={"8px"} className='w-full px-0  shadow-md lg:w-2/5'>
                <CardBody className='px-0'>
                    <Stack divider={<Divider h={"2px"} />} spacing={4}>
                        <div className='px-4 lg:px-[30px]'>
                            <Allergies
                                patientId={patientId}
                                encounterId={encounterId}
                            />
                        </div>
                        <div className='px-4 lg:px-[30px]'>
                            <Diagnosis
                                patientId={patientId}
                                encounterId={encounterId}
                            />
                        </div>
                    </Stack>
                </CardBody>
            </Card>

            <div className='w-full lg:w-3/5 flex flex-col gap-[28px] '>
                <Card rounded={"8px"} className='w-full flex-1  shadow-md '>
                    <CardBody>
                        <Tasks
                            patientId={patientId}
                            encounterId={encounterId}
                        />
                    </CardBody>
                </Card>
                <Card rounded={"8px"} className='w-full  flex-1 shadow-md '>
                    <CardBody px={0}>
                        <Medication
                            patientId={patientId}
                            encounterId={encounterId}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Page;
