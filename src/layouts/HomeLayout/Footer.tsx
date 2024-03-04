import { socialLinks } from "@/constants/navsAndLinks.constant";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className='flex flex-col items-center lg:items-start justify-start w-full gap-10 px-4 lg:px-12 pb-8 text-white bg-secondary pt-8 lg:pt-28 font-poppins'>
            <p className='text-xl lg:text-2xl lg:text-left text-center font-bold'>
                Integrated<span className='text-primary'>Care</span>{" "}
                <span className=' lg:text-lg font-medium lg:leading-7 font-lato'>
                    provides a centralized repository for all patient
                    information.
                </span>
            </p>
            <section className='flex flex-col lg:flex-row  justify-start items-start gap-6 lg:gap-[190px] font-lato border-b border-b-black pb-12'>
                <div className='flex flex-col items-start justify-start gap-4'>
                    <p className='text-xl lg:text-2xl font-semibold'>Company</p>
                    <p className='text-base lg:text-lg font-medium'>About us</p>
                    <p className='text-base lg:text-lg font-medium'>
                        Our Services
                    </p>
                    <p className='text-base lg:text-lg font-medium'>FAQs</p>
                </div>
                <div className='flex flex-col items-start justify-start gap-4'>
                    <p className='text-xl lg:text-2xl font-semibold'>
                        Products
                    </p>
                    <p className='text-base lg:text-lg font-medium'>Features</p>
                    <p className='text-base lg:text-lg font-medium'>
                        Mobile App
                    </p>
                </div>
                <div className='flex flex-col items-start justify-start gap-4'>
                    <p className='text-xl lg:text-2xl font-semibold'>Legal</p>
                    <p className='text-base lg:text-lg font-medium'>Legal</p>
                    <p className='text-base lg:text-lg font-medium'>
                        Terms of service
                    </p>
                </div>
                <div className='w-[320px] flex flex-col justify-start items-center gap-6'>
                    <p>
                        Be the first to know about our new update. Get a mail in
                        your inbox.
                    </p>
                    <div className='relative w-full text-left'>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='johndoe@gmail.com'
                            className='w-full pr-3 pl-8 py-2 text-base bg-white text-black border focus:border-[#383838] rounded-md outline-none'
                        />
                        <svg
                            className='w-6 h-6 dark:text-[#383838] text-white absolute bottom-2 left-1'
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
                    </div>
                    <button
                        type='button'
                        className='w-full py-2 text-white rounded-lg bg-primary'
                    >
                        Submit
                    </button>
                </div>
            </section>
            <section className='flex lg:flex-row flex-col items-center justify-center w-full gap-7'>
                <p className='text-base font-semibold capitalize font-lato'>
                    IntegratedCare 2024 all right reserved
                </p>
                <div className='flex lg:flex-row flex-col items-center justify-start gap-8'>
                    {socialLinks.map(({ name, icon, url }) => (
                        <Link key={`footer-${name}`} target='_blank' href={url}>
                            {name}
                        </Link>
                    ))}
                    {/* <a href='https://www.facebook.com' target='_blank'>
                            <img
                                src={facebook}
                                alt='facebook'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                            />
                        </a>
                        <a href='https://www.twitter.com' target='_blank'>
                            <img
                                src={twitter}
                                alt='twitter'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                            />
                        </a>
                        <a href='https://www.youtube.com' target='_blank'>
                            <img
                                src={youtube}
                                alt='youtube'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                            />
                        </a>
                        <a href='https://www.linkedin.com' target='_blank'>
                            <img
                                src={linkedin}
                                alt='linkedin'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                            />
                        </a>
                        <a href='https://www.instagram.com' target='_blank'>
                            <img
                                src={instagram}
                                alt='instagram'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                            />
                        </a> */}
                </div>
            </section>
        </footer>
    );
};

export default Footer;
