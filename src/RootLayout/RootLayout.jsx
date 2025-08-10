import React, { use } from 'react';
import Navbar from '../Component/Header/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../Component/Footer/Footer';
import ThemeToggle from '../Component/ToogleButton/ThemToogle';
import { ThemeContext } from '../ThemeContext/DarkLight';
const RootLayout = () => {

    const {mode}=use(ThemeContext)

    return (
        <div className={`${mode==="light"?"bg-teal-50":"bg-gray-700"}`}>
            <header className='top-0 sticky z-50'><Navbar /></header>

            <div className='w-full'>
                <Outlet />
                <ThemeToggle className="place-content-center"/>
            </div>

            <footer><Footer /></footer>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;