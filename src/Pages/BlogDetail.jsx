import React, { use } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const BlogDetail = () => {
    const {user}=use(AuthContext)
    return (
        <div>
            <title>Master on it</title>
            <div>
                <img src="img" alt="img" />
            </div>
            <div>
                <p>category</p>
            </div>
            <div>
                <p>details</p>
            </div>
            <div className='flex'>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src= {user}/>
                    </div>
                </div>
                <textarea name="" id=""></textarea>
            </div>
        </div>
    );
};

export default BlogDetail;