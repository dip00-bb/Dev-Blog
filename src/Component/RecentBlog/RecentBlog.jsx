import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from '../Skeleton/Skeleton';
import SingleBlog from './SingleBlog';

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


    if(loading) return <p>Iam</p>
    if(error) return <p>Failed to get data from server</p>

    return (
        <div className='space-y-3.5'>
            <h1 className='text-center text-3xl md:text-6xl font-semibold mt-9'>Recent News</h1>
            {
                blogs.map(blog=> <SingleBlog blog={blog}></SingleBlog>)
            }
        </div>
    );
};

export default RecentBlog;