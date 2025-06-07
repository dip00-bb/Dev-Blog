import React from 'react';

const NotMatch = ({pattern}) => {
    return (
        <div className="no-match">
            <h2 className='text-center font-semibold my-6'>No Results Found for <span className='text-red-600'>{pattern}</span></h2>
        </div>
    );
};

export default NotMatch;