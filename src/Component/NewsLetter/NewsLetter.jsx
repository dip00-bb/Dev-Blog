import Lottie from 'lottie-react';

import HoverButton from '../HoverButton/HoverButton';

import { toast } from 'react-toastify';


const NewsLetter = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        toast('Thanks for subscribing our newsletter')
    }


    return (
        <div className='px-8'>
            <div className=' flex flex-col-reverse md:flex-row justify-center md:justify-between items-center flex-wrap md:flex-nowrap overflow-hidden'>
                <div className='flex flex-col gap-8'>

                    <div>
                        <p className='text-3xl md:text-6xl font-semibold my-9 text-blue-500'>Subscribe for latest update</p>
                        <form onSubmit={handleSubmit} className='space-y-2.5'>
                            <div className=''>
                                <input
                                    type="email"
                                    placeholder="mail@site.com"
                                    required
                                    className="w-[90%] max-w-md p-3 border focus:outline-none  shadow-sm mr-4"
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-black bg-blue-400 font-semibold py-3.5 px-6 duration-150 ease-in-out cursor-pointer hover:rounded-br-xl hover:rounded-tl-xl transition-all delay-200"
                            >
                                Subscribe
                            </button>

                        </form>
                    </div>
                </div>
                <div data-aos="fade-up">
                    <img className='h-96' src="./nl.png" alt="men" />
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;