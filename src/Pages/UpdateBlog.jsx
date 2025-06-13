import axios from 'axios';
import React, { use, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const UpdateBlog = () => {
    const location = useLocation();
    const { id } = useParams()
    const { user } = use(AuthContext);
    const { blog } = location.state || {};
    const { title, image, short_description, category, details } = blog
    const categories = [
        "Js framework",
        "Styling",
        "Js core concepts",
        "Web development",
        "Backend framework",
        "Artificial intelligence"
    ];

    const [blogCategory, setCategory] = useState(category);








    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.imageUrl.value;
        const short_description = form.shortDesc.value;
        const details = form.desc.value;
        const category = blogCategory;
        const uid = user.uid;
        const blogData = { uid, title, image, short_description, category, details, };
        axios.put(`https://blog-server-three-inky.vercel.app/blog/updateblog/${id}`, { blogData }, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => {
                if (res.data === "Document updated") {
                    e.target.reset()
                    Swal.fire({
                        title: "Document Updated",
                        icon: "success",
                        draggable: true
                    });
                    form.reset()
                }
            })
            .catch(error => toast.warn(error))

    }


    const getCategory = e => {
        const categoryValue = e.target.value;
        setCategory(categoryValue)
    }
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
            <h2 className="text-2xl font-semibold mb-6">Update your Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={title}
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
                        defaultValue={image}
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
                        defaultValue={blogCategory}
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
                        defaultValue={short_description}
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
                        defaultValue={details}
                        placeholder="Enter a detailed description"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                >
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default UpdateBlog;