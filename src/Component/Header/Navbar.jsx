import { Link, NavLink } from 'react-router';
import React, { use, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, signout } = use(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    signout().then(() => {
      toast("Log out successful");
    }).catch(error => {
      toast.warn(error.message);
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const links = (
    <>
      <NavLink 
        to='/' 
        onClick={closeMobileMenu}
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`
        }
      >
        Home
      </NavLink>
      
      {user && (
        <>
          <NavLink 
            to='/addblog' 
            onClick={closeMobileMenu}
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`
            }
          >
            Add Blog
          </NavLink>
          <NavLink 
            to='/wishlist' 
            onClick={closeMobileMenu}
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`
            }
          >
            Wishlist
          </NavLink>
        </>
      )}
      
      <NavLink 
        to='/allblog' 
        onClick={closeMobileMenu}
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`
        }
      >
        All Blogs
      </NavLink>
      
      <NavLink 
        to='/featureblog' 
        onClick={closeMobileMenu}
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`
        }
      >
        Featured
      </NavLink>
      
      <NavLink 
        to='/aboutus' 
        onClick={closeMobileMenu}
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`
        }
      >
        About
      </NavLink>
      
      <NavLink 
        to='/contactus' 
        onClick={closeMobileMenu}
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow-md backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to='/' 
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dev
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Blog
              </span>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {links}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link 
                  to='/register' 
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 text-sm sm:text-base"
                >
                  Register
                </Link>
                <Link 
                  to='/login' 
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <div className="relative group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 cursor-pointer hover:ring-4 transition-all duration-200">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 right-0 bg-neutral-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {user.displayName || user.email}
                  </div>
                </div>
                <button 
                  onClick={handleLogOut} 
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col gap-2 mb-4">
            {links}
          </div>
          
          {/* Mobile Auth Buttons */}
          {!user ? (
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <Link 
                to='/register'
                onClick={closeMobileMenu}
                className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200 text-center"
              >
                Register
              </Link>
              <Link 
                to='/login'
                onClick={closeMobileMenu}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-700 rounded-lg">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-500">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  handleLogOut();
                  closeMobileMenu();
                }}
                className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-700 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;