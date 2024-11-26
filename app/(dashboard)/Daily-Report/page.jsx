"use client";

import React, { useState, useEffect } from "react";

export default function DailyReport() {
  const [todaySales, setTodaySales] = useState([]); // Regular sales
  const [todayReturnedSales, setTodayReturnedSales] = useState([]); // Returned sales
  const [todayPurchases, setTodayPurchases] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, purchaseResponse, expenseResponse] = await Promise.all([
          fetch("/Sales/Create/sales"),
          fetch("/Purchase/Create/purchase"),
          fetch("/Expenses/expense"),
        ]);
  
        if (!salesResponse.ok || !purchaseResponse.ok || !expenseResponse.ok) {
          throw new Error("Failed to fetch one or more datasets.");
        }
  
        const salesJson = await salesResponse.json();
        const purchasesJson = await purchaseResponse.json();
        const expensesJson = await expenseResponse.json();
  
        const salesData = Array.isArray(salesJson) ? salesJson : [];
        const purchaseData = Array.isArray(purchasesJson.purchases) ? purchasesJson.purchases : [];
        const expenseData = Array.isArray(expensesJson.expenses) ? expensesJson.expenses : [];
  
        console.log("Sales Data:", salesData);
        console.log("Purchase Data:", purchaseData);
        console.log("Expense Data:", expenseData);
  
        const normalizeDate = (dateString) => {
          const date = new Date(dateString);
          return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
        };
  
        const today = new Date().toISOString().split("T")[0];
  
        const todaysSales = salesData.filter(
          (sale) => normalizeDate(sale.sale_date) === today && sale.status !== "Returned"
        );
        const todaysReturnedSales = salesData.filter(
          (sale) => normalizeDate(sale.sale_date) === today && sale.status === "Returned"
        );
        const todaysPurchases = purchaseData.filter(
          (purchase) => normalizeDate(purchase.purchase_date) === today
        );
        const todaysExpenses = expenseData.filter(
          (expense) => normalizeDate(expense.created_at) === today
        );
  
        setTodaySales(todaysSales);
        setTodayReturnedSales(todaysReturnedSales);
        setTodayPurchases(todaysPurchases);
        setTodayExpenses(todaysExpenses);
  
        // Combine data into rows for the table
        const combinedData = todaysSales.map((sale, index) => {
          const totalReturned = todaysReturnedSales.reduce(
            (sum, returned) => sum + parseFloat(returned.total || 0),
            0
          ); // Default to 0 if no returned sales
  
          const totalPurchases = todaysPurchases.reduce(
            (sum, purchase) => sum + parseFloat(purchase.total || 0),
            0
          );
  
          const totalExpenses = todaysExpenses.reduce(
            (sum, expense) => sum + parseFloat(expense.amount || 0),
            0
          );
  
          const grossProfit = parseFloat(sale.total || 0) - totalPurchases; // Gross Profit: Sales - Purchases
  
          const netProfit = grossProfit - totalExpenses; // Net Profit: Gross Profit - Expenses
  
          return {
            id: index + 1,
            date: normalizeDate(sale.sale_date),
            sellAmount: sale.total || 0,
            purchaseAmount: totalPurchases,
            expenses: totalExpenses,
            returned: totalReturned, // Will be 0 if no returned sales
            grossProfit: grossProfit > 0 ? grossProfit : 0,
            netProfit: netProfit > 0 ? netProfit : 0,
          };
        });
  
        setFilteredData(combinedData);
  
        console.log("Filtered Data for Table:", combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [today]);
  
  console.log(filteredData);
  
  

  // Filter data based on date range
  const filterData = () => {
    let filtered = filteredData;

    if (startDate) {
      filtered = filtered.filter((item) => new Date(item.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((item) => new Date(item.date) <= new Date(endDate));
    }

    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    filterData();
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Daily Report</title>
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
    <div>
      <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%]">
        <h1 className="text-lg mb-5 dark:text-white">Daily Report</h1>

        <div className="flex justify-between w-full mb-5">
          <div className="flex md:space-x-2 w-full">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 w-full bg-white"
              placeholder="Enter Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 w-full bg-white"
              placeholder="Enter End Date"
            />
            <button
              onClick={filterData}
              className="bg-blue-500 text-white px-8 py-2 rounded"
            >
              Filter
            </button>
            <button
              onClick={resetFilter}
              className="bg-gray-500 text-white px-8 py-2 rounded"
            >
              Reset
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-8 md:ml-2 py-2 rounded"
          >
            Print
          </button>
        </div>

        <table
          id="table-to-print"
          className="table-auto dark:text-white w-full border-collapse border text-center"
        >
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border p-2">ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Sell Amount</th>
              <th className="border p-2">Purchase Amount</th>
              <th className="border p-2">Expenses</th>
              <th className="border p-2">Returned</th>
              <th className="border p-2">Gross Profit</th>
              <th className="border p-2">Net Profit</th>
            </tr>
          </thead>
          <tbody className="dark:text-white">
            {filteredData.map((item) => (
             <tr key={item.id}>
             <td className="border p-2">{item.id}</td>
             <td className="border p-2">{item.date} </td>
             <td className="border p-2">{item.sellAmount > 0 ? item.sellAmount : "No sales"}</td>
             <td className="border p-2">{item.purchaseAmount > 0 ? item.purchaseAmount : "No purchases"}</td>
             <td className="border p-2">{item.expenses > 0 ? item.expenses : "No expenses"}</td>
             <td className="border p-2">{item.returned > 0 ? item.returned : "No returns"}</td>
             <td className="border p-2">{item.grossProfit > 0 ? item.grossProfit : "No gross profit"}</td>
             <td className="border p-2">{item.netProfit > 0 ? item.netProfit : "No net profit"}</td>
           </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
