"use client"


import Loader from '@/app/Loaders/page';
import { ChevronDown, CornerDownLeft, Eye, List, Pencil, Plus, Printer, Trash2 } from 'lucide-react';
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
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    const [selectedSale, setSelectedSale] = useState(null); // Data for the selected sale


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

  const totalPayable = sales
  ?.map((sale) => Math.round(sale.total_payable || 0)) // Ensure no decimals
  .reduce((sum, value) => sum + value, 0);


  const handlePrint = (sale) => {
    console.log("Sale object passed to handlePrint:", sale);
    if (typeof window === "undefined") return;

    // const printableContent = ;

    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (!newWindow) {
      alert("Pop-up blocker is preventing the print window from opening. Please allow pop-ups for this site.");
      return;
    }

    newWindow.document.open();
    newWindow.document.write(`
      <div>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
          }
          h1, h2 {
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
          .summary {
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
        <h1>Invoice: ${sale?.invoice_no}</h1>
        <h2>Customer: ${sale?.selected_customer}</h2>
        <p><strong>Payment Method:</strong> ${sale?.payment_method}</p>
        <p><strong>Payment Account:</strong> ${sale?.payment_account}</p>
        <p><strong>Payment Date:</strong> ${new Date(sale?.payment_date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${sale?.status || "not yet"}</p>
        <p><strong>Order Tax:</strong> ${sale?.order_tax}%</p>
        <p><strong>Discount:</strong> ${sale?.discount_amount} (${sale?.discount_type})</p>
        <p><strong>Shipping Charges:</strong> ${sale?.shipping_charges}</p>
        <h3>Products:</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Details</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${sale?.products
              ?.map(
                (product) => `
                <tr>
                  <td>${product.product_name}</td>
                  <td>${product.product_details}</td>
                  <td>${product.quantity} ${product.main_unit}</td>
                  <td>${product.sale_price}</td>
                  <td>${product.subtotal}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <div class="summary">
          <p><strong>Total:</strong> ${sale.total}</p>
          <p><strong>Total Payable:</strong> ${sale.total_payable}</p>
          <p><strong>Amount Paid:</strong> ${sale.amount_paid}</p>
          <p><strong>Change Return:</strong> ${sale.change_return}</p>
        </div>
      </div>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    
  };
  // open the modal....
  const handleShowModal = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  // Close modal and reset selected sale
  const handleCloseModal = () => {
    setSelectedSale(null);
    setIsModalOpen(false);
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
              ).reduce((sum, sale) => sum + (sale.total - (sale.products?.reduce((sum, product) => sum + (product.purchase_cost || 0), 0) || 0) || 0), 0) || 0}
            </p>
          </div>
          <div className="bg-green-600 text-white p-4 rounded shadow-sm">
            <h3 className=" ">Total Sold</h3>
            <p className="dark:text-white">
              Tk {totalPayable.toLocaleString()} {/* Format the number with commas */}
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
      <div className="overflow-x-auto h-screen">
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
                {sale.products?.map((product) => product.product_name).join(', ') || 'No Products'} - {sale.products?.length || 0} quantity
              </td>

              <td className="p-2 border">{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td className="p-2 border">{sale.discount_amount}</td>
              <td className="p-2 border">{sale.total_payable}</td>
              <td className="p-2 border">{sale.amount_paid}</td>
              <td className="p-2 border">{sale.total_payable - sale.amount_paid}</td>
              <td className="p-2 border">
                {sale.products?.map((product) => product.purchase_cost).join(', ') || 0}
              </td>
              <td className="p-2 border">{sale.total - (sale.products?.reduce((sum, product) => sum + (product.purchase_cost || 0), 0) || 0)}
              </td>
              <td className={`p-2 border ${sale.status === "Completed" ? "text-green-500" : "text-yellow-400"}`}>
                {sale.status}
              </td>
                <td className="p-2 border">
                  {/* Action buttons */}
                  <div className="relative">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className=" m-1">
                    <button
                      
                      className="p-1 flex gap-2 items-center transform cursor-pointer text-sky-400 hover:text-red-500 hover:scale-110 border"
                    >
                      Action<ChevronDown strokeWidth={1.25} size={20} />
                    </button>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li
                      key={sale.id}
                      className="p-2 hover:bg-base-200 cursor-pointer flex"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrint(sale);
                      }}
                    >
                      Print
                    </li>
                      {/* <li className="p-2 cursor-pointer">
                          <Printer /> Challan Print
                      </li> */}
                      <li className="p-2 hover:bg-base-200 cursor-pointer">
                          Edit
                      </li>
                      <li onClick={() => handleShowModal(sale)} className="p-2 hover:bg-base-200 cursor-pointer">
                          Show
                      </li>
                      <li className="p-2 hover:bg-base-200 cursor-pointer">
                          Return
                      </li>
                      <li className="p-2 hover:bg-base-200 cursor-pointer">
                          Return List
                      </li>
                      <li className="p-2 hover:bg-base-200 cursor-pointer">
                          Add Payment
                      </li>
                      <li className="p-2 hover:bg-base-200 cursor-pointer">
                          Delete
                      </li>
                    </ul>
                  </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


            {/* show modal */}
    {isModalOpen && selectedSale && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent background click
          >
            <h2 className="text-2xl font-bold mb-4">
              Invoice: {selectedSale.invoice_no}
            </h2>
            <p className="mb-2">
              <strong>Customer:</strong> {selectedSale.selected_customer}
            </p>
            <p className="mb-2">
              <strong>Payment Method:</strong> {selectedSale.payment_method}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {selectedSale.status}
            </p>
            <p className="mb-4">
              <strong>Payment Date:</strong>{" "}
              {new Date(selectedSale.payment_date).toLocaleDateString()}
            </p>

            <h3 className="text-xl font-bold mb-2">Products</h3>
            <table className="w-full border-collapse border border-gray-200 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">Product Name</th>
                  <th className="border border-gray-200 px-4 py-2">Details</th>
                  <th className="border border-gray-200 px-4 py-2">Quantity</th>
                  <th className="border border-gray-200 px-4 py-2">Unit Price</th>
                  <th className="border border-gray-200 px-4 py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedSale.products.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-200 px-4 py-2">
                      {product.product_name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.product_details}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {product.quantity} {product.main_unit}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      ${product.sale_price}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      ${product.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right font-bold">
              <p>Total: ${selectedSale.total}</p>
              <p>Discount: ${selectedSale.discount_amount} ({selectedSale.discount_type})</p>
              <p>Shipping Charges: ${selectedSale.shipping_charges}</p>
              <p className="text-lg">Amount Payable: ${selectedSale.total_payable}</p>
            </div>

            <button
              onClick={handleCloseModal}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}


    </div>
  )
}




