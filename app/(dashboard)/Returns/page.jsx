"use client"


import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { BadgePlus } from "lucide-react";
const SalesReturnList = () => {
  const [returnedSales, setReturnedSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [sortBy, setSortBy] = useState("date");

   // model add new return item
   const [isOpen, setIsOpen] = useState(false);
  
   // State to store input values and totals
   const [orderTax, setOrderTax] = useState(0);
   const [discount, setDiscount] = useState(0);
   const [shipping, setShipping] = useState(0);
   const [subtotal, setSubtotal] = useState(20); // Example subtotal from the table
   const [grandTotal, setGrandTotal] = useState(0);

   useEffect(() => {
    // Fetch returned sales from the backend
    const fetchReturnedSales = async () => {
      try {
        setLoading(true);
        const response = await fetch("/Returns/return"); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch returned sales");
        }
        const data = await response.json();
        setReturnedSales(data.sales || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnedSales();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Generate unique dropdown options
  const uniqueCustomers = [...new Set(returnedSales.map((item) => item.selected_customer))];
  const uniqueStatuses = [...new Set(returnedSales.map((item) => item.status))];
  const uniquePaymentStatuses = [...new Set(returnedSales.map((item) => item.status))];

  // Filter logic
  const filteredSalesReturns = returnedSales.filter((sale) => {
    const productMatch = sale.products.some((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      productMatch &&
      (selectedCustomer === "" || sale.selected_customer === selectedCustomer) &&
      (selectedStatus === "" || sale.status === selectedStatus) &&
      (selectedPaymentStatus === "" || sale.paymentStatus === selectedPaymentStatus)
    );
  });

  // Handle Sorting
  const sortedSalesReturns = filteredSalesReturns.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.sale_date) - new Date(b.sale_date);
    }
    if (sortBy === "customer") {
      return a.selected_customer.localeCompare(b.selected_customer);
    }
    return 0;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    notify("Search term updated", "success");
  };
 

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
            <CiSearch size={20} />
          </button>
        </div>

        {/* Customer Filter */}
        <select
          className="border rounded px-4 py-2 w-full dark:text-black"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">Choose Customer</option>
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

        
      </div>

      {/* Sales Return Table */}
      <div className="overflow-x-auto dark:bg-[#141432]">
        <table className="w-full bg-white dark:bg-[#29294e] border rounded-md shadow-sm text-center border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
            <th className="p-2">Invoice No.</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Customer</th>
              
              <th className="p-2">Grand Total ($)</th>
              <th className="p-2">Paid ($)</th>
              <th className="p-2">Due ($)</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
          {sortedSalesReturns.length > 0 ? (
              sortedSalesReturns.map((sale, index) =>
                sale.products.map((product, productIndex) => (
                <tr
                  key={productIndex}
                  className="border-t border-r border-b border-l hover:bg-gray-50 dark:hover:bg-[#1d1d33]"
                >
                    <td className="p-2 border">
                    {sale.invoice_no}
                  </td>
                    <td className="p-2 border">{product.product_name}</td>
                    <td className="p-2 border">
                      {new Date(sale.sale_date).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">{sale.selected_customer}</td>

                  {/* Status */}
                  

                  <td className="p-2 border">${parseFloat(sale.total).toFixed(2)}</td>
                    <td className="p-2 border">${parseFloat(sale.amount_paid).toFixed(2)}</td>
                    <td className="p-2 border">${parseFloat(sale.total_payable - sale.amount_paid).toFixed(2)}</td>

                  {/* Payment Status */}
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        sale.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : sale.status === "Returned"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-2 flex space-x-2">
                    <button
                      className="p-1 border-2 transform text-blue-600 hover:text-blue-500 hover:scale-110"
                      onClick={() => console.log("Edit clicked", sale)}
                    >
                      <TbEdit size={16} />
                    </button>
                    <button
                      className="p-1 transform text-red-600 hover:text-red-500 hover:scale-110 border-2"
                      onClick={() => console.log("Delete clicked", sale)}
                    >
                      <RiDeleteBin5Line size={16} />
                    </button>
                  </td>
                </tr>
              )))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-gray-500">
                  No sales returns match the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>


  );
};

export default SalesReturnList;
