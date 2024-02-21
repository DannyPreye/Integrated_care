"use client";
import AuthLayout from "@/layouts/Auth.layout";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/sharedComponents/InputField";

import Link from "next/link";
import { Button } from "@chakra-ui/react";

const Page: React.FC = () => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
    const [userType, setUserType] = React.useState("patient");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <AuthLayout
            Switch={
                <section className='w-[200px] h-[35px] bg-white mx-auto mt-1 rounded-full shadow-inner shadow-primary/20 flex justify-between items-center overflow-hidden'>
                    <button
                        className={`px-3 py-4 text-lato font-semibold outline-none transition-all duration-300 ${
                            userType === "patient"
                                ? "bg-primary text-white"
                                : "bg-transparent text-black"
                        }`}
                        onClick={() => setUserType("patient")}
                    >
                        Patient
                    </button>
                    <button
                        className={`px-3 py-4 text-lato font-semibold outline-none transition-all duration-300 ${
                            userType === "practitioner"
                                ? "bg-primary text-white"
                                : "bg-transparent text-black"
                        }`}
                        onClick={() => setUserType("practitioner")}
                    >
                        Practitioner
                    </button>
                </section>
            }
        >
            <form
                className='w-full flex flex-col justify-center items-center gap-7 text-[#383838]'
                onSubmit={formik.handleSubmit}
            >
                <InputField
                    LeftIcon={
                        <svg
                            className='w-6 h-6 dark:text-[#383838] text-white '
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                            <g
                                id='SVGRepo_tracerCarrier'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            ></g>
                            <g id='SVGRepo_iconCarrier'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z'
                                    fill='#080341'
                                ></path>
                            </g>
                        </svg>
                    }
                    label='Email'
                    id='email'
                    type='email'
                    placeholder='johndoe@gmail.com'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={formik.errors.email}
                    isError={
                        formik.touched.email && Boolean(formik.errors.email)
                    }
                />
                <InputField
                    LeftIcon={
                        <svg
                            className='w-6 h-6 dark:text-[#383838] text-white '
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z'
                            />
                        </svg>
                    }
                    label='Password'
                    id='password'
                    type='password'
                    placeholder='*******'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.password}
                    isError={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                />
                <div className='flex items-center justify-between w-full gap-3 -mt-5'>
                    <div className='flex items-center justify-start gap-2'>
                        <input
                            type='checkbox'
                            id='remember'
                            className='w-4 h-4 bg-white outline-none accent-primary'
                            checked={formik.values.remember}
                            onChange={(e) =>
                                formik.setFieldValue(
                                    "remember",
                                    e.target.checked
                                )
                            }
                        />
                        <label
                            htmlFor='remember'
                            className='text-base font-normal text-[#6A6A6A]'
                        >
                            Keep me signed in
                        </label>
                    </div>
                    <Link
                        className='text-base text-primary'
                        href={"/auth/forgot-password"}
                    >
                        Forgot Password?
                    </Link>
                </div>
                <Button
                    isLoading={formik.isSubmitting}
                    type='submit'
                    className='w-full py-3 text-base text-white rounded-lg bg-primary'
                >
                    Sign In
                </Button>
                <p className='-mt-3 text-base text-[#515151] font-normal text-center'>
                    Don&apos;t have an account?{" "}
                    <Link className='text-primary' href={"/auth/selection"}>
                        Sign up.
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Page;
