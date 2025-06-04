import { useState } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaApple, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col-reverse md:flex-row max-w-4xl w-full bg-white rounded-lg overflow-hidden items-center"
      >

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 p-8 text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome Back to <span className="text-indigo-600">Manage</span> Awesome Stuffs
          </h2>
          <p className="font-bold mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Sign up here
            </Link>
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 p-8"
        >
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Login
            </button>

            <div className="text-sm text-right">
              <Link to="/forgot-password" className="text-blue-600 underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative mt-4 text-center">
              <span className="text-gray-400 text-sm">Or Sign in with</span>
              <div className="mt-2 flex justify-center space-x-4">
                <button type="button" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
                  <FaFacebookF className="text-blue-600" />
                </button>
                <button type="button" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
                  <FaApple className="text-black" />
                </button>
                <button type="button" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
                  <FaGoogle className="text-red-500" />
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
