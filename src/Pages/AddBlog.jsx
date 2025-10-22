import axios from "axios";
import { use, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddBlog = () => {
  const categories = [
    "Js framework",
    "Styling",
    "Js core concepts",
    "Web development",
    "Backend framework",
    "Artificial intelligence"
  ];

  const { user } = use(AuthContext);
  const [blogCategory, setCategory] = useState('Js framework');
  const [imagePreview, setImagePreview] = useState('');

  const [description, setDescription] = useState('dddddddd');
  console.log(description)

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.imageUrl.value;
    const short_description = form.shortDesc.value;
    const details = description;
    const category = blogCategory;
    const uid = user.uid;
    const blogData = { title, image, short_description, details, category, uid };

    axios.post('http://localhost:3000/blog/addblog', { blogData }, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
      .then(res => {
        console.log(res.data);
        console.log(res.data.acknowledged);
        if (res.data.acknowledged) {
          form.reset();
          setImagePreview('');
          Swal.fire({
            title: 'Blog added successfully',
            icon: "success",
            draggable: true
          });
        }
      })
      .catch(error => toast.warn(error));
  };

  // get the description from textarea
  const getDescription = (e) => {
    const descValue = e.target.value;
    setDescription(descValue);
  }


  const handleWriteWithAI = async () => {
    console.log("Write with AI button clicked", description);

    try {
      if (!description) {
        alert("Please enter some initial content to help the AI generate the blog.");
        return;
      } else {
        const response = await axios.post('http://localhost:3000/writerai', { description })
        console.log(response)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const getCategory = e => {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImagePreview(url);
  };


  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Create New Blog
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Share your knowledge and insights with the community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Title Input */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-neutral-50 dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter an engaging title for your blog..."
                  required
                />
              </div>

              {/* Image URL Input */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  onChange={handleImageUrlChange}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-neutral-50 dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {imagePreview && (
                  <div className="mt-4 rounded-xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-600">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 sm:h-64 object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category Select */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category
                </label>
                <select
                  name="category"
                  onChange={getCategory}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-neutral-50 dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer text-sm sm:text-base"
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Short Description */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Short Description
                </label>
                <textarea
                  name="shortDesc"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-neutral-50 dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                  rows="3"
                  placeholder="Write a brief summary that captures the essence of your blog..."
                  required
                ></textarea>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  Keep it concise and engaging (2-3 sentences)
                </p>
              </div>

              {/* Full Description */}
              <div className="group">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Full Content
                  </label>
                  <button
                    onClick={handleWriteWithAI}
                    type="button"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Write with AI
                  </button>
                </div>
                <textarea
                  name="desc"
                  onChange={(e) => getDescription(e)}
                  defaultValue={description}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-neutral-50 dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                  rows="8"
                  placeholder="Share your detailed thoughts, insights, and knowledge..."
                  required
                ></textarea>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  Write your complete blog content here
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Blog
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Need help? Check out our
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold ml-1 cursor-pointer hover:underline">
              writing guidelines
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;