import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-white text-sm py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col items-center space-y-4">

                <nav className="flex space-x-6">
                    <Link to="" className="hover:text-gray-900 text-xl">Home</Link>
                    <Link to="/" className="hover:text-gray-900 text-xl">Articles</Link>
                    <Link to="/" className="hover:text-gray-900 text-xl">About</Link>
                    <Link to="/" className="hover:text-gray-900 text-xl">Contact</Link>
                </nav>


                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-900"><FaTwitter size={30} /></a>
                    <a href="#" className="hover:text-gray-900"><FaGithub size={30} /></a>
                    <a href="#" className="hover:text-gray-900"><FaLinkedin size={30} /></a>
                </div>


                <p className="text-center text-2xl">&copy; 2023 DevBlog. All rights reserved.</p>
            </div>
        </footer>
    );
}
