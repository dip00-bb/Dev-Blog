import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

export default function Register() {

  const navigate = useNavigate();
  const { googleLogin } = use(AuthContext);

  const handleGoogleLogIn = () => {
    googleLogin().then(() => {
      toast("Registration Successful")
      navigate('/')
    }).catch(error => {
      toast.warn(error.message)
    })
  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);



  const validatePassword = (pass) => {
    const errorList = [];

    if (pass.length < 6) errorList.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(pass)) errorList.push("Password must include a capital letter.");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pass)) errorList.push("Password must include a special character.");
    if (!/\d/.test(pass)) errorList.push("Password must include a number.");

    return errorList;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(password);

    if (password !== confirmPassword) {
      passwordErrors.push("Passwords do not match.");
    }

    setErrors(passwordErrors);

    if (passwordErrors.length === 0) {
      console.log("Registering user:", { email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col-reverse md:flex-row max-w-6xl w-full rounded-lg overflow-hidden items-center"
      >
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 p-8 text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-2">
            Sign up to <span className="text-indigo-600">Manage</span> Awesome Stuffs
          </h2>
          <p className="font-bold text-gray-800 mt-2">
            If you already have an account, you can{" "}
            <Link to="/login" className="text-blue-600 underline">
              login here
            </Link>
          </p>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {errors.length > 0 && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm space-y-1">
                {errors.map((err, idx) => (
                  <p key={idx}>• {err}</p>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Sign up
            </button>

            <div className="relative mt-4 text-center">
              <span className="text-gray-400 text-sm">Or Sign up with</span>
              <div className="mt-2 flex justify-center space-x-4">
                <button type="button" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
                  <FaGithub className="text-blue-600" />
                </button>
                <button onClick={handleGoogleLogIn} type="button" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">
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
