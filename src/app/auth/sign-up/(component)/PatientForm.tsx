"use client";
import AuthLayout from "@/layouts/Auth.layout";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/sharedComponents/InputField";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import Link from "next/link";
import { Button, useToast } from "@chakra-ui/react";
import { usePatientRegisterMutation } from "@/redux/services/auth.service";
import { useRouter } from "next/navigation";

// am using this component because of the useSearchParams hook
// it will prevent next build from throwing an error during production build
// because I'll use Suspense to in the main page to manage this

const PatientForm: React.FC = () => {
    const toast = useToast();
    const [registerPatient] = usePatientRegisterMutation();
    const router = useRouter();

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one symbol"
            )
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            agree: false,
        },

        onSubmit: async (values) => {
            const res: any = await registerPatient(values);
            if (res.error) {
                toast({
                    title: "Error",
                    description: res.error.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Success",
                    description: "Your account has been created successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                router.push(`/auth/confirm-email?email=${values.email}`);
            }
        },
        validationSchema,
        enableReinitialize: true,
    });

    return (
        <form
            className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-[#383838]'
            onSubmit={formik.handleSubmit}
        >
            <InputField
                LeftIcon={<FaRegUser />}
                onBlur={formik.handleBlur}
                id='firstName'
                type='text'
                label='First Name'
                placeholder='John'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                errorMessage={formik.errors.firstName}
                isError={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                }
            />
            <InputField
                LeftIcon={<FaRegUser />}
                id='lastName'
                onBlur={formik.handleBlur}
                type='text'
                label='Last Name'
                placeholder='Doe'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                errorMessage={formik.errors.lastName}
                isError={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                }
            />
            <InputField
                LeftIcon={<MdOutlineEmail />}
                className='col-span-2'
                id='email'
                onBlur={formik.handleBlur}
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                value={formik.values.email}
                onChange={formik.handleChange}
                errorMessage={formik.errors.email}
                isError={formik.touched.email && Boolean(formik.errors.email)}
            />
            <InputField
                LeftIcon={<BiLock />}
                className='col-span-2'
                id='password'
                onBlur={formik.handleBlur}
                type='password'
                label='Password'
                placeholder='*****'
                value={formik.values.password}
                onChange={formik.handleChange}
                errorMessage={formik.errors.password}
                isError={
                    formik.touched.password && Boolean(formik.errors.password)
                }
            />
            <div className='flex items-center col-span-2 justify-start w-full gap-3 -mt-2'>
                <input
                    type='checkbox'
                    name='checkbox'
                    id='checkbox'
                    className='w-4 h-4 bg-white outline-none accent-primary'
                    checked={formik.values.agree}
                    onChange={(e) =>
                        formik.setFieldValue("agree", e.target.checked)
                    }
                />
                <p className='text-base font-normal text-[#6A6A6A] '>
                    I agree with the{" "}
                    <Link href={"/terms-of-service"} className='text-primary'>
                        terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href={"/privacy-policy"} className='text-primary'>
                        privacy policy
                    </Link>
                    .
                </p>
            </div>
            <div className='col-span-2 flex flex-col gap-4'>
                <Button
                    disabled={!formik.values.agree}
                    isLoading={formik.isSubmitting}
                    type='submit'
                    className='w-full py-3 text-base text-white rounded-lg bg-primary'
                >
                    Sign In
                </Button>
                <p className='-mt-3 text-base text-[#515151] font-normal text-center'>
                    Already have an account?{" "}
                    <Link className='text-primary' href={"/auth/sign-in"}>
                        Log in.
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default PatientForm;
