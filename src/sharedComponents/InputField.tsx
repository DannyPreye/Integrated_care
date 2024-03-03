"use client";
import {
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

interface Props {
    id: string;
    label: string;
    className?: string;
    labelClassName?: string;
    isError?: boolean;
    errorMessage?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    value: string;
    inputClassName?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    max?: any;
    min?: any;
    LeftIcon?: React.ReactNode;
    RightIcon?: React.ReactNode;
}

const InputField: React.FC<Props> = ({
    id,
    label,
    className,
    labelClassName,
    isError,
    errorMessage,
    type,
    placeholder,
    value,
    inputClassName,
    onChange,
    onBlur,
    max,
    min,
    LeftIcon,
    RightIcon,
}) => {
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(!show);
    return (
        <div className={`relative w-full text-left ${className}`}>
            <label
                htmlFor={id}
                className={`text-base font-semibold leading-6 ${labelClassName}`}
            >
                {label}
            </label>
            <InputGroup className='focus:border-[#383838]'>
                {LeftIcon && (
                    <InputLeftElement pointerEvents='none'>
                        {LeftIcon}
                    </InputLeftElement>
                )}

                {type === "password" ? (
                    <>
                        <Input
                            focusBorderColor='#383838'
                            onChange={onChange}
                            onBlur={onBlur}
                            className={
                                "w-full pr-3 pl-8 py-2 text-base bg-transparent border  rounded-md outline-none " +
                                inputClassName
                            }
                            id={id}
                            type={show ? "text" : "password"}
                            isInvalid={isError}
                            placeholder={placeholder}
                            variant={"outline"}
                            value={value}
                            errorBorderColor='red.600'
                        />
                        <InputRightElement>
                            <IconButton
                                background={"transparent"}
                                onClick={handleShow}
                                className='bg-transparent'
                                aria-label='icon'
                                icon={show ? <FaRegEyeSlash /> : <FaRegEye />}
                            />
                        </InputRightElement>
                    </>
                ) : (
                    <Input
                        id={id}
                        focusBorderColor='#383838'
                        type={type}
                        isInvalid={isError}
                        placeholder={placeholder}
                        value={value}
                        errorBorderColor='red.600'
                        onChange={onChange}
                        onBlur={onBlur}
                        className={
                            "w-full pr-3  py-2 text-base bg-transparent border focus:border-[#383838] rounded-md outline-none  " +
                            inputClassName
                        }
                        max={max}
                        min={min}
                    />
                )}
                {RightIcon && type !== "password" && (
                    <InputRightElement pointerEvents='none'>
                        {RightIcon}
                    </InputRightElement>
                )}
            </InputGroup>
            {isError && errorMessage && (
                <small className=' -mt-5 text-base text-left text-red-800 font-lato'>
                    {errorMessage}
                </small>
            )}
        </div>
    );
};

export default InputField;
