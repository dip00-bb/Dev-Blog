import React, { use, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { myApplicationsPromise } from '../Component/myWishList/myWishList';
import { AuthContext } from '../AuthContext/AuthContext';
import { useLoaderData } from 'react-router';
import BlogWishCard from './BlogWishCard';
import EmptyWishList from './EmptyWishList';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const WishList = () => {
    const handleDeleteWishList = (id, email, filteredBlogs, setFilterdBlog) => {
        axios.delete(`http://localhost:3000/user/userWishlist/?id=${id}&email=${email}`)
            .then(response => {
                if (response.data.count) {
                    Swal.fire({
                        title: 'Wishlist Successfully Deleted',
                        icon: "success",
                        draggable: true
                    });
                    const reamingWishList = filteredBlogs.filter(blog => blog.id !== id);
                    setFilterdBlog(reamingWishList);
                } else {
                    Swal.fire({
                        title: 'Blog added successfully',
                        icon: "warning",
                        draggable: true
                    });
                }
            })
            .catch(error => {
                toast.warn(error.message);
            });
    };

    const allBlog = useLoaderData();
    const { user } = use(AuthContext);
    const [wishlistData, setWishList] = useState([]);
    const [filteredBlogs, setFilterdBlog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        myApplicationsPromise(user.email, user.accessToken)
            .then(res => res.json())
            .then(data => {
                setWishList(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [user.email]);

    useEffect(() => {
        const wishlistedBlogIds = wishlistData.map(item => item.blogId);
        const filtered = allBlog.filter(blog => wishlistedBlogIds.includes(blog.id));
        setFilterdBlog(filtered);
    }, [allBlog, wishlistData]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-200 dark:bg-neutral-700 rounded-2xl mx-auto mb-4 sm:mb-6 animate-pulse"></div>
                        <div className="h-10 sm:h-12 bg-neutral-200 dark:bg-neutral-700 rounded-xl w-64 mx-auto mb-3 animate-pulse"></div>
                        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-96 mx-auto animate-pulse"></div>
                    </div>

                    {/* Cards Skeleton */}
                    <div className="grid grid-cols-1 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg animate-pulse">
                                <div className="flex gap-6">
                                    <div className="w-48 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex-shrink-0"></div>
                                    <div className="flex-1 space-y-4">
                                        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (filteredBlogs.length === 0) {
        return <EmptyWishList />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl shadow-lg mb-4 sm:mb-6">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        My Wishlist
                    </h1>
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Your saved blogs • {filteredBlogs.length} {filteredBlogs.length === 1 ? 'item' : 'items'}
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                                    {filteredBlogs.length}
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                    Saved Blogs
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 gap-5 sm:gap-6">
                    {filteredBlogs.map(blog => (
                        <BlogWishCard 
                            key={blog.id} 
                            blog={blog} 
                            filteredBlogs={filteredBlogs} 
                            handleDeleteWishList={handleDeleteWishList} 
                            setFilterdBlog={setFilterdBlog} 
                        />
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="mt-8 sm:mt-12 text-center">
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        Looking for more content? 
                        <a href="/allblog" className="text-indigo-600 dark:text-indigo-400 font-semibold ml-1 hover:underline">
                            Browse all blogs
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WishList;