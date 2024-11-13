"use client"
import React, { useState } from 'react'

export default function TopProductsReport() {

     // Constant dataset with 85 products
  const data = [
    { id: 1, name: '3L Tar lata', code: 'TB34', totalQuantity: '148 Kg 9 gm', date: '2024-10-10' },
    { id: 2, name: 'Black Nodd', code: 'CX000027', totalQuantity: '113 Kg 0 gm', date: '2024-10-05' },
    { id: 3, name: 'Sinower', code: 'SI4', totalQuantity: '4 Sinower Packet 950 pc', date: '2024-10-01' },
    { id: 4, name: 'df', code: 'CX000037', totalQuantity: '1 Litre 0 ml', date: '2024-10-02' },
    { id: 5, name: 'Thread_1ylon_5_80LBD', code: 'CX000330', totalQuantity: '53 Pound 8 Ounce', date: '2024-10-10' },
    { id: 6, name: 'Minicate Rice_stock', code: 'CX000777', totalQuantity: '5 sack 0 Kg', date: '2024-10-10' },
    { id: 7, name: 'Chingura Polao Rice_Poosh Aromatic', code: 'CX000378', totalQuantity: '2 sack 40 kg', date: '2024-10-11' },
    { id: 8, name: '22-2 CHAIR', code: 'CX000627', totalQuantity: '77 Pc 8 [Red]', date: '2024-10-12' },
    { id: 9, name: 'Photo printed', code: '0732', totalQuantity: '100 pc', date: '2024-10-14' },
    { id: 10, name: 'Blazer For Men', code: 'CX000009', totalQuantity: '99 pc', date: '2024-10-15' },
    { id: 11, name: 'LM Machine', code: 'C020035', totalQuantity: '89 pc', date: '2024-10-14' },
    { id: 12, name: 'Iron_ABS_5mm', code: '12', totalQuantity: '13 pc', date: '2024-10-18' },
    { id: 13, name: 'Lady\'s Shoes_Black', code: 'CX000054', totalQuantity: '1 Dozen 5 pc', date: '2024-10-20' },
    { id: 14, name: 'ABC', code: 'ABC', totalQuantity: '12 pc', date: '2024-10-25' },
    { id: 15, name: 'Nestle Nescafe_8_Flort', code: 'CX000038', totalQuantity: '12 pc', date: '2024-10-28' },
    { id: 16, name: 'Canned Litchi', code: 'TB95', totalQuantity: '1800 pc', date: '2024-10-28' },
    { id: 17, name: 'Email', code: '', totalQuantity: '1 pc', date: '2024-10-30' },
    { id: 18, name: 'Oppo A33', code: 'A33', totalQuantity: '11 pc', date: '2024-10-22' },
    { id: 19, name: 'Air Conditioner', code: 'CX000667', totalQuantity: '10 pc', date: '2024-10-23' },
    { id: 20, name: 'Heater mega breamer', code: 'CX000790', totalQuantity: '10 pc', date: '2024-10-21' },
    // Add the remaining 65 product entries...
    { id: 21, name: 'Thermoking 57', code: '791', totalQuantity: '10 pc', date: '2024-10-11' },
    { id: 22, name: 'grand pa', code: 'CX170100003003', totalQuantity: '10 pc', date: '2024-10-15' },
    { id: 23, name: 'TP-Link Router 310M', code: 'CX000332', totalQuantity: '9 pc', date: '2024-10-19' },
    { id: 24, name: 'Twelve mega black', code: 'CX000031', totalQuantity: '8 pc', date: '2024-10-13' },
    { id: 25, name: 'Bin Bin slim', code: 'CX000018', totalQuantity: '6 pc', date: '2024-10-25' },
    { id: 26, name: 'Inches mega highlighter', code: 'CX000133', totalQuantity: '6 pc', date: '2024-10-12' },
    { id: 27, name: 'test3', code: 'CX000062', totalQuantity: '5 pc', date: '2024-10-26' },
    { id: 28, name: 'Desktop Computer', code: 'CX000963', totalQuantity: '5 pc', date: '2024-10-14' },
    { id: 29, name: 'Door Export', code: 'C02008', totalQuantity: '4 pc', date: '2024-10-16' },
    { id: 30, name: 'Ice Ice mega', code: 'KC7', totalQuantity: '4 pc', date: '2024-10-12' },
    { id: 31, name: 'test 3', code: 'CX000171', totalQuantity: '3 pc', date: '2024-10-22' },
    { id: 32, name: 'T-Shirt', code: '12354', totalQuantity: '3 pc', date: '2024-10-20' },
    { id: 33, name: 'Camino Lizzto', code: 'CX000003', totalQuantity: '3 pc', date: '2024-10-12' },
    { id: 34, name: 'Laptop Computer', code: 'CX000034', totalQuantity: '2 pc', date: '2024-10-12' },
    { id: 35, name: 'TP-Link Router', code: 'CX000014', totalQuantity: '2 pc', date: '2024-10-18' },
    { id: 36, name: 'CMU', code: 'CX000037', totalQuantity: '2 pc', date: '2024-10-23' },
    { id: 37, name: 'Motorola Eonic 01', code: '345876334446', totalQuantity: '2 pc', date: '2024-10-25' },
    { id: 38, name: 'Chess-Classic Kaolin', code: 'CX000034', totalQuantity: '3 pc', date: '2024-10-14' },
    { id: 39, name: 'df new item', code: 'CX000062', totalQuantity: '2 pc', date: '2024-10-21' },
    { id: 40, name: 'Middle House', code: 'CX000071', totalQuantity: '1 pc', date: '2024-10-27' },
    { id: 41, name: 'T-shirt Polo', code: 'CX000012', totalQuantity: '1 pc', date: '2024-10-19' },
    { id: 42, name: 'test1', code: 'CX000184', totalQuantity: '1 pc', date: '2024-10-29' },
    { id: 43, name: 'Dress', code: '', totalQuantity: '1 pc', date: '2024-10-30' },
    { id: 44, name: 'Earphone', code: '48910', totalQuantity: '1 pc', date: '2024-10-30' },
    { id: 45, name: 'T-Shirt Slim', code: 'TCS3', totalQuantity: '1 pc', date: '2024-10-18' },
    { id: 46, name: 'Sippa', code: 'CX1701000175', totalQuantity: '1 pc', date: '2024-10-25' },
    { id: 47, name: 'Thirst Buster', code: '02192002054', totalQuantity: '1 pc', date: '2024-10-17' },
    { id: 48, name: 'Sh_XXL', code: 'CX000170', totalQuantity: '1 pc', date: '2024-10-20' },
    { id: 49, name: 'Ladies Shirt', code: 'CX000054', totalQuantity: '0 pc', date: '2024-10-19' },
    { id: 50, name: 'Frame', code: 'CX000046', totalQuantity: '0 pc', date: '2024-10-18' },
    { id: 51, name: 'Tunda PB Router', code: 'CX000018', totalQuantity: '0 pc', date: '2024-10-21' },
    { id: 52, name: 'test4', code: 'CX000032', totalQuantity: '0 pc', date: '2024-10-23' },
    { id: 53, name: 'Programmable Logic Controller (PLC)', code: 'FX3U-64MR/ES-A', totalQuantity: '0 pc', date: '2024-10-30' },
    { id: 54, name: 'Programmable Logic Controller (PLC) MADE IN JAPAN', code: 'FX3U-64MR/ES-A', totalQuantity: '0 pc', date: '2024-10-25' },
    { id: 55, name: 'HEAD LAMP', code: 'QLZ01023', totalQuantity: '0 pc', date: '2024-10-30' },
    { id: 56, name: 'T-shirt', code: 'CX000182', totalQuantity: '0 pc', date: '2024-10-18' },
    { id: 57, name: 'addif', code: 'CX000029', totalQuantity: '0 pc', date: '2024-10-22' },
    { id: 58, name: 'Br', code: 'V343', totalQuantity: '0 pc', date: '2024-10-11' },
    { id: 59, name: 'archer c64', code: '331E44EAECJS', totalQuantity: '0 pc', date: '2024-10-11' },
    { id: 60, name: 'Guadino Class Franco', code: 'CX000131', totalQuantity: '0 pc', date: '2024-10-12' },
    { id: 61, name: 'br lite test', code: 'CX000032', totalQuantity: '0 kg 0 gm', date: '2024-10-12' },
    { id: 62, name: 'dev_test', code: 'CX000318', totalQuantity: '0 Dozen 0 pc', date: '2024-10-22' },
    { id: 63, name: 'devtest_product', code: 'CX000328', totalQuantity: '0 pc', date: '2024-10-23' },
    { id: 64, name: 'Bluff', code: 'CX000349', totalQuantity: '0 pc', date: '2024-10-22' },
    { id: 65, name: 'Invest', code: 'CX000101', totalQuantity: '0 pc', date: '2024-10-19' },
    { id: 66, name: 'Stone 2 inch', code: 'CX000041', totalQuantity: '0 Stone Packet 0 pc', date: '2024-10-15' },
    { id: 67, name: 'napa', code: 'CX000016', totalQuantity: '0 pc', date: '2024-10-23' },
    { id: 68, name: 'Samsung', code: 'CX000148', totalQuantity: '0 pc', date: '2024-10-17' },
    { id: 69, name: 'Lady\'s Shoes_Black', code: 'CX000059', totalQuantity: '0 Shoes_pair_0', date: '2024-10-16' },
    { id: 70, name: 'Chicken burger', code: '2', totalQuantity: '0 pc', date: '2024-10-13' },
    { id: 71, name: 'Chicken cheese burger', code: '3', totalQuantity: '0 pc', date: '2024-10-12' },
    { id: 72, name: 'Minicate Rice', code: 'CX000275', totalQuantity: '0 Kg 0 gm', date: '2024-10-13' },
    { id: 73, name: 'Baby dress', code: 'CIS-130', totalQuantity: '0 pc', date: '2024-10-14' },
    { id: 74, name: 'Ladies shoe', code: '471-36', totalQuantity: '0 pc', date: '2024-10-21' },
    { id: 75, name: 'lok', code: 'g004', totalQuantity: '0 Litre', date: '2024-10-22' },
    { id: 76, name: 'Laptop_dell', code: 'CX000095', totalQuantity: '0 Pc Pc', date: '2024-10-20' },
    { id: 77, name: 'Parly Oil', code: 'CX00075', totalQuantity: '0 pc', date: '2024-10-21' },
    // Complete list of 85 products
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 20; // Set items per page for pagination

  // Filter function based on start date and end date
  const filterData = () => {
    if (startDate && endDate) {
      const filtered = data.filter(item => new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset filter
  const resetFilter = () => {
    setFilteredData(data);
    setStartDate('');
    setEndDate('');
    setCurrentPage(1); // Reset to first page
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
          <title>Top Product List</title>
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
      <h1 className="text-lg dark:text-white  mb-4">Top Products</h1>

      <div className="md:flex flex-wrap justify-between items-center mb-4">
            <div className="md:flex md:space-x-2 w-full md:w-full">
        {/* Date filtering */}
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 w-full bg-white"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 w-full bg-white"
        />
        <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-1/4">Filter</button>
        <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-1/4">Reset</button>
      </div>
      </div>
      <div className='flex items-center justify-end'>
            <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-1/12 mb-2">Print</button>
         </div>

      <h2 className=" dark:text-white text-lg  mb-4 text-center">Top Selling Products</h2>
      <p className=" dark:text-white text-center mb-4">Report From {startDate || '01/10/2024'} to {endDate || '31/10/2024'}</p>

      <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border">
        <thead>
          <tr className='bg-emerald-500 text-white'>
            <th className="border p-2">SL</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.code}</td>
              <td className="border p-2">{item.totalQuantity}</td>
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