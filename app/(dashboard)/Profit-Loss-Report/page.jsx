"use client"

import React, { useState } from 'react';

export default function ProfitLossReportge() {
    const profitLossData = [
        // 2023 Data
        { month: 'Jan 2023', sales: 800000, cogs: 700000, grossProfit: 100000, expenses: 20000, netProfit: 80000 },
        { month: 'Feb 2023', sales: 600000, cogs: 500000, grossProfit: 100000, expenses: 15000, netProfit: 85000 },
        { month: 'Mar 2023', sales: 500000, cogs: 450000, grossProfit: 50000, expenses: 10000, netProfit: 40000 },
        { month: 'Apr 2023', sales: 900000, cogs: 800000, grossProfit: 100000, expenses: 30000, netProfit: 70000 },
        { month: 'May 2023', sales: 400000, cogs: 350000, grossProfit: 50000, expenses: 10000, netProfit: 40000 },
        { month: 'Jun 2023', sales: 700000, cogs: 600000, grossProfit: 100000, expenses: 20000, netProfit: 80000 },
        { month: 'Jul 2023', sales: 850000, cogs: 750000, grossProfit: 100000, expenses: 30000, netProfit: 70000 },
        { month: 'Aug 2023', sales: 650000, cogs: 550000, grossProfit: 100000, expenses: 25000, netProfit: 75000 },
        { month: 'Sep 2023', sales: 950000, cogs: 850000, grossProfit: 100000, expenses: 30000, netProfit: 70000 },
        { month: 'Oct 2023', sales: 620000, cogs: 570000, grossProfit: 50000, expenses: 20000, netProfit: 30000 },
        { month: 'Nov 2023', sales: 800000, cogs: 720000, grossProfit: 80000, expenses: 25000, netProfit: 55000 },
        { month: 'Dec 2023', sales: 700000, cogs: 650000, grossProfit: 50000, expenses: 20000, netProfit: 30000 },
        
        // 2024 Data
        { month: 'Jan 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Feb 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Mar 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Apr 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'May 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Jun 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Jul 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Aug 2024', sales: 0, cogs: 0, grossProfit: 0, expenses: 0, netProfit: 0 },
        { month: 'Sep 2024', sales: 9078225.67, cogs: 8893700.50, grossProfit: 184525.17, expenses: 1700.00, netProfit: 182825.17 },
        { month: 'Oct 2024', sales: 4272183.42, cogs: 3749946.00, grossProfit: 522237.42, expenses: 25130.00, netProfit: 497107.42 }
      ];
    
      // State for date filtering
      const [startDate, setStartDate] = useState('2023-01');
      const [endDate, setEndDate] = useState('2024-12');
      const [filteredData, setFilteredData] = useState(profitLossData);
    
      // Convert a month string like "Jan 2023" to a comparable format like "2023-01"
      const convertMonthToComparable = (monthStr) => {
        const date = new Date(`${monthStr} 01`);
        return date.toISOString().slice(0, 7);
      };
    
      // Handle date filter
      const handleFilter = () => {
        const filtered = profitLossData.filter((item) => {
          const comparableMonth = convertMonthToComparable(item.month);
          return comparableMonth >= startDate && comparableMonth <= endDate;
        });
        setFilteredData(filtered);
      };
      // Handle reset filter
        const handleReset = () => {
            setStartDate('2023-01'); // Reset to default start date
            setEndDate('2024-12');   // Reset to default end date
            setFilteredData(profitLossData); // Reset data to original data set
        };
       // Print functionality
       const handlePrint = () => {
        const printContent = document.getElementById("table-to-print").outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
          <html>
            <head>
              <title>Profit And Loss Report</title>
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
    <div className="container mx-auto px-4 py-8 mt-[25%] sm:mt-[5%]  w-full">
    <h2 className=" dark:text-white text-lg  mb-4">Profit Loss Report</h2>
    
    {/* Date Filtering Inputs */}
    <div className="mb-4 md:flex md:space-x-4 w-full">
      <input
        type="month"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border bg-white p-2 w-full"
      />
      <input
        type="month"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border bg-white p-2 w-full"
      />
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 w-full md:w-1/4"
      >
        Filter
      </button>
      <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 w-full md:w-1/4"
        >
          Reset
        </button>
      <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 w-full md:w-1/4"
        >
          Print
        </button>
    </div>

    {/* Profit Loss Report Table */}
    <table id='table-to-print' className="table-auto  w-full text-center dark:text-white">
      <thead>
        <tr className='bg-emerald-500 text-white'>
          <th className="border p-2">Month</th>
          <th className="border p-2">Sales</th>
          <th className="border p-2">Cost of Goods Sold</th>
          <th className="border p-2">Gross Profit</th>
          <th className="border p-2">Expenses</th>
          <th className="border p-2">Net Profit</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item, index) => (
          <tr key={index}>
            <td className="border p-2">{item.month}</td>
            <td className="border p-2">{item.sales.toLocaleString()}</td>
            <td className="border p-2">{item.cogs.toLocaleString()}</td>
            <td className="border p-2">{item.grossProfit.toLocaleString()}</td>
            <td className="border p-2">{item.expenses.toLocaleString()}</td>
            <td className="border p-2">{item.netProfit.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};
