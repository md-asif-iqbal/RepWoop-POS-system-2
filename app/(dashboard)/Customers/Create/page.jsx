"use client"

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CustomerAdded() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [openingBalance, setOpeningBalance] = useState("");


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = {
        name: customerName,
        email,
        phone,
        address,
        opening_balance: parseFloat(openingBalance) || 0, // Ensure numeric value
      };
    
      try {
        const response = await fetch("/Customers/customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) throw new Error("Failed to save customer");
    
        const result = await response.json();
        console.log("Customer Saved Successfully:", result);
    
        // Optionally reset the form fields
        setCustomerName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setOpeningBalance("");
        toast.success("Customer added successfully!");
      } catch (error) {
        console.error("Error saving customer:", error);
        toast.error("Failed to add customer. Please try again.");
      }
    };
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm md:h-screen'>

        <div className="p-0  mt-[25%] lg:mt-[5%]  w-full dark:text-white">
        {/* Title Section */}
      <div className=" mb-4  shadow-sm ">
      <h1 className="text-lg text-gray-500 mx-5 dark:text-white  ">Customers</h1>
        <div className='flex items-start justify-start mx-5 py-5 gap-10'>
            <Link href="/Customers" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            Customers
            <span className={spanClass}></span>
            </Link>
            <Link href="/Customers/Create" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            + Add Customers
            <span className={spanClass}></span>
            </Link>
        </div>
      </div>
      <div className="w-full  mx-auto p-4">
      <h2 className=" dark:text-white text-lg  mb-4">New Customer</h2>
      <form className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4 text-sm dark:bg-[#181838] " onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="customer-name">
              Customer Name<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="customer-name"
              type="text"
              placeholder="Enter Customer Name..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none block bg-white w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="email"
              type="email"
              placeholder="Enter Customer Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="phone">
              Phone<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-white  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="phone"
              type="text"
              placeholder="Enter Customer Phone..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="appearance-none block w-full bg-white  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="address"
              type="text"
              placeholder="Write Customer Address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="opening-Balance">
              Opening Balance
            </label>
            <input
              className="appearance-none block w-full bg-white  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="opening-Balance"
              type="number"
              placeholder="Enter Opening Balance..."
              value={openingBalance}
              onChange={(e) => setOpeningBalance(e.target.value)}
            />
          </div>

        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-emerald-500 hover:bg-teal-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
