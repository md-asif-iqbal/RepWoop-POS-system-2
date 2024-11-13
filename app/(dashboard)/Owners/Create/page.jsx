"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CreateOwner() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        photo: null,
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
          setFormData({ ...formData, [name]: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };
  return (
    <div className="bg-white dark:bg-[#141432] font-nunito text-sm">
        <div className=" shadow-sm  mt-[25%] lg:mt-[5%] ">
      <h1 className="text-lg dark:text-white  text-gray-500 mx-5 ">Owners</h1>
        <div className='flex items-start justify-start mx-5 py-5 gap-10'>
            <Link href="/Owners" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            Owners
            <span className={spanClass}></span>
            </Link>
            <Link href="/Owners/Create" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            + Add new Owners
            <span className={spanClass}></span>
            </Link>
        </div>
      </div>
         <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#141432] ">
      <div className="bg-white dark:bg-[#141432] p-10  shadow-sm lg:w-[60%]  -mt-[10%]">
        <h2 className=" dark:text-white lg:text-lg mb-6 text-center">Add Owner Information</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col items-center justify-center">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300">
              {formData.photo ? (
                <Image
                  src={URL.createObjectURL(formData.photo)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center text-gray-400 h-full text-sm">
                  No Image
                </span>
              )}
            </div>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="mt-4 bg-white block text-sm text-gray-500 "
            />
          </div>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Mobile Input */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Photo Upload */}
          

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-emerald-500 text-gray-500 dark:text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
        </div>
    </div>
  )
}
