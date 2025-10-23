
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Link, useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext/DarkLight';
import CommentsSection from '../Component/BlogComments/CommentsSection';
import { Sparkles, AlertCircle, Edit, Calendar, User } from 'lucide-react';
import axiosPublic from '../axios/useAxiosPublic';
import { checkPremiumUser } from '../utils/blog-details';
import SubscriptionModal from '../Component/SubscriptionModal/SubscriptionModal';

const BlogDetail = () => {
    const { user } = use(AuthContext);
    const userId = user?.uid;
    const { textClass } = use(ThemeContext);
    const [matchedBlog, setMatchedBlog] = useState(null);
    const { id } = useParams();
    const [isSummarized, setIsSummarized] = useState(false);
    const [summary, setSummary] = useState("");
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [comments, setComment] = useState([]);
    const [error, setError] = useState(null);
    const [isPremiumUser, setPremiumUser] = useState(false);
    const [showPremiumModal, setPremiumModal] = useState(false);

    // Fetch blog data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://blog-server-three-inky.vercel.app/allblog/${id}?email=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                });
                setMatchedBlog(response?.data);
            } catch (error) {
                setError(error?.message);
                toast.error("Failed to load blog post");
            }
        };

        if (user?.email) {
            fetchData();
        }
    }, [id, user]);

    // Fetch comments
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://blog-server-three-inky.vercel.app/blog/comment/${id}`);
                setComment(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id]);

    // Check premium status
    useEffect(() => {
        const checkPremiumStatus = async () => {
            if (!userId) return;
            
            try {
                const userStatus = await checkPremiumUser(userId);
                setPremiumUser(userStatus);
            } catch (error) {
                console.error("Failed to check premium status:", error);
                setPremiumUser(false);
            }
        };

        checkPremiumStatus();
    }, [userId]);

    const handleSummarize = async () => {
        // Check if user is premium
        if (!isPremiumUser) {
            setPremiumModal(true);
            return;
        }

        // Toggle between summary and full text
        if (isSummarized) {
            setIsSummarized(false);
            return;
        }

        // Generate summary if not already generated
        if (!summary) {
            setIsLoadingSummary(true);
            try {
                const response = await axiosPublic.post('/blogsummary', {
                    text: matchedBlog?.details
                });
                setSummary(response.data.generatedSummary);
                setIsSummarized(true);
                toast.success("Summary generated!");
            } catch (error) {
                toast.error("Failed to generate summary");
                console.error(error);
            } finally {
                setIsLoadingSummary(false);
            }
        } else {
            setIsSummarized(true);
        }
    };

    const handleComment = (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error("Please sign in to comment");
            return;
        }

        if (user.uid === matchedBlog?.uid) {
            toast.warning("Owner cannot comment on their own blog");
            return;
        }

        const form = e.target;
        const comment = form.cmnt.value;

        if (!comment.trim()) {
            toast.warning("Please enter a comment");
            return;
        }

        const commentorInfo = {
            comment,
            blogID: id,
            commentorProfile: user.photoURL,
            commentorEmail: user.email,
            author: user.displayName
        };

        axios.post('https://blog-server-three-inky.vercel.app/blog/comment', { commentorInfo })
            .then(() => {
                toast.success("Comment posted successfully!");
                form.reset();
                // Refresh comments
                axios.get(`https://blog-server-three-inky.vercel.app/blog/comment/${id}`)
                    .then(res => setComment(res.data));
            })
            .catch(() => {
                toast.error("Failed to post comment");
            });
    };

    // Loading state
    if (!matchedBlog) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-neutral-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">Loading blog post...</p>
                </div>
            </div>
        );
    }

    const { title, image, short_description, category, details, author, published_date, uid } = matchedBlog;

    return (
        <div className="min-h-screen">
            <title>{title || 'Blog Post'}</title>

            {/* Subscription Modal */}
            <SubscriptionModal 
                isOpen={showPremiumModal} 
                onClose={() => setPremiumModal(false)} 
            />

            {/* Hero Section */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                {/* Title Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
                        {category && (
                            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white backdrop-blur-sm mb-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                                {category}
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-4 sm:mb-6 drop-shadow-2xl">
                            {title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm sm:text-base text-white/90">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <User className="w-4 h-4" />
                                <span className="font-semibold">{author || 'DevBlog Community'}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <Calendar className="w-4 h-4" />
                                <span>{published_date || 'January 15, 2024'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Blog Content - Left Column */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">

                        {/* Short Description Card */}
                        {short_description && (
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-l-4 border-indigo-500 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <p className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 leading-relaxed italic font-medium">
                                    {short_description}
                                </p>
                            </div>
                        )}

                        {/* Main Article Card */}
                        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-neutral-200 dark:border-neutral-700">

                            {/* Summarize Button */}
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={handleSummarize}
                                    disabled={isLoadingSummary}
                                    className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 
                                        bg-gradient-to-r from-purple-500 to-pink-500 
                                        hover:from-purple-600 hover:to-pink-600 
                                        disabled:from-purple-400 disabled:to-pink-400
                                        text-white text-xs sm:text-sm font-semibold 
                                        rounded-lg shadow-md hover:shadow-lg 
                                        transition-all duration-200 transform hover:scale-105 
                                        disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoadingSummary ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            <span>{isSummarized ? "Show Full Text" : "AI Summarize"}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Article Content */}
                            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert">
                                <div className={`leading-relaxed whitespace-pre-line ${textClass} text-gray-800 dark:text-gray-200`}>
                                    {isSummarized ? (
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-l-4 border-purple-500 rounded-r-xl p-6 mb-4">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                <span className="font-bold text-purple-800 dark:text-purple-300">AI Generated Summary</span>
                                            </div>
                                            <p className="text-base sm:text-lg">{summary}</p>
                                        </div>
                                    ) : (
                                        <p className="text-base sm:text-lg">{details}</p>
                                    )}
                                </div>
                            </article>

                            {/* Update Button for Owner */}
                            {user?.uid === uid && (
                                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                                    <Link
                                        state={{ blog: matchedBlog }}
                                        to={`/updateblog/${id}`}
                                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Update Blog
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Comment Form Card */}
                        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                                Leave a Comment
                            </h2>

                            {/* Owner Warning */}
                            {user?.uid === uid ? (
                                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-500 rounded-r-xl">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm sm:text-base text-amber-800 dark:text-amber-200 font-medium">
                                            As the blog creator, you cannot comment on your own post
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 pt-1">
                                        <img
                                            src={user?.photoURL || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                                            alt="Your avatar"
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-4 ring-indigo-500/30 object-cover shadow-md"
                                        />
                                    </div>

                                    <form onSubmit={handleComment} className="flex-1">
                                        <textarea
                                            className="w-full p-4 sm:p-5 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm sm:text-base resize-none transition-all duration-200 shadow-sm"
                                            rows="4"
                                            placeholder="Share your thoughts..."
                                            name="cmnt"
                                            required
                                        ></textarea>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                Post Comment
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comments Section - Right Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <CommentsSection comments={comments} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;