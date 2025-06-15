import { Link, NavLink } from 'react-router';
import React, { use } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';




const Navbar = () => {

  const handleLogOut = () => {
    signout().then(() => {
      toast("Log out successful")
    }).catch(error => {
      toast.warn(error.message)
    })
  }




  const { user, signout } = use(AuthContext)
  const links = <><li><NavLink className='text-xl hover:bg-blue-300' to='/'>Home</NavLink></li>
    <li><NavLink className='text-xl hover:bg-blue-300' to='/addblog'>Add Blog</NavLink></li>
    <li><NavLink className='text-xl hover:bg-blue-300' to='/allblog'>All Blog</NavLink></li>
    <li><NavLink className='text-xl hover:bg-blue-300' to='/featureblog'>Feature Blog</NavLink></li>
    <li><NavLink className='text-xl hover:bg-blue-300' to='/wishlist'>Wishlist</NavLink></li>
  </>
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {
              links
            }
          </ul>
        </div>
        <Link to='/' className="text-2xl font-bold text-blue-500">DevBlog</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            links
          }
        </ul>
      </div>
      <div className="navbar-end space-x-3">
        {
          !user ?

            <div className='space-x-3'>
              <Link to='/register' className="btn hover:btn-primary border-0">Register</Link>
              <Link to='/login' className="btn hover:btn-primary border-0">Login</Link>
            </div>
            :
            <div className='space-x-3'>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full relative">
                  <img
                    alt='not provide'
                    src={user.photoURL} />
                </div>
              </div>
              <button onClick={handleLogOut} className="btn hover:btn-primary">Logout</button>
            </div>
        }
      </div>
    </div>
  );
};

export default Navbar; 


