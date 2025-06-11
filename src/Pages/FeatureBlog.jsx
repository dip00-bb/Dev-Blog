// import React from 'react';
// import DataTable from 'react-data-table-component';
// import { useLoaderData } from 'react-router';

// const FeatureBlog = () => {

//     const featureBlog = useLoaderData();
//     console.log(featureBlog)





//     const columns = [

//         {
//             name: 'Blog Serial',
//             selector: row => row._id
//         },

//         {
//             name: 'Title',
//             selector: row => row.title

//         },
//         {
//             name: 'Category',
//             selector: row => row.category
//         },
//         {
//             name: 'Details',
//             selector: row => row.details
//         },

//     ]


//     return (
//         <div>
//             <DataTable columns={columns} data={sortedBlog}>

//             </DataTable>
//         </div>
//     );
// };

// export default FeatureBlog; 
import React from 'react';
import DataTable from 'react-data-table-component';
import { useLoaderData } from 'react-router';

const FeatureBlog = () => {
    const featureBlog = useLoaderData();

    const sortedBlog = [...featureBlog].sort((a, b) => b.details.length - a.details.length);

    const columns = [
        {
            name: 'Blog Serial',
            selector: row => row._id,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Details',
            selector: row =>
                row.details.length > 100
                    ? `${row.details.slice(0, 100)}...`
                    : row.details,
            wrap: true,
            sortable: false,
        },
    ];

    const customStyles = {
        table: {
            style: {
                minWidth: '700px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                overflow: 'hidden',
            },
        },
        header: {
            style: {
                fontSize: '18px',
                fontWeight: '600',
                color: '#333',
                padding: '16px 24px',
                backgroundColor: '#f9f9f9',
                borderBottom: '1px solid #eee',
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor: '#f0f0f5',
                color: '#222',
                padding: '12px',
            },
        },
        rows: {
            style: {
                fontSize: '15px',
                padding: '14px 12px',
                borderBottom: '1px solid #eee',
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: '#f9f9f9',
                },
            },
        },
        cells: {
            style: {
                wordBreak: 'break-word',
                padding: '12px',
            },
        },
        pagination: {
            style: {
                padding: '12px 24px',
                fontSize: '14px',
                color: '#333',
            },
        },
    };

    return (
        <div style={{
            overflowX: 'auto',
            padding: '24px',
            maxWidth: '100%',
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#333',
                textAlign: 'center',
            }}>
                📚 Featured Blogs (Sorted by Description Length)
            </h2>

            <DataTable
                columns={columns}
                data={sortedBlog}
                customStyles={customStyles}
                responsive
                pagination
                highlightOnHover
                striped
            />
        </div>
    );
};

export default FeatureBlog;
