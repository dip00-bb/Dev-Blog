import { Link } from 'lucide-react';
import React from 'react';

const HoverButton = () => {
    return (
        <p to='/' class="relative inline-block px-4 py-2 font-medium group">
            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span class="absolute inset-0 w-full h-full bg-white border-2 border-blue-400 group-hover:bg-blue-400"></span>
            <span class="relative text-blue group-hover:text-white">Explore more</span>
        </p>
    );
};

export default HoverButton;