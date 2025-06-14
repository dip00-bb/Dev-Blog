import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const BlogWishCard = ({ blog, handleDeleteWishList,filteredBlogs,setFilterdBlog }) => {

    const {user}=use(AuthContext)
  const { _id, image, title } = blog;

  return (
    <div className="flex items-center justify-between p-2 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300">

      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>


      <div className="flex-1 mx-4">
        <h3 className="text-[9px] md:text-lg font-semibold text-gray-800">{title}</h3>
      </div>


      <div className="flex gap-3 flex-col">

        <Link
          to={`/blogdetails/${_id}`}
          className="relative inline-flex items-center justify-start py-2 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-blue-200 group"
        >
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-300 group-hover:bg-indigo-500 group-hover:h-full"></span>
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
            View Details
          </span>
        </Link>


        <button
          onClick={() => handleDeleteWishList(_id,user.email,filteredBlogs,setFilterdBlog)}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogWishCard;
