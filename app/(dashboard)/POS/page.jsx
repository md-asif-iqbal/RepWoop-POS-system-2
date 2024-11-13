"use client"
import Loader from '@/app/Loaders/page';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function POSManage() {
   
    // const products = [
    //   { id: 1, name: "Air Conditioner", price: 96000, stock: 96, category: "House" },
    //   { id: 2, name: "Blazer For Men", price: 3000, stock: 98, category: "Fashion" },
    //   { id: 3, name: "Desktop Computer", price: 458, stock: 99, category: "Electronics" },
    //   { id: 4, name: "Door Export", price: 15000, stock: 100, category: "House" },
    //   { id: 5, name: "Drill Machine", price: 3000, stock: 100, category: "Hardware" },
    //   { id: 6, name: "Freezer", price: 4500, stock: 100, category: "House" },
    //   { id: 7, name: "Gaming Laptop", price: 150000, stock: 100, category: "Electronics" },
    //   { id: 8, name: "Ladie's Shirt", price: 900, stock: 100, category: "Fashion" },
    //   { id: 9, name: "Laptop Computer", price: 78000, stock: 100, category: "Electronics" },
    //   { id: 10, name: "Mobile Phone", price: 4500, stock: 100, category: "Electronics" },
    //   { id: 11, name: "Printer", price: 12000, stock: 50, category: "Document" },
    //   { id: 12, name: "Scanner", price: 5000, stock: 70, category: "Document" },
    //   { id: 13, name: "Smartwatch", price: 6000, stock: 30, category: "Electronics" },
    //   { id: 14, name: "Leather Jacket", price: 7000, stock: 20, category: "Fashion" },
    //   { id: 15, name: "Hammer", price: 1200, stock: 100, category: "Hardware" },
    //   { id: 16, name: "Television", price: 45000, stock: 80, category: "House" },
    // ];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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
              {/* Scan Barcode & Product Name Input */}
              <input
                type="text"
                placeholder="Scan Barcode"
                className="border bg-white w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                            <form>
                            {/* Name Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                type="text"
                                placeholder="Name"
                                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Address Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Address</label>
                                <textarea
                                placeholder="Address"
                                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                rows="3"
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Opening Receivable Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Opening Receivable</label>
                                <input
                                type="number"
                                placeholder="Opening Receivable"
                                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Opening Payable Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Opening Payable</label>
                                <input
                                type="number"
                                placeholder="Opening Payable"
                                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center">
                                {/* Add Customer Button */}
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Add Customer
                                </button>

                                {/* Close Button */}
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                                Close
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
  
            {/* Cart Table */}
            <div className="mt-6">
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
            </div>
  
            {/* Payment Button */}
            <div className="mt-4">
              <button className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600">
                Payment
              </button>
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