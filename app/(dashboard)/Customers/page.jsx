"use client"
import Link from "next/link";
import React, { useState } from "react";

export default function CustomersList() {
     const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
  const [filter, setFilter] = useState({
    name: "",
    mobileNumber: "",
  });

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      id: 1,
      name: "malek",
      email: "khanengcor@hotmail.com",
      phone: "01741992993",
      address: "madbor bazar",
      receivable: "162,958 Tk",
      paid: "58,500 Tk",
      saleDue: "104,458 Tk",
      walletBalance: "-4000 Tk",
      totalDue: "108,458 Tk",
      walletText: "কাস্টমারের কাছে আপনার পাওনা ধন্যছ",
    },
    {
      id: 2,
      name: "মোঃ মিজানুর হোসেন",
      email: "01978808130",
      phone: "01757808130",
      address: "Peroly norail",
      receivable: "4,851 Tk",
      paid: "4,871 Tk",
      saleDue: "-20 Tk",
      walletBalance: "-1000 Tk",
      totalDue: "980 Tk",
      walletText: "কাস্টমারের কাছে আপনার পাওনা ধন্যছ",
    },
    {
      id: 3,
      name: "Jilani Mla",
      email: "unknown",
      phone: "545465",
      address: "Dhaka",
      receivable: "99,900 Tk",
      paid: "4,500 Tk",
      saleDue: "95,400 Tk",
      walletBalance: "0 Tk",
      totalDue: "95,400 Tk",
      walletText: "",
    },
    {
      id: 4,
      name: "Mahmudul Hasan",
      email: "mahmud@gmail.com",
      phone: "01987845455",
      address: "Address",
      receivable: "0 Tk",
      paid: "0 Tk",
      saleDue: "0 Tk",
      walletBalance: "0 Tk",
      totalDue: "0 Tk",
      walletText: "",
    },
    {
      id: 5,
      name: "Md Sumon",
      email: "sumon@gmail.com",
      phone: "01847898745",
      address: "Address",
      receivable: "30,000 Tk",
      paid: "30,000 Tk",
      saleDue: "0 Tk",
      walletBalance: "0 Tk",
      totalDue: "0 Tk",
      walletText: "",
    },
    {
      id: 6,
      name: "Md Juwel Khan",
      email: "juwel@gmail.com",
      phone: "01845787455",
      address: "Address",
      receivable: "0 Tk",
      paid: "0 Tk",
      saleDue: "0 Tk",
      walletBalance: "0 Tk",
      totalDue: "0 Tk",
      walletText: "",
    },
    {
      id: 7,
      name: "Sakib Rabby",
      email: "sakib@gmail.com",
      phone: "0184578745",
      address: "Address",
      receivable: "99,000 Tk",
      paid: "666 Tk",
      saleDue: "98,334 Tk",
      walletBalance: "0 Tk",
      totalDue: "98,334 Tk",
      walletText: "",
    },
    {
      id: 8,
      name: "Tanvir Ahmed",
      email: "tanvir@gmail.com",
      phone: "0194578545",
      address: "Comilla",
      receivable: "65,000 Tk",
      paid: "25,000 Tk",
      saleDue: "40,000 Tk",
      walletBalance: "-3000 Tk",
      totalDue: "43,000 Tk",
      walletText: "কাস্টমারের কাছে আপনার পাওনা ধন্যছ",
    },
    {
      id: 9,
      name: "Shah Alam",
      email: "shahalam@gmail.com",
      phone: "0174578545",
      address: "Chittagong",
      receivable: "50,000 Tk",
      paid: "10,000 Tk",
      saleDue: "40,000 Tk",
      walletBalance: "0 Tk",
      totalDue: "40,000 Tk",
      walletText: "",
    },
    {
      id: 10,
      name: "Nasir Uddin",
      email: "nasir@gmail.com",
      phone: "01845787455",
      address: "Dhaka",
      receivable: "120,000 Tk",
      paid: "60,000 Tk",
      saleDue: "60,000 Tk",
      walletBalance: "-5000 Tk",
      totalDue: "65,000 Tk",
      walletText: "কাস্টমারের কাছে আপনার পাওনা ধন্যছ",
    },
  ];


    // Handle input changes
    const handleFilter = (e) => {
      const { name, value } = e.target;
      setFilter((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Apply filters
    const applyFilter = () => {
      const filtered = customers.filter((customer) => {
        const nameMatch = filter.name
          ? customer.name.toLowerCase().includes(filter.name.toLowerCase())
          : true;
        const mobileMatch = filter.mobileNumber
          ? customer.phone.includes(filter.mobileNumber)
          : true;
        return nameMatch && mobileMatch;
      });
      setFilteredCustomers(filtered);
    };
  
    // Reset filters
    const resetFilters = () => {
      setFilter({ name: '', mobileNumber: '' });
      setFilteredCustomers(customers); // Reset to original data
    };


  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Customer Information</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, '')} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>

        <div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
                  {/* Title Section */}
  
      <div className=" mb-4  shadow-sm ">
      <h1 className="text-lg dark:text-white  text-gray-500 mx-5 ">Customers</h1>
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
      {/* Filter Section */}
      <div className="flex md:w-1/2 gap-4 md:mt-10">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filter.name}
          onChange={handleFilter}
          className="border p-2 rounded w-full md:w-1/2 bg-white"
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={filter.mobileNumber}
          onChange={handleFilter}
          className="border p-2 rounded w-full md:w-1/2 bg-white"
        />
        
      </div>
      <div className="flex md:w-1/2 gap-4 py-2">
      <button
          onClick={applyFilter}
          className="bg-green-500 text-white px-14 py-2 rounded"
        >
          Filter
        </button>
        <button
           onClick={resetFilters}
          className="bg-red-500 text-white px-14 py-2 rounded"
        >
          Reset
        </button>
        
      </div>

      {/* Table Section */}
      <div className="mt-4 border py-4 px-4">
        <div className="flex items-center justify-between gap-5 mb-5">
            <h1 className="text-gray-500 dark:text-white font-medium">Customers</h1>
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 text-white px-14 py-2 rounded"
                >
                    Print
                </button>
        </div>
        <table id="table-to-print" className="table-auto dark:text-white w-full border-collapse border">
          <thead>
            <tr className="bg-emerald-500 dark:bg-[#232350] text-white">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Receivable</th>
              <th className="border px-4 py-2">Paid</th>
              <th className="border px-4 py-2">Sale Due</th>
              <th className="border px-4 py-2">Wallet Balance</th>
              <th className="border px-4 py-2">Total Due</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0
              ? filteredCustomers?.map((customer, index) => (
                  <tr key={customer.id} className="bg-white dark:bg-[#232350] dark:text-white border">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{customer.name}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
                    <td className="border px-4 py-2">{customer.phone}</td>
                    <td className="border px-4 py-2">{customer.address}</td>
                    <td className="border px-4 py-2">{customer.receivable}</td>
                    <td className="border px-4 py-2">{customer.paid}</td>
                    <td className="border px-4 py-2">{customer.saleDue}</td>
                    <td className="border px-4 py-2">
                      {customer.walletBalance}
                      <br />
                      <span className="text-xs text-gray-500">
                        {customer.walletText}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{customer.totalDue}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => openModal(customer)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Actions
                      </button>
                    </td>
                  </tr>
                ))
              : customers?.map((customer, index) => (
                  <tr key={customer.id} className="bg-white dark:bg-[#232350] dark:text-white border">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{customer.name}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
                    <td className="border px-4 py-2">{customer.phone}</td>
                    <td className="border px-4 py-2">{customer.address}</td>
                    <td className="border px-4 py-2">{customer.receivable}</td>
                    <td className="border px-4 py-2">{customer.paid}</td>
                    <td className="border px-4 py-2">{customer.saleDue}</td>
                    <td className="border px-4 py-2">
                      {customer.walletBalance}
                      <br />
                      <span className="text-xs text-gray-500 dark:text-white">
                        {customer.walletText}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{customer.totalDue}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => openModal(customer)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Actions
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-6  shadow-sm">
            <h2 className=" dark:text-white text-lg  mb-4">
              Customer: {selectedCustomer.name}
            </h2>
            <p>Email: {selectedCustomer.email}</p>
            <p>Phone: {selectedCustomer.phone}</p>
            <p>Address: {selectedCustomer.address}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};


