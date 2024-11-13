"use client"

import { useState } from "react";

export default function DailyReport() {
    // Sample data with 30 entries and unique IDs
  const data = [
    { id: 1, date: '2024-10-01', sellAmount: 275505, purchaseAmount: 90150, expenses: 5000, returned: 0, grossProfit: 448855, netProfit: 184045 },
    { id: 2, date: '2024-10-02', sellAmount: 823048.43, purchaseAmount: 831910, expenses: 0, returned: 11759, grossProfit: 146219.33, netProfit: -14881.67 },
    { id: 3, date: '2024-10-03', sellAmount: 4392.76, purchaseAmount: 1660500, expenses: 0, returned: 700, grossProfit: 9838.76, netProfit: -1621776.24 },
    { id: 4, date: '2024-10-04', sellAmount: 111364, purchaseAmount: 461000, expenses: 0, returned: 0, grossProfit: 91700, netProfit: 23365 },
    { id: 5, date: '2024-10-05', sellAmount: 101764, purchaseAmount: 77600, expenses: 0, returned: 2341, grossProfit: 6321, netProfit: 9169 },
    { id: 6, date: '2024-10-06', sellAmount: 119675.25, purchaseAmount: 200000, expenses: 0, returned: 0, grossProfit: 11864.25, netProfit: -148320.75 },
    { id: 7, date: '2024-10-07', sellAmount: 29912.12, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 351.12, netProfit: -30570.88 },
    { id: 8, date: '2024-10-08', sellAmount: 18510, purchaseAmount: 17480, expenses: 80, returned: 0, grossProfit: 205, netProfit: -1570 },
    { id: 9, date: '2024-10-09', sellAmount: 1565190, purchaseAmount: 1373690, expenses: 0, returned: 0, grossProfit: 211651, netProfit: 191300 },
    { id: 10, date: '2024-10-10', sellAmount: 9868.56, purchaseAmount: 33860, expenses: 0, returned: 0, grossProfit: 1796.56, netProfit: 6326.56 },
    { id: 11, date: '2024-10-11', sellAmount: 215.00, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 215 },
    { id: 12, date: '2024-10-12', sellAmount: 104790.56, purchaseAmount: 455000, expenses: 0, returned: 0, grossProfit: 6420.56, netProfit: -350209.44 },
    { id: 13, date: '2024-10-13', sellAmount: 43934.80, purchaseAmount: 890, expenses: 20000, returned: 220, grossProfit: 7271.80, netProfit: 22194.8 },
    { id: 14, date: '2024-10-14', sellAmount: 387007.80, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 224470.8, netProfit: 387007.8 },
    { id: 15, date: '2024-10-15', sellAmount: 2190.00, purchaseAmount: 860, expenses: 0, returned: 645, grossProfit: 562, netProfit: 685 },
    { id: 16, date: '2024-10-16', sellAmount: 2125.00, purchaseAmount: 6610, expenses: 0, returned: 0, grossProfit: 0, netProfit: -4485 },
    { id: 17, date: '2024-10-17', sellAmount: 100.00, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 20, netProfit: 100 },
    { id: 18, date: '2024-10-18', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 19, date: '2024-10-19', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 20, date: '2024-10-20', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 21, date: '2024-10-21', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 22, date: '2024-10-22', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 23, date: '2024-10-23', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 24, date: '2024-10-24', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 25, date: '2024-10-25', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 26, date: '2024-10-26', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 27, date: '2024-10-27', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 28, date: '2024-10-28', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 29, date: '2024-10-29', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 },
    { id: 30, date: '2024-10-30', sellAmount: 0, purchaseAmount: 0, expenses: 0, returned: 0, grossProfit: 0, netProfit: 0 }
  ];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Set items per page

  // Filter data based on date range
  const filterData = () => {
    let filtered = data;

    if (startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset filter
  const resetFilter = () => {
    setFilteredData(data);
    setStartDate('');
    setEndDate('');
    setCurrentPage(1); // Reset to first page
  };

  // Pagination Logic
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
          <title>Daily Report Information</title>
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
    <div>
        
        <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] ">
      <h1 className="text-lg  mb-5 dark:text-white">Daily Report</h1>

      <div className="flex justify-between  w-full mb-5">
        <div className="flex md:space-x-2 w-full ">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border p-2 w-full bg-white"
            placeholder="Enter Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border p-2 w-full bg-white"
            placeholder="Enter End Date"
          />
          <button onClick={filterData} className="bg-blue-500 text-white px-8 py-2 rounded ">Filter</button>
          <button onClick={resetFilter} className="bg-gray-500 text-white px-8 py-2 rounded">Reset</button>
        </div>
        <button onClick={handlePrint} className="bg-green-500 text-white px-8 md:ml-2 py-2 rounded">Print</button>
      </div>

      <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border text-center">
        <thead>
          <tr className='bg-emerald-500 text-white'>
            <th className="border p-2">ID</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Sell Amount</th>
            <th className="border p-2">Purchase Amount</th>
            <th className="border p-2">Expenses</th>
            <th className="border p-2">Returned</th>
            <th className="border p-2">Sell/Gross Profit</th>
            <th className="border p-2">Net Profit</th>
          </tr>
        </thead>
        <tbody className="dark:text-white ">
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.sellAmount}</td>
              <td className="border p-2">{item.purchaseAmount}</td>
              <td className="border p-2">{item.expenses}</td>
              <td className="border p-2">{item.returned}</td>
              <td className="border p-2">{item.grossProfit}</td>
              <td className="border p-2">{item.netProfit}</td>
            </tr>
          ))}
        </tbody>
        {/* Total Row */}
        <tfoot>
          <tr className="bg-gray-100">
            <td className="border p-2 ">Total:</td>
            <td className="border p-2 "></td>
            <td className="border p-2 ">{filteredData.reduce((acc, curr) => acc + curr.sellAmount, 0)}</td>
            <td className="border p-2 ">{filteredData.reduce((acc, curr) => acc + curr.purchaseAmount, 0)}</td>
            <td className="border p-2 ">{filteredData.reduce((acc, curr) => acc + curr.expenses, 0)}</td>
            <td className="border p-2 ">{filteredData.reduce((acc, curr) => acc + curr.returned, 0)}</td>
            <td className="border p-2 ">{filteredData.reduce((acc, curr) => acc + curr.grossProfit, 0)}</td>
            <td className="border p-2 ">{filteredData.reduce((acc, curr) => acc + curr.netProfit, 0)}</td>
          </tr>
        </tfoot>
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
     
    </div>
  )
}
