
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
        axios.delete(`https://blog-server-three-inky.vercel.app/user/userWishlist/?id=${id}&email=${email}`)
            .then(response => {

                if (response.data.deletedCount) {
                    Swal.fire({
                        title: 'Wishlist Successfully Deleted',
                        icon: "success",
                        draggable: true
                    });

                    const reamingWishList = filteredBlogs.filter(blog => blog._id !== id);
                    setFilterdBlog(reamingWishList)

                } else {
                    Swal.fire({
                        title: 'Blog added successfully',
                        icon: "warning",
                        draggable: true
                    });
                }
            })
            .catch(error => {
                 toast.warn(error.message) 
            });
    }


    const allBlog = useLoaderData()
    const { user } = use(AuthContext)
    const [wishlistData, setWishList] = useState([])
    const [filteredBlogs, setFilterdBlog] = useState([])

    useEffect(() => {
        myApplicationsPromise(user.email,user.accessToken)
            .then(res => res.json())
            .then(data => setWishList(data))

    }, [user.email]);


    useEffect(() => {
        const wishlistedBlogIds = wishlistData.map(item => item.blogId);
        const filtered = allBlog.filter(blog => wishlistedBlogIds.includes(blog._id));
        setFilterdBlog(filtered);
    }, [allBlog,wishlistData]);

    if (filteredBlogs.length === 0) {
        return <EmptyWishList />

    } else {
        return (
            <div className=' grid grid-cols-1 gap-5 max-w-11/12 mx-auto my-8'>
                {

                    filteredBlogs.map(blog => (
                        <BlogWishCard key={blog._id} blog={blog} filteredBlogs={filteredBlogs} handleDeleteWishList={handleDeleteWishList} setFilterdBlog={setFilterdBlog} />
                    ))

                }
            </div>
        );
    }


};

export default WishList;