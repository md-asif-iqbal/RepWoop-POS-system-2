"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function NewEmployeeForm () {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const pathname = usePathname();

    const [formData, setFormData] = useState({
        joiningDate: "",
        name: "",
        email: "",
        phone: "",
        salary: "",
        overtimeRate: "0", // Default to 0 as per the form instruction
        address: ""
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // logic to save or send the data, e.g., sending it to an API
      };
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>

    <div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">New Employee</h1>
    <div className=' lg:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Employee-and-Salary" className= {`${
                          pathname === '/Employee-and-Salary' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Employees
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/New-Employee" className={`${
                          pathname === '/Employee-and-Salary/New-Employee' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + New Employee
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/Salary" className= {`${
                          pathname === '/Employee-and-Salary/Salary' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Employees Salary
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/Salary/Create" className= {`${
                          pathname === '/Employee-and-Salary/Salary/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + New Employee Salary
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/Payments" className= {`${
                          pathname === '/Employee-and-Salary/Payments' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Payment List
        <span className={spanClass}></span>
        </Link>
    </div>
  </div>
  <div className="w-full  mx-auto p-4 dark:bg-[#1b1b3b]">
      <h2 className=" dark:text-white text-lg  mb-4 dark:text-white">New Employee</h2>
      <form className="bg-white dark:bg-[#1b1b3b] shadow-sm  rounded px-8 pt-6 pb-8 mb-4 dark:text-white" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Joining Date */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="joiningDate">
              Joining Date<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="joiningDate"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Name */}
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="name"
              name="name"
              type="text"
              placeholder="Enter Employee Name..."
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Email */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none bg-white block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="email"
              name="email"
              type="email"
              placeholder="Enter Employee Email..."
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Phone */}
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="phone">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter Employee Phone..."
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Salary */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="salary">
              Salary<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="salary"
              name="salary"
              type="number"
              placeholder="Enter Employee Salary..."
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Overtime Rate */}
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="overtimeRate">
              Overtime Rate<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="overtimeRate"
              name="overtimeRate"
              type="number"
              placeholder="Must be written as 0 if not applicable"
              value={formData.overtimeRate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="w-full px-3 mb-6">
          <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="address"
            name="address"
            placeholder="Write Address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-center">
          <button
            className="bg-emerald-500 hover:bg-teal-700 text-white  py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  
 
</div>
</div>
  )
}
