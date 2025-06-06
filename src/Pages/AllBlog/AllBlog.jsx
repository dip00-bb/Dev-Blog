import React from 'react';
import { FaArrowDown, FaSearch } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import BlogCard from './BlogCard';

const AllBlog = () => {

    const blogData = useLoaderData();

    return (
        <div className='max-w-11/12 mx-auto '>

            <div className='flex justify-center items-center py-4'>
                <div>
                    <div className="dropdown dropdown-right">
                        <div tabIndex={0} role="button" className="btn m-1">Filter <FaArrowDown/></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>Item 1</li>
                            <li>tem 2</li>
                        </ul>
                    </div>
                </div>

                <div className='py-1.5 border px-2 flex items-center '>
                    <input type="text" className='border-amber-400 outline-0' placeholder='search'  />
                    <FaSearch onClick={()=>console.log("clicked")} size={15}/>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    blogData.map(blog => <BlogCard blog={blog} />)
                }
            </div>
        </div>
    );
};

export default AllBlog;