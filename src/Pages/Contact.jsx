import React, { use } from 'react';

import contactImg from '../assets/contact.png'
import Swal from 'sweetalert2';
import { ThemeContext } from '../ThemeContext/DarkLight';

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Drag me!",
            icon: "success",
            text: 'Thanks for contact',
            draggable: true
        })
    }
    const { textClass } = use(ThemeContext)

    return (
        <div className="w-full  py-20 px-6 md:px-16 lg:px-32">
            <div className=" mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
                {/* Left Side - Contact Form */}
                <div className="flex-1 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 text-center lg:text-left">
                        Contact Us
                    </h2>
                    <p className={`${textClass} text-lg mb-8 leading-relaxed text-center lg:text-left`}>
                        Have a question, suggestion, or collaboration idea? Fill out the form and we'll get back to you shortly!
                    </p>

                    <form onSubmit={handleSubmit} className={`${textClass} space-y-6`}>
                        <div>
                            <label className="block font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                id="name"
                                placeholder="Your name"
                                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block  font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                required
                                id="message"
                                placeholder="Write your message here..."
                                rows="5"
                                className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-black font-semibold px-6 py-3 rounded-md transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Right Side - Illustration */}
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={contactImg}
                        alt="Contact Illustration"
                        className="w-full max-w-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
