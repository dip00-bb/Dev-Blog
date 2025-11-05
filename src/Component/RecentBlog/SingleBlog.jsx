

import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThemeContext } from '../../ThemeContext/DarkLight';
import axiosPublic from '../../axios/useAxiosPublic';

const SingleBlog = ({ blog }) => {
    const { category, title, short_description, image, id } = blog;
    const { user } = use(AuthContext);
    const {textClass,cardBackground}=use(ThemeContext)

    const handleAddToWishList = () => {
        if (!user) {
            toast("Please login first");
            return;
        }

        axiosPublic
            .get(`/user/wishlist?email=${user.email}&blogId=${id}`)
            .then((response) => {
                if (response.data.exist) {
                    toast.warn("Already in wishlist");
                } else {
                    const wishlistInformation = { email: user.email, blogId: id };
                    axiosPublic
                        .post(`/user/wishlist`, { wishlistInformation })
                        .then((response) => {
                            if (response.status === 200) toast.success("Added in wishlist successfully");
                        })
                        .catch((error) => {
                            toast.warn(error.message);
                        });
                }
            })
            .catch((error) => {
                toast.warn(error);
            });
    };

    return (
        <div data-aos="zoom-in" className="p-4">
            <div className={`${cardBackground} rounded-xl shadow-md  hover:shadow-lg transition duration-300 max-w-md mx-auto flex flex-col h-full`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-xl"
                />

                <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs text-blue-400 mb-1">{category}</p>
                    <h2 className={`text-lg font-semibold ${textClass}`}>{title}</h2>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-3">{short_description}</p>
                </div>

                <div className="px-4 pb-4 mt-auto flex flex-wrap gap-3">
                    <Link
                        to={`blogdetails/${id}`}
                        className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white button-text px-1 py-3 rounded-md transition"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={handleAddToWishList}
                        className="flex-1 text-center bg-cyan-800 hover:bg-cyan-700 text-white button-text px-1 py-3 rounded-md transition"
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;

// text-[12px] md:text-sm lg:text-[1rem]