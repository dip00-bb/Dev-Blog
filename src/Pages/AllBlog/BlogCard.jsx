import React from "react";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 w-full max-w-5xl mx-auto border border-gray-200">
      

      <div className="w-full md:w-1/3 h-48 md:h-40 overflow-hidden rounded-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>


      <div className="flex-1">
        <p className="text-sm text-indigo-500 font-medium mb-1">{blog.category}</p>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{blog.short_description}</p>


        <div className="flex gap-4 flex-wrap">
          <Link
            to="/"
            className="relative inline-flex items-center justify-start py-2.5 pl-4 pr-12 overflow-hidden font-medium text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-indigo-100 group"
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
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">View Details</span>
          </Link>

          <Link to="/" className="inline-flex overflow-hidden text-white bg-cyan-800 rounded px-5 py-2.5 hover:bg-cyan-900 transition">
            Add to Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
