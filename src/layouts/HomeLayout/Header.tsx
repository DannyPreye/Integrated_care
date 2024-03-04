"use client";
import { IPage } from "@/app/types/Ipage";
import { socialLinks } from "@/constants/navsAndLinks.constant";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CgMenu } from "react-icons/cg";

interface Props {
    session: Session | null;
}

const navlinks = [
    {
        name: "Home",
        url: "/",
        icon: "/icons/home.svg",
    },
    {
        name: "About Us",
        url: "#about",
        icon: "/icons/about.svg",
    },
    {
        name: "Our Offer",
        url: "#services",
        icon: "/icons/services.svg",
    },
    {
        name: "Contact Us",
        url: "/contact-us",
        icon: "/icons/team.svg",
    },
];

const Header: React.FC<Props> = ({ session }) => {
    const pathname = usePathname();
    const router = useRouter();

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            <header className='flex flex-col items-start justify-start w-full bg-secondary font-montserrat'>
                <section className='flex items-center justify-between w-full h-10 px-4 text-sm text-white'>
                    <div className='flex items-center justify-start gap-4'>
                        <div className='flex items-center justify-start gap-1 font-medium'>
                            <svg
                                className='w-6 h-6 text-white dark:text-white'
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
                                        fill='#cfcece'
                                    ></path>
                                </g>
                            </svg>
                            <p>integratedcare@gmail.com</p>
                        </div>
                        <div className='hidden lg:flex items-center justify-start gap-2'>
                            <svg
                                className='w-5 h-5 text-gray-800 dark:text-[#cfcece]'
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
                                    d='m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z'
                                />
                            </svg>
                            <p>+234 8113672801</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-3'>
                        {socialLinks.map(({ name, url, icon }) => (
                            <Link href={url} key={name} target='_blank'>
                                <Image
                                    src={icon}
                                    alt={name}
                                    width={16}
                                    height={16}
                                    className='cursor-pointer'
                                />
                            </Link>
                        ))}
                    </div>
                </section>
                <nav className='flex items-center justify-between w-full px-3 py-4 bg-white'>
                    <div>
                        <p className='text-xl  md:text-2xl lg:text-3xl font-semibold leading-10'>
                            Integrated
                            <span className='text-[#00A6FB]'>Care</span>
                        </p>
                    </div>
                    <div className='hidden lg:flex items-center justify-center gap-6 text-base font-medium font-lato'>
                        {navlinks?.map(({ name, url }) => (
                            <Link
                                href={url}
                                key={name}
                                className={`${
                                    pathname === url
                                        ? "text-primary border-b-2 border-b-primary"
                                        : "text-black"
                                }`}
                            >
                                {name}
                            </Link>
                        ))}
                    </div>
                    <div className='lg:hidden'>
                        <IconButton
                            aria-label='menu-button'
                            icon={<CgMenu />}
                            onClick={onOpen}
                            className='lg:hidden'
                        />
                    </div>
                    <div className='hidden lg:flex items-center justify-start gap-3'>
                        {session ? (
                            <button
                                className='flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-primary'
                                onClick={() => router.push(`/dashboard`)}
                            >
                                Dashboard
                            </button>
                        ) : (
                            <>
                                <button
                                    className='flex items-center justify-center gap-2 px-4 py-2 text-sm border rounded-lg text-primary border-primary'
                                    onClick={() => router.push("/auth/sign-in")}
                                >
                                    Login
                                </button>
                                <button
                                    className='flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-primary'
                                    onClick={() =>
                                        router.push("/auth/selection")
                                    }
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <MobileMenu
                session={session}
                pathname={pathname}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default Header;

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    pathname: string;
    session: Session | null;
}
const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    onClose,
    pathname,
    session,
}) => {
    const router = useRouter();
    return (
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    <div>
                        <p className='text-xl  md:text-2xl lg:text-3xl font-semibold leading-10'>
                            Integrated
                            <span className='text-[#00A6FB]'>Care</span>
                        </p>
                    </div>
                    <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody>
                    <div className='flex flex-col  justify-center gap-6 text-base font-medium font-lato'>
                        {navlinks?.map(({ name, url }) => (
                            <Link
                                href={url}
                                key={name}
                                className={`${
                                    pathname === url
                                        ? "text-primary border-b-2 border-b-primary"
                                        : "text-black"
                                }`}
                            >
                                {name}
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-col mt-4 justify-start gap-3'>
                        {session ? (
                            <button
                                className='flex  justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-primary'
                                onClick={() => router.push(`/dashboard`)}
                            >
                                Dashboard
                            </button>
                        ) : (
                            <>
                                <button
                                    className='flex items-center justify-center gap-2 px-4 py-2 text-sm border rounded-lg text-primary border-primary'
                                    onClick={() => router.push("/auth/sign-in")}
                                >
                                    Login
                                </button>
                                <button
                                    className='flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border rounded-lg bg-primary'
                                    onClick={() =>
                                        router.push("/auth/selection")
                                    }
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
