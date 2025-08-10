

import React, { use } from 'react';
import { Link } from 'react-router';
import bannerImg from '../../assets/banner.png'
import bannerBg from '../../assets/banner_bg.png'
import { Typewriter } from 'react-simple-typewriter';
import { ThemeContext } from '../../ThemeContext/DarkLight';

const Banner = () => {

    const {textClass}=use(ThemeContext)

    return (
        <div className="relative lg:h-[80vh] flex flex-col-reverse lg:flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8"
            style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        >
            {/* Left side - white background with text */}
            <div className="flex-1 flex flex-col justify-center items-start gap-10 bg-white-red relative z-20 px-6 md:px-10 h-full">
                <p className="text-3xl md:text-6xl font-semibold text-blue-600">
                    <Typewriter
                        words={['Best Front-end Development Blogs You Should Follow']}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </p>
                <p className={`text-xl ${textClass}`}>
                    Discover the top front-end development blogs that every web developer should follow.
                    Stay updated with the latest trends, tools, tutorials, and expert insights in HTML,
                    CSS, JavaScript, frameworks, and UI/UX design.
                </p>
                <Link
                    className="text-black bg-blue-400 font-semibold py-3.5 px-6 duration-150 ease-in-out cursor-pointer hover:rounded-br-xl hover:rounded-tl-xl transition-all delay-200"
                    to="/allblog"
                >
                    Explore More
                </Link>

                {/* Wave SVG on the right edge of white background */}



            </div>

            {/* Right side - image on blue background */}
            <div
                className="md:flex-1 flex justify-center z-10 w-full lg:w-auto md:px-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bannerBg})` }}
            >
                <img className="lg:h-full md:w-full h-60" src={bannerImg} alt="banner" />
            </div>

        </div>
    );
};

export default Banner;
