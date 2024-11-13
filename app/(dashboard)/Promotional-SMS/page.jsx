"use client"
import React, { useState } from 'react';

export default function PromotionalSMS() {

    const customers = [
        { id: 1, name: 'Customer 1' },
        { id: 2, name: 'Customer 2' },
        { id: 3, name: 'Customer 3' },
        { id: 1, name: 'Customer 4' },
        { id: 2, name: 'Customer 5' },
        { id: 3, name: 'Customer 6' }
      ];
    
      const [selectedCustomer, setSelectedCustomer] = useState('');
      const [smsBody, setSmsBody] = useState('');
    
      const handleSend = () => {
        // Handle the send SMS logic here
        if (!selectedCustomer || !smsBody) {
          alert("Please select a customer and write a message.");
          return;
        }
        alert(`Sending SMS to ${selectedCustomer}: ${smsBody}`);
      };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#1d1d3b] ">
    <div className="w-full  lg:p-8 ">
      <h2 className=" dark:text-white text-3xl  mb-6 text-gray-700  dark:text-white">Promotional SMS</h2>
      
      <form className="space-y-4 lg:w-1/2 p-2">
        {/* Select Customers Dropdown */}
        <div>
          <label className="block text-gray-700 text-sm  mb-2  dark:text-white">Select Customers</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
          >
            <option value="">Nothing selected</option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* SMS Body Input */}
        <div>
          <label className="block text-gray-700 text-sm  mb-2  dark:text-white">SMS Body</label>
          <textarea
            value={smsBody}
            onChange={(e) => setSmsBody(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-teal-500"
            placeholder="Write your promotional message"
            rows="4"
          ></textarea>
        </div>

        {/* Send Button */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleSend}
            className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
);
};