


import React, { use, useEffect, useState } from 'react';
import { FaArrowDown, FaSearch } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import BlogCard from './BlogCard';
import axios from 'axios';
import NotMatch from '../../Component/NotMatch/NotMatch';
import { ThemeContext } from '../../ThemeContext/DarkLight';

const AllBlog = () => {


    const data = useLoaderData();

    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('');
    const [blogData, setBlogData] = useState([]);
    const [notMatch, setNotMatch] = useState(false);
    const [searchPattern, setPattern] = useState('');

    const {textClass,mode}=use(ThemeContext)

    useEffect(() => {
        let updatedData = [...data];

        if (category !== 'All') {
            updatedData = updatedData.filter(blog => blog.category === category);
        }

        if (sortOrder === 'az') {
            updatedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'za') {
            updatedData.sort((a, b) => b.title.localeCompare(a.title));
        }

        setBlogData(updatedData);
    }, [category, sortOrder, data]);

    const handleSearchBlog = async (e) => {
        e.preventDefault();
        const pattern = e.target.value;
        setPattern(pattern);
        if (pattern.length === 0) {
            setNotMatch(false);
            let resetData = [...data];
            if (category !== 'All') {
                resetData = resetData.filter(blog => blog.category === category);
            }
            if (sortOrder === 'az') {
                resetData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'za') {
                resetData.sort((a, b) => b.title.localeCompare(a.title));
            }
            setBlogData(resetData);
            return;
        }

        const response = await axios.get(`https://blog-server-three-inky.vercel.app/search/${pattern}`);
        const resData = response.data;
        if (resData.length === 0) {
            setNotMatch(true);
        } else {
            setNotMatch(false);
            if (sortOrder === 'az') {
                resData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'za') {
                resData.sort((a, b) => b.title.localeCompare(a.title));
            }
            setBlogData(resData);
        }
    };

    return (
        <div className='min-h-screen max-w-11/12 mx-auto mt-10 mb-10'>
            <div className='flex justify-between flex-row-reverse my-5 flex-wrap'>

                {/* Filter Dropdown */}

                {/* Search Input */}
                <div className={`py-1.5 border-1 px-2 flex items-center justify-between flex-1 rounded-sm ${mode==="dark"?"border-white":"border-black"}`}>
                    <input
                        onChange={handleSearchBlog}
                        type="text"
                        className={`outline-0  w-[90%] ${textClass} `}
                        placeholder='search'
                    />
                    <FaSearch fill={`${mode==="light"?"black":"white"}`} size={15} className='cursor-pointer' />
                </div>


                <div className='flex justify-between lg:gap-8 w-full md:flex-1/4'>
                    <div className="dropdown dropdown-right">
                        <div tabIndex={0} role="button" className="btn m-1">Filter <FaArrowDown /></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li onClick={() => setCategory('Js framework')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Js framework</li>
                            <li onClick={() => setCategory('Styling')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Styling</li>
                            <li onClick={() => setCategory('Js core concepts')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Js core concepts</li>
                            <li onClick={() => setCategory('Web development')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Web development</li>
                            <li onClick={() => setCategory('Backend framework')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Backend framework</li>
                            <li onClick={() => setCategory('Artificial intelligence')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>Artificial intelligence</li>
                            <li onClick={() => setCategory('All')} className='cursor-pointer py-2.5 border-gray-300 hover:bg-blue-300 rounded-sm px-2.5'>All</li>
                        </ul>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="dropdown lg:dropdown-left dropdown-left lg:w-full">
                        <div tabIndex={0} role="button" className="btn m-1">Sort <FaArrowDown /></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li onClick={() => setSortOrder('az')} className='cursor-pointer py-2.5 hover:bg-blue-300 rounded-sm px-2.5'>Title A - Z</li>
                            <li onClick={() => setSortOrder('za')} className='cursor-pointer py-2.5 hover:bg-blue-300 rounded-sm px-2.5'>Title Z - A</li>
                            <li onClick={() => setSortOrder('')} className='cursor-pointer py-2.5 hover:bg-blue-300 rounded-sm px-2.5'>Default</li>
                        </ul>
                    </div>
                </div>

            </div>




            {notMatch && <NotMatch pattern={searchPattern} />}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 place-items-stretch'>
                {
                    blogData.map(blog => <BlogCard key={blog._id} blog={blog} />)
                }
            </div>




        </div>
    );
};

export default AllBlog;
