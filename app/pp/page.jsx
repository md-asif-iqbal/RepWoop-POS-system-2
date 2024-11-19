"use client";
import React, { useState, useEffect } from "react";

export default function CategorySalesPurchasesReport() {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, purchasesResponse, productsResponse] = await Promise.all([
          fetch("/Sales/Create/sales"),
          fetch("/Purchase/Create/purchase"),
          fetch("/Products/Create/products"),
        ]);

        if (!salesResponse.ok) throw new Error("Failed to fetch sales");
        if (!purchasesResponse.ok) throw new Error("Failed to fetch purchases");
        if (!productsResponse.ok) throw new Error("Failed to fetch products");

        const salesData = await salesResponse.json();
        const purchasesData = await purchasesResponse.json();
        const productsData = await productsResponse.json();

        generateReport(salesData, purchasesData.purchases, productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Generate report data
  const generateReport = (salesData, purchasesData, productsData) => {
    const productsInPurchases = purchasesData.flatMap((purchase) => purchase.products || []);

    const report = productsData.reduce((acc, product) => {
      const productSales = salesData
        .flatMap((sale) => sale.products || [])
        .filter((saleItem) => saleItem.id === product.id);

      const productPurchases = productsInPurchases.filter(
        (purchaseItem) => purchaseItem.id === product.id
      );

      const totalSalesQty = productSales.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
      const totalPurchaseQty = productPurchases.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
      const totalSalesAmount = productSales.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
      const totalPurchaseAmount = productPurchases.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);
      const profit = totalSalesAmount - totalPurchaseAmount;

      const key = `${product.category}-${product.brand}`;
      if (!acc[key]) {
        acc[key] = {
          id: Object.keys(acc).length + 1,
          category: product.category || "N/A",
          brand: product.brand || "N/A",
          totalSalesQty: 0,
          totalPurchaseQty: 0,
          totalSalesAmount: 0,
          totalPurchaseAmount: 0,
          profit: 0,
        };
      }

      acc[key].totalSalesQty += totalSalesQty;
      acc[key].totalPurchaseQty += totalPurchaseQty;
      acc[key].totalSalesAmount += totalSalesAmount;
      acc[key].totalPurchaseAmount += totalPurchaseAmount;
      acc[key].profit += profit;

      return acc;
    }, {});

    setReportData(Object.values(report));
    setFilteredData(Object.values(report));
  };

  const formatCurrency = (amount) => `${Number(amount || 0).toLocaleString()} TK`;

  const filterData = () => {
    let filtered = reportData;

    if (categoryFilter) {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    if (brandFilter) {
      filtered = filtered.filter((item) => item.brand === brandFilter);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date) >= new Date(startDate) &&
          new Date(item.date) <= new Date(endDate)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setCategoryFilter("");
    setBrandFilter("");
    setStartDate("");
    setEndDate("");
    setFilteredData(reportData);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Sales Purchases Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="container mx-auto px-4 py-8 text-sm">
      <h1 className="text-lg font-semibold mb-4">Category-wise Sales and Purchases Report</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Category</option>
          {[...new Set(reportData.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Select Brand</option>
          {[...new Set(reportData.map((item) => item.brand))].map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded-md"
        />

        <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Filter
        </button>
        <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded-md">
          Reset
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Print
        </button>
      </div>

      <div className="overflow-auto">
        <table id="table-to-print" className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border p-2">SL</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Total Sales Qty</th>
              <th className="border p-2">Total Purchase Qty</th>
              <th className="border p-2">Total Sales Amount</th>
              <th className="border p-2">Total Purchase Amount</th>
              <th className="border p-2">Profit</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.category || "N/A"}</td>
                <td className="border p-2">{item.brand || "N/A"}</td>
                <td className="border p-2">{item.totalSalesQty}</td>
                <td className="border p-2">{item.totalPurchaseQty}</td>
                <td className="border p-2">{formatCurrency(item.totalSalesAmount)}</td>
                <td className="border p-2">{formatCurrency(item.totalPurchaseAmount)}</td>
                <td className="border p-2">{formatCurrency(item.profit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded-md`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
