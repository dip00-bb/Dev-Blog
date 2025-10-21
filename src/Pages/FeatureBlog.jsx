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
            name: "Blog Serial",
            selector: (row) => row.id,
            sortable: true,
            wrap: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            wrap: true,
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
            wrap: true,
        },
        {
            name: "Details",
            selector: (row) =>
                row.details.length > 100
                    ? `${row.details.slice(0, 100)}...`
                    : row.details,
            wrap: true,
            sortable: true,
        },
    ];

    // Dynamically set background and text colors based on mode
    const customStyles = {
        table: {
            style: {
                minWidth: "700px",
                borderRadius: "12px",
                boxShadow:
                    mode === "light"
                        ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                        : "0 4px 12px rgba(255, 255, 255, 0.1)",
                backgroundColor: mode === "light" ? "#fff" : "#1e293b", // dark slate gray, not pure black
                overflow: "hidden",
            },
        },
        header: {
            style: {
                fontSize: "18px",
                fontWeight: "600",
                color: mode === "light" ? "#333" : "#e2e8f0",
                padding: "16px 24px",
                backgroundColor: mode === "light" ? "#f9f9f9" : "#334155", // dark slate
                borderBottom: mode === "light" ? "1px solid #eee" : "1px solid #475569",
            },
        },
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: mode === "light" ? "#f0f0f5" : "#334155", // same dark slate
                color: mode === "light" ? "#222" : "#cbd5e0",
                padding: "12px",
            },
        },
        rows: {
            style: {
                fontSize: "15px",
                padding: "14px 12px",
                borderBottom: mode === "light" ? "1px solid #eee" : "1px solid #475569",
                transition: "background-color 0.3s",
                backgroundColor: mode === "light" ? "#fff" : "#1e293b", // base background for rows

                // For striped effect, use a subtle dark shade instead of white
                "&:nth-of-type(odd)": {
                    backgroundColor: mode === "light" ? "#fff" : "#1e293b",  // dark slate for odd rows
                },
                "&:nth-of-type(even)": {
                    backgroundColor: mode === "light" ? "#f9f9f9" : "#2e3a52",  // slightly lighter dark slate for even rows
                },

                "&:hover": {
                    backgroundColor: mode === "light" ? "#f9f9f9" : "#475569",
                },
            },
        },
        cells: {
            style: {
                wordBreak: "break-word",
                padding: "12px",
                color: mode === "light" ? "#333" : "#e2e8f0",
            },
        },
        pagination: {
            style: {
                padding: "12px 24px",
                fontSize: "14px",
                color: mode === "light" ? "#333" : "#cbd5e0",
                backgroundColor: mode === "light" ? "transparent" : "#1e293b", // subtle bg for pagination
            },
        },
    };


    return (
        <div
            style={{
                overflowX: "auto",
                padding: "24px",
                maxWidth: "100%",
                backgroundColor: mode === "light" ? "#fefefe" : "#121a2a",
                color: mode === "light" ? "#333" : "#eee",
                borderRadius: "12px",
            }}
        >
            <h2
                className={`${textClass} text-center font-extrabold text-2xl mb-4`}
                style={{ userSelect: "none" }}
            >
                📚 Featured Blogs
            </h2>

            <DataTable
                columns={columns}
                data={sortedBlog}
                customStyles={customStyles}
                responsive
                highlightOnHover
                striped
            />
        </div>
    );
};

export default FeatureBlog;
