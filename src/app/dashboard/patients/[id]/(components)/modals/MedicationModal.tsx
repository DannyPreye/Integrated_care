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
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "@/sharedComponents/InputField";
import { useAddMedicationMutation } from "@/redux/services/practitioner.service";
import ModalLoader from "./ModalLoader";

interface MedicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    encounterId: string;
    refetch: () => any;
}

const MedicationModal: React.FC<MedicationModalProps> = ({
    isOpen,
    onClose,
    patientId,
    encounterId,
    refetch,
}) => {
    const toast = useToast();
    const [addMedication, { isLoading }] = useAddMedicationMutation();

    const AddMedicationForm = () => {
        const validationSchema = yup.object().shape({
            drugName: yup.string().required("Drug Name is required"),
            dosage: yup.string().required("Dosage is required"),
            frequency: yup.string().required("Frequency is required"),
        });

        const formik = useFormik({
            initialValues: {
                drugName: "",
                dosage: "",

                frequency: "",
            },
            onSubmit: async (values) => {
                const res: any = await addMedication({
                    patientId,
                    encounterId,
                    body: values,
                });

                if (res?.error) {
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
                    description: "Request added successfully",
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
                className='flex flex-col gap-4 pb-8 '
                onSubmit={formik.handleSubmit}
            >
                <InputField
                    id='drugName'
                    type='text'
                    label='Drug Name'
                    placeholder='Enter Drug Name'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.drugName}
                    errorMessage={formik.errors.drugName}
                    isError={
                        formik.touched.drugName &&
                        Boolean(formik.errors.drugName)
                    }
                />
                <InputField
                    id='dosage'
                    type='text'
                    label='Dosage'
                    placeholder='Enter Dosage'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dosage}
                    errorMessage={formik.errors.dosage}
                    isError={
                        formik.touched.dosage && Boolean(formik.errors.dosage)
                    }
                />

                <InputField
                    id='frequency'
                    type='text'
                    label='Frequency'
                    placeholder='Enter Frequency'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.frequency}
                    errorMessage={formik.errors.frequency}
                    isError={
                        formik.touched.frequency &&
                        Boolean(formik.errors.frequency)
                    }
                />
                <div className='flex justify-center mt-[30px]'>
                    <Button
                        isLoading={formik.isSubmitting}
                        type='submit'
                        colorScheme={"blue"}
                    >
                        + Add Medication
                    </Button>
                </div>
            </form>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={() => (isLoading ? null : onClose)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add Medication
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    {isLoading ? (
                        <ModalLoader
                            title='Add Medication'
                            description='Adding Medication'
                        />
                    ) : (
                        <AddMedicationForm />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MedicationModal;
