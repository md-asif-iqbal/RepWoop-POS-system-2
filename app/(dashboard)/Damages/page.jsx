"use client"

import React, { useRef, useState } from 'react';

import { Trash2 } from 'lucide-react';
export default function Damages() {
    const printRef = useRef();
    const [filterText, setFilterText] = useState('');
    const [damages, setDamages] = useState([
        { id: 3, date: '26/09/2024', product: 'Motherboard Esinic 61', quantity: '1 pc', note: '574' },
        { id: 4, date: '27/09/2024', product: 'TP Link Router_R100M', quantity: '5 pc', note: 'Problem' },
        { id: 5, date: '28/09/2024', product: 'Dell Monitor E2421HN', quantity: '2 pc', note: 'Cracked screen' },
        { id: 6, date: '29/09/2024', product: 'HP Laptop G6', quantity: '3 pc', note: 'Damaged keyboard' },
        { id: 7, date: '30/09/2024', product: 'Logitech Mouse M185', quantity: '4 pc', note: 'Malfunction' },
        { id: 8, date: '01/10/2024', product: 'Samsung SSD 1TB', quantity: '1 pc', note: 'Not working' },
        { id: 9, date: '02/10/2024', product: 'Acer Monitor 24"', quantity: '2 pc', note: 'Broken stand' },
        { id: 10, date: '03/10/2024', product: 'Sony Headphones WH1000XM4', quantity: '2 pc', note: 'Sound issue' },
      ]);

  const [showOptions, setShowOptions] = useState(null); // To show options on a row
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    console.log("test");
      setModalVisible(true);
      setTimeout(() => {
          setShowModal(true);
      }, 0); // Small delay to trigger transition
  };

  const handleCloseModal = () => {
      setShowModal(false);
      setTimeout(() => {
          setModalVisible(false);
      }, 300); // Delay based on transition duration
  };
  // Function to handle filtering
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  // Function to reset filter
  const handleReset = () => {
    setFilterText('');
  };

  // Function to handle delete
  const handleDelete = (id) => {
    setDamages(damages.filter((damage) => damage.id !== id));
    setShowModal(false);
  };

    // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Damages List</title>
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

  // Filtering logic
  const filteredDamages = damages.filter((damage) =>
    damage.product.toLowerCase().includes(filterText.toLowerCase()) || damage.quantity.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <div className='font-nunito text-sm'>
        <div className="container mx-auto p-4 md:mt-[5%]">
        <h1 className="text-lg dark:text-white  mb-4">Damages</h1>

            {/* Search Bar with Filter and Reset */}
            <div className="flex flex-wrap justify-between mb-4">
            <div className="relative w-full md:w-2/3">
                <input
                type="text"
                placeholder="Select Product"
                value={filterText}
                onChange={handleFilterChange}
                className="border p-2 rounded w-full bg-white"
                />
                <button
                onClick={() => {}}
                className="absolute right-0 top-0 bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                >
                Filter
                </button>
            </div>
            <div className="justify-between mt-2 md:mt-0">
                <button
                onClick={handleReset}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                Reset
                </button>
                <button
                onClick={handlePrint}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                Print
                </button>
            </div>
            </div>
                {/* Damages Table */}
                <div className="overflow-x-auto">
                {/* Damages Table */}
                <div ref={printRef} className="overflow-x-auto">
                        <table id='table-to-print' className="min-w-full text-center border-collapse print:block items-center justify-center">
                        <thead>
                            <tr className='bg-emerald-500 text-white'>
                            <th className="border p-2 print:table-cell">#</th>
                            
                            <th className="border p-2 print:table-cell">Date</th>
                            <th className="border p-2 print:table-cell">Product</th>
                            <th className="border p-2 print:table-cell">Quantity</th>
                            <th className="border p-2 print:table-cell">Note</th>
                            <th className="border p-2 print:hidden">Actions</th> {/* Hide actions column in print */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDamages?.map((damage, index) => (
                            <tr key={damage.id}>
                                <td className="border p-2 print:table-cell">{index + 1}</td>
                                <td className="border p-2 print:table-cell">{damage.date}</td>
                                <td className="border p-2 print:table-cell">{damage.product}</td>
                                <td className="border p-2 print:table-cell">{damage.quantity}</td>
                                <td className="border p-2 print:table-cell">{damage.note}</td>
                                <td className="border p-2 print:hidden relative"> {/* Hidden when printing */}
                                <button
                                    onClick={handleOpenModal}
                                    className="bg-transparent  border text-red-500 p-2 hover:bg-red-600 hover:text-white"
                                >
                                    <Trash2 size={16} strokeWidth={1.5} />
                                </button>

                                {/* Modal */}
                                {modalVisible && (
                                    <div
                                        className={`fixed inset-0 flex items-center justify-center bg-opacity-50 transition-all duration-700 ease-in-out ${showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} `}
                                    >
                                        <div className="bg-white  p-10 transition-all duration-300 ease-in-out">
                                            <h2 className=" dark:text-white text-lg  mb-4">Are you sure?</h2>
                                            <p className=" dark:text-white mb-6">You wont be able to revert this!</p>

                                            {/* Show details */}
                                            <div className="mb-6">
                                                <p><strong>Item ID:</strong> {damage.product}</p>
                                                <p><strong>Item Name:</strong> {damage.quantity}</p>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleDelete(damage.id)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-4 rounded mr-2"
                                                >
                                                    Yes, delete it!
                                                </button>
                                                <button
                                                    onClick={handleCloseModal}
                                                    className="bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
  )
}
