"use client"


import Loader from '@/app/Loaders/page';
import { ChevronDown, CornerDownLeft, Eye, List, Pencil, Plus, Printer, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GrUserSettings } from 'react-icons/gr';
import { toast } from 'react-toastify';
import QRCode from "qrcode";
export default function Sales() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [billNumber, setBillNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [isReturnListModalOpen, setIsReturnListModalOpen] = useState(false);
    const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null); // Data for the selected sale
    const [editableData, setEditableData] = useState({});
    const [paymentAmount, setPaymentAmount] = useState(""); // Amount being added to payment
    const [error, setError] = useState(""); // Error handling for invalid inputs

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

// ---------invoice---------


const handlePrint = async (sale) => {
  console.log("Sale object passed to handlePrint:", sale);
  if (typeof window === "undefined") return;

  const newWindow = window.open("", "_blank", "width=800,height=600");
  if (!newWindow) {
    alert(
      "Pop-up blocker is preventing the print window from opening. Please allow pop-ups for this site."
    );
    return;
  }

  // Prepare data for the QR Code
  const saleDataForQR = {
    invoice_no: sale?.invoice_no,
    customer: sale?.selected_customer,
    sale_date: new Date(sale?.sale_date).toLocaleDateString(),
    total_payable: sale?.total_payable,
    amount_paid: sale?.amount_paid,
    change_return: sale?.change_return,
  };

  // Convert the data to a JSON string
  const qrCodeData = JSON.stringify(saleDataForQR);

  // Generate QR Code
  let qrCodeImageUrl = "";
  try {
    qrCodeImageUrl = await QRCode.toDataURL(qrCodeData);
  } catch (err) {
    console.error("Error generating QR code:", err);
  }

  newWindow.document.open();
  newWindow.document.write(`
    <html>
      <head>
        <title>Invoice - ${sale?.invoice_no}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9; /* Light background */
            color: #333;
          }
          .container {
            width: 95%;
            margin: 20px auto;
            background: white;
            padding: 20px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .header .logo {
            width: 250px;
            height: auto;
          }
          .header .company-details {
            text-align: right;
          }
          .header .company-details h2 {
            margin: 0;
            font-size: 1.5rem;
          }
          .header .company-details p {
            margin: 2px 0;
            font-size: 0.9rem;
          }
          h1 {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .details-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 0.9rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 0.85rem;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
            text-align: center;
          }
          td {
            text-align: center;
          }
          .summary {
            margin-top: 20px;
            font-size: 0.9rem;
            text-align: right;
          }
          .summary p {
            margin: 5px 0;
          }
          .signature-section {
            margin-top: 10%;
            text-align: right;
            font-size: 0.85rem;
          }
          .qr-code {
            margin-top: 10%;
            margin-bottom: 20px;
            text-align: right;
          }
          .qr-code img {
            width: 100px; /* Set smaller size for QR code */
            height: 100px; /* Set smaller size for QR code */
          }
          .signature-line {
            display: inline-block;
            border-top: 1px solid #000;
            width: 200px;
            margin-top: 20px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.8rem;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Section -->
          <div class="header">
            <img src="https://www.repwoop.com/wp-content/uploads/2024/02/Artboard-1.png" alt="Repwoop" class="logo">
            <div class="company-details">
              <h2>Repwoop</h2>
              <p>123 Business Road</p>
              <p>City, State, ZIP</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@repwoop.com</p>
            </div>
          </div>
          <h1>Sales Invoice</h1>
          <div class="details-section">
            <div>
              <p><strong>Invoice No:</strong> ${sale?.invoice_no}</p>
              <p><strong>Sale Date:</strong> ${new Date(sale?.sale_date).toLocaleDateString()}</p>
              <p><strong>Customer:</strong> ${sale?.selected_customer}</p>
            </div>
            <div>
              <p><strong>Payment Method:</strong> ${sale?.payment_method}</p>
              <p><strong>Payment Account:</strong> ${sale?.payment_account}</p>
              <p><strong>Status:</strong> ${sale?.status || "Not Yet"}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Qty</th>
                <th>Price</th>
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
                    <td>${parseFloat(product.sale_price).toFixed(2)}</td>
                    <td>${parseFloat(product.subtotal).toFixed(2)}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
          <div class="summary">
            <p><strong>Subtotal:</strong> ${parseFloat(sale?.total).toFixed(2)}</p>
            <p><strong>Discount:</strong> ${sale?.discount_amount} (${sale?.discount_type})</p>
            <p><strong>Shipping:</strong> ${parseFloat(sale?.shipping_charges).toFixed(2)}</p>
            <p><strong>Tax:</strong> ${sale?.order_tax}%</p>
            <p><strong>Total Payable:</strong> ${parseFloat(sale?.total_payable).toFixed(2)}</p>
            <p><strong>Amount Paid:</strong> ${parseFloat(sale?.amount_paid).toFixed(2)}</p>
            <p><strong>Change Return:</strong> ${parseFloat(sale?.change_return).toFixed(2)}</p>
          </div>
          <div class="qr-code">
            <img src="${qrCodeImageUrl}" alt="QR Code">
            <p><strong>Scan to Verify</strong></p>
          </div>
          <div class="signature-section">
            <p>Authorized Signature</p>
            <div class="signature-line"></div>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </body>
    </html>
  `);
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
};

  
  // open the modal....
  const handleShowModal = (sale) => {
    setSelectedSale(sale);
    setIsPrintModalOpen(true);
  };

  // Close modal and reset selected sale
  const handleCloseModal = () => {
    setSelectedSale(null);
    setIsPrintModalOpen(false);
  };
  const handleEditClick = (item) => {
    setEditableData(item); // Set the item to edit
    setIsEditModalOpen(true); // Open the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field
    }));
  };

  const handleSaveChanges = () => {
    // Perform save/update logic here
    console.log("Updated Data:", editableData);
    setIsEditModalOpen(false); // Close the modal after saving
  };
  

  const handleAddPaymentClick = (sale) => {
    setIsAddPaymentModalOpen(true); // Open the modal
    setPaymentAmount(sale.amount_paid); // Reset payment amount
    setError(""); // Reset error message
  };

  const handleInputChanges = (e) => {
    setPaymentAmount(e.target.value); // Update payment amount as user types
  };

  const handleSavePayment = () => {
    const newPayment = parseFloat(paymentAmount);

    if (isNaN(newPayment) || newPayment <= 0) {
      setError("Please enter a valid payment amount."); // Handle invalid input
      return;
    }

    const updatedPaidAmount = parseFloat(sale.paid || 0) + newPayment; // Calculate new paid amount

    const updatedSale = {
      ...sale,
      paid: updatedPaidAmount.toFixed(2), // Update paid amount
      due: (parseFloat(sale.total_payable) - updatedPaidAmount).toFixed(2), // Recalculate due amount
    };

    // updateSale(updatedSale); // Call the function to update the sale data
    setIsAddPaymentModalOpen(false); // Close the modal
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
              ).reduce((sum, sale) => sum + Number(sale.total_payable || 0), 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-violet-500 text-white p-4 rounded shadow-sm">
            <h3 className=" ">Today Received</h3>
            <p className=" dark:text-white ">
              Tk {sales?.filter((sale) => 
                new Date(sale.sale_date).toLocaleDateString() === new Date().toLocaleDateString()
              ).reduce((sum, sale) => sum + Number(sale.amount_paid || 0), 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded shadow-sm">
            <h3 className=" ">Today Profit</h3>
            <p className=" dark:text-white ">
              Tk {sales?.filter((sale) => 
                new Date(sale.sale_date).toLocaleDateString() === new Date().toLocaleDateString()
              ).reduce((sum, sale) => {
                const totalProfit = Number(sale.total || 0) - 
                  (sale.products?.reduce((productSum, product) => productSum + Number(product.purchase_cost || 0), 0) || 0);
                return sum + totalProfit;
              }, 0).toFixed(2)}
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
              <tr key={sale.invoice_no}>
              <td className="p-2 border">{sale.invoice_no}</td>
              <td className="p-2 border">{sale.selected_customer}</td>
              <td className="p-2 border">
                {sale.products?.map((product) => product.product_name).join(', ') || 'No Products'} - quantity  {sale.products?.map((product) => product.quantity).join(', ') || 0}
              </td>

              <td className="p-2 border">{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td className="p-2 border">{sale.discount_amount}</td>
              <td className="p-2 border">{sale.total_payable}</td>
              <td className="p-2 border">{sale.amount_paid}</td>
              <td className="p-2 border">
                {Number(sale.amount_paid) > Number(sale.total_payable) ? (
                  <span className="text-green-500">
                    Overpaid: {Math.abs(Number(sale.total_payable) - Number(sale.amount_paid)).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-red-500">
                    Due: {Math.abs(Number(sale.total_payable) - Number(sale.amount_paid)).toFixed(2)}
                  </span>
                )}
              </td>

              <td className="p-2 border">
                {sale.products?.map((product) => product.purchase_cost).join(', ') || 0}
              </td>
              <td className="p-2 border">
                {
                  sale.products.reduce((totalProfit, product) => {
                    const saleRevenue = product.sale_price * product.quantity;
                    const totalCost = product.purchase_cost * product.quantity;

                    // Calculate profit after discount
                    const discountValue = sale.discount_type === "Percentage" 
                      ? (sale.discount_amount / 100) * saleRevenue 
                      : parseFloat(sale.discount_amount || 0);

                    const discountedRevenue = saleRevenue - discountValue;
                    return totalProfit + (discountedRevenue - totalCost);
                  }, 0) 
                }TK
              </td>

              <td
                className={`p-2 border ${
                  sale.status === "Completed" 
                    ? "text-green-500" 
                    : sale.status 
                      ? "text-yellow-400" 
                      : "text-gray-400"
                }`}
              >
                {sale.status || "Not Set"}
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
                    <ul key={sale.invoice_no} tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li
                      
                      className="p-2 hover:bg-base-200 cursor-pointer flex"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrint(sale);
                      }}
                    >
                      Invoice
                    </li>
                      {/* <li className="p-2 cursor-pointer">
                          <Printer /> Challan Print
                      </li> */}
                      <li onClick={() => handleEditClick(sale)} className="p-2 hover:bg-base-200 cursor-pointer">
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
                      <li onClick={()=>handleAddPaymentClick(sale)} className="p-2 hover:bg-base-200 cursor-pointer">
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
    {isShowModalOpen && selectedSale && (
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

      {/* ------ edit modal ------ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 mt-[25%] md:mt-5 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full  md:w-1/2">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            {/* Input Fields */}
            <div className="mb-4">
              <label className="block mb-2">Product Name</label>
              <input
                type="text"
                name="product_name"
                value={editableData.product_name || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editableData.quantity || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Sale Price</label>
              <input
                type="number"
                name="sale_price"
                value={editableData.sale_price || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Discount</label>
              <input
                type="number"
                name="discount"
                value={editableData.discount || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Receivable</label>
              <input
                type="number"
                name="receivable"
                value={editableData.receivable || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Paid</label>
              <input
                type="number"
                name="paid"
                value={editableData.paid || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Due</label>
              <input
                type="number"
                name="due"
                value={editableData.due || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Purchase Cost</label>
              <input
                type="number"
                name="purchase_cost"
                value={editableData.purchase_cost || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select
                name="status"
                value={editableData.status || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----added payment modal */}

            {isAddPaymentModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Add Payment</h2>
            {/* Input Field */}
            <div className="mb-4">
              <label className="block mb-2">Payment Amount</label>
              <input
                type="number"
                name="paymentAmount"
                value={paymentAmount}
                onChange={handleInputChanges}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter payment amount"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddPaymentModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  )
}




