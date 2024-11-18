"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GrUserSettings } from 'react-icons/gr';
import { TbEdit, TbInvoice } from 'react-icons/tb';
import { IoTvOutline } from "react-icons/io5";
import { MdOutlineDeleteSweep, MdOutlinePayments } from 'react-icons/md';
import { FaPrint } from "react-icons/fa";
import { PDFDocument,StandardFonts, rgb } from 'pdf-lib';
import logo from "../../../assets/logo.png"
import Loader from '@/app/Loaders/page';
import QRCode from "qrcode";
export default function Purchase() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    
    useEffect(() => {
      const fetchPurchases = async () => {
        try {
          const response = await fetch("/Purchase/Create/purchase"); // Update the endpoint based on your API setup
          if (!response.ok) throw new Error("Failed to fetch purchases");
          const data = await response.json();
          setPurchases(data.purchases);
        } catch (error) {
          console.error(error);
          toast.error("Failed to load purchases");
        } finally {
          setLoading(false);
        }
      };
  
      fetchPurchases();
    }, []);
    
    const [filter, setFilter] = useState({
      invoiceNo: "",
      startDate: "",
      endDate: "",
      product: "",
      supplier: "",
    });
    
    // Handle filtering changes
    const handleFilterChange = (e) => {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    };
    
    // Function to reset filters
    const resetFilters = () => {
      setFilter({
        invoiceNo: "",
        startDate: "",
        endDate: "",
        product: "",
        supplier: "",
      });
      setPurchases(purchases); // Reset the filtered purchases to the original data
    };
    
    // Function to apply filters
    const applyFilters = () => {
      let filteredPurchases = purchases;
    
      if (filter.invoiceNo) {
        filteredPurchases = filteredPurchases.filter((purchase) =>
          purchase.invoice_no.toString().includes(filter.invoiceNo)
        );
      }
    
      if (filter.startDate) {
        filteredPurchases = filteredPurchases.filter(
          (purchase) => new Date(purchase.purchase_date) >= new Date(filter.startDate)
        );
      }
    
      if (filter.endDate) {
        filteredPurchases = filteredPurchases.filter(
          (purchase) => new Date(purchase.purchase_date) <= new Date(filter.endDate)
        );
      }
    
      if (filter.product) {
        filteredPurchases = filteredPurchases.filter((purchase) =>
          purchase.products
            .map((product) => product.product_name.toLowerCase())
            .join(", ")
            .includes(filter.product.toLowerCase())
        );
      }
    
      if (filter.supplier) {
        filteredPurchases = filteredPurchases.filter((purchase) =>
          purchase.supplier.toLowerCase().includes(filter.supplier.toLowerCase())
        );
      }
    
      setPurchases(filteredPurchases);
    };
   
    const generateInvoice = async (purchase) => {
      console.log("Purchase object passed to handlePrint:", purchase);
      if (typeof window === "undefined") return;
    
      const newWindow = window.open("", "_blank", "width=800,height=600");
      if (!newWindow) {
        alert(
          "Pop-up blocker is preventing the print window from opening. Please allow pop-ups for this site."
        );
        return;
      }
    
      // Prepare data for the QR Code
      const purchaseDataForQR = {
        invoice_no: purchase?.invoice_no,
        supplier: purchase?.supplier,
        purchase_date: new Date(purchase?.purchase_date).toLocaleDateString(),
        total_payable: purchase?.total_payable,
        amount_paid: purchase?.amount_paid,
        change_return: purchase?.change_return,
      };
    
      // Convert the data to a JSON string
      const qrCodeData = JSON.stringify(purchaseDataForQR);
    
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
            <title>Invoice - ${purchase?.invoice_no}</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
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
                width: 100px;
                height: 100px;
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
              <h1>Purchase Invoice</h1>
              <div class="details-section">
                <div>
                  <p><strong>Invoice No:</strong> ${purchase?.invoice_no}</p>
                  <p><strong>Purchase Date:</strong> ${new Date(purchase?.purchase_date).toLocaleDateString()}</p>
                  <p><strong>Supplier:</strong> ${purchase?.supplier}</p>
                </div>
                <div>
                  <p><strong>Payment Method:</strong> ${purchase?.payment_method}</p>
                  <p><strong>Payment Account:</strong> ${purchase?.payment_account}</p>
                  <p><strong>Status:</strong> ${purchase?.status || "Not Yet"}</p>
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
                  ${purchase?.products
                    ?.map(
                      (product) => `
                      <tr>
                        <td>${product.product_name}</td>
                        <td>${product.product_details}</td>
                        <td>${product.quantity} ${product.main_unit}</td>
                        <td>${parseFloat(product.purchase_cost).toFixed(2)}</td>
                        <td>${parseFloat(product.subtotal).toFixed(2)}</td>
                      </tr>
                    `
                    )
                    .join("")}
                </tbody>
              </table>
              <div class="summary">
                <p><strong>Subtotal:</strong> ${parseFloat(purchase?.total).toFixed(2)}</p>
                <p><strong>Discount:</strong> ${purchase?.discount_amount} (${purchase?.discount_type})</p>
                <p><strong>Tax:</strong> ${purchase?.order_tax}%</p>
                <p><strong>Total Payable:</strong> ${parseFloat(purchase?.total_payable).toFixed(2)}</p>
                <p><strong>Amount Paid:</strong> ${parseFloat(purchase?.amount_paid).toFixed(2)}</p>
                <p><strong>Change Return:</strong> ${parseFloat(purchase?.change_return).toFixed(2)}</p>
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
    

    
      const toggleDropdown = (index) => {
        setIsDropdownOpen(isDropdownOpen === index ? null : index); // Toggle the dropdown
      };
      if (loading) return <Loader/>;

      
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>
        <div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
      {/* Title Section */}
  
      <div className=" mb-4  shadow-sm ">
      <h1 className="text-lg dark:text-white  text-gray-500 mx-5 ">Purchase</h1>
        <div className='flex items-start justify-start mx-5 py-5 gap-10'>
            <Link href="/Purchase" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            Purchase
            <span className={spanClass}></span>
            </Link>
            <Link href="/Purchase/Create" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            + Add Purchase
            <span className={spanClass}></span>
            </Link>
        </div>
      </div>
              {/* here is another section */}
              <div className="p-2">
      {/* Filter Section */}
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                        type="text"
                        name="billNumber"
                        value={filter.billNumber}
                        onChange={handleFilterChange}
                        placeholder="Bill Number"
                        className="p-2 border bg-white border-gray-300 rounded"
                        />
                        <input
                        type="date"
                        name="startDate"
                        value={filter.startDate}
                        onChange={handleFilterChange}
                        className="p-2 border bg-white border-gray-300 rounded"
                        />
                        <input
                        type="date"
                        name="endDate"
                        value={filter.endDate}
                        onChange={handleFilterChange}
                        className="p-2 border bg-white border-gray-300 rounded"
                        />
                        <input
                        type="text"
                        name="product"
                        value={filter.product}
                        onChange={handleFilterChange}
                        placeholder="Product"
                        className="p-2 border bg-white border-gray-300 rounded"
                        />
                        <input
                        type="text"
                        name="supplier"
                        value={filter.supplier}
                        onChange={handleFilterChange}
                        placeholder="Supplier"
                        className="p-2 border bg-white border-gray-300 rounded"
                        />
                        <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={applyFilters}
                        >
                        Filter
                        </button>
                        <button
                        className="bg-gray-500 text-white p-2 rounded"
                        onClick={resetFilters}
                        >
                        Reset
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto dark:bg-[#212144] dark:text-white border rounded h-screen">
                        <table className="min-w-full table-auto dark:text-white border-collapse border border-gray-300 text-center">
                        <thead>
                            <tr className="bg-emerald-500 text-stone-50">
                            <th className="p-2  border border-gray-300">Invoice No</th>
                            <th className="p-2  border border-gray-300">Supplier</th>
                            <th className="p-2  border border-gray-300">Purchase Date</th>
                            <th className="p-2  border border-gray-300">Items</th>
                            <th className="p-2  border border-gray-300">Payable</th>
                            <th className="p-2  border border-gray-300">Paid</th>
                            <th className="p-2  border border-gray-300">Due</th>
                            <th className="p-2  ">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases?.map((purchase, index) => (
                            <tr key={purchase.billNo} className="border-b">
                                <td className="p-2 border border-gray-300">{purchase.invoice_no}</td>
                                <td className="p-2 border border-gray-300">{purchase.supplier}</td>
                                <td className="p-2 border border-gray-300">{purchase.purchase_date}</td>
                                <td className="p-2 border border-gray-300">
                                  {purchase.products?.map((product) => product.product_name).join(", ")}
                                </td>
                                <td className="p-2 border border-gray-300">{purchase.total_payable}</td>
                                <td className="p-2 border border-gray-300">{purchase.amount_paid}</td>
                                <td className="p-2 border border-gray-300">
                                {purchase.total_payable - purchase.amount_paid}
                                </td>
                                <td className="p-2 relative ">
                                <button
                                    className="bg-emerald-500 text-white p-2 rounded flex items-center"
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <span>Manage</span>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                </button>
                                {isDropdownOpen === index && (
                                    <div className="absolute transition-transform duration-700 right-0 mt-2 w-48 bg-white shadow-sm rounded-md overflow-hidden z-20">
                                    <ul className="py-1">
                                        <li>
                                        <button
                                            className="w-full px-4 hover:scale-110 py-2 text-sm  text-gray-700  flex items-center"
                                            onClick={() => generateInvoice(purchase)}
                                        >
                                            <span className="mr-2">
                                            <FaPrint size={16} className='text-teal-500'/>
                                            </span>
                                            Invoice
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 hover:scale-110 py-2 text-sm  text-gray-700  flex items-center"
                                            onClick={() => alert('Show Action')}
                                        >
                                            <span className="mr-2 ">
                                            <IoTvOutline size={16} className='text-blue-500'/>
                                            </span>
                                            Show
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 py-2 hover:scale-110 text-sm  text-gray-700  flex items-center"
                                            onClick={() => alert('Edit Action')}
                                        >
                                            <span className="mr-2 ">
                                           
                                            <TbEdit size={16} className='text-blue-500'/>
                                            
                                            </span>
                                            Edit
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 py-2 hover:scale-110 text-sm  text-gray-700  flex items-center"
                                            onClick={() => alert('Add Payment Action')}
                                        >
                                            <span className="mr-2">
                                            <MdOutlinePayments size={16} className='text-teal-500'/>
                                            </span>
                                            Add Payment
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 py-2 hover:scale-110 text-sm  text-red-600 hover:bg-red-100 flex items-center"
                                            onClick={() => alert('Delete Action')}
                                        >
                                            <span className="mr-2">
                                            <MdOutlineDeleteSweep size={16}/>
                                            </span>
                                            Delete
                                        </button>
                                        </li>
                                    </ul>
                                    </div>
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>


                 
                    </div>

        </div>
    </div>
  )
}
