"use client";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Select,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddPatientAllergyMutation } from "@/redux/services/practitioner.service";
import { useRouter } from "next/navigation";
import InputField from "@/sharedComponents/InputField";
import FadeLoader from "react-spinners/FadeLoader";
import ModalLoader from "./ModalLoader";

interface AddAllergiesModalProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    patientId: string;
    encounterId: string;
}

const AddAllergiesModal: React.FC<AddAllergiesModalProps> = ({
    isOpen,
    onClose,
    refetch,
    patientId,
    encounterId,
}) => {
    const [addAllergies, { data, isLoading, isError, error }] =
        useAddPatientAllergyMutation();
    const toast = useToast();

    const AddAllergyForm = () => {
        const validationSchema = Yup.object({
            allergen: Yup.string().required("allergen is required"),
            reaction: Yup.string().required("reaction  is required"),
            severity: Yup.string().required("severity  is required"),
        });
        const formik = useFormik({
            initialValues: {
                allergen: "",
                reaction: "",
                severity: "",
            },
            onSubmit: async (values) => {
                const res: any = await addAllergies({
                    patientId,
                    encounterId,
                    body: { ...values },
                });
                if (res?.error) {
                    toast({
                        title: "Error",
                        description: res?.error?.data?.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    });
                } else {
                    refetch();
                    onClose();
                }
            },
            validationSchema,
        });

        return (
            <form
                className='flex flex-col gap-4 items-center py-8'
                onSubmit={formik.handleSubmit}
            >
                <h2 className='font-montserrat text-[24px] leading-[32px] font-[600] text-center'>
                    Add Allergy
                </h2>
                <p className='font-montserrat text-[16px] leading-[24px] font-[400] text-center'>
                    Add a new patient allegies by typing it in the text box
                    below
                </p>
                <InputField
                    label='Allergen'
                    id='allergen'
                    type='text'
                    placeholder='e.g Dust'
                    isError={
                        formik.touched.allergen &&
                        Boolean(formik.errors.allergen)
                    }
                    errorMessage={formik.errors.allergen}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.allergen}
                />
                <InputField
                    label='Reaction'
                    id='reaction'
                    type='text'
                    placeholder='e.g itching'
                    isError={
                        formik.touched.reaction &&
                        Boolean(formik.errors.reaction)
                    }
                    errorMessage={formik.errors.reaction}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.reaction}
                />
                <div className='relative w-full text-left'>
                    <label
                        htmlFor='severity'
                        className='text-base font-semibold leading-6'
                    >
                        Severity
                    </label>
                    <Select
                        id='severity'
                        value={formik.values.severity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='w-full pr-3  py-2 text-base bg-transparent border  rounded-md outline-none'
                    >
                        <option value='' selected disabled>
                            Select Severity
                        </option>
                        <option value='mild'>Mild</option>
                        <option value='moderate'>Moderate</option>
                        <option value='severe'>Severe</option>
                    </Select>
                    {formik.touched.severity && formik.errors.severity && (
                        <small className='-mt-5 text-base text-left text-red-800 font-lato'>
                            {formik.errors.severity}
                        </small>
                    )}
                </div>
                <Button
                    isLoading={formik.isSubmitting}
                    type='submit'
                    className='w-full bg-primary text-whte disabled:bg-[#B6E5FF] h-[40px] rounded-[8px] max-w-[140px]'
                >
                    Enter
                </Button>
            </form>
        );
    };
    return (
        <Modal isOpen={isOpen} onClose={() => (isLoading ? null : onClose())}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <ModalLoader
                            title='Add Allergies'
                            description='Adding Allergy'
                        />
                    ) : (
                        <AddAllergyForm />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddAllergiesModal;
