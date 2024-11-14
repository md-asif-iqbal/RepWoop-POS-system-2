'use client'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState,useEffect } from 'react'
import { AlignJustify, ArrowLeftFromLine, ArrowRightFromLine, Moon, SunMedium, SunMoon} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Sidebar from '../Sidebar/Sidebar';







export default function Navigation() {
  const { isLoggedIn, logout } = useUser();

  const [theme, setTheme] = useState(null); // State to track theme ('light' or 'dark')
 
  const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

  const pathname = usePathname();
  useEffect(() => {
    // Function to detect system preference for dark mode
    const detectSystemTheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    };
  
    // Check local storage for saved theme or fallback to system theme
    const savedTheme = localStorage.getItem('theme') || detectSystemTheme();
    setTheme(savedTheme);
    
    // Apply theme class to the document root (html)
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Toggle between light and dark mode
  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  
    // Apply theme class to the document root (html)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };


  return (
    <div className='w-[100%] lg:w-[86%] fixed top-0 z-50 font-nunito text-sm'>

        <div className="navbar bg-white dark:bg-[#141432] backdrop-blur-sm items-center ">
            <div className="navbar-start flex items-center">
            <span className='min-[769px]:hidden '><Sidebar /></span>
                <a className=" text-gray-500 dark:text-white  md:text-md">Repwoop POS Software</a>
            </div>
            {/* nav center */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu-horizontal gap-8 px-1">
                <li >
                  <Link href="/POS" className=
                        {`${
                          pathname === '/POS' 
                            ? ' group text-orange-500  ' 
                            : 'group text-gray-500 dark:text-white hover:text-orange-500'
                        }`}>
                            POS
                  <span className={spanClass}></span>
                  </Link>
                  
                </li>
                <li>
                  <Link href="/Sales"  className=
                  {`${
                    pathname === '/Sales' 
                      ? ' group text-orange-500  ' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500'
                  }`}
               
                  >
                   
              Sales
   
                            
                  <span className={spanClass}></span>
                  </Link>
                </li>
                <li>
                  <Link href="/Stock" className=
                        {`${
                          pathname === '/Stock' 
                            ? ' group text-orange-500  ' 
                            : 'group text-gray-500 dark:text-white hover:text-orange-500'
                        }`}>
                            Stock
                  <span className={spanClass}></span>
                  </Link>
                </li>
                <li>
                  <Link href="/Products" className=
                        {`${
                          pathname === '/Products' 
                            ? ' group text-orange-500  ' 
                            : 'group text-gray-500 dark:text-white hover:text-orange-500'
                        }`}>
                  Products
                  <span className={spanClass}></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className='navbar-end'>
            <div className="w-full h-full flex flex-col justify-end items-end">
              <div className="flex justify-end items-end px-4">
                {/* Sun Icon */}
                <span>
                  <svg
                    className={`h-6 w-6  ${theme === 'dark' ? 'text-gray-400' : 'text-[#FF9F43]'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <SunMedium  />
                  </svg>
                </span>

                {/* Toggle Switch */}
                <div
                  className={`w-11 h-6 flex items-center rounded-full mx-3 px-1 cursor-pointer transition-colors duration-500 ${
                    theme === 'dark' ? 'bg-rose-500' : 'bg-[#FF9F43]'
                  }`}
                  onClick={handleToggle}
                >
                  {/* Switch Knob */}
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-500 ease-in-out ${
                      theme === 'dark' ? 'translate-x-5' : ''
                    }`}
                  ></div>
                </div>

                {/* Moon Icon */}
                <span>
                  <svg
                    className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <Moon />
                  </svg>
                </span>
              </div>
            </div>
            <div className="dropdown dropdown-end">
            
     <div>
     {isLoggedIn ? (
            <Link href="/"><button className='bg-rose-500 p-1 px-5 rounded-full text-white flex items-center gap-1' onClick={logout}>Logout <ArrowRightFromLine size={16} /></button></Link>
          ) : (
            <Link href="/Login"> <button className='bg-cyan-500 p-1 px-5 rounded-full text-white flex items-center gap-1 '> <ArrowLeftFromLine size={16} />Login</button></Link>
          )}
     {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            alt="Tailwind CSS Navbar component"
            width={200}
            height={300}
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 mr-10 shadow dark:text-white">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><Link href="/Login">Log In</Link></li>
      </ul> */}
     </div>
            </div>
          </div>
        </div>
                


    </div>
  )
}
