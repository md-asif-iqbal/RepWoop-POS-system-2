"use client";

import React, { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Damages() {
  const printRef = useRef();
  const [filterText, setFilterText] = useState("");
  const [damages, setDamages] = useState([]);
  const [filteredDamages, setFilteredDamages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDamage, setSelectedDamage] = useState(null);

  // Fetch damage data from the backend
  const fetchDamages = async () => {
    try {
      const response = await fetch("/Damages/damage", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setDamages(data.damages || []);
        setFilteredDamages(data.damages || []);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to fetch damages.");
      }
    } catch (err) {
      console.error("Error fetching damages:", err);
      toast.error("An error occurred while fetching damages.");
    }
  };

  // Handle filtering
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);

    const filtered = damages.filter(
      (damage) =>
        damage.product_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        damage.quantity.toString().includes(e.target.value)
    );
    setFilteredDamages(filtered);
  };

  // Reset filter
  const handleReset = () => {
    setFilterText("");
    setFilteredDamages(damages);
  };

  // Delete damage record
  const handleDelete = async (id) => {
    try {
      const response = await fetch("/Damages/damage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Damage record deleted successfully.");
        setDamages(damages.filter((damage) => damage.id !== id));
        setFilteredDamages(filteredDamages.filter((damage) => damage.id !== id));
        setShowModal(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete damage record.");
      }
    } catch (err) {
      console.error("Error deleting damage record:", err);
      toast.error("An error occurred while deleting the damage record.");
    }
  };

  // Open delete confirmation modal
  const handleOpenModal = (damage) => {
    setSelectedDamage(damage);
    setShowModal(true);
  };

  // Close delete confirmation modal
  const handleCloseModal = () => {
    setSelectedDamage(null);
    setShowModal(false);
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
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
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, "")} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  useEffect(() => {
    fetchDamages();
  }, []);

  return (
    <div className="font-nunito text-sm">
      <div className="container mx-auto p-2 md:mt-[5%]">
        <h1 className="text-lg dark:text-white mb-4">Damages</h1>

        {/* Search Bar with Filter and Reset */}
        <div className="flex flex-wrap justify-between mb-4">
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search Product or Quantity"
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
        <Link href="Damages/Create" className="flex justify-end">
          <button className="btn btn-primary">Add Damage</button>
        </Link>

        {/* Damages Table */}
        <div ref={printRef} className="overflow-x-auto">
          <table id="table-to-print" className="w-full text-center border-collapse print:block items-center justify-center">
            <thead>
              <tr className="bg-emerald-500 text-white">
                <th className="border p-2 print:table-cell">#</th>
                <th className="border p-2 print:table-cell">Date</th>
                <th className="border p-2 print:table-cell">Product</th>
                <th className="border p-2 print:table-cell">Purchase Cost</th>
                <th className="border p-2 print:table-cell">Quantity</th>
                <th className="border p-2 print:table-cell">Reason</th>
                <th className="border p-2 print:hidden">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDamages.map((damage, index) => (
                <tr key={damage.id}>
                  <td className="border p-2 print:table-cell">{index + 1}</td>
                  <td className="border p-2 print:table-cell">{new Date(damage.date).toLocaleDateString()}</td>
                  <td className="border p-2 print:table-cell">{damage.product_name}</td>
                  <td className="border p-2 print:table-cell">৳ {damage.purchase_cost}</td>
                  <td className="border p-2 print:table-cell">{damage.quantity}</td>
                  <td className="border p-2 print:table-cell">{damage.reason}</td>
                  <td className="border p-2 print:hidden relative">
                    <button
                      onClick={() => handleOpenModal(damage)}
                      className="bg-transparent border text-red-500 p-2 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </td>
                          {/* Delete Confirmation Modal */}
                          {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center ">
                              <div className="bg-white p-6 rounded shadow-lg">
                                <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
                                
                                <p>Product: {damage.product_name}</p>
                                <p>You wont be able to revert this action!</p>
                                <div className="flex justify-end mt-6">
                                  <button
                                    onClick={() => handleDelete(selectedDamage.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                  >
                                    Yes, delete it!
                                  </button>
                                  <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 text-black px-4 py-2 rounded"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
}
