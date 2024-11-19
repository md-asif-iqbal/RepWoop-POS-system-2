"use client";

import React, { useState, useEffect } from "react";

export default function ProfitLossReport() {
  const [salesData, setSalesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [profitLossData, setProfitLossData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, purchasesResponse, expensesResponse] = await Promise.all([
          fetch("/Sales/Create/sales"),
          fetch("/Purchase/Create/purchase"),
          fetch("/Expenses/expense"),
        ]);
  
        if (!salesResponse.ok || !purchasesResponse.ok || !expensesResponse.ok) {
          throw new Error("Failed to fetch data.");
        }
  
        const sales = await salesResponse.json();
        const purchasesData = await purchasesResponse.json();
        const expensesData = await expensesResponse.json();
  
        // Debugging logs to check API responses
        console.log("Sales Data:", sales);
        console.log("Purchase Data:", purchasesData);
        console.log("Expense Data:", expensesData);
  
        // Parse `purchases` and `expenses` arrays
        const purchases = Array.isArray(purchasesData.purchases)
          ? purchasesData.purchases
          : [];
        const expenses = Array.isArray(expensesData.expenses)
          ? expensesData.expenses
          : [];
  
        console.log("Parsed Purchases:", purchases);
        console.log("Parsed Expenses:", expenses);
  
        setSalesData(sales);
        setPurchaseData(purchases);
        setExpenseData(expenses);
  
        calculateProfitLoss(sales, purchases, expenses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const calculateProfitLoss = (sales, purchases, expenses) => {
    if (!Array.isArray(expenses)) {
      console.error("Expenses is not an array:", expenses);
      return;
    }
  
    const months = [...new Set(sales.map((sale) => sale.sale_date.slice(0, 7)))];
  
    const report = months.map((month) => {
      const monthSales = sales
        .filter((sale) => sale.sale_date.startsWith(month))
        .reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0);
  
      const monthPurchases = purchases
        .filter((purchase) => purchase.purchase_date.startsWith(month))
        .reduce((sum, purchase) => sum + parseFloat(purchase.total || 0), 0);
  
      const monthExpenses = expenses
        .filter((expense) => expense.created_at.startsWith(month))
        .reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  
      const grossProfit = monthSales - monthPurchases;
      const netProfit = grossProfit - monthExpenses;
  
      return {
        month,
        sales: monthSales,
        cogs: monthPurchases,
        grossProfit,
        expenses: monthExpenses,
        netProfit,
      };
    });
  
    console.log("Generated Profit-Loss Data:", report); // Debug log
    setProfitLossData(report);
    setFilteredData(report); // Initialize filtered data
  };
  
  

  const handleFilter = () => {
    const filtered = profitLossData.filter((item) => {
      return item.month >= startDate && item.month <= endDate;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(profitLossData);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Profit and Loss Report</title>
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
    <div className="container mx-auto px-4 py-8 mt-[25%] sm:mt-[5%]  w-full">
      <h2 className="dark:text-white text-lg mb-4">Profit Loss Report</h2>

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

      <table id="table-to-print" className="table-auto w-full text-center dark:text-white">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border p-2">Month</th>
            <th className="border p-2">Sales</th>
            <th className="border p-2">Cost of Goods Sold</th>
            <th className="border p-2">Gross Profit</th>
            <th className="border p-2">Expenses</th>
            <th className="border p-2">Net Profit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
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
}
