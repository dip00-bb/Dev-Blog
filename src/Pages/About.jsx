import React, { use } from 'react';
import aboutus from '../assets/aboutus.png'
import { Link } from 'react-router';
import { ThemeContext } from '../ThemeContext/DarkLight';


const About = () => {

  const {textClass}=use(ThemeContext)
  return (
    <div className="w-full min-h-screen py-20 px-6 md:px-16 lg:px-32 flex justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={aboutus}
            alt="About us illustration"
            className="w-full h-auto max-w-md mx-auto lg:mx-0"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
            About Us
          </h2>
          <p className={`${textClass} text-lg mb-6 leading-relaxed`}>
            Welcome to our blogging community, where creativity meets code! We are passionate developers and writers who believe in sharing knowledge through well-crafted, insightful content.
          </p>
          <p className={`${textClass} text-lg mb-6 leading-relaxed`}>
            Our mission is to empower front-end and full-stack developers with tutorials, design inspiration, real-world projects, and community-driven discussions that spark learning and growth.
          </p>
          <Link to='/allblog' className="bg-blue-500 text-white font-semibold py-3 px-6 rounded hover:bg-blue-600 transition">
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
