
import React, { use } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { ThemeContext } from '../../ThemeContext/DarkLight';








const OurExpert = () => {
    const {textClass}=use(ThemeContext)
    return (
        <div initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }} whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }} className='flex gap-5 px-8 flex-wrap lg:flex-nowrap my-10 justify-center'>
            <div className='w-2xl mx-auto lg:mx-0'>
                <p className='text-3xl md:text-6xl font-bold text-blue-500 mb-2'>Learn From Our Expert</p>
                <p className={`text-sm md:text-lg ${textClass}`}>Dive into web development with expert-led training that covers HTML, CSS, JavaScript, and modern frameworks. Gain hands-on experience building responsive websites and dynamic applications, while learning industry best practices and insider tips. Equip yourself with the skills and confidence needed to become a job-ready developer.</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div data-aos="zoom-in-right" >
                    <div className='mb-2'>

                        <PhotoProvider>
                            <PhotoView src="https://i.ibb.co/QvV2n2Hq/young-office-worker-typing-laptop-computer-she-working-office-249974-9191.jpg">
                                <img className='rounded-xl' src="https://i.ibb.co/QvV2n2Hq/young-office-worker-typing-laptop-computer-she-working-office-249974-9191.jpg" alt="girl dev" />
                            </PhotoView>
                        </PhotoProvider>

                    </div>
                    <div className='flex items-center justify-around '>
                        <p className={`font-bold ${textClass}`}>Sarah B. Johnson</p>
                        <div className='flex gap-3'>
                            <FaFacebook></FaFacebook>
                            <FaInstagram></FaInstagram>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in-right">
                    <div className='mb-2'>
                        <PhotoProvider>
                            <PhotoView src="https://i.ibb.co/gBQZj6d/istockphoto-1017296544-612x612.jpg">
                                <img className='rounded-xl' src="https://i.ibb.co/gBQZj6d/istockphoto-1017296544-612x612.jpg" alt="men dev" />
                            </PhotoView>
                        </PhotoProvider>

                    </div>
                    <div className='flex items-center justify-around '>
                        <p className={`font-bold ${textClass}`}>Mc Stanhum</p>
                        <div className='flex gap-3'>
                            <FaFacebook></FaFacebook>
                            <FaInstagram></FaInstagram>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in-right" >
                    <div className='mb-2'>
                        <PhotoProvider>
                            <PhotoView src="https://i.ibb.co/HD6Zb41T/istockphoto-1171173195-612x612.jpg">
                                <img className='rounded-xl' src="https://i.ibb.co/HD6Zb41T/istockphoto-1171173195-612x612.jpg" alt="men dev" />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <div className='flex items-center justify-around '>
                        <p className={`font-bold ${textClass}`}>Amela Nicola</p>
                        <div className='flex gap-3'>
                            <FaFacebook></FaFacebook>
                            <FaInstagram></FaInstagram>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurExpert;