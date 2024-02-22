"use client";
import {
    useAddPatientMutation,
    useGetPatientByIdMutation,
    useGetPatientQuery,
} from "@/redux/services/practitioner.service";
import InputField from "@/sharedComponents/InputField";
import {
    Avatar,
    Button,
    Fade,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import * as Yup from "yup";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

const AddPatientModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [getPatient, { data, isLoading, isError }] =
        useGetPatientByIdMutation();
    const [
        addPatient,
        {
            data: addPatientData,
            isLoading: addPatientLoading,
            isError: addPatientError,
        },
    ] = useAddPatientMutation();
    const toast = useToast();

    const AddPatientForm = () => {
        const validationSchema = Yup.object({
            patientId: Yup.string().required("Patient ID is required"),
        });
        const formik = useFormik({
            initialValues: {
                patientId: "",
            },
            onSubmit: async (values) => {
                const res: any = await getPatient(values.patientId);
                if (res?.error) {
                    toast({
                        title: "Error",
                        description: res?.error?.data?.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            },
            validationSchema,
        });

        const router = useRouter();

        return (
            <form
                className='flex flex-col gap-4 items-center py-8'
                onSubmit={formik.handleSubmit}
            >
                <h2 className='font-montserrat text-[24px] leading-[32px] font-[600] text-center'>
                    Add Patient
                </h2>
                <p className='font-montserrat text-[16px] leading-[24px] font-[400] text-center'>
                    {data
                        ? "Add new patient to your patient list by clicking on the button below"
                        : " Add a new patient by entering the patient ID below"}
                </p>
                <InputField
                    LeftIcon={<FaRegUser />}
                    label=''
                    id='patientId'
                    type='text'
                    placeholder='Enter Patient ID'
                    isError={
                        formik.touched.patientId &&
                        Boolean(formik.errors.patientId)
                    }
                    errorMessage={formik.errors.patientId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.patientId}
                />
                <Button
                    isLoading={formik.isSubmitting}
                    disabled={!formik.values.patientId}
                    type='submit'
                    className='w-full bg-primary disabled:bg-[#B6E5FF] h-[40px] rounded-[8px] max-w-[140px]'
                >
                    Enter
                </Button>
            </form>
        );
    };

    const PatientDetails = () => {
        const handleAddPatient = async () => {
            if (addPatientData) {
            } else {
                const res: any = await addPatient(data?.patientId);
                if (res?.error) {
                    toast({
                        title: "Error",
                        description: res?.error?.data?.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }
        };

        return (
            <div className='flex flex-col gap-4 items-center py-8'>
                <h2 className='font-montserrat text-[24px] leading-[32px] font-[600] text-center'>
                    Add Patient
                </h2>
                <p className='font-montserrat text-[16px] leading-[24px] font-[400] text-center'>
                    {data
                        ? "Add new patient to your patient list by clicking on the button below"
                        : " Add a new patient by entering the patient ID below"}
                </p>
                <div className='max-w-[478px] h-[56px] bg-[#F7F9FB] rounded-[8px] flex items-center justify-between px-[16px]'>
                    <Avatar
                        className='h-10 w-10'
                        name={data?.firstName + " " + data?.lastName}
                    />
                    <span>{data?.patientId}</span>
                    <span>{data?.email}</span>
                </div>
                <Button
                    isLoading={addPatientLoading}
                    className='w-full bg-primary disabled:bg-[#B6E5FF] h-[40px] rounded-[8px] max-w-[140px]'
                >
                    {addPatientData ? "View Profile" : "Add Patient"}
                </Button>
            </div>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <div className='flex flex-col gap-4 items-center py-8'>
                            <h2 className='font-montserrat text-[24px] leading-[32px] font-[600] text-center'>
                                Searching
                            </h2>
                            <p className='font-montserrat text-[16px] leading-[24px] font-[400] text-center'>
                                Wait while we search for the patient with that
                                ID
                            </p>
                            <FadeLoader color='#00A6FB' />
                        </div>
                    ) : (
                        <AddPatientForm />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddPatientModal;
