"use client";

import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Utility function for pagination
const paginate = (data, page, entriesPerPage) => {
  const startIndex = page * entriesPerPage;
  return data.slice(startIndex, startIndex + entriesPerPage);
};

// Utility function to calculate the total amount
const calculateTotalAmount = (data, key) => {
  return data.reduce((acc, item) => {
    const numericValue = parseFloat(item[key]?.replace(/[^0-9.]/g, "") || 0);
    return acc + numericValue;
  }, 0);
};

// Filter by today's date
const filterByToday = (data, dateField) => {
  const today = new Date().toISOString().split("T")[0];
  return data.filter((item) => item[dateField]?.split("T")[0] === today);
};

export default function TodayReport() {

  const pathname = usePathname();
  const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
  
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and pagination states for each table
  const [salesSearch, setSalesSearch] = useState("");
  const [expensesSearch, setExpensesSearch] = useState("");
  const [suppliersSearch, setSuppliersSearch] = useState("");
  const [customersSearch, setCustomersSearch] = useState("");

  const [salesPage, setSalesPage] = useState(0);
  const [expensesPage, setExpensesPage] = useState(0);
  const [suppliersPage, setSuppliersPage] = useState(0);
  const [customersPage, setCustomersPage] = useState(0);

  const entriesPerPage = 10;

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, expensesRes, suppliersRes, customersRes] =
          await Promise.all([
            fetch("/Sales/Create/sales"),
            fetch("/Expenses/expense"),
            fetch("/Suppliers/suppliers"),
            fetch("/Customers/customer"),
          ]);

        if (
          !salesRes.ok ||
          !expensesRes.ok ||
          !suppliersRes.ok ||
          !customersRes.ok
        ) {
          throw new Error("Failed to fetch some data");
        }

        const salesData = (await salesRes.json()) || [];
        const expensesData = (await expensesRes.json())?.expenses || [];
        const suppliersData = (await suppliersRes.json())?.suppliers || [];
        const customersData = (await customersRes.json())?.customers || [];

        // Filter data by today's date
        const filteredSales = filterByToday(salesData, "sale_date");
        const filteredExpenses = filterByToday(expensesData, "created_at");
        const filteredSuppliers = filterByToday(suppliersData, "created_at");
        const filteredCustomers = filterByToday(customersData, "createdat");

        setSales(filteredSales);
        setExpenses(filteredExpenses);
        setSuppliers(filteredSuppliers);
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch today's data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 mt-[25%] md:mt-[5%] ">
      <h1 className="text-2xl font-bold mb-6">Today Report</h1>
      <div className=' sm:md:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Today-Report" className= {`${
                          pathname === '/Today-Report' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Today Report
        <span className={spanClass}></span>
        </Link>
        <Link href="/Current-Month-Report" className={`${
                          pathname === '/Current-Month-Report' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Current Month Report
        <span className={spanClass}></span>
        </Link>
        <Link href="/Summary-Report" className= {`${
                          pathname === '/Summary-Report' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Summary Report
        <span className={spanClass}></span>
        </Link>
    </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="SALE AMOUNT"
          amount={`TK ${calculateTotalAmount(sales, "total")}`}
          color="bg-green-500"
        />
        <SummaryCard
          title="EXPENSE"
          amount={`TK ${calculateTotalAmount(expenses, "amount")}`}
          color="bg-red-500"
        />
        <SummaryCard
          title="SUPPLIER PAYMENTS"
          amount={`TK ${calculateTotalAmount(suppliers, "balance")}`}
          color="bg-blue-500"
        />
        <SummaryCard
          title="CUSTOMER PAYMENTS"
          amount={`TK ${calculateTotalAmount(customers, "balance")}`}
          color="bg-yellow-500"
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Table
          title="Sales"
          data={sales.flatMap((sale) =>
            sale.products.map((product) => ({
              ...sale,
              product_name: product.product_name,
              product_details: product.product_details,
              product_sale_price: product.sale_price,
            }))
          )}
          fields={{
            name: "product_name",
            details: "product_details",
            amount: "product_sale_price",
          }}
          search={salesSearch}
          setSearch={setSalesSearch}
          currentPage={salesPage}
          setCurrentPage={setSalesPage}
          entriesPerPage={entriesPerPage}
        />
        <Table
          title="Expenses"
          data={expenses}
          fields={{ name: "name", details: "invoice_no", amount: "amount" }}
          search={expensesSearch}
          setSearch={setExpensesSearch}
          currentPage={expensesPage}
          setCurrentPage={setExpensesPage}
          entriesPerPage={entriesPerPage}
        />
        <Table
          title="Suppliers"
          data={suppliers}
          fields={{ name: "name", details: "email", amount: "balance" }}
          search={suppliersSearch}
          setSearch={setSuppliersSearch}
          currentPage={suppliersPage}
          setCurrentPage={setSuppliersPage}
          entriesPerPage={entriesPerPage}
        />
        <Table
          title="Customers"
          data={customers}
          fields={{ name: "name", details: "email", amount: "balance" }}
          search={customersSearch}
          setSearch={setCustomersSearch}
          currentPage={customersPage}
          setCurrentPage={setCustomersPage}
          entriesPerPage={entriesPerPage}
        />
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ title, amount, color }) {
  return (
    <div className={`${color} text-white p-4 rounded shadow-md`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-lg font-bold">{amount}</p>
    </div>
  );
}

// Table Component
function Table({
  title,
  data,
  fields,
  search,
  setSearch,
  currentPage,
  setCurrentPage,
  entriesPerPage,
}) {
  const filteredData = data.filter((item) =>
    [item[fields.name], item[fields.details], item[fields.amount]]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const paginatedData = paginate(filteredData, currentPage, entriesPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 20, 10);
    doc.autoTable({
      head: [["#", "Name", "Details", "Amount"]],
      body: paginatedData.map((item, index) => [
        index + 1,
        item[fields.name],
        item[fields.details],
        item[fields.amount],
      ]),
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <div className="border rounded shadow p-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
          >
            Excel
          </button>
          <button
            onClick={exportPDF}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            PDF
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border px-3 py-2 mb-4"
      />
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Details</th>
            <th className="border px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item[fields.name]}</td>
              <td className="border px-4 py-2">{item[fields.details]}</td>
              <td className="border px-4 py-2">{item[fields.amount]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          className="bg-gray-300 px-4 py-2 rounded-l"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage + 1}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
}
