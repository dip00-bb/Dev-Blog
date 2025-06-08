import axios from "axios";
import { use, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";


const AddBlog = () => {

  const categories = [
    "Js Framework",
    "Styling",
    "Js core concepts",
    "Web Development",
    "Backend Framework",
    "Artificial Intelligence"
  ];

  const {user}=use(AuthContext);

  const [blogCategory,setCategory]=useState('Js Framework')

  const handleSubmit=(e)=>{
    e.preventDefault();
    const form =e.target;
    const title=form.title.value;
    const image=form.imageUrl.value;
    const short_description=form.shortDesc.value;
    const details=form.desc.value;
    const category=blogCategory;
    const uid=user.uid;
    const blogData={title,image,short_description,details,category,uid};
    axios.post('http://localhost:3000/blog/allblog',{blogData})
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
  }


  const getCategory=e=>{
    const categoryValue= e.target.value;
    console.log(categoryValue)
    setCategory( categoryValue)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border rounded-md"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            className="w-full p-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            className="w-full p-2 border rounded-md"
            onChange={getCategory}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            name="shortDesc"
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Enter a short description"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="desc"
            className="w-full p-2 border rounded-md"
            rows="6"
            placeholder="Enter a detailed description"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
