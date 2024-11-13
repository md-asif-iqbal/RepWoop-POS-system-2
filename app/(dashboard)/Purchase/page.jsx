"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { GrUserSettings } from 'react-icons/gr';
import { TbEdit, TbInvoice } from 'react-icons/tb';
import { IoTvOutline } from "react-icons/io5";
import { MdOutlineDeleteSweep, MdOutlinePayments } from 'react-icons/md';
import { FaPrint } from "react-icons/fa";
import { PDFDocument,StandardFonts, rgb } from 'pdf-lib';
import logo from "../../../assets/logo.png"
export default function Purchase() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const [filter, setFilter] = useState({
      billNumber: "",
      startDate: "",
      endDate: "",
      product: "",
      supplier: ""
    });
    
      const purchasesData = [
        {
          billNo: 1,
          supplier: "Ayman Computer",
          purchaseDate: "22 Sep, 2024",
          items: "Laptop Computer | 000002",
          payable: "1,000,000.00 TK",
          paid: "0.00 TK",
          due: "1,000,000.00 TK",
        },
        {
          billNo: 2,
          supplier: "Computer City",
          purchaseDate: "22 Sep, 2024",
          items: "Tenda F3 Router | 0000014",
          payable: "15,000.00 TK",
          paid: "15,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 3,
          supplier: "Ayman Computer",
          purchaseDate: "22 Sep, 2024",
          items: "Tenda F3 Router | 0000014",
          payable: "13,000.00 TK",
          paid: "12,000.00 TK",
          due: "1,000.00 TK",
        },
        {
          billNo: 4,
          supplier: "Afko Khan",
          purchaseDate: "22 Sep, 2024",
          items: "Tenda F3 Router | 0000013",
          payable: "500.00 TK",
          paid: "500.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 5,
          supplier: "Riptith Hasan",
          purchaseDate: "22 Sep, 2024",
          items: "T-shirt Polo | 000001",
          payable: "40,000.00 TK",
          paid: "40,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 6,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Gaming Laptop | 000001",
          payable: "1,450,000.00 TK",
          paid: "1,450,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 7,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Dell Machine | 000001",
          payable: "2,750,000.00 TK",
          paid: "2,750,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 8,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Bijar For Men | 000001",
          payable: "250,000.00 TK",
          paid: "250,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 9,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Door Expert | 000001",
          payable: "1,395,400.00 TK",
          paid: "1,394,500.00 TK",
          due: "900.00 TK",
        },
        {
          billNo: 10,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Air Conditioner | 000001",
          payable: "9,135,000.00 TK",
          paid: "9,135,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 11,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Frieze | 000001",
          payable: "420,000.00 TK",
          paid: "420,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 12,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Ladies Shirt | 000005",
          payable: "70,000.00 TK",
          paid: "70,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 13,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "T-shirt | 000004",
          payable: "120,000.00 TK",
          paid: "120,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 14,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Desktop Computer | 000001",
          payable: "375,000.00 TK",
          paid: "37,500.00 TK",
          due: "337,500.00 TK",
        },
        {
          billNo: 15,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Laptop Computer | 000002",
          payable: "7,200,000.00 TK",
          paid: "7,200,000.00 TK",
          due: "0.00 TK",
        },
        {
          billNo: 16,
          supplier: "Default Supplier",
          purchaseDate: "19 Sep, 2024",
          items: "Mobile Phone | 000001",
          payable: "415,000.00 TK",
          paid: "415,000.00 TK",
          due: "0.00 TK",
        }
      ];
      const [purchases, setPurchases] = useState(purchasesData);

// `whats new..........

      // Handle filtering changes
      const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
      };
    
      // Function to reset filters
      const resetFilters = () => {
        setFilter({
          billNumber: "",
          startDate: "",
          endDate: "",
          product: "",
          supplier: ""
        });
        setPurchases(purchasesData); // Reset the filtered purchases to the original data
      };
      const generateInvoice = async (purchase) => {
        // Create a new PDFDocument with A4 size
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

        // Load the standard Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Add Repwoop logo and company name at the top
        const fetchImage = async (imageUrl) => {
        const res = await fetch(imageUrl);
        return res.arrayBuffer();
        };

        const logoBytes = await fetchImage(logo.src); // Fetch the image from the imported logo
        const logoImage = await pdfDoc.embedPng(logoBytes); // Embed as PNG
        const logoDims = logoImage.scale(0.3); // Scale the logo to fit

        // Draw the logo on the top
        page.drawImage(logoImage, { x: 50, y: 750, width: logoDims.width, height: logoDims.height });
        
        // Company name directly below the logo
        page.drawText("Repwoop Company", { x: 50, y: 720, size: 18, font: helveticaFont, color: rgb(0, 0, 0) });

        // Company details below the logo and name
        page.drawText("Address: Holding 53 (1st floor), Sahajatpur, Gulshan, Dhaka 1219", { x: 50, y: 700, size: 12, font: helveticaFont });
        page.drawText("Phone: 01779724380", { x: 50, y: 685, size: 12, font: helveticaFont });
        page.drawText("Email: info@repwoop.com", { x: 50, y: 670, size: 12, font: helveticaFont });

        // Add invoice header information
        page.drawText(`Invoice No: ${purchase.billNo}`, { x: 400, y: 750, size: 12, font: helveticaFont });
        page.drawText(`Date: ${purchase.purchaseDate}`, { x: 400, y: 735, size: 12, font: helveticaFont });

        // Invoice table - header
        page.drawText(`#`, { x: 50, y: 620, size: 10, font: helveticaFont });
        page.drawText(`Details`, { x: 80, y: 620, size: 10, font: helveticaFont });
        page.drawText(`Qty`, { x: 300, y: 620, size: 10, font: helveticaFont });
        page.drawText(`Price`, { x: 350, y: 620, size: 10, font: helveticaFont });
        page.drawText(`Net.A`, { x: 450, y: 620, size: 10, font: helveticaFont });

        // Draw lines for table
        page.drawLine({ start: { x: 50, y: 610 }, end: { x: 540, y: 610 }, thickness: 0.5, color: rgb(0, 0, 0) }); // Line under header

        // Table Row for each item (just 1 for demo purposes)
        page.drawText(`1`, { x: 50, y: 590, size: 10, font: helveticaFont });
        page.drawText(`${purchase.items}`, { x: 80, y: 590, size: 10, font: helveticaFont });
        page.drawText(`1 pc`, { x: 300, y: 590, size: 10, font: helveticaFont });
        page.drawText(`${purchase.payable}`, { x: 350, y: 590, size: 10, font: helveticaFont });
        page.drawText(`${purchase.payable}`, { x: 450, y: 590, size: 10, font: helveticaFont });

        // Draw line after row
        page.drawLine({ start: { x: 50, y: 580 }, end: { x: 540, y: 580 }, thickness: 0.5, color: rgb(0, 0, 0) });

        // Summary section (Grand Total, Paid, Due)
        page.drawText(`Grand Total:`, { x: 350, y: 540, size: 10, font: helveticaFont });
        page.drawText(`${purchase.payable}`, { x: 450, y: 540, size: 10, font: helveticaFont });

        page.drawText(`Paid:`, { x: 350, y: 520, size: 10, font: helveticaFont });
        page.drawText(`${purchase.paid}`, { x: 450, y: 520, size: 10, font: helveticaFont });

        page.drawText(`Due:`, { x: 350, y: 500, size: 10, font: helveticaFont });
        page.drawText(`${purchase.due}`, { x: 450, y: 500, size: 10, font: helveticaFont });

        // Draw a final line
        page.drawLine({ start: { x: 50, y: 490 }, end: { x: 540, y: 490 }, thickness: 0.5, color: rgb(0, 0, 0) });

        // Add Note
        page.drawText(`Note: Thank you for your business!`, { x: 50, y: 470, size: 10, font: helveticaFont });

        // Serialize the PDF to bytes (Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Create a Blob from the bytes and open it in a new window to print
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        // Open a new window/tab with the PDF content
        const newTab = window.open(blobUrl);
        newTab.onload = () => {
        newTab.focus(); // Focus on the new tab
        newTab.print(); // Automatically trigger the print dialog
        };
    };
    
      // Function to apply filters
      const applyFilters = () => {
        let filteredPurchases = purchasesData;
    
        if (filter.billNumber) {
          filteredPurchases = filteredPurchases.filter((purchase) =>
            purchase.billNo.toString().includes(filter.billNumber)
          );
        }
    
        if (filter.startDate) {
          filteredPurchases = filteredPurchases.filter(
            (purchase) => purchase.purchaseDate >= filter.startDate
          );
        }
    
        if (filter.endDate) {
          filteredPurchases = filteredPurchases.filter(
            (purchase) => purchase.purchaseDate <= filter.endDate
          );
        }
    
        if (filter.product) {
          filteredPurchases = filteredPurchases.filter((purchase) =>
            purchase.items.toLowerCase().includes(filter.product.toLowerCase())
          );
        }
    
        if (filter.supplier) {
          filteredPurchases = filteredPurchases.filter((purchase) =>
            purchase.supplier.toLowerCase().includes(filter.supplier.toLowerCase())
          );
        }
    
        setPurchases(filteredPurchases);
      };
    
      const toggleDropdown = (index) => {
        setIsDropdownOpen(isDropdownOpen === index ? null : index); // Toggle the dropdown
      };

      
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
                    <div className="overflow-x-auto dark:bg-[#212144] dark:text-white border rounded ">
                        <table className="min-w-full table-auto dark:text-white border-collapse border border-gray-300 text-center">
                        <thead>
                            <tr className="bg-emerald-500 text-stone-50">
                            <th className="p-2  border border-gray-300">Bill No</th>
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
                                <td className="p-2 border border-gray-300">{purchase.billNo}</td>
                                <td className="p-2 border border-gray-300">{purchase.supplier}</td>
                                <td className="p-2 border border-gray-300">{purchase.purchaseDate}</td>
                                <td className="p-2 border border-gray-300">{purchase.items}</td>
                                <td className="p-2 border border-gray-300">{purchase.payable}</td>
                                <td className="p-2 border border-gray-300">{purchase.paid}</td>
                                <td className="p-2 border border-gray-300">{purchase.due}</td>
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
