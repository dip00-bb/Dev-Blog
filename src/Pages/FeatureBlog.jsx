import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { useLoaderData } from "react-router";
import { ThemeContext } from "../ThemeContext/DarkLight";

const FeatureBlog = () => {
    const featureBlog = useLoaderData();
    const { mode, textClass } = useContext(ThemeContext);

    const sortedBlog = [...featureBlog]
        .sort((a, b) => b.details.length - a.details.length)
        .slice(0, 10);

    const columns = [
        {
            name: "Serial",
            selector: (row) => row.id,
            sortable: true,
            wrap: true,
            width: "100px",
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            wrap: true,
            minWidth: "200px",
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
            wrap: true,
            cell: (row) => (
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700">
                    {row.category}
                </span>
            ),
            minWidth: "180px",
        },
        {
            name: "Content Preview",
            selector: (row) =>
                row.details.length > 100
                    ? `${row.details.slice(0, 100)}...`
                    : row.details,
            wrap: true,
            sortable: true,
            minWidth: "300px",
        },
    ];

    const customStyles = {
        table: {
            style: {
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: mode === "light" ? "#ffffff" : "#1f2937",
            },
        },
        header: {
            style: {
                fontSize: "18px",
                fontWeight: "700",
                color: mode === "light" ? "#1f2937" : "#f3f4f6",
                padding: "20px 24px",
                backgroundColor: mode === "light" ? "#f9fafb" : "#374151",
                borderBottom: mode === "light" ? "2px solid #e5e7eb" : "2px solid #4b5563",
            },
        },
        headRow: {
            style: {
                backgroundColor: mode === "light" ? "#f3f4f6" : "#374151",
                borderBottom: mode === "light" ? "2px solid #e5e7eb" : "2px solid #4b5563",
                minHeight: "56px",
            },
        },
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: mode === "light" ? "#374151" : "#d1d5db",
                padding: "16px 12px",
            },
        },
        rows: {
            style: {
                fontSize: "14px",
                padding: "4px 0",
                minHeight: "60px",
                borderBottom: mode === "light" ? "1px solid #f3f4f6" : "1px solid #374151",
                transition: "all 0.2s ease-in-out",
                backgroundColor: mode === "light" ? "#ffffff" : "#1f2937",
                "&:hover": {
                    backgroundColor: mode === "light" ? "#f9fafb" : "#374151",
                    transform: "scale(1.001)",
                    boxShadow: mode === "light" 
                        ? "0 2px 8px rgba(0, 0, 0, 0.05)" 
                        : "0 2px 8px rgba(0, 0, 0, 0.3)",
                },
            },
            stripedStyle: {
                backgroundColor: mode === "light" ? "#f9fafb" : "#252f3f",
            },
        },
        cells: {
            style: {
                wordBreak: "break-word",
                padding: "12px",
                color: mode === "light" ? "#374151" : "#e5e7eb",
            },
        },
        pagination: {
            style: {
                padding: "16px 24px",
                fontSize: "14px",
                fontWeight: "500",
                color: mode === "light" ? "#374151" : "#d1d5db",
                backgroundColor: mode === "light" ? "#f9fafb" : "#374151",
                borderTop: mode === "light" ? "2px solid #e5e7eb" : "2px solid #4b5563",
            },
            pageButtonsStyle: {
                borderRadius: "8px",
                height: "36px",
                width: "36px",
                padding: "8px",
                margin: "0 4px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                color: mode === "light" ? "#374151" : "#d1d5db",
                fill: mode === "light" ? "#374151" : "#d1d5db",
                backgroundColor: "transparent",
                "&:disabled": {
                    cursor: "not-allowed",
                    opacity: 0.5,
                },
                "&:hover:not(:disabled)": {
                    backgroundColor: mode === "light" ? "#e5e7eb" : "#4b5563",
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg mb-4 sm:mb-6">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        Featured Blogs
                    </h1>
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Top 10 blogs with the most comprehensive content
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                                    {sortedBlog.length}
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                    Featured Blogs
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                                    {new Set(sortedBlog.map(b => b.category)).size}
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                    Categories
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-neutral-700 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                                    Top 10
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                    By Length
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table Card */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 my-6">
                    <div className="overflow-x-auto">
                        <DataTable
                            columns={columns}
                            data={sortedBlog}
                            customStyles={customStyles}
                            responsive
                            highlightOnHover
                            striped
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        />
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                How are blogs featured?
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                                Blogs are automatically featured based on their content length. The top 10 blogs with the most comprehensive and detailed content are showcased here. Click on any column header to sort the table.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureBlog;