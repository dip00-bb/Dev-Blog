import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const BlogWishCard = ({ blog, handleDeleteWishList, filteredBlogs, setFilterdBlog }) => {
    const { user } = use(AuthContext);
    const { id, image, title, short_description, category } = blog;

    return (
        <div className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
                {/* Image Section */}
                <div className="relative flex-shrink-0 w-full sm:w-48 h-48 sm:h-32 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-700">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {category && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500 text-white shadow-md">
                                {category}
                            </span>
                        </div>
                    )}
                    {/* Heart Icon Overlay */}
                    <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="mb-4">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                            {title}
                        </h3>
                        {short_description && (
                            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                {short_description}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to={`/blogdetails/${id}`}
                            className="flex-1 group/btn relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Details
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                        </Link>

                        <button
                            onClick={() => handleDeleteWishList(id, user.email, filteredBlogs, setFilterdBlog)}
                            className="group/del flex items-center justify-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 border-2 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5 group-hover/del:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="text-sm sm:text-base">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogWishCard;