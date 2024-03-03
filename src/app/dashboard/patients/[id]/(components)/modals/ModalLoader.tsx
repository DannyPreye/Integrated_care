import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

interface Props {
    title: string;
    description: string;
}
const ModalLoader: React.FC<Props> = ({ title, description }) => {
    return (
        <div className='flex flex-col gap-4 items-center py-8'>
            <h2 className='font-montserrat text-[24px] leading-[32px] font-[600] text-center'>
                {title}
            </h2>
            <p className='font-montserrat text-[16px] leading-[24px] font-[400] text-center'>
                {description}
            </p>
            <FadeLoader color='#00A6FB' />
        </div>
    );
};

export default ModalLoader;
