"use client";

import React, { useEffect, useState } from "react";

export default function TopProductsReport() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Set items per page for pagination

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/Products/Create/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await fetch("/Sales/Create/sales");
        if (!response.ok) throw new Error("Failed to fetch sales");
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchProducts();
    fetchSales();
  }, []);

  useEffect(() => {
    if (sales.length > 0 && products.length > 0) {
      // Aggregate sales data by product
      const aggregatedSales = products.map((product) => {
        const totalSoldQuantity = sales
          .flatMap((sale) => sale.products)
          .filter((saleItem) => saleItem.id === product.id)
          .reduce((sum, saleItem) => sum + saleItem.quantity, 0);

        return {
          id: product.id,
          name: product.product_name,
          totalQuantity: totalSoldQuantity,
          price: product.sale_price,
        };
      });

      // Sort by total quantity sold in descending order
      const sortedSales = aggregatedSales.sort(
        (a, b) => b.totalQuantity - a.totalQuantity
      );

      setTopProducts(sortedSales);
      setFilteredData(sortedSales); // Initialize the filtered data with sorted sales
    }
  }, [sales, products]);

  // Filter function based on start and end dates
  const filterData = () => {
    if (startDate && endDate) {
      const filtered = topProducts.filter(
        (item) =>
          new Date(item.date) >= new Date(startDate) &&
          new Date(item.date) <= new Date(endDate)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(topProducts);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset filter
  const resetFilter = () => {
    setFilteredData(topProducts);
    setStartDate("");
    setEndDate("");
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
    const newWindow = window.open("", "_blank");
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
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, "")}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
      <h1 className="text-lg dark:text-white mb-4">Top Products</h1>

      <div className="md:flex flex-wrap justify-between items-center mb-4">
        {/* Date filtering */}
        <div className="md:flex md:space-x-2 w-full md:w-full">
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
          <button
            onClick={filterData}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-1/4"
          >
            Filter
          </button>
          <button
            onClick={resetFilter}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-1/4"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-1/12 mb-2"
        >
          Print
        </button>
      </div>

      <h2 className="dark:text-white text-lg mb-4 text-center">
        Top Selling Products
      </h2>
      <p className="dark:text-white text-center mb-4">
        Report From {startDate || "01/10/2024"} to {endDate || "31/10/2024"}
      </p>

      <table
        id="table-to-print"
        className="table-auto dark:text-white w-full border-collapse border"
      >
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border p-2">SL</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Total Quantity</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item, index) => (
            <tr key={item.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.totalQuantity}</td>
              <td className="border p-2">{item.price || 0} TK</td>
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
            className={`px-4 py-2 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
