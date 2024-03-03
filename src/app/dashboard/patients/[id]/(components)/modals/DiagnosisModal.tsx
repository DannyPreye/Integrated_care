import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import { useAddDiagnosisMutation } from "@/redux/services/practitioner.service";
import InputField from "@/sharedComponents/InputField";
import ModalLoader from "./ModalLoader";

interface DiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    encounterId: string;
    patientId: String;
}

const DiagnosisModal: React.FC<DiagnosisModalProps> = ({
    isOpen,
    onClose,
    refetch,
    encounterId,
    patientId,
}) => {
    const [addDiagnosis, { isLoading }] = useAddDiagnosisMutation();
    const toast = useToast();

    const AddDiagnosisForm = () => {
        const validationSchema = Yup.object({
            diagnosis: Yup.string().required("Diagnosis is required"),
        });

        const formik = useFormik({
            initialValues: {
                diagnosis: "",
            },
            onSubmit: async (values) => {
                const res: any = await addDiagnosis({
                    encounterId,
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
                    description: "Diagnosis added successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                refetch();
                onClose();
            },
            validationSchema,
        });
        return (
            <form
                className='flex flex-col gap-4  pb-8'
                onSubmit={formik.handleSubmit}
            >
                <InputField
                    label='Diagnosis'
                    type='text'
                    id='diagnosis'
                    value={formik.values.diagnosis}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Diagnosis'
                    isError={
                        formik.touched.diagnosis &&
                        Boolean(formik.errors.diagnosis)
                    }
                    errorMessage={formik.errors.diagnosis}
                />
                <div className='flex justify-center mt-[30px]'>
                    <Button
                        isLoading={formik.isSubmitting}
                        type='submit'
                        colorScheme={"blue"}
                    >
                        + Add Diagnosis
                    </Button>
                </div>
            </form>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={() => (isLoading ? null : onClose())}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {isLoading ? "" : "Add Diagnosis"}
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    {isLoading ? (
                        <ModalLoader title='Adding Diagnosis' description='' />
                    ) : (
                        <AddDiagnosisForm />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default DiagnosisModal;
