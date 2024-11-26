'use client'

import Link from 'next/link'
import React, { Children, useEffect, useRef, useState } from 'react'
import { IoHome } from "react-icons/io5";
import { MdPerson3 } from "react-icons/md";
import { GiBank, GiCash } from "react-icons/gi";
import { FaCartArrowDown } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { TbShoppingCartDollar } from "react-icons/tb";
import { FaBoxesPacking, FaPeopleGroup } from "react-icons/fa6";
import { RiFileDamageFill, RiFileDamageLine } from "react-icons/ri";
import { GiWeight } from "react-icons/gi";
import { RiProductHuntFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { GiExpense } from "react-icons/gi";
import { TbBrandSupernova } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import { FaSms } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { Ri24HoursLine } from "react-icons/ri";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";
import { PiBoxArrowDownBold } from "react-icons/pi";
import { FaBoxTissue } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { MdOutlineSettings } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { SiNginxproxymanager } from "react-icons/si";
import { MdBackup } from "react-icons/md";
import Image from 'next/image';
import logo from '../../../../assets/logo.png'
import { usePathname } from 'next/navigation';


import { Component,UserRound,Landmark,Banknote, Wallet, SmartphoneNfc, BadgeDollarSign, 
    LayoutList, LayoutDashboard, MailPlus, Users, PackageCheck, UserCog, ChartColumn,
    CalendarClock, CalendarDays, FileClock, CalendarCog, FileChartColumnIncreasing,
    PackageMinus, UserRoundSearch, ChartNoAxesCombined, Receipt, FileBox, CalendarPlus,
    CalendarFold, Cog, BadgeInfo, DatabaseBackup, UserCheck, Settings, 
    AlignJustify,
    Building2,
    PackageX,
    FileX,
    UsersRound} from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { BaggageClaim } from 'lucide-react';
import { Truck } from 'lucide-react';
import { RotateCcwSquare } from 'lucide-react';
import { Boxes } from 'lucide-react';
import { Weight } from 'lucide-react';
import { Package } from 'lucide-react';
import { Ribbon } from 'lucide-react';


export default function Sidebar() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const pathname = usePathname();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const sidebarRef = useRef(null); // Ref for the sidebar
    const toggleButtonRef = useRef(null); // Ref for the toggle button (optional)
  
  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle the sidebar
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if sidebarRef and toggleButtonRef are defined and not null before checking .contains()
      if (
        sidebarRef.current && // Ensure sidebarRef is not null
        !sidebarRef.current.contains(event.target) && // Click is outside sidebar
        toggleButtonRef.current && // Ensure toggleButtonRef is not null
        !toggleButtonRef.current.contains(event.target) // Click is outside the toggle button
      ) {
        setIsSidebarOpen(false); // Close the sidebar
      }
    };

    // Add event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className='font-nunito text-sm z-50'>
        <div className="dropdown lg:hidden items-center">
                <div  ref={toggleButtonRef} tabIndex={0} role="button" className="btn btn-ghost sm:block lg:hidden dark:text-white " onClick={toggleSidebar}>
                <AlignJustify size={20} strokeWidth={2} className='' />
                </div>
               
                </div>
          <div ref={sidebarRef} // Attach the ref to the sidebar
             id="sidebar"
             className={`sidebar  fixed z-50  lg:static  bg-white dark:bg-[#141432] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent p-2 space-y-3   md:h-screen   transition-all duration-700 ease-in-out 
             ${isSidebarOpen ? 'w-64 opacity-100 ' : 'w-0 opacity-0 hidden lg:block'}
             lg:w-64 lg:opacity-100`} // Always show on large screens (lg+)
             style={{ overflowY: 'auto', maxHeight:"100vh" }}
         >

            <div className={`space-y-4 text-[14px] transition-opacity  border-r-2 duration-600 ease-in-out`}>
                {/* font*/}
               <Link href="/home"> <Image src={logo} width={150} height={300} alt='Repwoop POS Software' className='bg-transparent w-[60%] xl:w-[90%]'/></Link>
                <div className="text-start ">
                    <ul className="pt-2 space-y-4 text-gray-600 dark:text-white ">
                        <li>
                        
                        <Link href="/home"  className=
                        {`${
                          pathname === '/home' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span><LayoutDashboard size={20}  strokeWidth={1} /></span> 
                          <div>
                          <p>Dashboard</p>
                          <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                        <li>
                        
                        <Link href="/Owners"  className=
                        {`${
                          pathname === '/Owners' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span><UserRound size={20} strokeWidth={1}/></span> 
                          <div>
                          <p>Owners</p>
                          <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>

                        <li >
                        <Link href="/Bank_Accounts" className=
                        {`${
                          pathname === '/Bank_Accounts' 
                            ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                            : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                        }`}>
                            <span><Landmark size={20} strokeWidth={1}/></span> 
                            <div>
                            <p>Bank Accounts</p>
                            <span className={spanClass}></span>
                            </div>
                        </Link>
                        </li>
                        {/* <li>
                        
                        <Link href="/Cash_Book" className=
                        {`${
                          pathname === '/Cash_Book' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                            <Banknote size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                          <p>Cash Book</p>
                          <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li> */}
                        
                    </ul>
                </div>
                {/* Sales & Purchase */}
                <div className="">
                    <span className="uppercase text-sm text-gray-500 dark:text-white ">
                    Sales & Purchase 
                    </span>
                    <ul className="pt-2 space-y-4 text-gray-500 dark:text-white ">
                        <li>
                        
                        <Link href="/POS" className=
                        {`${
                          pathname === '/POS' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <ShoppingCart size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>POS</p>
                            <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                        <li>
                        
                        <Link href="/Sales" 
                        className=
                        {`${
                          pathname === '/Sales' 
                            ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <ShoppingBag size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>Sales</p>
                            <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                        <li>
                      
                        <Link href="/Returns" className=
                        {`${
                          pathname === '/Returns' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <RotateCcwSquare size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>Returns</p>
                            <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                        <li>
                        <Link href="/Purchase" className=
                        {`${
                          pathname === '/Purchase' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <BaggageClaim size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>Purchase</p>
                            <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                        <li>
                        
                        <Link href="/Stock" className=
                        {`${
                          pathname === '/Stock' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <Boxes size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>Stock</p>
                            <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                        <li>
                        
                        <Link href="/Damages" className=
                        {`${
                          pathname === '/Damages' 
                            ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <FileX size={20} strokeWidth={1} />
                          </span> 
                          <div>
                            <p>Damages</p>
                            <span className={spanClass}></span>
                          </div>
                        </Link>
                        </li>
                    </ul>
                </div>

                {/* Product Information */}
                <div>
                    <span className="uppercase text-sm text-gray-500 dark:text-white ">
                    Product Information 
                    </span>
                    <ul className="pt-2 space-y-4 text-gray-500 dark:text-white ">
                    <li>
                        
                        <Link href="/Products" className=
                    {`${
                      pathname === '/Products' 
                      ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                  }`}>
                      <span>
                      <Package size={20} strokeWidth={1}/>
                      </span> 
                      <div>
                        <p>Products</p>
                        <span className={spanClass}></span>
                      </div>
                        </Link>
                    </li>
                    
                        <li>
                        
                            <Link href="/Units" className=
                        {`${
                          pathname === '/Units' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <Weight size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>Units</p>
                            <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                       
                        <li>
                        
                            <Link href="/Categories" className=
                        {`${
                          pathname === '/Categories' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <Component size={20} strokeWidth={1} />
                          </span> 
                          <div>
                            <p>Categories</p>
                            <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Brands" className=
                        {`${
                          pathname === '/Brands' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <Ribbon size={20} strokeWidth={1}/>
                          </span> 
                          <div>
                            <p>Brands</p>
                            <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                    </ul>

                </div>

                {/* Expenses & Payments */}
                <div>
                    <span className="uppercase text-sm text-gray-500 dark:text-white ">
                    Expenses & Payments 
                    </span>
                    <ul className="pt-2 space-y-4 text-gray-500 dark:text-white">
                        <li>
                            
                            <Link href="/Expenses" className=
                        {`${
                          pathname === '/Expenses' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <Wallet size={20} strokeWidth={1} />
                          </span> 
                          <div>
                            <p>Expenses</p>
                            <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Payments" className=
                                {`${
                                pathname === '/Payments' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <BadgeDollarSign size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Payments</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Promotion */}
                <div>
                    <span className="uppercase text-sm text-gray-500 dark:text-white">
                    Promotions
                    </span>
                    <ul className="pt-2 space-y-4 text-gray-500 dark:text-white">
                        <li>
                        
                            <Link href="/Promotional-SMS" className=
                        {`${
                          pathname === '/Promotional-SMS' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <MailPlus size={20} strokeWidth={1} />
                          </span> 
                          <div>
                              <p>Promotional SMS</p>
                              <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {/* Peoples */}
                    <span className="uppercase text-sm text-gray-500 dark:text-white ">
                    Peoples 
                    </span>
                    <ul className="pt-2 space-y-4 text-gray-500 dark:text-white ">
                        <li>
                            <Link href="/Customers" className=
                                {`${
                                pathname === '/Customers' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <Users size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Customers</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Suppliers" className=
                                {`${
                                pathname === '/Suppliers' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <UsersRound size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Suppliers</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Employee-and-Salary" className=
                                {`${
                                pathname === '/Employee-and-Salary' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <UserCog size={20}  strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Employee And Salary</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Reports */}
                <div>
                    <span className="uppercase text-sm text-gray-500 dark:text-white ">Reports</span>
                    <ul className="pt-2 space-y-4  text-gray-500 dark:text-white ">
                        <li>
                            <Link href="/Profit-Loss-Report" className=
                        {`${
                          pathname === '/Profit-Loss-Report' 
                            ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                            : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                        }`}>
                            <span>
                            <ChartColumn size={20} strokeWidth={1} />
                            </span> 
                            <div>
                                <p>Profit Loss Report</p>
                                <span className={spanClass}></span>
                            </div>
                            </Link>
                        </li>
                        <li>
                        
                        
                            <Link href="/Today-Report" className=
                        {`${
                          pathname === '/Today-Report' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <CalendarDays size={20} strokeWidth={1} />
                          </span> 
                          <div>
                              <p>Today Report</p>
                              <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Current-Month-Report" className=
                                {`${
                                pathname === '/Current-Month-Report' 
                                    ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                    : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                }`}>
                                    <span>
                                    <CalendarClock size={20} strokeWidth={1} />
                                    </span> 
                                    <div>
                                        <p>Current Month Report</p>
                                        <span className={spanClass}></span>
                                    </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Summary-Report" className=
                                {`${
                                pathname === '/Summary-Report' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <FileClock size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Summary Report</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Daily-Report" className=
                                {`${
                                pathname === '/Daily-Report' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <CalendarCog size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Daily Report</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Customer-Due-Report" className=
                                {`${
                                pathname === '/Customer-Due-Report' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <TbReportMoney size={22} strokeWidth={1}/>
                                </span> 
                                <div>
                                    <p>Customer Due Report</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Supplier-Due-Report" className=
                        {`${
                          pathname === '/Supplier-Due-Report' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <FileChartColumnIncreasing size={20} strokeWidth={1} />
                          </span> 
                          <div>
                              <p>Supplier Due Report</p>
                              <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>
                        
                        <li>
                        
                            <Link href="/Low-Stock-Report" className=
                                {`${
                                pathname === '/Low-Stock-Report' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <PackageMinus size={20}  strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Low Stock Report</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                        
                            <Link href="/Top-Customer" className=
                                {`${
                                pathname === '/Top-Customer' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <UserRoundSearch size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Top Customer</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                        
                        
                            <Link href="/Top-Product" className=
                        {`${
                          pathname === '/Top-Product' 
                          ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                      }`}>
                          <span>
                          <ChartNoAxesCombined size={20} strokeWidth={1} />
                          </span> 
                          <div>
                              <p>Top Product</p>
                              <span className={spanClass}></span>
                          </div>
                            </Link>
                        </li>

                        <li>
                            <Link href="/Category-Wise-Report" className=
                                {`${
                                pathname === '/Category-Wise-Report' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                            }`}>
                                <span>
                                <FileBox size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Category Wise Report</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>

                        <li>
                            <Link href="/Purchase-Report" className=
                                {`${
                                pathname === '/Purchase-Report' 
                                    ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                    : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                }`}>
                                    <span>
                                        <Receipt size={20} strokeWidth={1} />
                                    </span> 
                                    <div>
                                        <p>Purchase Report</p>
                                        <span className={spanClass}></span>
                                    </div>
                            </Link>
                        </li>
                        {/* <li>
                        
                            <Link href="/Customer-Ledger" className=
                                {`${
                                pathname === '/Customer-Ledger' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                }`}>
                                <span>
                                <CalendarPlus size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Customer Ledger</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Supplier-Ledger" className=
                                {`${
                                pathname === '/Supplier-Ledger' 
                                ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                }`}>
                                <span>
                                <CalendarFold size={20} strokeWidth={1} />
                                </span> 
                                <div>
                                    <p>Supplier Ledger</p>
                                    <span className={spanClass}></span>
                                </div>
                            </Link>
                        </li> */}
                    </ul>
                </div>
                 {/* Settings & Customize */}
                 <div>
                            <span className="uppercase text-sm text-gray-500 dark:text-white ">
                                Settings & Customize 
                            </span>
                            <ul className="pt-2 space-y-4 text-gray-500 dark:text-white ">
                            <li>
                            
                                <Link href="/Settings" className=
                                    {`${
                                    pathname === '/Settings' 
                                    ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                    : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                    }`}>
                                    <span>
                                    <Settings size={20} strokeWidth={1} />
                                    </span> 
                                    <div>
                                        <p>Settings</p>
                                        <span className={spanClass}></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/Roles-And-Permissions" className=
                                    {`${
                                    pathname === '/Roles-And-Permissions' 
                                    ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                    : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                    }`}>
                                    <span>
                                    <BadgeInfo size={20} strokeWidth={1} />
                                    </span> 
                                    <div>
                                        <p>Roles And Permissions</p>
                                        <span className={spanClass}></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                            
                                <Link href="/Users" className=
                                    {`${
                                    pathname === '/Users' 
                                    ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                    : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                    }`}>
                                    <span>
                                    <UserCheck size={20} strokeWidth={1} />
                                    </span> 
                                    <div>
                                        <p>Users</p>
                                        <span className={spanClass}></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                            
                            
                                <Link href="/Assets-Management" className=
                                    {`${
                                    pathname === '/Assets-Management' 
                                    ? ' group text-orange-500 flex items-center gap-3 hover:text-orange-500' 
                                    : 'group text-gray-500 dark:text-white hover:text-orange-500 flex items-center gap-3'
                                    }`}>
                                    <span>
                                    <Cog size={20} strokeWidth={1} />
                                    </span> 
                                    <div>
                                        <p>Assets Management</p>
                                        <span className={spanClass}></span>
                                    </div>
                                </Link>
                            </li>
                            </ul>
                        </div>

                        {/* Backup */}
                        <div className='flex items-center gap-3 hover:text-orange-500  text-gray-500 dark:text-white '>
                        <DatabaseBackup size={20} strokeWidth={1} />
                            <span className="uppercase text-sm text-gray-500 dark:text-white hover:text-orange-500">Backup</span>
                        </div>
                        <div className='flex items-center gap-3 hover:text-orange-500  text-gray-500 dark:text-white pb-28 md:pb-8'>
                        <Building2 size={20} strokeWidth={1}/>
                            <span className="uppercase text-sm text-gray-500 dark:text-white hover:text-orange-500">Repwoop</span>
                        </div>
                    
                
            </div>
        </div>
        {/* <Outlet */}
        {/* <div className="flex-1 p-2 text-md "> */}
                {/* <Dashboard/> */}
        {/* </div> */}
    </div>
  )
}
