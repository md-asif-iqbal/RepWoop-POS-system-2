"use client"

import React, { useEffect, useState } from 'react';

export default function SupplierLedger() {
    const supplierData = [
        {
          id: 1,
          supplierName: 'Hasan Trading',
          contactNo: '01712345678',
          address: 'Dhaka',
          transactions: [
            { date: '2024-09-10', particulars: 'Purchase #15', debit: '', credit: '50000.00', balance: '50000.00' },
            { date: '2024-09-11', particulars: 'Paid to Supplier', debit: '20000.00', credit: '', balance: '30000.00' },
          ],
        },
        {
          id: 2,
          supplierName: 'Alif Corporation',
          contactNo: '01987654321',
          address: 'Chittagong',
          transactions: [
            { date: '2024-09-12', particulars: 'Purchase #20', debit: '', credit: '60000.00', balance: '60000.00' },
            { date: '2024-09-13', particulars: 'Paid to Supplier', debit: '30000.00', credit: '', balance: '30000.00' },
          ],
        },
        {
          id: 3,
          supplierName: 'Khan Enterprise',
          contactNo: '01812345678',
          address: 'Khulna',
          transactions: [
            { date: '2024-09-14', particulars: 'Purchase #25', debit: '', credit: '40000.00', balance: '40000.00' },
            { date: '2024-09-15', particulars: 'Paid to Supplier', debit: '15000.00', credit: '', balance: '25000.00' },
          ],
        },
        {
          id: 4,
          supplierName: 'Mithila Supplies',
          contactNo: '01999887766',
          address: 'Sylhet',
          transactions: [
            { date: '2024-09-16', particulars: 'Purchase #30', debit: '', credit: '35000.00', balance: '35000.00' },
            { date: '2024-09-17', particulars: 'Paid to Supplier', debit: '10000.00', credit: '', balance: '25000.00' },
          ],
        },
        {
          id: 5,
          supplierName: 'Bengal Suppliers',
          contactNo: '01711223344',
          address: 'Barisal',
          transactions: [
            { date: '2024-09-18', particulars: 'Purchase #35', debit: '', credit: '60000.00', balance: '60000.00' },
            { date: '2024-09-19', particulars: 'Paid to Supplier', debit: '20000.00', credit: '', balance: '40000.00' },
          ],
        },
        {
          id: 6,
          supplierName: 'Ahmed Trade Co.',
          contactNo: '01655554444',
          address: 'Rajshahi',
          transactions: [
            { date: '2024-09-20', particulars: 'Purchase #40', debit: '', credit: '50000.00', balance: '50000.00' },
            { date: '2024-09-21', particulars: 'Paid to Supplier', debit: '25000.00', credit: '', balance: '25000.00' },
          ],
        },
        {
          id: 7,
          supplierName: 'Nabil Suppliers',
          contactNo: '01766665555',
          address: 'Mymensingh',
          transactions: [
            { date: '2024-09-22', particulars: 'Purchase #45', debit: '', credit: '45000.00', balance: '45000.00' },
            { date: '2024-09-23', particulars: 'Paid to Supplier', debit: '15000.00', credit: '', balance: '30000.00' },
          ],
        },
        {
          id: 8,
          supplierName: 'Latif Enterprises',
          contactNo: '01977778888',
          address: 'Jessore',
          transactions: [
            { date: '2024-09-24', particulars: 'Purchase #50', debit: '', credit: '70000.00', balance: '70000.00' },
            { date: '2024-09-25', particulars: 'Paid to Supplier', debit: '25000.00', credit: '', balance: '45000.00' },
          ],
        },
        {
          id: 9,
          supplierName: 'Shah & Co.',
          contactNo: '01888887777',
          address: 'Comilla',
          transactions: [
            { date: '2024-09-26', particulars: 'Purchase #55', debit: '', credit: '65000.00', balance: '65000.00' },
            { date: '2024-09-27', particulars: 'Paid to Supplier', debit: '20000.00', credit: '', balance: '45000.00' },
          ],
        },
        {
          id: 10,
          supplierName: 'Royal Trading Ltd.',
          contactNo: '01711112222',
          address: 'Tangail',
          transactions: [
            { date: '2024-09-28', particulars: 'Purchase #60', debit: '', credit: '30000.00', balance: '30000.00' },
            { date: '2024-09-29', particulars: 'Paid to Supplier', debit: '10000.00', credit: '', balance: '20000.00' },
          ],
        },
        {
          id: 11,
          supplierName: 'Haque Enterprise',
          contactNo: '01622223333',
          address: 'Faridpur',
          transactions: [
            { date: '2024-09-30', particulars: 'Purchase #65', debit: '', credit: '40000.00', balance: '40000.00' },
            { date: '2024-10-01', particulars: 'Paid to Supplier', debit: '15000.00', credit: '', balance: '25000.00' },
          ],
        },
        {
          id: 12,
          supplierName: 'Jamuna Suppliers',
          contactNo: '01733334444',
          address: 'Pabna',
          transactions: [
            { date: '2024-10-02', particulars: 'Purchase #70', debit: '', credit: '55000.00', balance: '55000.00' },
            { date: '2024-10-03', particulars: 'Paid to Supplier', debit: '20000.00', credit: '', balance: '35000.00' },
          ],
        },
        {
          id: 13,
          supplierName: 'Titas Trading Co.',
          contactNo: '01844445555',
          address: 'Kushtia',
          transactions: [
            { date: '2024-10-04', particulars: 'Purchase #75', debit: '', credit: '60000.00', balance: '60000.00' },
            { date: '2024-10-05', particulars: 'Paid to Supplier', debit: '25000.00', credit: '', balance: '35000.00' },
          ],
        },
        {
          id: 14,
          supplierName: 'Omar Trading Ltd.',
          contactNo: '01666667777',
          address: 'Bogura',
          transactions: [
            { date: '2024-10-06', particulars: 'Purchase #80', debit: '', credit: '65000.00', balance: '65000.00' },
            { date: '2024-10-07', particulars: 'Paid to Supplier', debit: '30000.00', credit: '', balance: '35000.00' },
          ],
        },
        {
          id: 15,
          supplierName: 'Rahim Traders',
          contactNo: '01777778888',
          address: 'Jamalpur',
          transactions: [
            { date: '2024-10-08', particulars: 'Purchase #85', debit: '', credit: '70000.00', balance: '70000.00' },
            { date: '2024-10-09', particulars: 'Paid to Supplier', debit: '35000.00', credit: '', balance: '35000.00' },
          ],
        },
        {
          id: 16,
          supplierName: 'Kamal Enterprise',
          contactNo: '01999990000',
          address: 'Noakhali',
          transactions: [
            { date: '2024-10-10', particulars: 'Purchase #90', debit: '', credit: '40000.00', balance: '40000.00' },
            { date: '2024-10-11', particulars: 'Paid to Supplier', debit: '15000.00', credit: '', balance: '25000.00' },
          ],
        },
        {
          id: 17,
          supplierName: 'Rupali Suppliers',
          contactNo: '01655556666',
          address: 'Khagrachari',
          transactions: [
            { date: '2024-10-12', particulars: 'Purchase #95', debit: '', credit: '55000.00', balance: '55000.00' },
            { date: '2024-10-13', particulars: 'Paid to Supplier', debit: '20000.00', credit: '', balance: '35000.00' },
          ],
        },
        {
          id: 18,
          supplierName: 'Golden Trade Co.',
          contactNo: '01722224444',
          address: 'Narayanganj',
          transactions: [
            { date: '2024-10-14', particulars: 'Purchase #100', debit: '', credit: '45000.00', balance: '45000.00' },
            { date: '2024-10-15', particulars: 'Paid to Supplier', debit: '15000.00', credit: '', balance: '30000.00' },
          ],
        },
        {
          id: 19,
          supplierName: 'Silver Enterprises',
          contactNo: '01988887777',
          address: 'Satkhira',
          transactions: [
            { date: '2024-10-16', particulars: 'Purchase #105', debit: '', credit: '30000.00', balance: '30000.00' },
            { date: '2024-10-17', particulars: 'Paid to Supplier', debit: '10000.00', credit: '', balance: '20000.00' },
          ],
        },
        {
          id: 20,
          supplierName: 'Platinum Trading Co.',
          contactNo: '01755556666',
          address: 'Munshiganj',
          transactions: [
            { date: '2024-10-18', particulars: 'Purchase #110', debit: '', credit: '60000.00', balance: '60000.00' },
            { date: '2024-10-19', particulars: 'Paid to Supplier', debit: '25000.00', credit: '', balance: '35000.00' },
          ],
        },
      ];
      
    
      const [selectedSupplier, setSelectedSupplier] = useState('');
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const [filteredTransactions, setFilteredTransactions] = useState([]);
      const [initialSupplier, setInitialSupplier] = useState(null); // Store the initially selected supplier
    
      // Set random supplier data on initial load
      useEffect(() => {
        const randomSupplier = supplierData[Math.floor(Math.random() * supplierData.length)];
        setInitialSupplier(randomSupplier);
        setFilteredTransactions(randomSupplier.transactions);
      }, []);
    
      // Filter function to display supplier ledger based on selected supplier and date range
      const filterData = () => {
        const supplier = supplierData.find(item => item.supplierName === selectedSupplier);
        if (supplier) {
          let transactions = supplier.transactions;
    
          // Filter by date range
          if (startDate && endDate) {
            transactions = transactions.filter(transaction =>
              new Date(transaction.date) >= new Date(startDate) && new Date(transaction.date) <= new Date(endDate)
            );
          }
          setFilteredTransactions(transactions);
          setInitialSupplier(supplier); // Set the filtered supplier as the current
        }
      };
    
      // Reset the filter
      const resetFilter = () => {
        setSelectedSupplier('');
        setStartDate('');
        setEndDate('');
        setFilteredTransactions(initialSupplier.transactions);
      };

       // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Supplier Ledger Report</title>
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
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm md:h-screen">
    <h1 className="text-lg dark:text-white  mb-4">Supplier Ledger</h1>

    <div className="md:flex flex-wrap justify-between items-center mb-4 ">
            <div className="md:flex md:space-x-2 w-full md:w-full">
      {/* Supplier selection */}
      <select
        value={selectedSupplier}
        onChange={(e) => setSelectedSupplier(e.target.value)}
        className="border p-2  w-full  md:w-full"
      >
        <option value="">Select a Supplier</option>
        {supplierData?.map((supplier, index) => (
          <option key={index} value={supplier.supplierName}>
            {supplier.supplierName} {supplier.contactNo}
          </option>
        ))}
      </select>

      {/* Date range filtering */}
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
      <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4 mt-4 md:mt-0 md:mb-0 md:w-1/4">Filter</button>
      <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-1/4">Reset</button>
    </div>
    </div>
        <div className='flex items-center justify-end'>
            <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-1/12 mb-2">Print</button>
        </div>

    {/* Display default address, phone, and email details
    <div>
      <p>Address: Aramnagar Bazar, Sarishabari, Jamalpur</p>
      <p>Phone: 01715430641</p>
      <p>Email: hasanthaauluminiumsarishabari@gmail.com</p>
    </div> */}

    {/* Display supplier details and ledger */}
    {initialSupplier && (
      <div>
        <div className="grid md:grid-cols-2 mb-4">
          <div>
            <p>Account of: <strong>{initialSupplier.supplierName}</strong></p>
            <p>Address: {initialSupplier.address}</p>
            <p>Contact No: {initialSupplier.contactNo}</p>
          </div>
          <div>
            <p>Address: Aramnagar Bazar, Sarishabari, Jamalpur</p>
            <p>Phone: 01715430641</p>
            <p>Email: hasanthaauluminiumsarishabari@gmail.com</p>
          </div>
        </div>

        {/* If transactions are available, show ledger table */}
        {filteredTransactions.length > 0 ? (
          <>
            <h3 className="text-lg  mb-2">Supplier Ledger</h3>
            <table id="table-to-print" className="table-auto dark:text-white w-full border-collapse border">
              <thead>
                <tr className='bg-emerald-500 text-white'>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Particulars</th>
                  <th className="border p-2">Debit</th>
                  <th className="border p-2">Credit</th>
                  <th className="border p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions?.map((transaction, index) => (
                  <tr key={index}>
                    <td className="border p-2">{transaction.date}</td>
                    <td className="border p-2">{transaction.particulars}</td>
                    <td className="border p-2">{transaction.debit || '-'}</td>
                    <td className="border p-2">{transaction.credit || '-'}</td>
                    <td className="border p-2">{transaction.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No data available for this supplier.</p>
        )}
      </div>
    )}
  </div>
)
}
