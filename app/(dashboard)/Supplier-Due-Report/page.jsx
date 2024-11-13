"use client"
import React, { useState } from 'react';

export default function SupplierDueReport() {
    const data = [
        { id: 1, name: 'Sakib Al Hasan', email: 'sakib@gmail.com', phone: '014578785', address: 'Address', invoiceDue: 14600, directDue: 0 },
        { id: 2, name: 'Default Supplier', email: 'default@supplier.com', phone: '111111', address: 'Default Address', invoiceDue: 3255, directDue: 0 },
        { id: 3, name: 'China Supplier', email: 'khanengcor@hotmail.com', phone: '09876543211', address: 'China BD', invoiceDue: 0, directDue: 5000 },
        { id: 4, name: 'Ayman Computer', email: '', phone: '018555558567', address: 'Multiplan Dhaka', invoiceDue: 100000, directDue: 0 },
        { id: 5, name: 'Munir Ahamed', email: '', phone: '0000000000', address: '', invoiceDue: 1742100, directDue: 43000 },
        { id: 6, name: 'Riton', email: '', phone: '0175478644', address: '', invoiceDue: 0, directDue: 10000 },
        { id: 7, name: 'JSS International', email: 'mahmudabeer@live.com', phone: '01670510095', address: 'South Halishahar', invoiceDue: 6000, directDue: 0 },
        { id: 8, name: 'Tech Hub', email: 'tech@hub.com', phone: '01711122234', address: 'Banani, Dhaka', invoiceDue: 8900, directDue: 3000 },
        { id: 9, name: 'DHL Suppliers', email: 'dhl@supplier.com', phone: '01812345678', address: 'Motijheel, Dhaka', invoiceDue: 120000, directDue: 5000 },
        { id: 10, name: 'Green Solutions', email: 'green@solutions.com', phone: '01778569874', address: 'Mirpur, Dhaka', invoiceDue: 15500, directDue: 7500 },
        { id: 11, name: 'Smart Tech BD', email: 'smarttech@gmail.com', phone: '01912365478', address: 'Dhanmondi, Dhaka', invoiceDue: 23000, directDue: 0 },
        { id: 12, name: 'Alamin Suppliers', email: 'alamin@suppliers.com', phone: '01878963254', address: 'Chittagong', invoiceDue: 45500, directDue: 2000 },
        { id: 13, name: 'Global Suppliers', email: 'global@supplier.com', phone: '01778965234', address: 'Uttara, Dhaka', invoiceDue: 63000, directDue: 5000 },
        { id: 14, name: 'IT Traders', email: 'it@traders.com', phone: '01978965432', address: 'Karwan Bazar, Dhaka', invoiceDue: 12000, directDue: 1000 },
        { id: 15, name: 'Phoenix BD', email: 'phoenix@supplier.com', phone: '01674563289', address: 'Gulshan, Dhaka', invoiceDue: 32000, directDue: 500 },
        { id: 16, name: 'Top Traders', email: 'toptraders@gmail.com', phone: '01789653241', address: 'Banani, Dhaka', invoiceDue: 16500, directDue: 0 },
        { id: 17, name: 'Infinity Tech', email: 'infinitytech@supplier.com', phone: '01896543210', address: 'Dhaka', invoiceDue: 43000, directDue: 10000 },
        { id: 18, name: 'Pro Suppliers', email: 'prosuppliers@gmail.com', phone: '01956478213', address: 'Dhanmondi, Dhaka', invoiceDue: 52000, directDue: 3000 },
        { id: 19, name: 'Elite Traders', email: 'elite@traders.com', phone: '01893214567', address: 'Uttara, Dhaka', invoiceDue: 7000, directDue: 0 },
        { id: 20, name: 'Royal Supplies', email: 'royal@supplies.com', phone: '01678963214', address: 'Barisal', invoiceDue: 15000, directDue: 5000 },
        { id: 21, name: 'Fast Track Traders', email: 'fasttrack@supplier.com', phone: '01715965432', address: 'Sylhet', invoiceDue: 45000, directDue: 1000 },
        { id: 22, name: 'Metro Suppliers', email: 'metro@supplier.com', phone: '01715965432', address: 'Motijheel, Dhaka', invoiceDue: 65000, directDue: 2000 },
        { id: 23, name: 'Sunshine Traders', email: 'sunshine@traders.com', phone: '01715995432', address: 'Gulshan, Dhaka', invoiceDue: 32000, directDue: 2000 },
        { id: 24, name: 'Innovative Supplies', email: 'innovative@supplies.com', phone: '01876543211', address: 'Banani, Dhaka', invoiceDue: 8000, directDue: 1500 },
        { id: 25, name: 'Advanced Tech', email: 'advanced@tech.com', phone: '01678549823', address: 'Barisal', invoiceDue: 75000, directDue: 10000 },
        { id: 26, name: 'Smart Innovations', email: 'smart@innovations.com', phone: '01989562347', address: 'Sylhet', invoiceDue: 54000, directDue: 3000 },
        { id: 27, name: 'Solution Suppliers', email: 'solution@supplier.com', phone: '01989563214', address: 'Gazipur', invoiceDue: 8000, directDue: 1000 },
        { id: 28, name: 'Tech Masters', email: 'techmasters@supplier.com', phone: '01998765432', address: 'Chittagong', invoiceDue: 12000, directDue: 1000 },
        { id: 29, name: 'FutureTech BD', email: 'futuretech@gmail.com', phone: '01712345678', address: 'Dhaka', invoiceDue: 24000, directDue: 1500 },
        { id: 30, name: 'Smart Innovations', email: 'smart@innovations.com', phone: '01989562347', address: 'Sylhet', invoiceDue: 42000, directDue: 2000 },
        { id: 31, name: 'Elite Traders', email: 'elite@traders.com', phone: '01893214567', address: 'Uttara, Dhaka', invoiceDue: 35000, directDue: 5000 },
        { id: 32, name: 'Tech Masters', email: 'masters@tech.com', phone: '01876543219', address: 'Comilla', invoiceDue: 28000, directDue: 3000 },
        { id: 33, name: 'Global Suppliers', email: 'global@supplier.com', phone: '01778965234', address: 'Uttara, Dhaka', invoiceDue: 51000, directDue: 7000 },
        { id: 34, name: 'China Supplier', email: 'china@suppliers.com', phone: '01987654321', address: 'China BD', invoiceDue: 0, directDue: 8000 },
        { id: 35, name: 'Global Suppliers', email: 'globalsupplier@bd.com', phone: '01798765432', address: 'Banani, Dhaka', invoiceDue: 85000, directDue: 4000 },
        { id: 36, name: 'Smart Tech BD', email: 'smarttechbd@bd.com', phone: '01698765432', address: 'Dhanmondi, Dhaka', invoiceDue: 67000, directDue: 6000 },
        { id: 37, name: 'Elite Traders', email: 'elite@traders.com', phone: '01987654321', address: 'Gulshan, Dhaka', invoiceDue: 23000, directDue: 2000 },
        { id: 38, name: 'Tech Masters', email: 'info@techmasters.com', phone: '01876543210', address: 'Barisal', invoiceDue: 12500, directDue: 3000 },
        { id: 39, name: 'Smart Innovations', email: 'smart@innovations.com', phone: '01987765432', address: 'Sylhet', invoiceDue: 30000, directDue: 4000 },
        { id: 40, name: 'Global Suppliers', email: 'global@supplier.com', phone: '01798762345', address: 'Gazipur', invoiceDue: 47000, directDue: 10000 },
        { id: 41, name: 'Smart Tech BD', email: 'contact@smarttechbd.com', phone: '01698761234', address: 'Mohakhali, Dhaka', invoiceDue: 52000, directDue: 7000 },
        { id: 42, name: 'FutureTech BD', email: 'info@futuretechbd.com', phone: '01712234567', address: 'Chittagong', invoiceDue: 39000, directDue: 8000 },
        { id: 43, name: 'Phoenix BD', email: 'phoenixbd@gmail.com', phone: '01698711234', address: 'Uttara, Dhaka', invoiceDue: 74000, directDue: 1000 },
        { id: 44, name: 'Pro Traders', email: 'protraders@bd.com', phone: '01798712345', address: 'Sylhet', invoiceDue: 53000, directDue: 2500 },
        { id: 45, name: 'Infinity Tech', email: 'infinity@techbd.com', phone: '01987651234', address: 'Gazipur', invoiceDue: 68000, directDue: 5000 },
        { id: 46, name: 'Elite Traders', email: 'elite_traders@gmail.com', phone: '01712398765', address: 'Banani, Dhaka', invoiceDue: 9000, directDue: 0 },
        { id: 47, name: 'Tech Masters', email: 'tech.masters@gmail.com', phone: '01698754321', address: 'Mirpur, Dhaka', invoiceDue: 22000, directDue: 4000 },
        { id: 48, name: 'Smart Innovations', email: 'innovations@bd.com', phone: '01987761234', address: 'Gulshan, Dhaka', invoiceDue: 66000, directDue: 1000 },
        { id: 49, name: 'Pro Traders', email: 'pro@traders.com', phone: '01791234567', address: 'Dhanmondi, Dhaka', invoiceDue: 21000, directDue: 2000 },
        { id: 50, name: 'Global Suppliers', email: 'globalsupplier@dhaka.com', phone: '01698712345', address: 'Uttara, Dhaka', invoiceDue: 38000, directDue: 3000 },
        { id: 51, name: 'Elite Traders', email: 'elite@tradersbd.com', phone: '01876523456', address: 'Comilla', invoiceDue: 18000, directDue: 500 },
        { id: 52, name: 'China Supplier', email: 'china_sup@bd.com', phone: '01876541234', address: 'Dhaka', invoiceDue: 6000, directDue: 4000 },
        { id: 53, name: 'Infinity Tech', email: 'info@infinitytech.com', phone: '01986754321', address: 'Banani, Dhaka', invoiceDue: 76000, directDue: 9000 },
        { id: 54, name: 'Phoenix BD', email: 'contact@phoenixbd.com', phone: '01798762345', address: 'Chittagong', invoiceDue: 50000, directDue: 1000 },
        { id: 55, name: 'FutureTech BD', email: 'support@futuretechbd.com', phone: '01698765423', address: 'Mohakhali, Dhaka', invoiceDue: 34000, directDue: 4000 },
        { id: 56, name: 'Pro Traders', email: 'info@protraders.com', phone: '01876598765', address: 'Sylhet', invoiceDue: 29000, directDue: 3000 },
        { id: 57, name: 'Smart Tech BD', email: 'smartbd@tech.com', phone: '01787654321', address: 'Mirpur, Dhaka', invoiceDue: 17000, directDue: 2000 },
        { id: 58, name: 'Global Suppliers', email: 'globalsuppliers@bd.com', phone: '01676543219', address: 'Gazipur', invoiceDue: 44000, directDue: 5000 },
    ];
    
      const [currentPage, setCurrentPage] = useState(1);
      const [filteredData, setFilteredData] = useState(data);
      const itemsPerPage = 20; // Set items per page for pagination
    
      // Generate unique names for the dropdown
      const uniqueNames = [...new Set(data?.map((supplier) => supplier.name))];
    
      // Handle filtering when supplier name is selected
      const handleSupplierChange = (supplierName) => {
        if (supplierName) {
          const filtered = data.filter(item => item.name === supplierName);
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
        setCurrentPage(1); // Reset to first page after filtering
      };
    
      // Reset the filter
      const resetFilter = () => {
        setFilteredData(data);
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
    const newWindow = window.open('', '_blank');
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
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, '')} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };
  return (
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
    <h1 className="text-lg dark:text-white  mb-4">Supplier Due Report</h1>

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
        
        <button onClick={resetFilter} className="bg-gray-500 text-white px-8 py-2 mt-5 md:mt-0 mr-5 md:mr-0 rounded">Reset</button>
        <button onClick={handlePrint} className="bg-green-500 text-white px-8 py-2 rounded ">Print</button>
      </div>
     
    </div>

    <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border dark:text-white md:mt-10">
      <thead>
        <tr className='bg-emerald-500 text-white'>
          <th className="border p-2">SL</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Address</th>
          <th className="border p-2">Invoice Due</th>
          <th className="border p-2">Direct Due</th>
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
            <td className="border p-2">{item.invoiceDue} TK</td>
            <td className="border p-2">{item.directDue} TK</td>
            <td className="border p-2">{item.invoiceDue + item.directDue} TK</td> {/* Calculating Total Due */}
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
          className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
  )
}
