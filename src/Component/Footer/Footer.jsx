import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="text-sm py-6 mt-10 bg-gray-900">
            <div className="container mx-auto px-4 flex flex-col items-center space-y-4">

                <nav className="flex space-x-6">
                    <Link to="/" className=" text-white text-xl">Home</Link>
                    <Link to="/" className="text-white text-xl">Articles</Link>
                    <Link to="/" className="text-white text-xl">About</Link>
                    <Link to="/" className="text-white text-xl">Contact</Link>
                </nav>


                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-900"><FaTwitter size={30} fill="white"/></a>
                    <a href="#" className="hover:text-gray-900"><FaGithub size={30} fill="white"/></a>
                    <a href="#" className="hover:text-gray-900"><FaLinkedin size={30} fill="white"/></a>
                </div>


                <p className="text-center text-2xl text-white">&copy; 2023 DevBlog. All rights reserved.</p>
            </div>
        </footer>
    );
}
