import React from 'react';
import { MessageCircle } from 'lucide-react';

const CommentsSection = ({ comments = [] }) => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
                {/* Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                        <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                            Comments
                        </h2>
                        <span className="ml-auto text-sm sm:text-base font-semibold text-neutral-500 dark:text-neutral-400">
                            {comments.length}
                        </span>
                    </div>
                </div>

                {/* Comments List with Scroll */}
                <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-500">
                    {comments.length > 0 ? (
                        <div className="p-4 sm:p-6 space-y-4">
                            {comments.map((comment, index) => (
                                <div
                                    key={index}
                                    className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:shadow-md hover:scale-[1.01]"
                                >
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={comment.commentorProfile}
                                            alt={`${comment.author}'s avatar`}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-600 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-500 transition-all duration-200 object-cover"
                                        />
                                    </div>

                                    {/* Comment Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                                                {comment.author}
                                            </p>
                                            {comment.time && (
                                                <>
                                                    <span className="text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                                                        •
                                                    </span>
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
                        <div className="text-center py-16 sm:py-20 px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-100 dark:bg-neutral-700 mb-4">
                                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-400 dark:text-neutral-500" />
                            </div>
                            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-semibold mb-2">
                                No comments yet
                            </p>
                            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                                Be the first to share your thoughts!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgb(212 212 212);
          border-radius: 20px;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgb(82 82 82);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgb(163 163 163);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgb(115 115 115);
        }
      `}</style>
        </div>
    );
};

export default CommentsSection 