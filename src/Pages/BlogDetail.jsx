import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Link, useLoaderData, useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const BlogDetail = () => {

    const { user } = use(AuthContext);
    const allBlogData = useLoaderData();
    const { id } = useParams();

    const [comments, setComment] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // setLoading(true);
                const response = await axios.get(`https://blog-server-three-inky.vercel.app/blog/comment/${id}`);
                setComment(response.data)
            } catch (error) {
                setError(error.message)
            }
        }

        fetchData()
    }, [id, comments])

    const matchedBlog = allBlogData.find(blog => blog._id === id);

    if (!matchedBlog) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl text-gray-700">
                Loading blog post or blog not found...
            </div>
        );
    }

    const { title, image, short_description, category, details, author, published_date, uid } = matchedBlog;

    const handleComment = (e) => {
        e.preventDefault()
        if (user.uid === uid) {
            toast("Owner can not comment on his own blog");
            return
        } else {
            const form = e.target;
            const comment = form.cmnt.value;
            const blogID = id;
            const commentorEmail = user.email;
            const commentorProfile = user.photoURL;
            const author = user.displayName;

            const commentorInfo = { comment, blogID, commentorProfile, commentorEmail, author }

            axios.post('https://blog-server-three-inky.vercel.app/blog/comment', { commentorInfo })

        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <title>{title || 'Blog Post'}</title>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                        {title}
                    </h1>
                    <div className="text-base text-gray-600 font-medium">
                        By <span className="text-indigo-600">{author || 'DevBlog Community'}</span> • Published on {published_date || 'January 15, 2024'}
                    </div>
                    {category && (
                        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mt-3">
                            {category}
                        </span>
                    )}
                </header>

                <div className="mb-10 rounded-xl overflow-hidden shadow-xl">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto object-cover max-h-96"
                    />
                </div>

                <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">


                    <p className='font-semibold text-blue-500 text-2xl my-4'>Short Description</p>
                    {short_description && (
                        <p className="italic text-gray-600">
                            {short_description}
                        </p>
                    )}


                    <p className='font-semibold text-blue-500 text-2xl my-4'>Description</p>
                    <p>{details}</p>
                </article>

                <section className="bg-white p-8 rounded-lg shadow-md">
                    {user.uid === uid && <p className='text-red-500 text-xl text-center'>Blog creator can not comment on his own blog</p>}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

                    <div className="flex items-start mb-8 space-x-4">

                        {
                            user.uid !== uid && <div className="flex-shrink-0">
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring-2 ring-offset-2">
                                        <img
                                            src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                                            alt="User Avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                        }




                        <form onSubmit={handleComment} className="flex-grow">

                            <>
                                {
                                    user.uid !== uid && <>
                                    <label htmlFor="comment-textarea" className="sr-only">Drop a comment</label>
                                    <textarea
                                        id="comment-textarea"
                                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                                        rows="4"
                                        placeholder="Add a comment..."
                                        name='cmnt'
                                        required
                                    ></textarea>
                                    </>
                                }
                            </>

                            <div className="text-right mt-3 space-x-6">

                                {
                                    user.uid !== uid &&<button type='submit' className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out">
                                    Comment
                                </button>
                                }
                                {
                                    user.uid === uid && <Link state={{ blog: matchedBlog }} to={`/updateblog/${id}`} type='button' className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out">
                                        update
                                    </Link>
                                }
                            </div>
                        </form>


                    </div>


                    <div className="space-y-6">

                        {comments.map((comment, index) => (
                            <div key={index} className="flex items-start space-x-4 bg-gray-300/40 rounded-xl p-5">
                                <div className="flex-shrink-0">
                                    <div className="avatar">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img src={comment.commentorProfile} alt={`${comment.author}'s avatar`} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-baseline space-x-2">
                                        <p className="font-semibold text-gray-900">{comment.author}</p>
                                        <p className="text-sm text-gray-500">{comment.time}</p>
                                    </div>
                                    <p className="text-gray-700 mt-1">{comment.comment}</p>
                                </div>
                            </div>
                        ))}

                        {/* {comments.length > 0 && (
                            <div className="text-center mt-8">
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Load more comments
                                </button>
                            </div>
                        )} */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BlogDetail;