import { useAddPatientInfoMutation } from "@/redux/services/practitioner.service";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast,
} from "@chakra-ui/react";
import React, { use } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/sharedComponents/InputField";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    encounterId: string;
    patientId: String;
}

const UpdatePatientInfoModal: React.FC<Props> = ({
    isOpen,
    onClose,
    refetch,
    encounterId,
    patientId,
}) => {
    const [addPatientInfo, { isLoading }] = useAddPatientInfoMutation();
    const toast = useToast();

    console.log(patientId);

    const validationSchema = Yup.object({
        gender: Yup.string().required("Gender is required"),
        dob: Yup.date().required("Date of birth is required"),
        bloodType: Yup.string().required("Blood type is required"),
        genotype: Yup.string().required("Genotype is required"),
    });

    const formik = useFormik({
        initialValues: {
            gender: "",
            dob: "",
            bloodType: "",
            genotype: "",
        },
        onSubmit: async (values) => {
            const res: any = await addPatientInfo({
                patientId,
                body: values,
            });
            if (res.error) {
                return toast({
                    title: "Error",
                    description: res.error.data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }

            if (res.data) {
                toast({
                    title: "Success",
                    description: res.data.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
                onClose();
                refetch();
            }
        },
        validationSchema,
    });

    const AddUserInfoForm = () => {
        return (
            <form
                className='flex flex-col gap-4  pb-8 '
                onSubmit={formik.handleSubmit}
            >
                <div className='flex flex-col gap-2 font-lato text-[16px] leading-[24px] font-[400]'>
                    <div>
                        <label
                            className='text-base font-semibold leading-6'
                            htmlFor='gender'
                        >
                            Gender
                        </label>
                        <Select
                            className='focus:border-[#383838]'
                            id='gender'
                            variant={"outline"}
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option selected disabled value=''>
                                Select Gender
                            </option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </Select>
                        {formik.touched.gender &&
                            Boolean(formik.errors.gender) && (
                                <small className=' -mt-5 text-base text-left text-red-800 font-lato'>
                                    {formik.errors.gender}
                                </small>
                            )}
                    </div>
                    <InputField
                        id='dob'
                        type='date'
                        label='Date of birth'
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={
                            formik.touched.dob && Boolean(formik.errors.dob)
                        }
                        errorMessage={formik.errors.dob}
                    />
                    <div>
                        <label
                            className='text-base font-semibold leading-6'
                            htmlFor='gender'
                        >
                            Blood Type
                        </label>
                        <Select
                            className='focus:border-[#383838]'
                            id='bloodType'
                            variant={"outline"}
                            value={formik.values.bloodType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option selected disabled value=''>
                                Select Blood Type
                            </option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                        </Select>
                        {formik.touched.bloodType &&
                            Boolean(formik.errors.bloodType) && (
                                <small className=' -mt-5 text-base text-left text-red-800 font-lato'>
                                    {formik.errors.bloodType}
                                </small>
                            )}
                    </div>
                    <div>
                        <label
                            className='text-base font-semibold leading-6'
                            htmlFor='gender'
                        >
                            Genotype
                        </label>
                        <Select
                            className='focus:border-[#383838]'
                            id='genotype'
                            variant={"outline"}
                            value={formik.values.genotype}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option selected disabled value=''>
                                Select Genotype
                            </option>
                            <option value='AA'>AA</option>
                            <option value='AS'>AS</option>
                            <option value='AC'>AC</option>
                            <option value='SS'>SS</option>
                            <option value='SC'>SC</option>
                            <option value='CC'>CC</option>
                        </Select>
                        {formik.touched.genotype &&
                            Boolean(formik.errors.genotype) && (
                                <small className=' -mt-5 text-base text-left text-red-800 font-lato'>
                                    {formik.errors.genotype}
                                </small>
                            )}
                    </div>
                    <div className='flex justify-center mt-[30px]'>
                        <Button
                            isLoading={formik.isSubmitting}
                            type='submit'
                            colorScheme={"blue"}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={() => (isLoading ? null : onClose())}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Personal Information
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <AddUserInfoForm />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default UpdatePatientInfoModal;
