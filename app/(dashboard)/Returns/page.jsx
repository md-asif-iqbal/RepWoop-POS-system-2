"use client"


import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { BadgePlus } from "lucide-react";
const SalesReturnList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const salesReturns = [
    {
      productName: "Macbook Pro",
      date: "19 Nov 2022",
      customer: "Thomas",
      status: "Received",
      grandTotal: 550,
      paid: 120,
      due: 550,
      paymentStatus: "Paid",
    },
    {
      productName: "Orange",
      date: "19 Nov 2022",
      customer: "Benjamin",
      status: "Pending",
      grandTotal: 550,
      paid: 120,
      due: 550,
      paymentStatus: "Unpaid",
    },
    {
      productName: "Pineapple",
      date: "19 Nov 2022",
      customer: "James",
      status: "Pending",
      grandTotal: 210,
      paid: 120,
      due: 210,
      paymentStatus: "Unpaid",
    },
    {
      productName: "Strawberry",
      date: "19 Nov 2022",
      customer: "Bruklin",
      status: "Received",
      grandTotal: 210,
      paid: 120,
      due: 210,
      paymentStatus: "Paid",
    },
    {
      productName: "Strawberry",
      date: "19 Nov 2022",
      customer: "Bruklin",
      status: "Received",
      grandTotal: 210,
      paid: 120,
      due: 210,
      paymentStatus: "Paid",
    },
    {
      productName: "Macbook Pro",
      date: "19 Nov 2022",
      customer: "Best Power Tools",
      status: "Received",
      grandTotal: 210,
      paid: 120,
      due: 210,
      paymentStatus: "Paid",
    },
    {
      productName: "Avocat",
      date: "19 Nov 2022",
      customer: "Beverly",
      status: "Pending",
      grandTotal: 210,
      paid: 120,
      due: 210,
      paymentStatus: "Unpaid",
    },
    {
      productName: "Apple Earpods",
      date: "19 Nov 2022",
      customer: "Apex Computers",
      status: "Ordered",
      grandTotal: 1000,
      paid: 500,
      due: 1000,
      paymentStatus: "Partial",
    },
  ];
    const uniqueCustomers = [...new Set(salesReturns?.map((item) => item.customer))];
    const uniqueStatuses = [...new Set(salesReturns?.map((item) => item.status))];
    const uniquePaymentStatuses = [...new Set(salesReturns?.map((item) => item.paymentStatus))];

  // Filter logic
  const filteredSalesReturns = salesReturns.filter((returnItem) => {
    return (
      returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCustomer === "" || returnItem.customer === selectedCustomer) &&
      (selectedStatus === "" || returnItem.status === selectedStatus) &&
      (selectedPaymentStatus === "" || returnItem.paymentStatus === selectedPaymentStatus)
    );
  });
  // model add new return item
  const [isOpen, setIsOpen] = useState(false);
  
  // State to store input values and totals
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [subtotal, setSubtotal] = useState(20); // Example subtotal from the table
  const [grandTotal, setGrandTotal] = useState(0);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Function to calculate the grand total
  const calculateGrandTotal = () => {
    const taxAmount = (subtotal * orderTax) / 100;
    const total = subtotal + taxAmount - discount + shipping;
    setGrandTotal(total);
  };

  // Handlers to update the values and recalculate the grand total
  const handleOrderTaxChange = (e) => {
    setOrderTax(Number(e.target.value));
    calculateGrandTotal();
  };

  const handleDiscountChange = (e) => {
    setDiscount(Number(e.target.value));
    calculateGrandTotal();
  };

  const handleShippingChange = (e) => {
    setShipping(Number(e.target.value));
    calculateGrandTotal();
  };

  return (
    <div className="bg-white dark:bg-[#141432] text-gray-900 dark:text-gray-100 font-nunito text-sm">
        <div className="p-2 mt-[20%] md:mt-[5%]  scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg dark:text-white ">Sales Return List</h1>
            <button
              onClick={openModal}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Add New Sales Return
            </button>
        </div>
          {/* Modal */}

            {isOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
                      <div className="bg-white  w-full max-w-6xl  relative overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className=" dark:text-white text-lg ">Add Sales Return</h2>
                          <button
                            onClick={closeModal}
                            className="text-red-600 hover:bg-rose-600 rounded-full p-2 px-3 items-center hover:text-white  text-sm"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Modal Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label className="block ">Customer Name</label>
                            <select className="w-full border p-2 rounded">
                              <option>Choose Customer</option>
                            </select>
                          </div>
                          <div>
                            <label className="block ">Date</label>
                            <input type="date" className="w-full border p-2 rounded bg-white" />
                          </div>
                          <div>
                            <label className="block ">Reference No.</label>
                            <input type="text" className="w-full border p-2 rounded bg-white" />
                          </div>
                          <div>
                            <label className="block ">Product Name</label>
                            <input
                              type="text"
                              placeholder="Please type product code and select"
                              className="w-full border p-2 rounded bg-white"
                            />
                          </div>
                        </div>

                        {/* Responsive Table */}
                        <div className="overflow-x-auto mb-6">
                          <table className="min-w-full  border-collapse">
                            <thead>
                              <tr>
                                <th className="border p-2">Product Name</th>
                                <th className="border p-2">Net Unit Price($)</th>
                                <th className="border p-2">Stock</th>
                                <th className="border p-2">QTY</th>
                                <th className="border p-2">Discount($)</th>
                                <th className="border p-2">Tax %</th>
                                <th className="border p-2">Subtotal($)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border p-2">Example Product</td>
                                <td className="border p-2">$10.00</td>
                                <td className="border p-2">20</td>
                                <td className="border p-2">2</td>
                                <td className="border p-2">$0.00</td>
                                <td className="border p-2">5%</td>
                                <td className="border p-2">${subtotal}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div>
                            <label className="block ">Order Tax (%)</label>
                            <input
                              type="number"
                              
                              onChange={handleOrderTaxChange}
                              className="w-full border p-2 rounded bg-white"
                            />
                          </div>
                          <div>
                            <label className="block ">Discount ($)</label>
                            <input
                              type="number"
                              
                              onChange={handleDiscountChange}
                              className="w-full border p-2 rounded bg-white"
                            />
                          </div>
                          <div>
                            <label className="block ">Shipping ($)</label>
                            <input
                              type="number"
                              
                              onChange={handleShippingChange}
                              className="w-full border p-2 rounded bg-white"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <label className="block ">Status</label>
                            <select className="w-full border p-2 rounded">
                              <option>Choose</option>
                            </select>
                          </div>
                          <div className="text-right">
                            <h3 className=" text-lg">
                              Grand Total: ${grandTotal.toFixed(2)}
                            </h3>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={closeModal}
                            className="bg-gray-300 px-4 py-2 mr-2 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}




















  {/* Search, Filters, and Sort Section */}
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
    {/* Search Bar */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="border rounded px-4 py-2 w-full dark:text-black bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500">
      <CiSearch size={20}/>
      </button>
    </div>
    {/* Customer Filter */}
    <select
      className="border rounded px-4 py-2 w-full dark:text-black"
      value={selectedCustomer}
      onChange={(e) => setSelectedCustomer(e.target.value)}
    >
      <option value="">Choose Customer</option>
      {/* <!-- Add customer options here --> */}
      {uniqueCustomers?.map((customer, index) => (
        <option key={index} value={customer}>
          {customer}
        </option>
      ))}
    </select>
    {/* Status Filter */}
    <select
      className="border rounded px-4 py-2 w-full dark:text-black"
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
    >
      <option value="">Choose Status</option>
      {uniqueStatuses?.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
    </select>
    {/* Payment Status Filter */}
    <select
      className="border rounded px-4 py-2 w-full dark:text-black"
      value={selectedPaymentStatus}
      onChange={(e) => setSelectedPaymentStatus(e.target.value)}
    >
      <option value="">Choose Payment Status</option>
      {uniquePaymentStatuses?.map((paymentStatus, index) => (
          <option key={index} value={paymentStatus}>
            {paymentStatus}
          </option>
        ))}
    </select>
  </div>

  {/* Sort by Date */}
  <div className="flex justify-end mb-4">
    <select
      className="border rounded px-4 py-2 dark:text-black"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="date">Sort by Date</option>
      {/* <!-- Additional sorting options --> */}
    </select>
  </div>

  {/* Sales Return Table */}
  <div className="overflow-x-auto dark:bg-[#141432]">
    <table className="w-full bg-white dark:bg-[#29294e] border rounded-md shadow-sm text-center border-collapse">
      <thead className="">
        <tr className="bg-emerald-500 text-white ">
        <th className="p-2 ">Product</th>
    
          <th className="p-2  ">Product Image</th>
          <th className="p-2 ">Product Name</th>
          <th className="p-2 ">Date</th>
          <th className="p-2 ">Customer</th>
          <th className="p-2 ">Status</th>
          <th className="p-2 ">Grand Total ($)</th>
          <th className="p-2 ">Paid ($)</th>
          <th className="p-2 ">Due ($)</th>
          <th className="p-2 ">Payment Status</th>
          <th className="p-2 ">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredSalesReturns?.map((returnItem, index) => (
          <tr key={index} className="border-t border-r border-b border-l">
            {/* Select Checkbox */}
            <td className="p-2 border">
              <input  type="checkbox" value={returnItem.productId} className="p-5 bg-white" />
            </td>
         
            {/* Product Image */}
            <td className="p-2 border">
              <Image src={returnItem.productImage} alt={returnItem.productName} className="w-12 h-12 rounded-full"/>
            </td>
            <td className="p-2 border">{returnItem.productName}</td>
            <td className="p-2 border">{returnItem.date}</td>
            <td className="p-2 border">{returnItem.customer}</td>
            <td className="p-2 border">
              <span
                className={`px-2 py-1 text-xs  rounded-full ${
                  returnItem.status === "Received"
                    ? "bg-green-100 text-green-700 "
                    : returnItem.status === "Pending"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {returnItem.status}
              </span>
            </td>
            <td className="p-2 border">{returnItem.grandTotal}</td>
            <td className="p-2 border">{returnItem.paid}</td>
            <td className="p-2 border">{returnItem.due}</td>
            <td className="p-2 border">
              <span
                className={`px-2 py-1 text-xs  rounded-full ${
                  returnItem.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : returnItem.paymentStatus === "Unpaid"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {returnItem.paymentStatus}
              </span>
            </td>
            <td className="p-2 flex space-x-2">
              <div className="flex item-center justify-center gap-5">
                <button className="p-1  border-2 transform text-blue-600 hover:text-blue-500 hover:scale-110">
                  <TbEdit size={16}/>
                </button>
                <button className="p-1  transform text-red-600 hover:text-red-500 hover:scale-110 border-2">
                  <RiDeleteBin5Line size={16}/>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>
    </div>


  );
};

export default SalesReturnList;
