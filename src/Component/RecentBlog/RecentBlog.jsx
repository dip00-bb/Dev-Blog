import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from '../Skeleton/Skeleton';
import SingleBlog from './SingleBlog';
import ServerError from '../ServerError/ServerError';
import { TypingEffect } from '../TypingEffect/TypingEffect';
import { Link } from 'react-router';

const RecentBlog = () => {

    const [blogs, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://blog-server-three-inky.vercel.app/recent_blog');
                setBlog(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])


    if (loading) return <Skeleton />
    if (error) return <ServerError />

    return (
        <div className='px-6'>
            <h1 className='text-center text-3xl md:text-6xl font-semibold mt-9 mb-8 text-blue-500'>Recent Blog</h1>

            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4'>
                {
                    blogs.map(blog => <SingleBlog  key={blog._id} blog={blog}></SingleBlog>)
                }
            </div>

            <div className='flex w-full justify-center'>
                <Link
                    className="text-black bg-blue-400 font-semibold py-3.5 px-6 duration-150 ease-in-out cursor-pointer hover:rounded-br-xl hover:rounded-tl-xl transition-all delay-200"
                    to="/allblog"
                >
                    See More
                </Link>
            </div>
        </div>
    );
};

export default RecentBlog;