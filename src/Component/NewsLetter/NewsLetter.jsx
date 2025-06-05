import Lottie from 'lottie-react';

import HoverButton from '../HoverButton/HoverButton';

import lottiranime from '../../assets/newsletter.json'
import Swal from 'sweetalert2';
import toast from 'daisyui/components/toast';

const NewsLetter = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        toast('Thanks for subscribing our newsletter')
    }


    return (
        <div className='flex justify-around items-center flex-wrap md:flex-nowrap'>
            <div className='flex flex-col gap-8'>
                <p className='text-6xl'>Subscribe for latest update</p>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="mail@site.com"
                            required
                            className="w-full max-w-md p-3 border focus:outline-none  shadow-sm mr-4"
                        />
                        <button
                            type="submit"
                            className="text-black bg-blue-400 font-semibold py-3.5 px-6 transition duration-300 ease-in-out cursor-pointer"
                        >
                            Subscribe
                        </button>

                    </form>
                </div>
            </div>
            <div>
                <Lottie animationData={lottiranime} style={{ width: '400' }} loop={true} />
            </div>
        </div>
    );
};

export default NewsLetter;