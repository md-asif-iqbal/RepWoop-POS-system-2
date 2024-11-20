"use client"

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SuppliersAdded() {
     const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const [suppliersName, setSuppliersName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [openingBalance, setOpeningBalance] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = {
        suppliersName,
        email,
        phone,
        address,
        openingBalance,
      };
    
      try {
        const response = await fetch("/Suppliers/suppliers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const { supplier } = await response.json();
          console.log("Supplier added successfully:", supplier);
    
          // Reset form fields
          setSuppliersName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setOpeningBalance("");
    
          toast.success("Supplier added successfully!");
        } else {
          const { error } = await response.json();
          console.error("Failed to add supplier:", error);
          toast.error("Failed to add supplier. Please try again.");
        }
      } catch (error) {
        console.error("Error adding supplier:", error);
        toast.error("An error occurred while adding the supplier.");
      }
    };
    
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm md:h-screen'>

        <div className="p-0  mt-[25%] lg:mt-[5%]  w-full dark:text-white">
        {/* Title Section */}
      <div className=" mb-4  shadow-sm ">
      <h1 className="text-lg dark:text-white  text-gray-500 mx-5 ">Suppliers </h1>
        <div className='flex items-start justify-start mx-5 py-5 gap-10'>
            <Link href="/Suppliers" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            Suppliers
            <span className={spanClass}></span>
            </Link>
            <Link href="/Suppliers/Create" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            + Add Suppliers
            <span className={spanClass}></span>
            </Link>
        </div>
      </div>
      <div className="w-full  mx-auto p-4">
      <h2 className=" dark:text-white text-lg  mb-4">New Suppliers</h2>
      <form className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4 text-sm dark:bg-[#181838] " onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="Suppliers-name">
              Suppliers Name<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none bg-white block w-full   text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="Suppliers-name"
              type="text"
              placeholder="Enter Suppliers Name..."
              value={suppliersName}
              onChange={(e) => setSuppliersName(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none bg-white block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="email"
              type="email"
              placeholder="Enter Suppliers Email..."
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
              className="appearance-none bg-white  block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="phone"
              type="text"
              placeholder="Enter Suppliers Phone..."
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
              className="appearance-none bg-white block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="address"
              type="text"
              placeholder="Write Suppliers Address..."
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
              className="appearance-none bg-white block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
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
