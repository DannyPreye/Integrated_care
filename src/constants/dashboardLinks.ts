// import Image from 'next/image';
// import categoryImg from "../assets/category.png";
// import settingsImg from "../assets/settings.png";
import faqsImg from "../../public/assets/faqs.png";
import supportImg from "../../public/assets/support.png";
// import logoutImg from "../assets/logout.png";
import { RxDashboard } from "react-icons/rx";
import { CgFileDocument } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

export const patientDashboardLinks = [
    {
        title: "Dashboard",
        link: "/dashboard",
        icon: RxDashboard
    },
    {
        title: "My Records",
        link: "/dashboard/my-records",
        icon: CgFileDocument
    },
    {
        title: "Notifications",
        link: "/dashboard/notifications",
        icon: IoNotificationsOutline
    },
    {
        title: "Settings",
        link: "/dashboard/settings",
        icon: IoSettingsOutline
    },
    {
        title: "FAQs",
        link: "/dashboard/faqs",
        icon: faqsImg,
        isImage: true
    },
    {
        title: "Support",
        link: "/dashboard/support",
        icon: supportImg,
        isImage: true
    }
];


export const practitionerDashboardLinks = [
    {
        title: "Dashboard",
        link: "/dashboard",
        icon: RxDashboard
    },
    {
        title: "Patients",
        link: "/dashboard/patients",
        icon: CgFileDocument
    },
    {
        title: "Notifications",
        link: "/dashboard/notifications",
        icon: IoNotificationsOutline
    },
    {
        title: "Settings",
        link: "/dashboard/settings",
        icon: IoSettingsOutline
    },
    {
        title: "FAQs",
        link: "/dashboard/faqs",
        icon: faqsImg,
        isImage: true
    },
    {
        title: "Support",
        link: "/dashboard/support",
        icon: supportImg,
        isImage: true
    }
];
