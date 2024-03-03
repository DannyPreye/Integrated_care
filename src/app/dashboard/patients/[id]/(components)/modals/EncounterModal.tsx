import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/sharedComponents/InputField";
import { useAddPatientEncounterMutation } from "@/redux/services/practitioner.service";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface EncounterModalProps {
    patientId: string;
    isOpen: boolean;
    onClose: () => void;
    refetch: () => any;
}

const EncounterModal: React.FC<EncounterModalProps> = ({
    patientId,
    isOpen,
    onClose,
    refetch,
}) => {
    const [addEncounter] = useAddPatientEncounterMutation();
    const toast = useToast();

    const validationSchema = Yup.object({
        reasonForVisit: Yup.string().required(
            "Please enter a reason for visit"
        ),
        location: Yup.string().required("Location is required"),
    });

    const formik = useFormik({
        initialValues: {
            reasonForVisit: "",
            location: "",
        },
        onSubmit: async (values) => {
            const res: any = await addEncounter({
                patientId,
                body: values,
            });

            if (res.error) {
                return toast({
                    title: "Error",
                    description: res.error.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            toast({
                title: "Success",
                description: "Encounter added successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onClose();
            refetch();
        },
        validationSchema,
    });

    const AddEncounterForm = () => {
        return (
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col gap-4 items-center pb-8'
            >
                <InputField
                    labelClassName='text-sm font-lato'
                    inputClassName='text-sm font-lato'
                    label='Reason for Visit'
                    id='reasonForVisit'
                    // type='text'
                    placeholder='Reason for Visit'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reasonForVisit}
                    errorMessage={formik.errors.reasonForVisit}
                    isError={
                        formik.touched.reasonForVisit &&
                        Boolean(formik.errors.reasonForVisit)
                    }
                />
                <InputField
                    labelClassName='text-sm font-lato'
                    inputClassName='text-sm font-lato'
                    label='Location'
                    id='location'
                    type='text'
                    placeholder='Location'
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={formik.errors.location}
                    isError={
                        formik.touched.location &&
                        Boolean(formik.errors.location)
                    }
                />
                <Button
                    isLoading={formik.isSubmitting}
                    type='submit'
                    className='w-full text-white bg-primary disabled:bg-[#B6E5FF] h-[40px] rounded-[8px] max-w-[140px]'
                >
                    Submit
                </Button>
            </form>
        );
    };

    const UploadEncounter = () => {
        return (
            <div className='flex flex-col items-center gap-4'>
                <div className='w-4/5 mt-4 h-40 flex flex-col justify-center cursor-pointer items-center border border-gray-200 rounded-md'>
                    <AiOutlineCloudUpload
                        size={30}
                        className=''
                        onClick={() => {}}
                    />
                    <h2 className='text-lg font-lato'>Upload Encounter</h2>
                    <p className='text-xs font-lato'>
                        Drag and drop files here or{" "}
                        <span className='text-primary'>browse</span>
                    </p>
                </div>
                <Button
                    type='submit'
                    className='w-full text-white bg-primary disabled:bg-[#B6E5FF] h-[40px] rounded-[8px] max-w-[140px]'
                >
                    Submit
                </Button>
            </div>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add Encounter
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <Tabs>
                        <TabList className='border rounded-md'>
                            <Tab className='text-sm font-lato'>
                                Enter Manually
                            </Tab>
                            <Tab className='text-sm font-lato'>
                                Upload Encounter
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <AddEncounterForm />
                            </TabPanel>
                            <TabPanel>
                                <UploadEncounter />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EncounterModal;
