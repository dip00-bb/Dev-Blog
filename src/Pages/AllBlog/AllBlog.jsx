import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaSearch } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import BlogCard from './BlogCard';
import axios from 'axios';
import NotMatch from '../../Component/NotMatch/NotMatch';


const AllBlog = () => {
    const data = useLoaderData();

    const [category, setCategory] = useState('All');
    const [blogData, setBlogData] = useState([]);
    const [notMatch, setNotMatch] = useState(false);
    const [searchPattern, setPattern] = useState('')

    useEffect(() => {
        if (category === 'All') {
            setBlogData(data)
        } else {
            const filteredByCat = data.filter(blog => blog.category === category);
            setBlogData(filteredByCat)
        }
    }, [category, data])


    const handleSearchBlog = async (e) => {
        e.preventDefault();
        const pattern = e.target.value;
        setPattern(pattern)
        if (pattern.length === 0) {
            setNotMatch(false)
            setBlogData(data);
            return
        }
        const response = await axios.get(`http://localhost:3000/search/${pattern}`);
        const resData = response.data;
        if (resData.length === 0) {
            setNotMatch(true)
            // console.log("not mach")
        } else {
            setNotMatch(false)
            setBlogData(resData)
        }


    }


    return (
        <div className='max-w-11/12 mx-auto '>

            <div className='flex justify-center items-center py-4'>
                <div>
                    <div className="dropdown dropdown-right">
                        <div tabIndex={0} role="button" className="btn m-1">Filter <FaArrowDown /></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li onClick={() => setCategory('Js framework')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Js Framework</li>
                            <li onClick={() => setCategory('Styling')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Styling</li>
                            <li onClick={() => setCategory('Js Core Concepts')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Js core concepts</li>
                            <li onClick={() => setCategory('Web Development')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Web Development</li>
                            <li onClick={() => setCategory('Backend Framework')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Backend Framework</li>
                            <li onClick={() => setCategory('Artificial Inelegant')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Artificial Inelegant</li>
                            <li onClick={() => setCategory('All')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>All</li>
                        </ul>
                    </div>
                </div>

                <div className='py-1.5 border px-2 flex items-center '>
                    <input onChange={handleSearchBlog} type="text" className='border-amber-400 outline-0' placeholder='search' />

                    <FaSearch size={15} className='cursor-pointer' />

                </div>
            </div>
            {
                notMatch && <NotMatch pattern={searchPattern} />
            }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    blogData.map(blog => <BlogCard blog={blog} />)
                }
            </div>
        </div>
    );
};

export default AllBlog;