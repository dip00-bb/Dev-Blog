import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="text-sm py-6 bg-gray-900">
            <div className="container mx-auto px-4 flex flex-col items-center space-y-4">

                <nav className="flex space-x-6">
                    <Link to="/" className=" text-white text-xl">Home</Link>
                    <Link to="/allblog" className="text-white text-xl">All Blog</Link>
                    <Link to="/aboutus" className="text-white text-xl">About</Link>
                    <Link to="/contactus" className="text-white text-xl">Contact</Link>
                </nav>


                <div className="flex space-x-4">
                    <a href="https://x.com/MovieLover23667" target="_blank" className="hover:text-gray-900"><FaTwitter size={30} fill="white"/></a>
                    <a href="https://github.com/dip00-bb" target="_blank" className="hover:text-gray-900"><FaGithub size={30} fill="white"/></a>
                    <a href="https://www.linkedin.com/in/dip-chondo-2b871b360/" target="_blank" className="hover:text-gray-900"><FaLinkedin size={30} fill="white"/></a>
                </div>


                <p className="text-center text-2xl text-white">&copy; 2023 DevBlog. All rights reserved.</p>
            </div>
        </footer>
    );
}
