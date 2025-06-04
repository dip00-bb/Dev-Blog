import React from 'react';
import Navbar from '../Component/Header/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
const RootLayout = () => {
    return (
        <div>
            <header><Navbar/></header>
                <Outlet/>
            <footer></footer>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;