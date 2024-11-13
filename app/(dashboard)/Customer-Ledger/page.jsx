"use client"

import React, { useEffect, useState } from 'react';

export default function CustomerLedger () {

    // Constant dataset with 10 entries
  const data = [
    {
        id: 1,
        customerName: 'Sakib Rabby',
        contactNo: '0184578745',
        address: 'Dhaka',
        transactions: [
          { date: '2024-09-22', particulars: 'Sale #20', debit: '99000.00', credit: '', balance: '99000.00' },
          { date: '2024-09-22', particulars: 'Received from Customer', debit: '', credit: '666.00', balance: '98334.00' },
        ],
      },
      {
        id: 2,
        customerName: 'Ahmed Zubyer',
        contactNo: '01715430641',
        address: 'Chittagong',
        transactions: [
          { date: '2024-09-20', particulars: 'Sale #15', debit: '50000.00', credit: '', balance: '50000.00' },
          { date: '2024-09-21', particulars: 'Received from Customer', debit: '', credit: '10000.00', balance: '40000.00' },
        ],
      },
      {
        id: 3,
        customerName: 'Mahmud Hasan',
        contactNo: '01634567890',
        address: 'Khulna',
        transactions: [
          { date: '2024-09-15', particulars: 'Sale #25', debit: '12000.00', credit: '', balance: '12000.00' },
          { date: '2024-09-16', particulars: 'Received from Customer', debit: '', credit: '5000.00', balance: '7000.00' },
        ],
      },
      {
        id: 4,
        customerName: 'Rony Akter',
        contactNo: '01912345678',
        address: 'Sylhet',
        transactions: [
          { date: '2024-09-13', particulars: 'Sale #30', debit: '20000.00', credit: '', balance: '20000.00' },
          { date: '2024-09-14', particulars: 'Received from Customer', debit: '', credit: '8000.00', balance: '12000.00' },
        ],
      },
      {
        id: 5,
        customerName: 'Shakil Khan',
        contactNo: '01987654321',
        address: 'Rajshahi',
        transactions: [
          { date: '2024-09-18', particulars: 'Sale #45', debit: '60000.00', credit: '', balance: '60000.00' },
          { date: '2024-09-19', particulars: 'Received from Customer', debit: '', credit: '25000.00', balance: '35000.00' },
        ],
      },
      {
        id: 6,
        customerName: 'Taslima Akter',
        contactNo: '01711223344',
        address: 'Mymensingh',
        transactions: [
          { date: '2024-09-22', particulars: 'Sale #50', debit: '70000.00', credit: '', balance: '70000.00' },
          { date: '2024-09-22', particulars: 'Received from Customer', debit: '', credit: '10000.00', balance: '60000.00' },
        ],
      },
      {
        id: 7,
        customerName: 'Rahman Hossain',
        contactNo: '01876543210',
        address: 'Barisal',
        transactions: [
          { date: '2024-09-10', particulars: 'Sale #35', debit: '45000.00', credit: '', balance: '45000.00' },
          { date: '2024-09-11', particulars: 'Received from Customer', debit: '', credit: '15000.00', balance: '30000.00' },
        ],
      },
      {
        id: 8,
        customerName: 'Nusrat Jahan',
        contactNo: '01612345678',
        address: 'Cox’s Bazar',
        transactions: [
          { date: '2024-09-17', particulars: 'Sale #40', debit: '35000.00', credit: '', balance: '35000.00' },
          { date: '2024-09-18', particulars: 'Received from Customer', debit: '', credit: '10000.00', balance: '25000.00' },
        ],
      },
      {
        id: 9,
        customerName: 'Zakir Hossain',
        contactNo: '01998765432',
        address: 'Gazipur',
        transactions: [
          { date: '2024-09-12', particulars: 'Sale #55', debit: '80000.00', credit: '', balance: '80000.00' },
          { date: '2024-09-13', particulars: 'Received from Customer', debit: '', credit: '20000.00', balance: '60000.00' },
        ],
      },
      {
        id: 10,
        customerName: 'Rashed Ahmed',
        contactNo: '01799887766',
        address: 'Narail',
        transactions: [
          { date: '2024-09-15', particulars: 'Sale #60', debit: '30000.00', credit: '', balance: '30000.00' },
          { date: '2024-09-16', particulars: 'Received from Customer', debit: '', credit: '5000.00', balance: '25000.00' },
        ],
      },
      {
        id: 11,
        customerName: 'Hasan Mahmud',
        contactNo: '01766665555',
        address: 'Jamalpur',
        transactions: [
          { date: '2024-09-14', particulars: 'Sale #65', debit: '50000.00', credit: '', balance: '50000.00' },
          { date: '2024-09-15', particulars: 'Received from Customer', debit: '', credit: '15000.00', balance: '35000.00' },
        ],
      }
    // Add more customers and transactions as needed
  ];

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [initialCustomer, setInitialCustomer] = useState(null); // Store the initially selected customer

  // Set random customer data on initial load
  useEffect(() => {
    const randomCustomer = data[Math.floor(Math.random() * data.length)];
    setInitialCustomer(randomCustomer);
    setFilteredTransactions(randomCustomer.transactions);
  }, []);

  // Filter function to display customer ledger based on selected customer and date range
  const filterData = () => {
    const customer = data.find(item => item.customerName === selectedCustomer);
    if (customer) {
      let transactions = customer.transactions;

      // Filter by date range
      if (startDate && endDate) {
        transactions = transactions.filter(transaction =>
          new Date(transaction.date) >= new Date(startDate) && new Date(transaction.date) <= new Date(endDate)
        );
      }
      setFilteredTransactions(transactions);
      setInitialCustomer(customer); // Set the filtered customer as the current
    }
  };

  // Reset the filter
  const resetFilter = () => {
    setSelectedCustomer('');
    setStartDate('');
    setEndDate('');
    setFilteredTransactions(initialCustomer.transactions);
  };
  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Customer Ledger List</title>
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
      <h1 className="text-lg dark:text-white  mb-4">Customer Ledger</h1>

      <div className="md:flex flex-wrap justify-between items-center mb-4">
            <div className="md:flex md:space-x-2 w-full md:w-full">
        {/* Customer selection */}
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border p-2 w-full  md:w-full"
        >
          <option value="">Select a Customer</option>
          {data?.map((customer, index) => (
            <option key={index} value={customer.customerName}>
              {customer.customerName} {customer.contactNo}
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
          placeholder="End Date "
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 w-full bg-white"
        />
        <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded  w-full md:w-1/4">Filter</button>
        <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-1/4">Reset</button>
      </div>
      </div>
        <div className='flex items-center justify-end'>
            <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-1/12 mb-2">Print</button>
        </div>


     
      {/* Display customer details and ledger */}
      {initialCustomer && (
        <div>
          <div className="grid md:grid-cols-2 mb-4">
            <div>
              <p>Account of: <strong>{initialCustomer.customerName}</strong></p>
              <p>Address: {initialCustomer.address}</p>
              <p>Contact No: {initialCustomer.contactNo}</p>
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
              <h3 className="text-lg  mb-2">Customer Ledger</h3>
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
            <p>No data available for this customer.</p>
          )}
        </div>
      )}
    </div>
  )
}
