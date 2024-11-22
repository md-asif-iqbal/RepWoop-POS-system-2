"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
const paginate = (data, page, entriesPerPage) => {
  const startIndex = page * entriesPerPage;
  return data.slice(startIndex, startIndex + entriesPerPage);
};

export default function SummaryReport() {
  const pathname = usePathname();
  const spanClass =
    " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700";

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPageSales, setCurrentPageSales] = useState(0);
  const [currentPageExpenses, setCurrentPageExpenses] = useState(0);
  const [currentPageSuppliers, setCurrentPageSuppliers] = useState(0);
  const [currentPageCustomers, setCurrentPageCustomers] = useState(0);

  const [salesSearch, setSalesSearch] = useState("");
  const [expensesSearch, setExpensesSearch] = useState("");
  const [suppliersSearch, setSuppliersSearch] = useState("");
  const [customersSearch, setCustomersSearch] = useState("");

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
          throw new Error("Failed to fetch data");
        }

        const salesData = await salesRes.json();
        const expensesData = (await expensesRes.json())?.expenses || [];
        const suppliersData = (await suppliersRes.json())?.suppliers || [];
        const customersData = (await customersRes.json())?.customers || [];

        setSales(salesData);
        setExpenses(expensesData);
        setSuppliers(suppliersData);
        setCustomers(customersData);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const calculateTotalAmount = (data, key) => {
    return data.reduce((acc, item) => {
      const numericValue = parseFloat(item[key]?.replace(/[^0-9.]/g, "") || 0);
      return acc + numericValue;
    }, 0);
  };

  const filterByDate = (data, dateKey) => {
    if (!startDate || !endDate || !filtered) return data;
    return data.filter(
      (item) =>
        new Date(item[dateKey]) >= new Date(startDate) &&
        new Date(item[dateKey]) <= new Date(endDate)
    );
  };

  const handleFilter = () => {
    setFiltered(true);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    setFiltered(false);
  };

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const exportPDF = (data, title) => {
    const doc = new jsPDF();
    doc.text(title, 20, 10);
    doc.autoTable({
      head: [["#", "Name", "Details", "Amount"]],
      body: data?.map((item, index) => [
        index + 1,
        item.product_name || item.name || item.supplier || item.customer,
        item.product_details || item.category || item.payment_date || "",
        item.total || item.amount || "",
      ]),
    });
    doc.save(`${title}.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white">
      <div className="p-0 mt-[25%] sm:mt-[5%] w-full">
        <div className="mb-4 shadow-sm rounded-sm">
          <h1 className="text-lg text-gray-500 dark:text-white mx-5">
            Summary Report
          </h1>
          <div className="sm:md:flex items-start justify-start mx-5 py-5 gap-10">
            <Link
              href="/Today-Report"
              className={`${
                pathname === "/Today-Report"
                  ? " group text-orange-500 hover:text-orange-500"
                  : "group text-gray-500 dark:text-white hover:text-orange-500"
              }`}
            >
              Today Report
              <span className={spanClass}></span>
            </Link>
            <Link
              href="/Current-Month-Report"
              className={`${
                pathname === "/Current-Month-Report"
                  ? " group text-orange-500 hover:text-orange-500"
                  : "group text-gray-500 dark:text-white hover:text-orange-500"
              }`}
            >
              Current Month Report
              <span className={spanClass}></span>
            </Link>
            <Link
              href="/Summary-Report"
              className={`${
                pathname === "/Summary-Report"
                  ? " group text-orange-500 hover:text-orange-500"
                  : "group text-gray-500 dark:text-white hover:text-orange-500"
              }`}
            >
              Summary Report
              <span className={spanClass}></span>
            </Link>
          </div>
        </div>

        {/* Date Filters */}
        <div className="container mx-auto px-4 py-8">
          <div className="md:flex justify-between mb-8 w-full gap-5">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 w-full mb-2 md:mb-0 bg-white"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 w-full mb-2 md:mb-0 bg-white"
            />
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white p-2 w-full md:w-1/4 mb-2 md:mb-0"
            >
              Filter
            </button>
            <button
              onClick={resetFilter}
              className="bg-red-500 text-white p-2 w-full md:w-1/4 mb-2 md:mb-0"
            >
              Reset
            </button>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-500 text-white p-4 rounded shadow-md">
              <h3 className="text-sm">SALE AMOUNT</h3>
              <p className="dark:text-white text-md">
                TK{" "}
                {calculateTotalAmount(filterByDate(sales, "sale_date"), "total")}
              </p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded shadow-md">
              <h3 className="text-sm">EXPENSE</h3>
              <p className="dark:text-white text-md">
                TK{" "}
                {calculateTotalAmount(
                  filterByDate(expenses, "created_at"),
                  "amount"
                )}
              </p>
            </div>
            <div className="bg-gray-700 text-white p-4 rounded shadow-md">
              <h3 className="text-sm">SUPPLIER PAYMENTS</h3>
              <p className="dark:text-white text-md">
                TK{" "}
                {calculateTotalAmount(
                  filterByDate(suppliers, "created_at"),
                  "balance"
                )}
              </p>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded shadow-md">
              <h3 className="text-sm">CUSTOMER PAYMENTS</h3>
              <p className="dark:text-white text-md">
                TK{" "}
                {calculateTotalAmount(
                  filterByDate(customers, "createdat"),
                  "balance"
                )}
              </p>
            </div>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Table
              title="Sales"
              data={filterByDate(sales.flatMap((sale) =>
                sale.products.map((product) => ({
                  ...sale,
                  product_name: product.product_name,
                  product_details: product.product_details,
                  product_sale_price: product.sale_price,
                }))
              ), "sale_date")}
              fields={{
                name: "product_name",
                details: "product_details",
                amount: "product_sale_price",
              }}
              search={salesSearch}
              setSearch={setSalesSearch}
              currentPage={currentPageSales}
              setCurrentPage={setCurrentPageSales}
              entriesPerPage={entriesPerPage}
            />
            <Table
              title="Expenses"
              data={filterByDate(expenses, "created_at")}
              fields={{ name: "name", details: "invoice_no", amount: "amount" }}
              search={expensesSearch}
              setSearch={setExpensesSearch}
              currentPage={currentPageExpenses}
              setCurrentPage={setCurrentPageExpenses}
              entriesPerPage={entriesPerPage}
            />
            <Table
              title="Payments to Suppliers"
              data={filterByDate(suppliers, "created_at")}
              fields={{ name: "name", details: "email", amount: "balance" }}
              search={suppliersSearch}
              setSearch={setSuppliersSearch}
              currentPage={currentPageSuppliers}
              setCurrentPage={setCurrentPageSuppliers}
              entriesPerPage={entriesPerPage}
            />
            <Table
              title="Payments from Customers"
              data={filterByDate(customers, "createdat")}
              fields={{ name: "name", details: "email", amount: "balance" }}
              search={customersSearch}
              setSearch={setCustomersSearch}
              currentPage={currentPageCustomers}
              setCurrentPage={setCurrentPageCustomers}
              entriesPerPage={entriesPerPage}
            />
          </div>
        </div>
      </div>
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
