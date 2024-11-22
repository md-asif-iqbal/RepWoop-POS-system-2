// "use client"
// import React, { useEffect, useState } from 'react';

// export default function SupplierDueReport() {

//       const [currentPage, setCurrentPage] = useState(1);
//       const [filteredData, setFilteredData] = useState([]);
//       const [supplier, setSuppliers] = useState([]);
//       const itemsPerPage = 20; // Set items per page for pagination
//         // Fetch suppliers from the backend
//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const response = await fetch('/Suppliers/suppliers');
//         if (!response.ok) throw new Error('Failed to fetch suppliers');
//         const { suppliers } = await response.json();
//         console.log(suppliers);
//         setSuppliers(suppliers);
//         setFilteredData(supplier)

//       } catch (error) {
//         console.error('Error fetching suppliers:', error);
//         toast.error('Error fetching suppliers');
//       }
//     };

//     fetchSuppliers();
//   }, []);
    
//       // Generate unique names for the dropdown
//       const uniqueNames = [...new Set(supplier?.map((supplier) => supplier.name))];
    
//       // Handle filtering when supplier name is selected
//       const handleSupplierChange = (supplierName) => {
//         if (supplierName) {
//           const filtered = data.filter(item => item.name === supplierName);
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
//       console.log(currentData);
    
//       const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//       };
//       // Print functionality
//   const handlePrint = () => {
//     const printContent = document.getElementById("table-to-print").outerHTML;
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>Supplier Due Report</title>
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
//     <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
//     <h1 className="text-lg dark:text-white  mb-4">Supplier Due Report</h1>

//     <div className="md:flex flex-wrap justify-between items-center mb-4">
//       <div className="md:flex md:space-x-2 w-full md:w-full">
//         <select
//           onChange={(e) => handleSupplierChange(e.target.value)}
//           className="border p-2 w-full md:w-1/2"
//         >
//           <option value="">Select Supplier</option>
//           {uniqueNames?.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
        
//         <button onClick={resetFilter} className="bg-gray-500 text-white px-8 py-2 mt-5 md:mt-0 mr-5 md:mr-0 rounded">Reset</button>
//         <button onClick={handlePrint} className="bg-green-500 text-white px-8 py-2 rounded ">Print</button>
//       </div>
     
//     </div>

//     <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border  md:mt-10">
//       <thead>
//         <tr className='bg-emerald-500 text-white'>
//           <th className="border p-2">SL</th>
//           <th className="border p-2">Name</th>
//           <th className="border p-2">Email</th>
//           <th className="border p-2">Phone</th>
//           <th className="border p-2">Address</th>
//           <th className="border p-2">Invoice Due</th>
//           <th className="border p-2">Direct Due</th>
//           <th className="border p-2">Total Due</th>
//         </tr>
//       </thead>
//       <tbody>
//         {currentData?.map((item) => (
//           <tr key={item.id}>
//             <td className="border p-2">{item.id}</td>
//             <td className="border p-2">{item.name}</td>
//             <td className="border p-2">{item.email}</td>
//             <td className="border p-2">{item.phone}</td>
//             <td className="border p-2">{item.address}</td>
//             {/* <td className="border p-2">{item.invoiceDue} TK</td>
//             <td className="border p-2">{item.directDue} TK</td>
//             <td className="border p-2">{item.invoiceDue + item.directDue} TK</td> */}
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     {/* Pagination */}
//     <div className="flex justify-center mt-4 space-x-2">
//       {Array.from({ length: totalPages }, (_, i) => (
//         <button
//           key={i}
//           onClick={() => handlePageChange(i + 1)}
//           className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
//         >
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   </div>
//   )
// }


"use client";
import React, { useEffect, useState } from "react";

export default function SupplierDueReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // Renamed to match the fetched data
  const itemsPerPage = 20;

  // Fetch suppliers from the backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/Suppliers/suppliers");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const { suppliers } = await response.json();
        console.log(suppliers);
        setSuppliers(suppliers);
        setFilteredData(suppliers); // Initialize filteredData with all suppliers
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  // Generate unique names for the dropdown
  const uniqueNames = [...new Set(suppliers?.map((supplier) => supplier.name))];

  // Handle filtering when supplier name is selected
  const handleSupplierChange = (supplierName) => {
    if (supplierName) {
      const filtered = suppliers.filter((item) => item.name === supplierName);
      setFilteredData(filtered);
    } else {
      setFilteredData(suppliers);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset the filter
  const resetFilter = () => {
    setFilteredData(suppliers);
    setCurrentPage(1); // Reset to first page after resetting
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  console.log(currentData);

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
          <title>Supplier Due Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, "")} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
      <h1 className="text-lg dark:text-white mb-4">Supplier Due Report</h1>

      <div className="md:flex flex-wrap justify-between items-center mb-4">
        <div className="md:flex md:space-x-2 w-full md:w-full">
          <select
            onChange={(e) => handleSupplierChange(e.target.value)}
            className="border p-2 w-full md:w-1/2"
          >
            <option value="">Select Supplier</option>
            {uniqueNames?.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <button
            onClick={resetFilter}
            className="bg-gray-500 text-white px-8 py-2 mt-5 md:mt-0 mr-5 md:mr-0 rounded"
          >
            Reset
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-8 py-2 rounded"
          >
            Print
          </button>
        </div>
      </div>

      <table
        id="table-to-print"
        className="table-auto dark:text-white w-full border-collapse border md:mt-10"
      >
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border p-2">SL</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Balance</th>
            <th className="border p-2">Paid</th>
            <th className="border p-2">Purchase Due</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item, index) => (
            <tr key={item.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.address}</td>
              <td className="border p-2">{item.balance} TK</td>
              <td className="border p-2">{item.paid} TK</td>
              <td className="border p-2">{item.purchase_due} TK</td>
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
