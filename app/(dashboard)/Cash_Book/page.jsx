'use client'
import React, { useRef } from "react";



export default function CashBook() {
  // Data for transactions stored in a constant
  const transactions = [
    {
      id: 1,
      date: "29/09/2024",
      details: "Sales ID: #81, Customer: Wolking Customer, Item: Oraimo Glass Rambo *1 pc",
      type: "Received",
      debit: 130.0,
      credit: 0,
      balance: 130.0,
    },
    {
      id: 2,
      date: "29/09/2024",
      details: "Sales ID: #80, Customer: Wolking Customer, Item: Blajer For Men *1 pc",
      type: "Received",
      debit: 3000.0,
      credit: 0,
      balance: 3000.0,
    },
    {
      id: 3,
      date: "29/09/2024",
      details: "Sales ID: #78, Customer: Raky, Item: Laptop Computer *1 pc",
      type: "Received",
      debit: 50000.0,
      credit: 0,
      balance: 50000.0,
    },
    {
      id: 4,
      date: "30/09/2024",
      details: "Sales ID: #82, Customer: John Doe, Item: Headphone *2 pcs",
      type: "Received",
      debit: 2000.0,
      credit: 0,
      balance: 2000.0,
    },
    {
      id: 5,
      date: "30/09/2024",
      details: "Sales ID: #83, Customer: Jane Smith, Item: Monitor *1 pc",
      type: "Received",
      debit: 10000.0,
      credit: 0,
      balance: 10000.0,
    },
  ];
  const printRef = useRef(); // Create a ref for the print section

  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Cash Book Information</title>
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
   <div className='dark:bg-[#141432] md:h-screen font-nunito text-sm bg-white p-2'>
    <div className='md:mt-[5%] mt-[20%] shadow-sm items-center'>
    </div>
       <div className=" w-full mx-auto  dark:bg-[#1a1a38] ">
      {/* Title and Print Button aligned in opposite directions */}
      <div className="md:flex md:justify-between items-center mb-2 dark:text-white">
        <div className="text-lg dark:text-white text-gray-500">Cash Book</div>
        <button
           onClick={handlePrint}
          className="bg-emerald-500 text-white cursor-pointer  px-10 py-2 rounded-md hover:bg-teal-600"
        >
          Print
        </button>
      </div>

      {/* Balance Information */}
       {/* This section contains the balance information and table to print/download */}
       <div ref={printRef} className="print-section space-y-6 dark:text-white  rounded">
        {/* Balance Information */}
        <div className="space-y-2 text-sm dark:text-white">
          <p>
            <span className="">Opening Balance: </span>0.00
          </p>
          <p>
            <span className="">Previous Balance: </span>5,217,410
          </p>
          <p>
            <span className="">Current Balance: </span>5,259,540
          </p>
        </div>

        {/* Transaction Table */}
        <div className="mt-6 ">
          <table id="table-to-print" className="min-w-full bg-white dark:bg-[#1a1a38] border border-gray-300  ">
            <thead>
              <tr className="bg-emerald-500  text-white  text-sm">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Transaction Details</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Debit</th>
                <th className="py-2 px-4 border-b">Credit</th>
                <th className="py-2 px-4 border-b">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction.id} className="text-sm">
                  <td className="py-2 px-4 border-b">{transaction.id}</td>
                  <td className="py-2 px-4 border-b">{transaction.date}</td>
                  <td className="py-2 px-4 border-b">{transaction.details}</td>
                  <td className="py-2 px-4 border-b">{transaction.type}</td>
                  <td className="py-2 px-4 border-b">{transaction.debit}</td>
                  <td className="py-2 px-4 border-b">{transaction.credit}</td>
                  <td className="py-2 px-4 border-b">{transaction.balance}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 dark:bg-[#1a1a38] text-sm">
                <td colSpan="6" className="py-2 px-4 border-t text-right ">
                  Total
                </td>
                <td className="py-2 px-4 border-t text-green-600">
                  Tk {transactions.reduce((acc, transaction) => acc + transaction.balance, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      </div>
      </div>
  );
};
