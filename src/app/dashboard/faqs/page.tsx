"use client";
import { faqs } from "@/constants/faqs";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
    const router = useRouter();
    return (
        <div className='flex flex-col gap-5 items-center'>
            <h1 className='font-montserrat font-[700] text-xl lg:text-3xl text-center text-[#064974]'>
                Frequently Asked Questions
            </h1>

            <div className='mt-5 max-w-[80%] w-full'>
                <Accordion allowToggle>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={`faq_${index}`}>
                            <AccordionButton>
                                <Box
                                    as='span'
                                    flex='1'
                                    className=' lg:text-xl'
                                    textAlign='left'
                                >
                                    {faq.question}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel className=' lg:text-xl'>
                                {faq?.ans}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className='flex flex-col items-center gap-[13px]  font-montserrat  text-center'>
                <div>
                    <h3 className='text-xl lg:text-3xl font-[500] '>
                        Didn&apos;t find an answer?
                    </h3>
                    <p className=' lg:text-xl '>
                        Our team is just an email away and ready to answer your
                        questions
                    </p>
                </div>
                <Button
                    className='max-w-[161px] w-full h-[32px]'
                    colorScheme='blue'
                    onClick={() => router.push("/dashboard/support")}
                >
                    Support
                </Button>
            </div>
        </div>
    );
};

export default Page;
