
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';








const OurExpert = () => {
    return (
        <div initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }} whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }} className='flex gap-5 max-w-11/12 mx-auto flex-wrap lg:flex-nowrap my-10 justify-center'>
            <div className='w-2xl mx-auto lg:mx-0'>
                <p className='md:text-3xl font-bold text-blue-500'>Learn From Our Expert</p>
                <p className='text-sm md:text-lg'>Dive into the world of web development with guidance from seasoned industry professionals. Whether you're just starting out or looking to sharpen your skills, our expert-led training helps you master the core technologies—HTML, CSS, JavaScript, and beyond. From building responsive websites to creating dynamic web applications, you'll gain hands-on experience, real-world knowledge, and insider tips that only professionals can offer. Learn the tools, best practices, and frameworks used in the industry today—and get one step closer to becoming a confident, job-ready developer.</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div>
                    <div className='mb-2'>

                        <PhotoProvider>
                            <PhotoView src="https://i.ibb.co/QvV2n2Hq/young-office-worker-typing-laptop-computer-she-working-office-249974-9191.jpg">
                                <img className='rounded-xl' src="https://i.ibb.co/QvV2n2Hq/young-office-worker-typing-laptop-computer-she-working-office-249974-9191.jpg" alt="girl dev" />
                            </PhotoView>
                        </PhotoProvider>

                    </div>
                    <div className='flex items-center justify-around '>
                        <p className='font-bold'>Sarah B. Johnson</p>
                        <div className='flex gap-3'>
                            <FaFacebook></FaFacebook>
                            <FaInstagram></FaInstagram>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mb-2'>
                        <PhotoProvider>
                            <PhotoView src="https://i.ibb.co/gBQZj6d/istockphoto-1017296544-612x612.jpg">
                                <img className='rounded-xl' src="https://i.ibb.co/gBQZj6d/istockphoto-1017296544-612x612.jpg" alt="men dev" />
                            </PhotoView>
                        </PhotoProvider>

                    </div>
                    <div className='flex items-center justify-around '>
                        <p className='font-bold'>Mc Stanhum</p>
                        <div className='flex gap-3'>
                            <FaFacebook></FaFacebook>
                            <FaInstagram></FaInstagram>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mb-2'>
                        <PhotoProvider>
                            <PhotoView src="https://i.ibb.co/HD6Zb41T/istockphoto-1171173195-612x612.jpg">
                                <img className='rounded-xl' src="https://i.ibb.co/HD6Zb41T/istockphoto-1171173195-612x612.jpg" alt="men dev" />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <div className='flex items-center justify-around '>
                        <p className='font-bold'>Amela Nicola</p>
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