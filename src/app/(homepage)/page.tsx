import Image from "next/image";
import React from "react";

const page: React.FC = () => {
    return (
        <>
            <section
                style={{
                    backgroundImage: `url('/assets/doctors.webp')`,
                    backgroundSize: "cover",
                }}
                className='w-full min-h-[80vh] flex flex-col justify-center items-center text-center doctors bg-bottom bg-cover text-white font-montserrat'
            >
                <p
                    data-aos='fade-up'
                    data-aos-duration='1000'
                    className='text-xl md:text-2xl lg:text-[44px] font-bold mb-4'
                >
                    Integrated Patient Data for Improved{" "}
                    <span className='text-primary'>Healthcare</span>
                </p>
                <p
                    data-aos='fade-up'
                    data-aos-delay='2000'
                    className=' text-base lg:text-[28px] font-medium mb-11'
                >
                    Accessible anywhere, anytime
                </p>
                <button
                    data-aos='fade-up'
                    data-aos-delay='3000'
                    className='px-4 py-2 lg:px-8 lg:py-4 text-base font-semibold rounded-lg bg-primary w-fit'
                >
                    Get Started
                </button>
            </section>
            <section
                className='px-4 py-12 bg-[#F5F7FA] font-montserrat flex flex-col justify-center items-center'
                id='offer'
            >
                <p className='mb-3 text-base lg:text-lg font-semibold text-primary'>
                    What We Offer
                </p>
                <p className='text-xl md:text-2xl lg:text-[40px] font-semibold text-black mb-20'>
                    Improved Quality of Healthcare
                </p>
                <div className='flex flex-wrap items-center justify-center gap-8'>
                    <aside className='grid px-5 py-8 text-center bg-white rounded-lg place-items-center'>
                        <div className='w-[77px] relative h-[77px] bg-primary rounded-full flex justify-center items-center'>
                            <Image
                                fill
                                className='object-cover'
                                src={"/assets/no-access.webp"}
                                alt='no-access'
                            />
                        </div>
                        <p className='my-2 text-xl lg:text-2xl font-semibold text-black'>
                            Streamlined Access
                        </p>
                        <p className='lg:w-[266px] text-sm font-medium text-center leading-6'>
                            Instant access to comprehensive patient information
                            for healthcare professionals.
                        </p>
                    </aside>
                    <aside className='grid px-5 py-8 text-center bg-white rounded-lg place-items-center'>
                        <div className='w-[77px] relative h-[77px] bg-primary rounded-full flex justify-center items-center'>
                            <Image
                                src={"/assets/connection.webp"}
                                alt='connection'
                                fill
                                className='object-cover'
                            />
                        </div>
                        <p className='my-2 text-xl lg:text-2xl font-semibold text-black'>
                            Connected Care
                        </p>
                        <p className='lg:w-[266px] text-sm font-medium text-center leading-6'>
                            Bridging the gaps between hospitals to ensure a
                            unified and collaborative approach.
                        </p>
                    </aside>
                    <aside className='grid px-5 py-8 text-center bg-white rounded-lg place-items-center'>
                        <div className='w-[77px] h-[77px] bg-primary rounded-full flex justify-center items-center'>
                            <img src={"/assets/patient.webp"} alt='patient' />
                        </div>
                        <p className='my-2 text-xl lg:text-2xl font-semibold text-black'>
                            Patient-Centric Focus
                        </p>
                        <p className='lg:w-[266px] text-sm font-medium text-center leading-6'>
                            Putting patients at the forefront by enabling
                            better-informed and personalized care.
                        </p>
                    </aside>
                    <aside className='grid px-5 py-8 text-center bg-white rounded-lg place-items-center'>
                        <div className='w-[77px] h-[77px] bg-primary rounded-full flex justify-center items-center'>
                            <img src={"/assets/decision.webp"} alt='decision' />
                        </div>
                        <p className='my-2 text-xl lg:text-2xl font-semibold text-black'>
                            Informed Decision-Making
                        </p>
                        <p className='lg:w-[266px] text-sm font-medium text-center leading-6'>
                            Empowering doctors with the data they need for
                            precise and timely decisions.
                        </p>
                    </aside>
                    <aside className='grid px-5 py-8 text-center bg-white rounded-lg place-items-center'>
                        <div className='w-[77px] h-[77px] bg-primary rounded-full flex justify-center items-center'>
                            <img
                                src={"/assets/efficiency.webp"}
                                alt='efficiency'
                            />
                        </div>
                        <p className='my-2 text-xl lg:text-2xl font-semibold text-black'>
                            Enhanced Efficiency
                        </p>
                        <p className=' lg:w-[266px] text-sm font-medium text-center leading-6'>
                            Streamlining processes for improved healthcare
                            delivery.
                        </p>
                    </aside>
                </div>
            </section>
            <section
                className='font-montserrat p-4  lg:p-0 w-full lg:h-[404px] flex lg:flex-nowrap flex-wrap justify-center items-center divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black gap-3'
                id='about-us'
            >
                <div className='text-center lg:text-end  lg:w-[553px]'>
                    <p
                        id='about'
                        className='text-lg font-semibold capitalize text-primary'
                    >
                        About Us
                    </p>
                    <p className='text-xl md:text-2xl lg:text-[40px] font-semibold text-black leading-10'>
                        Revolutionized Healthcare Through Centralized Data
                    </p>
                </div>
                <p className='lg:w-[510px] lg:py-0 py-3 px-2 text-justify'>
                    We&apos;re dedicated to transforming patient care by
                    providing a centralized hub for comprehensive medical data.
                    With us, healthcare professionals can access crucial
                    information seamlessly, ensuring better-informed decisions
                    and ultimately improving patient outcomes.
                </p>
            </section>
            <section className='flex flex-col items-start justify-start w-full gap-10 px-4 lg:px-12 pb-8 text-white bg-secondary pt-4 lg:pt-28 font-poppins'>
                <p className='text-xl md:text-2xl lg:text-[40px] font-semibold'>
                    How To Register
                </p>
                <section className='flex-col flex lg:grid grid-cols-3 gap-5 lg:gap-[150px]'>
                    <div className='flex items-center justify-start gap-2 lg:gap-1'>
                        <p className='px-4 py-1 text-lg font-semibold text-black bg-white rounded-full'>
                            1
                        </p>
                        <div>
                            <p className='text-xl lg:text-2xl font-semibold leading-8'>
                                Create an account
                            </p>
                            <p className='lg:w-[281px] text-sm md:text-base font-medium leading-6'>
                                Sign up with your name, number, email and
                                password
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 lg:gap-1'>
                        <p className='px-4 py-1 text-lg font-semibold text-black bg-white rounded-full'>
                            2
                        </p>
                        <div>
                            <p className='text-xl lg:text-2xl font-semibold leading-8'>
                                Upload Record
                            </p>
                            <p className='lg:w-[281px] text-sm md:text-base font-medium leading-6'>
                                Sign up with your name, number, email and
                                password
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 lg:gap-1'>
                        <p className='px-4 py-1 text-lg font-semibold text-black bg-white rounded-full'>
                            3
                        </p>
                        <div>
                            <p className='text-xl lg:text-2xl font-semibold leading-8'>
                                Upload Record
                            </p>
                            <p className='lg:w-[281px] text-sm md:text-base font-medium leading-6'>
                                Access Records
                            </p>
                        </div>
                    </div>
                </section>
            </section>
            <section className='w-full lg:h-[360px] bg-white relative p-4  lg:p-0'>
                <aside className='lg:w-[882px] w-full lg:h-[281px] flex flex-col justify-center items-center gap-3 bg-white border-t-4 border-t-black font-montserrat text-center rounded-b-lg shadow-md lg:absolute pb-4 lg:pb-0 lg:-bottom-20 lg:left-[50%] lg:-translate-x-[50%]'>
                    <p className='text-xl md:text-2xl lg:text-3xl font-semibold leading-10'>
                        Get Started Today
                    </p>
                    <p className='lg:w-[715px] px-3  md:text-base font-medium leading-6 text-black/65'>
                        Embark on Your Health Journey Today! Get started with
                        our healthcare platform for seamless access to
                        centralized patient data and personalized care.
                    </p>
                    <button className='lg:px-10 px-4 py-3 mt-3 text-base font-semibold text-white rounded-lg bg-primary'>
                        Get Started
                    </button>
                </aside>
            </section>
        </>
    );
};

export default page;
