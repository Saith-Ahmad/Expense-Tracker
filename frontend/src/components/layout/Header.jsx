import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dollar from "../../../src/assets/dollar.png"
import { toast } from "react-toastify";


export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('user')
    navigate('/login')
    setIsLogin(false)
    toast.success("Logout successful!");
  }


  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    if (loginUser) {
      setIsLogin(true);
      setUser(loginUser);
    } else {
      setIsLogin(false);
      setUser('');
    }
  }, []);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900" >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
          <Link to="https://ahmadwebcraft.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={dollar} className="h-8" alt="Expense Logo" />
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">{user.name??"Expense Tracker"}</span>
          </Link>
          <button
          onClick={()=>setIsMenuOpen(true)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col items-center justify-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
                  Home
                </Link>
              </li>
             {
              !isLogin && 
              <>
               <li>
                <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Login
                </Link>
              </li>
              </>
             }
              {
                isLogin && 
                <li className='md:pt-2'>
               <button onClick={logoutHandler} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>
              </li>
              }
            </ul>
          </div>

          {isMenuOpen && 
             <div onClick={()=>setIsMenuOpen(false)}  className="md:hidden w-[1/3]  md:w-auto absolute top-10 right-5 z-[100]" id="navbar-default">
             <ul className="font-medium flex flex-col gap-3 justify-center items-center  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
               <li >
                 <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
                   Home
                 </Link>
               </li>
              {
               !isLogin && 
               <>
                <li>
                 <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                   Register
                 </Link>
               </li>
               <li>
                 <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                   Login
                 </Link>
               </li>
               </>
              }
               {
                 isLogin && 
                 <li className='md:pt-2 mx-3'>
                <button onClick={logoutHandler} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>
               </li>
               }
             </ul>
           </div>
          }
        </div>
      </nav>
    </>
  );
};
