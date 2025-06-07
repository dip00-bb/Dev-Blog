import React from 'react';
import Banner from '../Component/Banner/Banner';
import NewsLetter from '../Component/NewsLetter/NewsLetter';
import RecentBlog from '../Component/RecentBlog/RecentBlog';
import OurExpert from '../Component/OurExpert/OurExpert';
import TryOurAI from '../Component/TryAi/TryOurAI';

const Home = () => {
    return (
        <div>
            <Banner />
            <RecentBlog />
            <NewsLetter />
            <OurExpert/>
            <TryOurAI/>
        </div>
    );
};

export default Home;