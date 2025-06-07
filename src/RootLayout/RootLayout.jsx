import React from 'react';
import Navbar from '../Component/Header/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../Component/Footer/Footer';
const RootLayout = () => {
    return (
        <div>
            <header><Navbar/></header>
                <Outlet/>
            <footer><Footer/></footer>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;