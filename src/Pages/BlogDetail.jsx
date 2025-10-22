import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Link, useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext/DarkLight';

const BlogDetail = () => {
    const { user } = use(AuthContext);
    const { textClass } = use(ThemeContext);
    const [matchedBlog, setMatchedBlog] = useState([]);
    const { id } = useParams();
    const [isSummarized, setIsSummarized] = useState(false);
    const [summary, setSummary] = useState("");






    const [comments, setComment] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/allblog/${id}?email=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });
                setMatchedBlog(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/blog/comment/${id}`);
                setComment(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id, comments]);







    const handleSummarize = async () => {
        if (!isSummarized) {
            const response = await axios.post('http://localhost:3000/blogsummary', { text: matchedBlog?.details })
            console.log("the summary is",response.data.generatedSummary);
        } else {
            setIsSummarized(false);
        }
    };





    if (!matchedBlog) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-neutral-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">Loading blog post...</p>
                </div>
            </div>
        );
    }







    const { title, image, short_description, category, details, author, published_date, uid } = matchedBlog;

    const handleComment = (e) => {
        e.preventDefault();
        if (user.uid === uid) {
            toast("Owner can not comment on his own blog");
            return;
        } else {
            const form = e.target;
            const comment = form.cmnt.value;
            const blogID = id;
            const commentorEmail = user.email;
            const commentorProfile = user.photoURL;
            const author = user.displayName;

            const commentorInfo = { comment, blogID, commentorProfile, commentorEmail, author };

            axios.post('http://localhost:3000/blog/comment', { commentorInfo });
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-b">
            <title>{title || 'Blog Post'}</title>

            {/* Hero Section */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Title Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
                        {category && (
                            <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-500/90 text-white backdrop-blur-sm mb-4 transition-all duration-300 hover:bg-indigo-600">
                                {category}
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-3 sm:mb-4">
                            {title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-neutral-200">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">{author || 'DevBlog Community'}</span>
                            </div>
                            <span className="text-neutral-400">•</span>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span>{published_date || 'January 15, 2024'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 border-indigo-500/20 border-1 rounded-2xl mt-6 md:mt-16">
                {/* Short Description */}
                {short_description && (
                    <div className="mb-8 sm:mb-12 p-6 sm:p-8 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
                        <p className="text-base sm:text-lg lg:text-xl text-gray-800 leading-relaxed italic">
                            {short_description}
                        </p>
                    </div>
                )}

                {/* Main Content */}
                <article className="mb-12 sm:mb-16">
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                        <p
                            className={`text-base sm:text-lg lg:text-xl leading-relaxed whitespace-pre-line ${textClass} text-gray-800`}
                        >
                            {isSummarized ? summary : details}
                        </p>

                        <button
                            onClick={handleSummarize}
                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            {isSummarized ? "Show Full Text" : "Summarize Text"}
                        </button>
                    </div>
                </article>

                {/* Divider */}
                <div className="border-t border-neutral-200 dark:border-neutral-700 mb-12"></div>

                {/* Comments Section */}
                <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8 lg:p-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                                Comments
                                <span className="ml-3 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400">
                                    ({comments.length})
                                </span>
                            </h2>
                        </div>

                        {/* Owner Warning */}
                        {user.uid === uid && (
                            <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm sm:text-base text-amber-800 dark:text-amber-200 font-medium">
                                        As the blog creator, you cannot comment on your own post
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Comment Form */}
                        {user.uid !== uid && (
                            <div className="mb-10">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 pt-1">
                                        <img
                                            src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                                            alt="Your avatar"
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-800 object-cover"
                                        />
                                    </div>

                                    <form onSubmit={handleComment} className="flex-1">
                                        <div className="relative">
                                            <textarea
                                                id="comment-textarea"
                                                className="w-full p-4 sm:p-5 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm sm:text-base resize-none transition-all duration-200"
                                                rows="4"
                                                placeholder="Share your thoughts..."
                                                name="cmnt"
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end mt-3 sm:mt-4">
                                            <button
                                                type="submit"
                                                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 shadow-md hover:shadow-lg"
                                            >
                                                Post Comment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Update Button for Owner */}
                        {user.uid === uid && (
                            <div className="mb-10 flex justify-center">
                                <Link
                                    state={{ blog: matchedBlog }}
                                    to={`/updateblog/${id}`}
                                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Update Blog
                                </Link>
                            </div>
                        )}

                        {/* Comments List */}
                        {comments.length > 0 ? (
                            <div className="space-y-4 sm:space-y-6">
                                {comments.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:shadow-md"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                src={comment.commentorProfile}
                                                alt={`${comment.author}'s avatar`}
                                                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-600 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-500 transition-all duration-200 object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                                                    {comment.author}
                                                </p>
                                                {comment.time && (
                                                    <>
                                                        <span className="text-neutral-400 dark:text-neutral-500 hidden sm:inline">•</span>
                                                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                                            {comment.time}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed break-words">
                                                {comment.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 sm:py-16">
                                <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-medium">No comments yet</p>
                                <p className="text-sm sm:text-base text-neutral-400 dark:text-neutral-500 mt-2">Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BlogDetail;