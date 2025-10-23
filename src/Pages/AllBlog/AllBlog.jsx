import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import BlogCard from './BlogCard';
import axios from 'axios';
import NotMatch from '../../Component/NotMatch/NotMatch';
import { ThemeContext } from '../../ThemeContext/DarkLight';

const AllBlog = () => {
    const data = useLoaderData();

    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('');
    const [blogData, setBlogData] = useState([]);
    const [notMatch, setNotMatch] = useState(false);
    const [searchPattern, setPattern] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);


    const categories = [
        'All',
        'Js framework',
        'Styling',
        'Js core concepts',
        'Web development',
        'Backend framework',
        'Artificial intelligence'
    ];

    const sortOptions = [
        { value: '', label: 'Default' },
        { value: 'az', label: 'Title A - Z' },
        { value: 'za', label: 'Title Z - A' }
    ];

    useEffect(() => {
        let updatedData = [...data];

        if (category !== 'All') {
            updatedData = updatedData.filter(blog => blog.category === category);
        }

        if (sortOrder === 'az') {
            updatedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'za') {
            updatedData.sort((a, b) => b.title.localeCompare(a.title));
        }

        setBlogData(updatedData);
    }, [category, sortOrder, data]);

    const handleSearchBlog = async (e) => {
        e.preventDefault();
        const pattern = e.target.value;
        setPattern(pattern);
        if (pattern.length === 0) {
            setNotMatch(false);
            let resetData = [...data];
            if (category !== 'All') {
                resetData = resetData.filter(blog => blog.category === category);
            }
            if (sortOrder === 'az') {
                resetData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'za') {
                resetData.sort((a, b) => b.title.localeCompare(a.title));
            }
            setBlogData(resetData);
            return;
        }

        const response = await axios.get(`http://localhost:3000/search/${pattern}`);
        const resData = response.data;
        if (resData.length === 0) {
            setNotMatch(true);
        } else {
            setNotMatch(false);
            if (sortOrder === 'az') {
                resData.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'za') {
                resData.sort((a, b) => b.title.localeCompare(a.title));
            }
            setBlogData(resData);
        }
    };

    const handleCategorySelect = (cat) => {
        setCategory(cat);
        setIsFilterOpen(false);
    };

    const handleSortSelect = (sort) => {
        setSortOrder(sort);
        setIsSortOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Search and Filter Bar */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    onChange={handleSearchBlog}
                                    type="text"
                                    className="w-full px-5 py-3 sm:py-4 pl-12 bg-neutral-50 dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    placeholder="Search blogs by title..."
                                />
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Filter and Sort Buttons */}
                        <div className="flex gap-3">
                            {/* Filter Dropdown */}
                            <div className="relative flex-1 lg:flex-initial">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="w-full lg:w-auto px-5 py-3 sm:py-4 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    <span>Filter</span>
                                    <span className="hidden sm:inline px-2 py-0.5 bg-indigo-500 text-white text-xs rounded-full">
                                        {category === 'All' ? 'All' : '1'}
                                    </span>
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full mt-2 left-0 right-0 lg:left-auto lg:right-auto lg:w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 py-2 z-50 max-h-96 overflow-y-auto">
                                        {categories.map((cat, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleCategorySelect(cat)}
                                                className={`w-full px-4 py-3 text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${
                                                    category === cat
                                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                                                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                                }`}
                                            >
                                                <span>{cat}</span>
                                                {category === cat && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative flex-1 lg:flex-initial">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="w-full lg:w-auto px-5 py-3 sm:py-4 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                    <span>Sort</span>
                                </button>

                                {isSortOpen && (
                                    <div className="absolute top-full mt-2 left-0 right-0 lg:left-auto lg:right-auto lg:w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                                        {sortOptions.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSortSelect(option.value)}
                                                className={`w-full px-4 py-3 text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${
                                                    sortOrder === option.value
                                                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                                                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                                }`}
                                            >
                                                <span>{option.label}</span>
                                                {sortOrder === option.value && (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(category !== 'All' || sortOrder !== '') && (
                        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Active filters:</span>
                            {category !== 'All' && (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium">
                                    {category}
                                    <button
                                        onClick={() => setCategory('All')}
                                        className="hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full p-0.5 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {sortOrder !== '' && (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium">
                                    {sortOptions.find(opt => opt.value === sortOrder)?.label}
                                    <button
                                        onClick={() => setSortOrder('')}
                                        className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Not Match State */}
                {notMatch && <NotMatch pattern={searchPattern} />}

                {/* Blog Grid */}
                {!notMatch && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
                        {blogData.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!notMatch && blogData.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6">
                            <svg className="w-10 h-10 text-neutral-400 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">No blogs found</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6">Try adjusting your filters or search terms</p>
                        <button
                            onClick={() => {
                                setCategory('All');
                                setSortOrder('');
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Click outside to close dropdowns */}
            {(isFilterOpen || isSortOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsFilterOpen(false);
                        setIsSortOpen(false);
                    }}
                ></div>
            )}
        </div>
    );
};

export default AllBlog;