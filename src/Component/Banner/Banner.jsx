// import React from 'react';
// import HoverButton from '../HoverButton/HoverButton';
// import { Link } from 'react-router';

// const Banner = () => {
//     return (
//         <div style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} className='max-w-11/12 mx-auto md:h-[80vh] flex flex-col-reverse lg:flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8' >

//             <div className='flex-1 flex justify-center items-start flex-col gap-10'>
//                 <p className='text-3xl md:text-6xl font-semibold'>Best Front-end Development Blogs You Should Follow</p>
//                 <p className='text-xl'>Discover the top front-end development blogs that every web developer should follow. Stay updated with the latest trends, tools, tutorials, and expert insights in HTML, CSS, JavaScript, frameworks, and UI/UX design.</p>
//                 <Link className="text-black bg-blue-400 font-semibold py-3.5 px-6 duration-150 ease-in-out cursor-pointer hover:rounded-br-xl hover:rounded-tl-xl transition-all delay-200" to='/allblog'>
//                     Explore More
//                 </Link>
//             </div>
//             <div className='md:flex-1 flex justify-center items-center md:h-[50vh]'>
//                 <img className='h-full w-full' src="./banner.png" alt="banner" />
//             </div>
//         </div>
//     );
// };

// export default Banner;


// import React from 'react';

// import { Link } from 'react-router';

// const Banner = () => {
//     return (
//         <div
//             style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
//             className='relative max-w-11/12 mx-auto md:h-[80vh] flex flex-col-reverse lg:flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8 bg-blue-400'
//         >
//             {/* SVG Wave Divider (Visible on large screens) */}
//             <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 z-10">

//             </div>

//             {/* Left - Text Content */}
//             <div className='flex-1 flex justify-center items-start flex-col gap-10 z-20'>
//                 <p className='text-3xl md:text-6xl font-semibold'>Best Front-end Development Blogs You Should Follow</p>
//                 <p className='text-xl'>Discover the top front-end development blogs that every web developer should follow. Stay updated with the latest trends, tools, tutorials, and expert insights in HTML, CSS, JavaScript, frameworks, and UI/UX design.</p>
//                 <Link className="text-black bg-blue-400 font-semibold py-3.5 px-6 duration-150 ease-in-out cursor-pointer hover:rounded-br-xl hover:rounded-tl-xl transition-all delay-200" to='/allblog'>
//                     Explore More
//                 </Link>
//             </div>

//             {/* Right - Image with Blue Background */}
//             <div className='md:flex-1 flex justify-center items-center md:h-[50vh] z-20 w-full lg:w-auto'>
//                 <img className='h-full w-full object-contain' src="./banner.png" alt="banner" />
//             </div>
//         </div>
//     );
// };

// export default Banner;

import React from 'react';
import { Link } from 'react-router';
import bannerImg from '../../assets/developer.png'
const Banner = () => {
    return (
        <div className="relative md:h-[70vh] flex flex-col-reverse lg:flex-row flex-wrap md:flex-nowrap justify-between items-center gap-8"
            style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        >
            {/* Left side - white background with text */}
            <div className="flex-1 flex flex-col justify-center items-start gap-10 bg-white-red relative z-20 px-6 md:px-10 h-full">
                <p className="text-3xl md:text-6xl font-semibold text-blue-600">
                    Best Front-end Development Blogs You Should Follow
                </p>
                <p className="text-xl text-gray-700">
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
            <div className="md:flex-1 flex justify-center items-center md:h-[50vh] z-10 w-full lg:w-auto px-6 md:px-0 ">

                {/* <svg
                    className="hidden lg:block absolute top-0 right-0 h-full w-20"
                    viewBox="0 0 100 800"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ pointerEvents: 'none' }}
                >
                    <path
                        fill="white"
                        d="
      M0,0 
       C30,150 70,150 100,300
      C130,450 70,650 100,800 
      
      L100,0 
      Z
    "
                    />
                </svg> */}

                <img className="lg:h-full md:w-full lg:object-contain h-60" src={bannerImg} alt="banner" />


            </div>
        </div>
    );
};

export default Banner;
