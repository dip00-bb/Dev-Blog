import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 drop-shadow-md">404</h1>

      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4">
        Uh-oh! Page not found.
      </h2>

      <p className="text-gray-600 max-w-md mt-3 mb-6">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>

      <Link to="/" className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}