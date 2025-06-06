import React from 'react';
import Banner from '../Component/Banner/Banner';
import NewsLetter from '../Component/NewsLetter/NewsLetter';
import RecentBlog from '../Component/RecentBlog/RecentBlog';
import Footer from '../Component/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner />
            <RecentBlog />
            <NewsLetter />
            <Footer/>
        </div>
    );
};

export default Home;