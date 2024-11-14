"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import Image from "next/image";
import { TbEdit, TbShoppingCartDollar } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { ArrowDownFromLine, ArrowUpFromLine, BadgeDollarSign } from "lucide-react";
// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled globally (e.g., stored in localStorage or window)
    const isDarkMode = window.localStorage.getItem("theme") === "dark";
    setDarkMode(isDarkMode);
    console.log(isDarkMode);

    // Apply dark mode class based on global theme
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Data for the Bar Chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 220, 180, 250, 270, 240, 300,400],
        backgroundColor: "#28C76F", // Green for sales
        hoverbackgroundColor: "#65FA9E", // hover Green for sales
        borderColor: "#65FA9E",
        borderWidth: 1,
        borderRadius: 20,
        barThickness: 20,
      },
      {
        label: "Purchase",
        data: [-150, -180, -120, -170, -130, -210, -190, -160, -200,-300],
        backgroundColor: "#FF4D4D", // Red for purchases
        hoverbackgroundColor: "#E4E2E2",
        borderColor: "#FF8585",
        borderWidth: 1,
        borderRadius: 20,
        barThickness: 20,
      },
    ],
  };

  // Chart options for a stacked bar chart
  const options = {
    scales: {
      x: {
      
        stacked: true, // Stack the x-axis
        grid: {
           // Light grid lines for x-axis
        },
        ticks: {
           // White tick labels for x-axis
        },
      },
      y: {
        stacked: true, // Stack the y-axis
        beginAtZero: true,
        grid: {
           // Light grid lines
        },
        ticks: {
           // White tick labels for y-axis
        },
      },
    },

    responsive: true,
  };

  // Get the current date
  const date = new Date();
  const day = date.getDate(); // Returns the day of the month
  const month = date.toLocaleString("default", { month: "long" }); // Returns full month name
  const year = date.getFullYear(); // Returns the year

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/home/product', {
          method: 'GET', // Ensuring that you are using a GET request
        });
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>; // Display error if fetching fails
  }
// console.log(products);
  return (
    <div className=" dark:text-white lg:p-8 font-nunito text-sm">
      <main className="ml-1/5 flex-grow  md:mt-[5%] mt-[20%]">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className=" dark:text-white text-lg font-medium">Welcome Back!</h2>
          <p className=" dark:text-white ">{`${day} ${month} ${year}`}</p>
        </div>

        <div className="lg:mt-5  bg-white dark:bg-[#141432] text-gray-900 dark:text-gray-100 p-4">
        <h2 className=" dark:text-white text-md  mb-4">Total Summary</h2>
          {/* Dashboard cards and charts */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cards */}
            <div className=" p-4 rounded shadow-sm flex justify-start gap-5 items-center">
            <span className="p-3 bg-rose-300 rounded-full bg-opacity-30">
              <BiSolidShoppingBags size={28} className="text-[#FF9F43]"/>
              
            </span>
              <div><p>$307144</p>
              <p>Total Purchase Due</p></div>
            </div>
            <div className=" p-4 rounded shadow-sm flex justify-start gap-5 items-center">
            <span className="p-3 bg-green-300 rounded-full bg-opacity-30">
              <BadgeDollarSign strokeWidth={2} className="text-green-500 "/>
            </span>
              <div>
                <p>$4385</p>
                <p>Total Sales Due</p>
              </div>
            </div>
            <div className=" p-4 rounded shadow-sm flex justify-start gap-5 items-center">
            <span className="p-3 bg-cyan-300 rounded-full bg-opacity-30">
            
              <ArrowDownFromLine strokeWidth={2} className="text-cyan-500"/>
            </span>
              <div>
              <p>$385656.5</p>
              <p>Total Sale Amount</p>
              </div>
            </div>
            <div className=" p-4 rounded shadow-sm flex justify-start gap-5 items-center">
            <span className="p-3 bg-rose-300 rounded-full bg-opacity-30">
              <ArrowUpFromLine strokeWidth={2} className="text-rose-500"/>
            </span>
              <div>
              <p>$40000</p>
              <p>Total Expense Amount</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 text-white">
            {/* Additional Stats */}
            <div className="bg-[#FF9F43] p-4 rounded shadow-sm text-center">
              <p>100</p>
              <p>Customers</p>
            </div>
            <div className="bg-sky-400 p-4 rounded shadow-sm text-center">
              <p>110</p>
              <p>Suppliers</p>
            </div>
            <div className="bg-indigo-400 p-4 rounded shadow-sm text-center">
              <p>150</p>
              <p>Purchase Invoice</p>
            </div>
            <div className="bg-[#28C76F] p-4 rounded shadow-sm text-center">
              <p>170</p>
              <p>Sales Invoice</p>
            </div>
          </div>
          <div className="p-0 mb-5 mt-5">
      {/* Today Summary */}
      <h2 className=" dark:text-white text-md  mb-4">Today Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600 text-white p-4 rounded shadow-sm">
          <h3 className=" ">TODAY SOLD</h3>
          <p className=" dark:text-white ">Tk 20,000</p>
        </div>
        <div className="bg-violet-500 text-white p-4 rounded shadow-sm">
          <h3 className=" ">TODAY SOLD - PURCHASE COST</h3>
          <p className=" dark:text-white ">Tk 20,000</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow-sm">
          <h3 className=" ">TODAY EXPENSE</h3>
          <p className=" dark:text-white ">Tk 20,000</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded shadow-sm">
          <h3 className=" ">TODAY SELL PROFIT</h3>
          <p className=" dark:text-white ">Tk 30,000</p>
        </div>
      </div>
   
      {/* Current Month Summary */}
      <h2 className=" dark:text-white text-md  mb-4">Current Month Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-500 text-white p-4 rounded shadow-sm">
          <h3 className=" ">SOLD IN SEP 2024</h3>
          <p className=" dark:text-white ">Tk 20,003,886,022</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded shadow-sm">
          <h3 className=" ">PURCHASED - IN SEP 2024</h3>
          <p className=" dark:text-white ">Tk 20,0033,884,105</p>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded shadow-sm">
          <h3 className=" ">EXPENSE IN SEP 2024</h3>
          <p className=" dark:text-white ">Tk 20,00200</p>
        </div>
        <div className="bg-cyan-400 text-white p-4 rounded shadow-sm">
          <h3 className=" ">RETURNED IN SEP 2024</h3>
          <p className=" dark:text-white ">Tk 20,000</p>
        </div>
        <div className="bg-purple-600 text-white p-4 rounded shadow-sm">
          <h3 className=" ">PROFIT SEP 2024</h3>
          <p className=" dark:text-white ">123,122</p>
        </div>
      </div>
    </div>

          <div className="grid min-w-full grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chart Area */}
            <div className="mt-8   shadow-sm dark:bg-[#202047]">
              <h3 className="  mb-4">Purchase & Sales</h3>
              <div className="flex justify-between mb-4">
                <div className="text-green-500">Sales</div>
                <div className="text-red-500">Purchase</div>
                <select className="bg-white dark:bg-[#303063] rounded py-2 text-black dark:text-white">
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>

              {/* Stacked Bar Chart */}
              <Bar data={data} options={options} />
            </div>

          </div>
        </div>
        <div className="p-4">
      <h2 className=" dark:text-white text-md  mb-4 ">Expired Products</h2>
      <div className="overflow-x-auto w-full">
  <table className="min-w-full table-auto dark:text-white border text-center ">
    <thead>
      <tr className="bg-emerald-500 text-white text-sm leading-normal">
        <th className="py-2 border">Product</th>
        <th className="py-2 border">SKU</th>
        <th className="py-2 border">Manufactured Date</th>
        <th className="py-2 border">Expired Date</th>
        <th className="py-2 border">Action</th>
      </tr>
    </thead>
    <tbody className="text-sm font-light">
      {products?.map((product) => (
        <tr key={product.id} className="border-b border-gray-200">
          <td className="py-2 md:flex justify-items-center items-center ml-2 whitespace-nowrap">
           
          {product.image && (
                  <Image 
                  width={200} height={300}
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.product_name}
  
                    className="w-8 h-10 object-cover rounded mr-2"
                  />   )}
                  
            <span className="font-medium">{product.product_name}</span>
          </td>
          <td className="py-2 border">{product.product_code}</td>
          <td className="py-2 border">{new Date(product.created_at).toISOString().split('T')[0]}</td>
          <td className="py-2 border">{new Date(product.created_at).toISOString().split('T')[0]}</td>

          
          <td className="py-2 border">
            <div className="md:flex item-center justify-center gap-5">
              <button className="p-1 mb-4 md:mb-0 border-2 transform text-blue-600 hover:text-blue-500 hover:scale-110">
                <TbEdit size={16} />
              </button>
              <button className="p-1 transform text-red-600 hover:text-red-500 hover:scale-110 border-2">
                <RiDeleteBin5Line size={16} />
              </button>
            </div>
          </td>
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
