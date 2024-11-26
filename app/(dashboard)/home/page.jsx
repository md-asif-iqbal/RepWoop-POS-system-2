"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { ArrowDownFromLine, ArrowUpFromLine, BadgeDollarSign } from "lucide-react";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const isDarkMode = window.localStorage.getItem("theme") === "dark";
    setDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, salesRes, purchaseRes, expenseRes, customerRes, supplierRes] = await Promise.all([
          fetch("/home/product"),
          fetch("/Sales/Create/sales"),
          fetch("/Purchase/Create/purchase"),
          fetch("/Expenses/expense"),
          fetch("/Customers/customer"),
          fetch("/Suppliers/suppliers"),
        ]);

        const productsData = await productRes.json();
        const salesData = await salesRes.json();
        const purchasesData = await purchaseRes.json();
        const expensesData = (await expenseRes.json())?.expenses || [];
        const customersData = await customerRes.json();
        const suppliersData = await supplierRes.json();
        console.log(expensesData);
        console.log(salesData);

        setProducts(productsData || []);
        setSales(salesData || []);
        setPurchases(purchasesData?.purchases || []);
        setExpenses(expensesData || []);
        setCustomers(customersData?.customers || []);
        setSuppliers(suppliersData?.suppliers || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const totalPurchaseDue = Array.isArray(purchases)
  ? purchases.reduce((acc, purchase) => acc + parseFloat(purchase?.total || 0), 0)
  : 0;

const totalSalesDue = Array.isArray(sales)
  ? sales.reduce((acc, sale) => acc + parseFloat(sale?.change_return || 0), 0)
  : 0;

const totalSaleAmount = Array.isArray(sales)
  ? sales.reduce((acc, sale) => acc + parseFloat(sale?.total || 0), 0)
  : 0;

// Total Expenses
const totalExpenseAmount = Array.isArray(expenses)
  ? expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0)
  : 0;
  console.log(totalExpenseAmount);

  const totalCustomers = customers?.length || 0;
  const totalSuppliers = suppliers?.length || 0;

  const today = new Date();
  const todaySales = sales?.filter(sale => new Date(sale?.sale_date).toDateString() === today.toDateString()) || [];
  const todaySold = todaySales.reduce((acc, sale) => acc + parseFloat(sale?.total || 0), 0);
  const todaySoldCost = todaySales.reduce((acc, sale) => {
    return (
      acc +
      (sale?.products?.reduce(
        (productAcc, product) => productAcc + (product?.purchase_cost || 0) * (product?.quantity || 0),
        0
      ) || 0)
    );
  }, 0);

// Today's Expenses
const todayExpense = Array.isArray(expenses)
  ? expenses
      .filter(expense => {
        const expenseDate = new Date(expense.created_at).toDateString();
        return expenseDate === today.toDateString();
      })
      .reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0)
  : 0;

  const todayProfit = todaySold - todaySoldCost - todayExpense;

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthSales = sales?.filter(sale => {
    const saleDate = new Date(sale?.sale_date);
    return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
  }) || [];
  const monthSold = monthSales.reduce((acc, sale) => acc + parseFloat(sale?.total || 0), 0);
  const monthPurchase = purchases
    ?.filter(purchase => {
      const purchaseDate = new Date(purchase?.purchase_date);
      return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    })
    .reduce((acc, purchase) => acc + parseFloat(purchase?.total || 0), 0) || 0;

// Current Month Expenses
const monthExpense = Array.isArray(expenses)
  ? expenses
      .filter(expense => {
        const expenseDate = new Date(expense.created_at);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0)
  : 0;
  

  const monthReturned = 0;
  const monthProfit = monthSold - monthPurchase - monthExpense;

  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className="dark:text-white lg:p-8 font-nunito text-sm">
      <main className="ml-1/5 flex-grow md:mt-[5%] mt-[20%]">
        <div className="flex justify-between items-center p-4">
          <h2 className="dark:text-white text-lg font-medium">Welcome Back!</h2>
          <p className="dark:text-white">{`${day} ${month} ${year}`}</p>
        </div>

        <div className="lg:mt-5 bg-white dark:bg-[#141432] text-gray-900 dark:text-gray-100 p-4">
          <h2 className="dark:text-white text-md mb-4">Total Summary</h2>
          <div className="grid grid-cols-1 text-black md:grid-cols-4 gap-4">
            <SummaryCard
              icon={<BiSolidShoppingBags size={28} className="text-[#FF9F43]" />}
              title="Total Purchase Due"
              value={`$${totalPurchaseDue.toFixed(2)}`}
            />
            <SummaryCard
              icon={<BadgeDollarSign strokeWidth={2} className="text-green-500" />}
              title="Total Sales Due"
              value={`$${totalSalesDue.toFixed(2)}`}
            />
            <SummaryCard
              icon={<ArrowDownFromLine strokeWidth={2} className="text-cyan-500" />}
              title="Total Sale Amount"
              value={`$${totalSaleAmount.toFixed(2)}`}
            />
            <SummaryCard
              icon={<ArrowUpFromLine strokeWidth={2} className="text-rose-500" />}
              title="Total Expense Amount"
              value={`$${totalExpenseAmount.toFixed(2)}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 text-white">
            <StatsCard color="#FF9F43" title="Customers" value={totalCustomers} />
            <StatsCard color="#00BFFF" title="Suppliers" value={totalSuppliers} />
            <StatsCard color="#6A5ACD" title="Purchase Invoice" value={purchases.length} />
            <StatsCard color="#28C76F" title="Sales Invoice" value={sales.length} />
          </div>

          <h2 className="dark:text-white text-white text-md mb-4 mt-8">Today Summary</h2>
          <div className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard color="#1E90FF" title="Today Sold" value={`Tk ${todaySold}`} />
            <StatsCard color="#8A2BE2" title="Today Sold - Purchase Cost" value={`Tk ${todaySoldCost}`} />
            <StatsCard color="#FF6347" title="Today Expense" value={`Tk ${todayExpense}`} />
            <StatsCard color="#32CD32" title="Today Sell Profit" value={`Tk ${todayProfit}`} />
          </div>

          <h2 className="dark:text-white text-md mb-4 mt-8">Current Month Summary</h2>
          <div className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard color="#3CB371" title={`Sold in ${month} ${year}`} value={`Tk ${monthSold}`} />
            <StatsCard color="#9932CC" title={`Purchased - in ${month} ${year}`} value={`Tk ${monthPurchase}`} />
            <StatsCard color="#FF8C00" title={`Expense in ${month} ${year}`} value={`Tk ${monthExpense}`} />
            <StatsCard color="#40E0D0" title={`Returned in ${month} ${year}`} value={`Tk ${monthReturned}`} />
            <StatsCard color="#BA55D3" title={`Profit ${month} ${year}`} value={`Tk ${monthProfit}`} />
          </div>
        </div>

        <div className="p-4">
          <h2 className="dark:text-white text-md mb-4">Products</h2>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto dark:text-white border text-center">
              <thead>
                <tr className="bg-emerald-500 text-white text-sm leading-normal">
                  <th className="py-2 border">Product</th>
                  <th className="py-2 border">SKU</th>
                  <th className="py-2 border">Manufactured Date</th>
                  <th className="py-2 border"> Date</th>
                  {/* <th className="py-2 border">Action</th> */}
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                {products?.slice(0, 10).map(product => (
                  <tr key={product.id} className="border-b border-gray-200">
                    <td className="py-2 md:flex justify-items-center items-center ml-2 whitespace-nowrap">
                      {product.image && (
                        <Image
                          width={200}
                          height={300}
                          src={`data:image/jpeg;base64,${product.image}`}
                          alt={product.product_name}
                          className="w-8 h-10 object-cover rounded mr-2"
                        />
                      )}
                      <span className="font-medium">{product.product_name}</span>
                    </td>
                    <td className="py-2 border">{product.product_code}</td>
                    <td className="py-2 border">{new Date(product.created_at).toISOString().split("T")[0]}</td>
                    <td className="py-2 border">{new Date(product.created_at).toISOString().split("T")[0]}</td>
                    {/* <td className="py-2 border">
                      <div className="md:flex item-center justify-center gap-5">
                        <button className="p-1 mb-4 md:mb-0 border-2 transform text-blue-600 hover:text-blue-500 hover:scale-110">
                          <TbEdit size={16} />
                        </button>
                        <button className="p-1 transform text-red-600 hover:text-red-500 hover:scale-110 border-2">
                          <RiDeleteBin5Line size={16} />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="p-4 rounded shadow-sm flex justify-start gap-5 items-center ">
      <span className="p-3 bg-opacity-30 rounded-full">{icon}</span>
      <div>
        <p>{value}</p>
        <p>{title}</p>
      </div>
    </div>
  );
}

function StatsCard({ color, title, value }) {
  return (
    <div className={`p-4 rounded shadow-sm text-center`} style={{ backgroundColor: color }}>
      <p>{value}</p>
      <p>{title}</p>
    </div>
  );
}