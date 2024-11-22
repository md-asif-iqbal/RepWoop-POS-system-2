// "use client"
// import React, { useState } from 'react';
// export default function CustomerDueRepor() {

//     const data = [
//         { id: 1, name: 'Sakib Rabby', email: 'sakib@gmail.com', phone: '0184578745', address: 'Address', invoiceDue: 98334, directDue: 0, totalDue: 98334 },
//       ];
    
//       const [currentPage, setCurrentPage] = useState(1);
//       const [filteredData, setFilteredData] = useState(data);
//       const itemsPerPage = 20; // Set items per page for pagination
//       useEffect(() => {
//         const fetchCustomers = async () => {
//           try {
//             const response = await fetch("/Customers/customer");
//             if (!response.ok) throw new Error("Failed to fetch customers");
    
//             const { customers } = await response.json();
//             console.log(customers);
//             setCustomers(customers);
//             setFilteredCustomers(customers); // Initialize filtered data
//           } catch (error) {
//             console.error("Error fetching customers:", error);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchCustomers();
//       }, []);
    
//       // Generate unique names for the dropdown
//       const uniqueNames = [...new Set(data?.map((product) => product.name))];
    
//       // Handle filtering when customer name is selected
//       const handleCustomerChange = (customerName) => {
//         if (customerName) {
//           const filtered = data.filter(item => item.name === customerName);
//           setFilteredData(filtered);
//         } else {
//           setFilteredData(data);
//         }
//         setCurrentPage(1); // Reset to first page after filtering
//       };
    
//       // Reset the filter
//       const resetFilter = () => {
//         setFilteredData(data);
//         setCurrentPage(1); // Reset to first page after resetting
//       };
    
//       // Pagination logic
//       const indexOfLastItem = currentPage * itemsPerPage;
//       const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//       const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//       const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
//       const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//       };
    
//   // Print functionality
//   const handlePrint = () => {
//     const printContent = document.getElementById("table-to-print").outerHTML;
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>Customer Due Report</title>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             table { border-collapse: collapse; width: 100%; }
//             th, td { border: 1px solid #000; padding: 8px; text-align: left; }
//           </style>
//         </head>
//         <body onload="window.print()">
//           ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, '')} <!-- Remove the Actions column -->
//         </body>
//       </html>
//     `);
//     newWindow.document.close();
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%]  text-sm">
//       <h1 className="text-lg dark:text-white  mb-4">Customer Due Report</h1>

//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <div className="flex space-x-2 w-full md:w-1/2">
//         <select
//             onChange={(e) => handleCustomerChange(e.target.value)}
//             className="border p-2 w-full md:w-1/2"
//           >
//             <option value="">Select Customer</option>
//             {uniqueNames?.map((name, index) => (
//               <option key={index} value={name}>
//                 {name}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleCustomerChange} className="bg-blue-500 text-white px-8 py-2 rounded">Filter</button>
//           <button onClick={resetFilter} className="bg-gray-500 text-white px-8 py-2 rounded">Reset</button>
//         </div>
//         <button onClick={handlePrint} className="bg-green-500 text-white px-8 py-2 rounded">Print</button>
//       </div>

//       <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border  ">
//         <thead>
//           <tr className='bg-emerald-500 text-white'>
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Invoice Due</th>
//             <th className="border p-2">Direct Due</th>
//             <th className="border p-2">Total Due</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentData?.map((item) => (
//             <tr key={item.id}>
//                 <td className="border p-2">{item.id}</td>
//               <td className="border p-2">{item.name}</td>
//               <td className="border p-2">{item.email}</td>
//               <td className="border p-2">{item.phone}</td>
//               <td className="border p-2">{item.address}</td>
//               <td className="border p-2">{item.invoiceDue} TK</td>
//               <td className="border p-2">{item.directDue} TK</td>
//               <td className="border p-2">{item.totalDue} TK</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }


"use client";
import React, { useState, useEffect } from "react";

export default function CustomerDueReport() {
  const [customers, setCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/Customers/customer");
        if (!response.ok) throw new Error("Failed to fetch customers");

        const { customers } = await response.json();
        setCustomers(customers);
        setFilteredData(customers); // Initialize filteredData with all customers
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Generate unique names for the dropdown
  const uniqueNames = [...new Set(customers?.map((customer) => customer.name))];

  // Handle filtering when customer name is selected
  const handleCustomerChange = (customerName) => {
    if (customerName) {
      const filtered = customers.filter((item) => item.name === customerName);
      setFilteredData(filtered);
    } else {
      setFilteredData(customers);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset the filter
  const resetFilter = () => {
    setFilteredData(customers);
    setCurrentPage(1); // Reset to first page after resetting
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Customer Due Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
      <h1 className="text-lg dark:text-white mb-4">Customer Due Report</h1>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex space-x-2 w-full md:w-1/2">
          <select
            onChange={(e) => handleCustomerChange(e.target.value)}
            className="border p-2 w-full md:w-1/2"
          >
            <option value="">Select Customer</option>
            {uniqueNames?.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            onClick={resetFilter}
            className="bg-gray-500 text-white px-8 py-2 rounded"
          >
            Reset
          </button>
        </div>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-8 py-2 rounded"
        >
          Print
        </button>
      </div>

      <table
        id="table-to-print"
        className="table-auto dark:text-white w-full border-collapse border"
      >
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Balance</th>
            <th className="border p-2">Paid</th>
            <th className="border p-2">Sale Due</th>
            <th className="border p-2">Total Due</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.address}</td>
              <td className="border p-2">{item.balance} TK</td>
              <td className="border p-2">{item.paid} TK</td>
              <td className="border p-2">{item.saledue} TK</td>
              <td className="border p-2">{item.totaldue} TK</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

