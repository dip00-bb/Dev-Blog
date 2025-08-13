import { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThemeContext } from '../../ThemeContext/DarkLight';

const BlogCard = ({ blog }) => {


  const {user}=use(AuthContext)
  const {textClass,cardBackground}=use(ThemeContext)

  const handleAddToWishList = () => {

    if (!user) {
      toast("Please login first");
      return
    }


    axios.get(`https://blog-server-three-inky.vercel.app/user/wishlist?email=${user.email}&blogId=${blog._id}`)
      .then(function (response) {
        if (response.data.exist) {
          toast.warn("Already in wishlist")
        } else {
          const wishlistInformation = { email: user.email, blogId: blog._id }
          axios.post(`https://blog-server-three-inky.vercel.app/user/wishlist`, { wishlistInformation })
            .then(function (response) {
              if (response.status === 200) toast.success("Added in wishlist successfully")
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
    <div className={`rounded-xl overflow-hidden shadow-xl ${cardBackground} hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col`}>
      <img
        className="w-full h-48 object-cover"
        src={blog.image}
        alt={blog.title}
      />


      <div className="p-5 flex flex-col justify-between flex-1">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-full mb-2 w-fit">
          {blog.category}
        </span>

        <h2 className={`text-xl font-bold ${textClass} mb-2`}>{blog.title}</h2>
        <p className="text-sm text-gray-500 mb-4 line-clamp-4">{blog.short_description}</p>

        <div className="flex justify-between gap-3 justify-self-end items-end ">
          <Link
            to={`/blogdetails/${blog._id}`}
            className=" text-center bg-blue-500 hover:bg-blue-600 text-white button-text px-3 py-3 rounded-md transition "
            // className="relative inline-flex items-center justify-start  px-3 py-3 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-blue-200 group"
          >
             View Details
          </Link>

          <button
            onClick={handleAddToWishList}
            className="items-center text-white bg-cyan-800 hover:bg-cyan-900 button-text px-2 py-3 rounded transition-all duration-150 cursor-pointer "
          >
            Add to Wishlist
          </button>
        </div>
      </div>

    </div>
  );
};

export default BlogCard;
// lg:text-[0.8rem]