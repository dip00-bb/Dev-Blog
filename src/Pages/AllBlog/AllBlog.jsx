import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import BlogCard from './BlogCard';

const AllBlog = () => {

    const blogData=useLoaderData();

    return (
        <div className='max-w-11/12'>
            <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn m-1">Filter by <FaArrowDown size={15} /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div>

            </div> 

            <div>
                {
                    blogData.map(blog=> <BlogCard blog={blog}/>)
                }
            </div>
        </div>
    );
};

export default AllBlog;