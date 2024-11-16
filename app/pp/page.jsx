"use client"


import Loader from '@/app/Loaders/page';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GrUserSettings } from 'react-icons/gr';
import { toast } from 'react-toastify';

export default function Sales() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [billNumber, setBillNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');


    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
  

  

    const handleActionClick = (invoiceId) => {
      setSelectedInvoice(invoiceId);
      // You can implement specific logic for each action
      console.log(`Action clicked for invoice: ${invoiceId}`);
    };


      const [filteredData, setFilteredData] = useState([]); // Initialize with full data
      useEffect(() => {
        const fetchSales = async () => {
          try {
            const response = await fetch('/Sales/Create/sales');
            if (!response.ok) throw new Error('Failed to fetch sales');
            const data = await response.json();
            console.log(data);
            setSales(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching sales:', error);
            toast.error('Failed to load sales data.');
            setLoading(false);
          }
        };
    
        fetchSales();
      }, []);
    
      if (loading) return <Loader/>;
  
      

     // Extract unique customers from the sales data
const uniqueCustomers = [...new Set(sales?.map((item) => item.selected_customer))];


// Filter Function
const handleFilter = () => {
  let filtered = sales;

  // Filter by Invoice Number
  if (billNumber) {
    filtered = filtered.filter((item) =>
      item.invoice_no.toString().includes(billNumber)
    );
  }

  // Filter by Start Date
  if (startDate) {
    filtered = filtered.filter(
      (item) => new Date(item.sale_date) >= new Date(startDate)
    );
  }

  // Filter by End Date
  if (endDate) {
    filtered = filtered.filter(
      (item) => new Date(item.sale_date) <= new Date(endDate)
    );
  }

  // Filter by Selected Customer
  if (selectedCustomer) {
    filtered = filtered.filter(
      (item) => item.selected_customer === selectedCustomer
    );
  }

  setFilteredData(filtered);
};
const dataToDisplay = filteredData.length > 0 ? filteredData : sales;

  // Reset Function
  const handleReset = () => {
    setBillNumber('');
    setStartDate('');
    setEndDate('');
    setSelectedCustomer('');
    setFilteredData(sales); // Reset to original salesData
  };

  return (
    <div className='bg-white dark:bg-[#141432] text-gray-500 dark:text-white font-nunito text-sm'>
        <div className="p-2 md:mt-[5%] mt-[20%]">
      {/* Header with statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-600 text-white p-4 rounded shadow-sm">
            <h3 className=" ">Sold Today</h3>
            <p className=" dark:text-white ">
              Tk {sales?.filter((sale) => 
                new Date(sale.sale_date).toLocaleDateString() === new Date().toLocaleDateString()
              ).reduce((sum, sale) => sum + sale.total_payable, 0) || 0}
            </p>
          </div>
          <div className="bg-violet-500 text-white p-4 rounded shadow-sm">
            <h3 className=" ">Today Received</h3>
            <p className=" dark:text-white ">
              Tk {sales?.filter((sale) => 
                new Date(sale.sale_date).toLocaleDateString() === new Date().toLocaleDateString()
              ).reduce((sum, sale) => sum + sale.amount_paid, 0) || 0}
            </p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded shadow-sm">
            <h3 className=" ">Today Profit</h3>
            <p className=" dark:text-white ">
              Tk {sales?.filter((sale) => 
                new Date(sale.sale_date).toLocaleDateString() === new Date().toLocaleDateString()
              ).reduce((sum, sale) => sum + (sale.profit || 0), 0) || 0}
            </p>
          </div>
          <div className="bg-green-600 text-white p-4 rounded shadow-sm">
  <h3 className=" ">Total Sold</h3>
  <p className="dark:text-white">
    Tk {Number(sales?.reduce((totalSellSum, sale) => totalSellSum + (sale.total_payable || 0), 0))}
  </p>
</div>



        </div>

      {/* Filter Section */}
      <div className="md:flex flex-wrap gap-4 mb-6">
      <input
          type="text"
          placeholder="Bill Number"
          value={billNumber}
          onChange={(e) => setBillNumber(e.target.value)}
          className="border rounded p-2 dark:text-black bg-white w-full md:w-1/6"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded dark:text-black bg-white p-2 w-full md:w-1/6"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded dark:text-black bg-white p-2 w-full md:w-1/6"
        />
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border rounded p-2 w-full md:w-1/6 bg-white dark:text-black"
        >
          <option value="">Select Customer</option>
          {uniqueCustomers?.map((customer, index) => (
            <option key={index} value={customer}>
              {customer}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded w-full md:w-1/6"
        >
          Filter
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white p-2 rounded w-full md:w-[11%]"
        >
          Reset
        </button>
      </div>
      <div className='flex justify-end mb-2'>
       <Link href="/Sales/Create"> 
        <button className='btn bg-sky-500 text-white hover:bg-purple-500 '>Add+</button>
       </Link>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        <table className="table-auto dark:text-white w-full border-collapse border">
          <thead className="border">
            <tr className='bg-emerald-500 text-white'>
              <th className="p-2 border">Invoice No.</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Receivable</th>
              <th className="p-2 border">Paid</th>
              <th className="p-2 border">Due</th>
              <th className="p-2 border">Purchase Cost</th>
              <th className="p-2 border">Profit</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className='border'>
            {dataToDisplay?.map((sale) => (
              <tr key={sale.id}>
              <td className="p-2 border">{sale.invoice_no}</td>
              <td className="p-2 border">{sale.selected_customer}</td>
              <td className="p-2 border">
                {sale.products?.map((product) => product.product_name).join(', ') || 'No Products'}
              </td>

              <td className="p-2 border">{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td className="p-2 border">{sale.discount_amount}</td>
              <td className="p-2 border">{sale.total_payable}</td>
              <td className="p-2 border">{sale.amount_paid}</td>
              <td className="p-2 border">{sale.total_payable - sale.amount_paid}</td>
              <td className="p-2 border">
                {sale.products?.map((product) => product.purchase_cost).join(', ') || 0}
              </td>
              <td className="p-2 border">{sale.profit || 0}</td>
              <td className={`p-2 border ${sale.status === "Completed" ? "text-green-500" : "text-yellow-400"}`}>
                {sale.status}
              </td>
                <td className="p-2 border">
                  {/* Action buttons */}
                  <div className="relative">
                    <button
                      onClick={() => handleActionClick(sale.invoiceNo)}
                      className="p-1 flex gap-2 items-center transform cursor-pointer text-sky-400 hover:text-red-500 hover:scale-110 border"
                    >
                      Action<ChevronDown strokeWidth={1.25} size={20} />
                    </button>
                    {selectedInvoice === sale.invoiceNo && (
                      <div className="absolute bg-white shadow-sm rounded p-2 mt-2 z-20 right-10">
                        <ul className="text-gray-700">
                          <li className="p-2  cursor-pointer">Print</li>
                          <li className="p-2  cursor-pointer">Challan Print</li>
                          <li className="p-2  cursor-pointer">Edit</li>
                          <li className="p-2  cursor-pointer">Show</li>
                          <li className="p-2  cursor-pointer">Return</li>
                          <li className="p-2  cursor-pointer">Return List</li>
                          <li className="p-2  cursor-pointer">Add Payment</li>
                          <li className="p-2 hover:bg-red-100 cursor-pointer">Delete</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  )
}




