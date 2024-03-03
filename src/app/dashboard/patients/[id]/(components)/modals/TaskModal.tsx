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
import { useAddRequestsMutation } from "@/redux/services/practitioner.service";
import InputField from "@/sharedComponents/InputField";
import ModalLoader from "./ModalLoader";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    encounterId: string;
    patientId: String;
}

const TaskModal: React.FC<Props> = ({
    isOpen,
    onClose,
    refetch,
    encounterId,
    patientId,
}) => {
    const [addRequests, { isLoading }] = useAddRequestsMutation();
    const toast = useToast();

    const AddRequestForm = () => {
        const validationSchema = yup.object({
            request: yup.string().required("Request is required"),
        });

        const formik = useFormik({
            initialValues: {
                request: "",
            },
            onSubmit: async (values) => {
                const res: any = await addRequests({
                    encounterId,
                    patientId,
                    body: {
                        taskName: values.request,
                    },
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
                className='flex flex-col gap-4   '
                onSubmit={formik.handleSubmit}
            >
                <InputField
                    id='request'
                    label='Request'
                    placeholder='Enter Request'
                    type='text'
                    value={formik.values.request}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isError={
                        formik.touched.request && Boolean(formik.errors.request)
                    }
                    errorMessage={formik.errors.request}
                />
                <div className='flex justify-center mt-[30px]'>
                    <Button
                        isLoading={formik.isSubmitting}
                        type='submit'
                        colorScheme={"blue"}
                    >
                        + Add Request
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
                    {isLoading ? " " : "Add Request"}
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody className=''>
                    {isLoading ? (
                        <ModalLoader
                            title='Add Request'
                            description='Adding Request'
                        />
                    ) : (
                        <AddRequestForm />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default TaskModal;
