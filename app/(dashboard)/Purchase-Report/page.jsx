"use client";
import React, { useState, useEffect } from "react";

export default function PurchaseReport() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productFilter, setProductFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemsPerPage = 15; // Set items per page for pagination

  // Fetch purchase data
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/Purchase/Create/purchase"); // Update endpoint if necessary
        if (!response.ok) throw new Error("Failed to fetch purchases");
        const purchasesData = await response.json();
        const flattenedData = purchasesData.purchases.flatMap((purchase) =>
          (purchase.products || []).map((product, index) => ({
            id: index + 1,
            date: new Date(purchase.purchase_date).toISOString().slice(0, 10),
            purchaseNo: purchase.invoice_no,
            productName: product.product_name,
            quantity: `${product.quantity} ${product.main_unit || "pcs"}`,
            unitPrice: `${Number(product.purchase_cost || 0).toLocaleString()} TK`,
            subtotal: `${(product.quantity * product.purchase_cost).toLocaleString()} TK`,
          }))
        );
        setData(flattenedData);
        setFilteredData(flattenedData); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  // Filter function
  const filterData = () => {
    let filtered = data;

    if (productFilter) {
      filtered = filtered.filter((item) =>
        item.productName.toLowerCase().includes(productFilter.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date) >= new Date(startDate) &&
          new Date(item.date) <= new Date(endDate)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Reset filters
  const resetFilter = () => {
    setFilteredData(data);
    setProductFilter("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Purchase Report</title>
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

  return (
    <div className="container mx-auto px-4 py-8 text-sm mt-[20%] md:mt-[5%]">
      <h1 className="text-lg font-semibold mb-4">Purchase Report</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="">Select a Product</option>
          {[...new Set(data.map((item) => item.productName))].map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        />

        <button
          onClick={filterData}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Filter
        </button>
        <button
          onClick={resetFilter}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Print
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table
          id="table-to-print"
          className="min-w-full border-collapse border"
        >
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border p-2">SL</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Purchase No</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.purchaseNo}</td>
                <td className="border p-2">{item.productName}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.unitPrice}</td>
                <td className="border p-2">{item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            } rounded-md`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
