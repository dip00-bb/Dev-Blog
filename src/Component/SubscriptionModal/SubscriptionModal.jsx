import React from 'react';
import { X, Lock, Crown, Check } from 'lucide-react';

const SubscriptionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
                    Premium Feature
                </h2>

                {/* Description */}
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    AI Summarize is a premium feature. Subscribe to unlock powerful AI tools and enhance your experience.
                </p>

                {/* Features List */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="font-bold text-purple-800 dark:text-purple-300">Premium Benefits</span>
                    </div>
                    <ul className="space-y-2">
                        {['AI-powered summarization', 'Unlimited articles', 'Advanced features', 'Priority support'].map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        className="w-full py-3 px-6
                            bg-gradient-to-r from-purple-500 to-pink-500
                            hover:from-purple-600 hover:to-pink-600
                            text-white font-semibold rounded-lg
                            shadow-lg hover:shadow-xl
                            transition-all duration-200 transform hover:scale-105
                            flex items-center justify-center gap-2"
                    >
                        <Crown className="w-5 h-5" />
                        <span>Subscribe Now</span>
                    </button>

                    <button
                        className="w-full py-3 px-6
                            bg-white dark:bg-gray-700
                            hover:bg-gray-50 dark:hover:bg-gray-600
                            text-purple-600 dark:text-purple-400 font-semibold
                            border-2 border-purple-500
                            rounded-lg transition-all duration-200"
                    >
                        Sign In
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SubscriptionModal