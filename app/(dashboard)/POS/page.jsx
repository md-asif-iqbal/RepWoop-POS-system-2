"use client"
import Loader from '@/app/Loaders/page';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function POSManage() {
   

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [openingBalance, setOpeningBalance] = useState("");

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/Products/Create/products');
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);

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
  
    if (loading) return <p> <Loader/></p>;
    if (error) return <p>Error: {error}</p>;

     // State for the filtered products, search term, and selected category
  


  // Function to filter products by category
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  // Function to handle search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchFilteredProducts = products.filter((product) => {
      return product.product_name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    // If a category is selected, further filter by category
    if (selectedCategory) {
      setFilteredProducts(
        searchFilteredProducts.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(searchFilteredProducts);
    }
  };


    return (
        <div className='bg-white dark:bg-[#141432] dark:text-white font-nunito text-sm'>
            <div className=" mt-[5%] ">
        {/* POS Manage Header */}
        <h1 className="text-lg dark:text-white  mb-6 ">POS Manage</h1>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



          {/* Left Section: Input and Payment */}
          <div className="p-2 bg-white dark:bg-[#202047]  shadow-sm w-full">
            <div className="flex flex-col gap-4 dark:text-black items-center w-full">
             
              <input
                type="text"
                placeholder="Start to write product name..."
                className="border bg-white w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Date Picker */}
              <input
                type="date"
                className="border bg-white w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="2024-09-21"
              />
              {/* Customer Dropdown */}
              <div className='flex w-full gap-5'>
              <select className="border bg-white w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Walk-in Customer</option>
                <option>Registered Customer</option>
              </select>
              {/* Add Button */}
              <button className="bg-emerald-500 text-white w-[50%] px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none"
              onClick={()=>document.getElementById('my_modal_3').showModal()}>
                Add
              </button>
              </div>
            </div>
            {/* model are here----- */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-2xl">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 dark:text-black">✕</button>
                    </form>
                    <div className=" bg-opacity-50 w-full dark:text-black">
                        <div className=" p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                            <h2 className=" dark:text-white text-md ">Add Customer</h2>
                            </div>

                            {/* Form */}
                            <form className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4 text-sm dark:bg-[#181838] " onSubmit={handleSubmit}>
                              <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full  px-3 mb-6 md:mb-0">
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
                                <div className="w-full  px-3">
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
                                <div className="w-full  px-3 mb-6 md:mb-0">
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
                                <div className="w-full  px-3">
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
                                <div className="w-full  px-3 mb-6 md:mb-0">
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
            </dialog>
  
            {/* Cart Table */}
            {/* <div className="mt-6">
              <table className="w-full border-collapse border border-gray-300 ">
                <thead>
                  <tr className="bg-emerald-500 text-white">
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Sub T</th>
                    <th className="border border-gray-300 p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" colSpan="3">
                      hi.....
                    </td>
                    <td className="border border-gray-300 p-2 text-center" colSpan="2">
                      Total: 0 Tk
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
  
            {/* Payment Button */}
            <div className="mt-4">
              <button className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600">
                Payment
              </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2'>
            <div
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white bg-opacity-40 backdrop-blur-lg hover:bg-opacity-60 transition duration-300 ease-in-out"
          >
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>


  {/* Button to Create Sale */}
  <div className="mt-4">
    <Link
      href="/Sales/Create"
      className="inline-block bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-200"
    >
      Create Sale
    </Link>
  </div>
            </div>
            <div
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white bg-opacity-40 backdrop-blur-lg hover:bg-opacity-60 transition duration-300 ease-in-out"
          >
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>


  {/* Button to Create Sale */}
  <div className="mt-4">
    <Link
      href="/Purchase/Create"
      className="inline-block bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-200"
    >
      Create Purchase
    </Link>
  </div>
            </div>


            <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white bg-opacity-40 backdrop-blur-lg hover:bg-opacity-60 transition duration-300 ease-in-out"
          >
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>


  {/* Button to Create Sale */}
  <div className="mt-4">
    <Link
      href="/Damages/Create"
      className="inline-block bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-200"
    >
      Create Damage
    </Link>
  </div>
            </div>


            </div>
          </div>
  
          {/* Right Section: Product Category and List */}
          <div className="bg-white dark:bg-[#202047] p-2  shadow-sm">
          <h1 className='text-md  mb-2'>Product List</h1>
            {/* Search Bar and Filtering */}
            <div className="md:flex items-center mb-4">
                {/* Search Input and Button */}
                <div className="flex w-full">
                    <input
                    type="text"
                    placeholder="Search products..."
                    className="border dark:text-black border-teal-500 w-[100%] rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearch}
                    />
                    <button
                    className="bg-green-500 text-white md:px-10 py-2 rounded-r-md hover:bg-green-600 focus:outline-none"
                    onClick={() => { /* Implement search logic here if needed */ }}
                    >
                    Search
                    </button>
                </div>

                {/* Reset Button */}
                <button
                    className="lg:ml-2 bg-blue-500 text-white px-8 mt-2 md:mt-0 md:px-10  py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => {
                      setFilteredProducts(products); // Reset filteredProducts to the full list
                      setSearchTerm(""); // Clear the search term
                      setSelectedCategory(""); // Clear the selected category
                    }}
                >
                    Reset
                </button>
            </div>


  
            {/* Categories */}
            <h1 className='text-md  mb-2'>Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full mb-4">
            {[...new Set(products?.map((item) => item.category))]?.map((category) => (
              <button
                key={category}
                onClick={() => filterByCategory(category)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md"
              >
                {category}
              </button>
            ))}
                        </div>
  
            {/* Product List */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts?.slice(0, 10)?.map((product) => (
                <div key={product.id} className="border border-gray-300 p-2 rounded-md">
                  <div className="bg-white h-24 flex justify-center items-center rounded-md">
                    <Image 
                            width={300} height={400}
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.product_name}
            
                              className="w-24 h-20 object-cover rounded mr-2"
                            /> 
                  </div>
                  <p className=" dark:text-white mt-2 ">{product.product_name} - 0000{product.id}</p>
                  <p>{product.sale_price} Tk</p>
                  <p>Stock: {product.stock} pc</p>
                </div>
              ))}
            </div>
  
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 mx-2 bg-gray-200 rounded-md hover:bg-gray-300">1</button>
              <button className="px-4 py-2 mx-2 bg-gray-200 rounded-md hover:bg-gray-300">2</button>
            </div>
          </div>
        </div>
            </div>
        </div>
    );
  };