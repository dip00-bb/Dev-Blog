import React from 'react';
import Navbar from '../Component/Header/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../Component/Footer/Footer';
import ThemeToggle from '../Component/ToogleButton/ThemToogle';
const RootLayout = () => {
    return (
        <div className='bg-teal-50'>
            <header className='top-0 sticky z-50'><Navbar /></header>

            <div className='w-full'>
                <Outlet />
                {/* <ThemeToggle/> */}
            </div>

            <footer><Footer /></footer>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;