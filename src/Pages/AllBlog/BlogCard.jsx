import { use, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThemeContext } from '../../ThemeContext/DarkLight';
import { Heart, Eye, Bookmark } from 'lucide-react';
import axiosPublic from '../../axios/useAxiosPublic';

const BlogCard = ({ blog }) => {
  const { user } = use(AuthContext);
  const { textClass, cardBackground } = use(ThemeContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCheckingWishlist, setIsCheckingWishlist] = useState(false);

  // Check if blog is already in wishlist when component mounts
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user || !user.email) return;
      
      setIsCheckingWishlist(true);
      try {
        const response = await axiosPublic.get(
          `/user/wishlist?email=${user.email}&blogId=${blog.id}`
        );
        setIsWishlisted(response.data.exist);
      } catch (error) {
        toast.warn('Error checking wishlist status:', error);
      } finally {
        setIsCheckingWishlist(false);
      }
    };

    checkWishlistStatus();
  }, [user, blog.id]);

  const handleAddToWishList = async () => {
    if (!user) {
      toast.warning("Please login first");
      return;
    }

    try {
      const response = await axiosPublic.get(
        `/user/wishlist?email=${user.email}&blogId=${blog.id}`
      );
      
      if (response.data.exist) {
        toast.info("Already in wishlist");
        setIsWishlisted(true);
      } else {
        const wishlistInformation = { email: user.email, blogId: blog.id };
        const addResponse = await axiosPublic.post(
          `/user/wishlist`,
          { wishlistInformation }
        );
        
        if (addResponse.status === 200) {
          toast.success("Added to wishlist successfully");
          setIsWishlisted(true);
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to add to wishlist");
    }
  };

  return (
    <div className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${cardBackground} flex flex-col h-full border border-neutral-200 dark:border-neutral-700`}>
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
          <span className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg backdrop-blur-sm">
            {blog.category}
          </span>
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleAddToWishList}
          disabled={isCheckingWishlist || isWishlisted}
          className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-110 group/heart disabled:cursor-not-allowed
            ${isWishlisted 
              ? 'bg-pink-500 cursor-default' 
              : 'bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700'
            }
            ${isCheckingWishlist ? 'opacity-50' : ''}`}
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 
              ${isWishlisted 
                ? 'fill-white text-white' 
                : 'text-pink-500 group-hover/heart:fill-pink-500'
              }`}
          />
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

        {/* Author & Date Info */}
        {(blog.author || blog.published_date) && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {blog.author && (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{blog.author}</span>
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
          {/* Read More Button */}
          <Link
            to={`/blogdetails/${blog.id}`}
            className="flex-1 group/btn relative inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              Read More
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
          </Link>

          {/* Save/Wishlist Button */}
          <button
            onClick={handleAddToWishList}
            disabled={isCheckingWishlist || isWishlisted}
            className={`group/wish sm:flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 font-semibold rounded-xl transition-all duration-200 border-2 transform text-sm sm:text-base
              ${isWishlisted
                ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-300 dark:border-pink-700 cursor-default'
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-700 hover:scale-105'
              }
              ${isCheckingWishlist ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isCheckingWishlist ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Bookmark 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 
                    ${isWishlisted 
                      ? 'fill-current' 
                      : 'group-hover/wish:fill-current'
                    }`}
                />
                <span className="hidden sm:inline">
                  {isWishlisted ? 'Saved' : 'Save'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;