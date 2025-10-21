import { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThemeContext } from '../../ThemeContext/DarkLight';

const BlogCard = ({ blog }) => {
  const { user } = use(AuthContext);
  const { textClass, cardBackground } = use(ThemeContext);

  const handleAddToWishList = () => {
    if (!user) {
      toast("Please login first");
      return;
    }
    axios.get(`http://localhost:3000/user/wishlist?email=${user.email}&blogId=${blog.id}`)
      .then(function (response) {
        if (response.data.exist) {
          toast.warn("Already in wishlist");
        } else {
          const wishlistInformation = { email: user.email, blogId: blog.id };
          axios.post(`http://localhost:3000/user/wishlist`, { wishlistInformation })
            .then(function (response) {
              if (response.status === 200) toast.success("Added in wishlist successfully");
            })
            .catch(function (error) {
              toast.warn(error.message);
            });
        }
      })
      .catch(function (error) {
        toast.warn(error);
        return;
      });
  };

  return (
    <div className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${cardBackground} flex flex-col h-full`}>
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-neutral-100 dark:bg-neutral-700">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={blog.image}
          alt={blog.title}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-lg backdrop-blur-sm">
            {blog.category}
          </span>
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleAddToWishList}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-all duration-200 transform hover:scale-110 group/heart"
        >
          <svg className="w-5 h-5 text-red-500 group-hover/heart:fill-red-500 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Title */}
        <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${textClass} mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200`}>
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 flex-1">
          {blog.short_description}
        </p>

        {/* Author & Date Info (Optional) */}
        {(blog.author || blog.published_date) && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {blog.author && (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{blog.author}</span>
                </>
              )}
              {blog.author && blog.published_date && <span>•</span>}
              {blog.published_date && (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{blog.published_date}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <Link
            to={`/blogdetails/${blog.id}`}
            className="flex-1 group/btn relative inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Read More
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
          </Link>

          <button
            onClick={handleAddToWishList}
            className="group/wish sm:flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-200 border-2 border-neutral-200 dark:border-neutral-600 hover:border-pink-300 dark:hover:border-pink-700 transform hover:scale-105 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/wish:fill-pink-600 dark:group-hover/wish:fill-pink-400 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;