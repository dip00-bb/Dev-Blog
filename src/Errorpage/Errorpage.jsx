import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center px-6">
      <div className="bg-white/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center max-w-lg w-full">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 drop-shadow-md animate-bounce">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-3 mb-8">
          The page you’re looking for doesn’t exist, has been moved, 
          or is temporarily unavailable.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
