"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { Eye } from "lucide-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    invoice: "",
    name: "",
    amount: "",
  });

  // Fetch expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("/Expenses/expense");
        if (!response.ok) throw new Error("Failed to fetch expenses");

        const { expenses } = await response.json();

        // Parse amount as a float
        const parsedExpenses = expenses.map((expense) => ({
          ...expense,
          amount: parseFloat(expense.amount),
        }));

        setExpenses(parsedExpenses);
        setFilteredData(parsedExpenses); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

 // Add new expense
 const handleAddExpense = async () => {
  const newExpenseData = {
    invoice_no: newExpense.invoice || `INV-${Date.now()}`,
    name: newExpense.name,
    amount: parseFloat(newExpense.amount) || 0,
  };

  try {
    const response = await fetch("/Expenses/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpenseData),
    });

    if (!response.ok) throw new Error("Failed to add expense");

    const { expense } = await response.json();
    setExpenses((prev) => [...prev, expense]);
    setFilteredData((prev) => [...prev, expense]);
    toast.success("Expense added successfully!");
  } catch (error) {
    console.error("Error adding expense:", error);
    toast.error("Failed to add expense.");
  } finally {
    setShowAddExpenseModal(false);
    setNewExpense({ invoice: "", name: "", amount: "" });
  }
};

// Delete expense
const handleDeleteExpense = async (id) => {
  try {
    const response = await fetch(`/Expenses/expense/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete expense");

    setExpenses(expenses.filter((expense) => expense.id !== id));
    setFilteredData(filteredData.filter((expense) => expense.id !== id));
    toast.success("Expense deleted successfully!");
  } catch (error) {
    console.error("Error deleting expense:", error);
    toast.error("Failed to delete expense.");
  }
};

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense List", 20, 10);

    expenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. Invoice: ${expense.invoice_no}, Name: ${expense.name}, Amount: ${expense.amount.toFixed(
          2
        )} TK`,
        20,
        20 + index * 10
      );
    });

    doc.save("expenses.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(expenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "expenses.xlsx");
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Expense List</title>
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6 text-sm mt-[20%] md:mt-[5%]">
      <h2 className="text-lg font-semibold mb-4">Expense List</h2>

      {/* Action Buttons */}
      <div className="flex justify-end items-center mb-4">
        <div className="space-x-2">
          <button onClick={() => setShowAddExpenseModal(true)} className="px-4 py-2 bg-green-500 text-white rounded">
            Add New Expense
          </button>
          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">
            Export PDF
          </button>
          <button onClick={exportExcel} className="px-4 py-2 bg-yellow-500 text-white rounded">
            Export Excel
          </button>
          <button onClick={handlePrint} className="px-4 py-2 bg-gray-500 text-white rounded">
            Print
          </button>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 w-1/2 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Invoice"
                value={newExpense.invoice}
                onChange={(e) => setNewExpense({ ...newExpense, invoice: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Name"
                value={newExpense.name}
                onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleAddExpense} className="px-4 py-2 bg-green-500 text-white rounded">
                Save
              </button>
              <button onClick={() => setShowAddExpenseModal(false)} className="px-4 py-2 bg-red-500 text-white rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table id="table-to-print" className="w-full table-auto border-collapse border text-center">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border p-2">SL</th>
              <th className="border p-2">Invoice</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((expense, index) => (
              <tr key={expense.id} className="border-t">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{expense.invoice_no}</td>
                <td className="border p-2">{expense.name}</td>
                <td className="border p-2">{expense.amount} TK</td>
                <td className="border p-2 flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                    <Eye size={16} strokeWidth={1.5} />
                  </button>
                  <button onClick={() => handleDeleteExpense(expense.id)} className="p-2 text-red-500 hover:bg-red-100 rounded">
                    <RiDeleteBin5Line size={16} />
                  </button>
                </td>
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
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
