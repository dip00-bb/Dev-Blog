import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const SingleBlog = ({ blog }) => {
    const { category, title, short_description, image, _id } = blog
    const { user } = use(AuthContext);


    const handleAddToWishList = () => {

        if (!user){
             toast("Please login first"); 
             return
        } 


        axios.get(`https://blog-server-three-inky.vercel.app/user/wishlist?email=${user.email}&blogId=${_id}`)
            .then(function (response) {
                if (response.data.exist) {
                    toast.warn("Already in wishlist")
                } else {
                    const wishlistInformation = { email: user.email, blogId: _id } 
                    axios.post(`https://blog-server-three-inky.vercel.app/user/wishlist`, { wishlistInformation })
                        .then(function (response) {
                            if(response.status===200) toast.success("Added in wishlist successfully")
                        })
                        .catch(function (error) {
                            toast.warn(error.message);
                        });
                }
            })
            .catch(function (error) {
                toast.warn(error);
                return
            })

    }


    return (
        <div>
            <div className="hover:bg-gray-100 duration-300 md:hover:scale-120 flex max-w-[90rem] mx-auto p-4 items-center justify-between space-x-4 bg-white rounded-lg shadow-sm">

                <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">{category}</p>
                    <h2 className="text-sm md:text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500 mt-1 mb-2">{short_description}</p>
                    <div className='flex flex-wrap gap-3'>
                        <Link to={`blogdetails/${_id}`} className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-blue-200 group">
                            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-300 group-hover:bg-indigo-500 group-hover:h-full"></span>
                            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white text-sm md:text-lg">View Details</span>
                        </Link>

                        <button onClick={handleAddToWishList} className="inline-flex overflow-hidden text-white bg-cyan-800 rounded group cursor-pointer">
                            <span className="pl-7 pr-5 py-2.5 text-sm md:text-lg">Add to Wishlist</span>
                        </button>
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