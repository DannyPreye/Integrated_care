import React from "react";

const page = () => {
    return (
        <>
            <section
                style={{
                    backgroundImage: "url('/assets/contact-hero.webp')",
                    backgroundSize: "cover",
                }}
                className='w-full h-[360px] flex flex-col gap-4 justify-center items-center text-center contact bg-center font-montserrat text-white'
            >
                <p className='text-[52px] font-bold leading-[56px]'>
                    Contact Us
                </p>
                <p className='text-xl font-medium'>
                    Let&apos;s start a conversation...
                </p>
            </section>
            <section className='w-full bg-[#F5F7FA] flex justify-center items-center gap-20 min-h-[800px] font-montserrat'>
                <section className='w-[294px] p-5 flex flex-col justify-center items-center bg-[#004385] rounded-lg'>
                    <p className='text-[28px] font-semibold text-white'>
                        Opening Hours
                    </p>
                    <p className='w-[145px] text-center text-white text-lg font-medium font-lato'>
                        Mondays - Fridays 24/7
                    </p>
                </section>
                <form className='flex flex-col justify-start items-center gap-10 font-lato w-[544px] bg-white shadow-primary shadow-sm py-10 rounded-lg'>
                    <div className='w-[360px] text-center'>
                        <p className='text-3xl font-montserrat font-semibold'>
                            Drop a message
                        </p>
                        <p className='text-lg mt-3'>
                            Please contact us if you have any question or
                            concerns
                        </p>
                    </div>
                    <section className='w-[464px] flex flex-col justify-start items-center'>
                        <div className='w-full flex flex-col justify-start items-start gap-3 mb-4'>
                            <label
                                htmlFor='fullName'
                                className='text-base font-semibold'
                            >
                                Your Name
                            </label>
                            <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                placeholder='Enter your name'
                                className='w-full border border-[#B4B4B4] rounded-md p-2 text-base placeholder:text-[#999999] outline-none'
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start items-start gap-3 mb-4'>
                            <label
                                htmlFor='email'
                                className='text-base font-semibold'
                            >
                                Your Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Enter your email address'
                                className='w-full border border-[#B4B4B4] rounded-md p-2 text-base placeholder:text-[#999999] outline-none'
                            />
                        </div>
                        <div className='w-full flex flex-col justify-start items-start gap-3 mb-4'>
                            <label
                                htmlFor='message'
                                className='text-base font-semibold'
                            >
                                Your Message
                            </label>
                            <textarea
                                id='email'
                                name='email'
                                placeholder='Write your message here'
                                className='w-full h-[156px] border border-[#B4B4B4] rounded-md p-2 text-base placeholder:text-[#999999] resize-none outline-none'
                            ></textarea>
                        </div>
                        <button
                            type='button'
                            className='bg-primary w-[235px] text-base text-white font-medium rounded-md py-3'
                        >
                            Send Message
                        </button>
                    </section>
                </form>
            </section>
        </>
    );
};

export default page;
