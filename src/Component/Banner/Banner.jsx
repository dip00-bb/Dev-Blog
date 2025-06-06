import React from 'react';
import HoverButton from '../HoverButton/HoverButton';

const Banner = () => {
    return (
        <div style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} className='max-w-11/12 mx-auto md:h-[80vh] flex flex-col-reverse lg:flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8' >

            <div className='flex-1 flex justify-center items-start flex-col gap-10'>
                <p className='text-3xl md:text-6xl font-semibold'>Best Front-end Development Blogs You Should Follow</p>
                <div>
                    <HoverButton/>
                </div>
            </div>
            <div className='md:flex-1 flex justify-center items-center md:h-[70vh]'>
                <img className='h-full w-full' src="./banner.png" alt="banner" />
            </div>
        </div>
    );
};

export default Banner;