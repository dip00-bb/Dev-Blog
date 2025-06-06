import React from 'react';
import { Link } from 'react-router';

const SingleBlog = ({ blog }) => {

    const { category, title, short_description, image } = blog
    return (
        <div>
            <div className="flex max-w-[90rem] mx-auto p-4 items-center justify-between space-x-4 bg-white rounded-lg shadow-sm">

                <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">{category}</p>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500 mt-1 mb-2">{short_description}</p>
                    <div className='flex flex-wrap gap-3'>
                        <Link to='/' class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-blue-200 group">
                            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-300 group-hover:bg-indigo-500 group-hover:h-full"></span>
                            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">View Details</span>
                        </Link>

                        <Link to='/' class="inline-flex overflow-hidden text-white bg-cyan-800 rounded group ">
                            <span class="pl-6 pr-5 py-2.5">Add to Wishlist</span>
                        </Link>
                    </div>
                </div>


                <div className="w-64 h-40 flex-1 md:flex-none flex-shrink-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

            </div>

        </div>
    );
};

export default SingleBlog;