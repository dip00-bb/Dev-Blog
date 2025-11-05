
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";
import { use, useState } from "react";
import axiosPublic from "../axios/useAxiosPublic";

export default function Register() {

  const navigate = useNavigate();
  const { googleLogin, setUser, registerUser, updateUser } = use(AuthContext);

  const handleGoogleLogIn = () => {

    console.log("this is hitted")
    googleLogin().then((result) => {

      const user = result.user
      setUser(result.user)

      axiosPublic.post('/save-user', { userId: user?.uid })
        .then(() => {
          toast("Registration Successful");
          navigate('/')
        }).catch((err) => {
          toast.warn(err);
        })

      navigate('/')
    }).catch(error => {
      toast.warn(error.message)
    })
  }


  const [passwordError, setError] = useState('')


  const handleError = (password) => {
    setError('');
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    if (password.length < 6) {
      setError('Password must have at least 6 characters');
      return true;
    }

    if (!uppercaseRegex.test(password)) {
      setError('Password must have at least one uppercase letter');
      return true;
    }

    if (!numberRegex.test(password)) {
      setError('Password must have at least one number');
      return true;
    }

    if (!specialCharRegex.test(password)) {
      setError('Password must have at least one special character');
      return true;
    }

    return false;
  };


  const handleSignUpUser = (e) => {
    e.preventDefault()
    const target = e.target;
    const userName = target.name.value;
    const userEmail = target.email.value;
    const userPhotoURL = target.photoUrl.value;
    const password = target.password.value;

    const isError = handleError(password)

    if (isError) {
      return
    }
    registerUser(userEmail, password).
      then(result => {
        const user = result.user

        updateUser(userName, userPhotoURL).then(() => {

          setUser({ ...user, displayName: userName, photoURL: userPhotoURL });
          toast("Registration Successful");

          axiosPublic.post('/save-user', { userId: user?.uid })
            .then(() => {
              toast("Registration Successful");
              navigate('/')
            }).catch((err) => {
              toast(err);
            })

        }).catch(error => {
          setUser(user)
          toast.warn(error.message);
        })
      }).catch(error => {
        toast.warn(error.message);
      })

  }



  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col-reverse md:flex-row max-w-6xl w-full rounded-lg overflow-hidden items-center"
      >

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 p-8 text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-2">
            Sign up to <span className="text-indigo-600">Manage</span> Awesome Stuffs
          </h2>
          <p className="font-bold text-white mt-2">
            If you already have an account, you can{" "}
            <Link to="/login" className="text-blue-600 underline">
              login here
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2 p-8"
        >
          <form onSubmit={handleSignUpUser} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="url"
              placeholder="Photo url"
              name="photoUrl"
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
            >
              Sign up
            </button>

            <div className="relative mt-4 text-center">
              <span className="text-gray-400 text-sm">Or Sign up with</span>
              <div className="mt-2 flex justify-center space-x-4">
                <button onClick={handleGoogleLogIn} type="button" className="bg-white p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                  <FaGoogle className="text-red-500" />
                </button>
              </div>
            </div>
            {
              passwordError && <p className="text-red-600 text-center">{passwordError}</p>
            }
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
