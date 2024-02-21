"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/sharedComponents/InputField";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import Link from "next/link";
import { Button, useToast } from "@chakra-ui/react";
import { usePractionerRegisterMutation } from "@/redux/services/auth.service";
const PractionerForm = () => {
    const toast = useToast();

    const [registerPractioner] = usePractionerRegisterMutation();

    const validationSchema = Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        reg_number: Yup.string().required("Registration number is required"),
        specialty: Yup.string().required("Specialty is required"),
        work_address: Yup.string().required("Work address is required"),
        work_phone: Yup.string().required("Work phone is required"),
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
            first_name: "",
            last_name: "",
            reg_number: "",
            specialty: "",
            work_address: "",
            work_phone: "",
            email: "",
            password: "",
            agree: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res: any = await registerPractioner(values);

            if (res?.error) {
                toast({
                    title: "Error",
                    description: res?.error?.data?.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Success",
                    description: "Practioner registered successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-[#383838]'
        >
            <InputField
                LeftIcon={<FaRegUser />}
                onBlur={formik.handleBlur}
                id='first_name'
                type='text'
                label='First Name'
                placeholder='John'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                errorMessage={formik.errors.first_name}
                isError={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                }
            />
            <InputField
                LeftIcon={<FaRegUser />}
                id='last_name'
                onBlur={formik.handleBlur}
                type='text'
                label='Last Name'
                placeholder='Doe'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                errorMessage={formik.errors.last_name}
                isError={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                }
            />
            <InputField
                LeftIcon={<MdOutlineEmail />}
                className='col-span-2'
                id='last_name'
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
            <InputField
                id='reg_number'
                onBlur={formik.handleBlur}
                type='reg_number'
                label='Registration Number'
                placeholder='FE12345678'
                value={formik.values.reg_number}
                onChange={formik.handleChange}
                errorMessage={formik.errors.reg_number}
                isError={
                    formik.touched.reg_number &&
                    Boolean(formik.errors.reg_number)
                }
            />
            <InputField
                id='specialty'
                onBlur={formik.handleBlur}
                type='text'
                label='Specialty'
                placeholder='General Practioner'
                value={formik.values.specialty}
                onChange={formik.handleChange}
                errorMessage={formik.errors.specialty}
                isError={
                    formik.touched.specialty && Boolean(formik.errors.specialty)
                }
            />
            <InputField
                id='work_address'
                className='col-span-2'
                onBlur={formik.handleBlur}
                type='text'
                label='Work address'
                placeholder='19, Helbert Macualay Way, Obafemi Awolowo Road, Abuja'
                value={formik.values.work_address}
                onChange={formik.handleChange}
                errorMessage={formik.errors.work_address}
                isError={
                    formik.touched.work_address &&
                    Boolean(formik.errors.work_address)
                }
            />
            <InputField
                id='work_phone'
                className='col-span-2'
                onBlur={formik.handleBlur}
                type='text'
                label='Work Phone'
                placeholder='+2348123456789'
                value={formik.values.work_phone}
                onChange={formik.handleChange}
                errorMessage={formik.errors.work_phone}
                isError={
                    formik.touched.work_phone &&
                    Boolean(formik.errors.work_phone)
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

export default PractionerForm;
