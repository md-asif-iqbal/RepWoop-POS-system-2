"use client";

import React, { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default function Payments() {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [nameFilter, setNameFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // Fetch purchase data
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch('/Purchase/Create/purchase');
        const data = await response.json();
        setPurchases(Array.isArray(data) ? data : [data]); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching purchase data:", error);
        setPurchases([]); // Fallback to an empty array
      }
    };
    fetchPurchases();
  }, []);

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/Sales/Create/sales');
        const data = await response.json();
        setSales(Array.isArray(data) ? data : [data]); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setSales([]); // Fallback to an empty array
      }
    };
    fetchSales();
  }, []);

  // Combine names for the filter dropdown
  const names = Array.from(new Set([
    ...purchases.map(item => item.supplier),
    ...sales.map(item => item.selected_customer),
  ])).filter(Boolean).sort();
  console.log(names);

  // Combine and filter purchase and sales data
  const filterDataByDate = (data, startDate, endDate, nameFilter) => {
    return data.filter(item => {
      const itemDate = new Date(item.purchase_date || item.sale_date);
      const withinDateRange =
        (!startDate || itemDate >= new Date(startDate)) &&
        (!endDate || itemDate <= new Date(endDate));

      return (
        (!nameFilter || item.supplier === nameFilter || item.selected_customer === nameFilter) &&
        withinDateRange
      );
    });
  };

  const combinedData = [...purchases, ...sales];
  const filteredData = filterDataByDate(combinedData, startDateFilter, endDateFilter, nameFilter);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentRows = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilter = () => {
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleReset = () => {
    setNameFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
    setCurrentPage(1);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Payment Invoice</title>
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

  const generateInvoice = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let yPosition = 750;
    const lineHeight = 20;

    page.drawText("Repwoop Company", { x: 50, y: yPosition, size: 18, font: helveticaFont });
    page.drawText("Address: Holding 53 (1st floor), Sahajatpur, Gulshan, Dhaka 1219", { x: 50, y: yPosition -= lineHeight, size: 12, font: helveticaFont });
    page.drawText("Phone: 01779724380", { x: 50, y: yPosition -= lineHeight, size: 12, font: helveticaFont });
    page.drawText("Email: info@repwoop.com", { x: 50, y: yPosition -= lineHeight, size: 12, font: helveticaFont });

    yPosition -= 30;
    page.drawText("Payment Invoice", { x: 250, y: yPosition, size: 16, font: helveticaFont });

    yPosition -= 40;
    page.drawText(`Invoice No: ${data.invoice_no || '---'}`, { x: 50, y: yPosition, size: 12, font: helveticaFont });
    page.drawText(`Date: ${data.purchase_date || data.sale_date || '---'}`, { x: 400, y: yPosition, size: 12, font: helveticaFont });

    yPosition -= lineHeight;
    page.drawText(`Name: ${data.supplier || data.selected_customer || '---'}`, { x: 50, y: yPosition, size: 12, font: helveticaFont });
    page.drawText(`Amount Paid: ${data.amount_paid || '0.00'} TK`, { x: 50, y: yPosition -= lineHeight, size: 12, font: helveticaFont });
    page.drawText(`Payment Note: ${data.payment_note || 'N/A'}`, { x: 50, y: yPosition -= lineHeight, size: 12, font: helveticaFont });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const newTab = window.open(blobUrl);
    newTab.onload = () => {
      newTab.focus();
      newTab.print();
    };
  };

  return (
    <div className="container mx-auto mt-10 lg:mt-5 px-4 sm:px-6 lg:px-8 text-sm lg:h-screen mb-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black text-lg mb-5 mt-5 dark:text-white">Payment Management</h2>
        <button 
          onClick={handlePrint} 
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Print
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-4 text-sm">
        <select 
          value={nameFilter} 
          onChange={(e) => setNameFilter(e.target.value)} 
          className="border rounded px-4 py-2 mb-2 sm:mb-0 sm:mr-2 flex-1"
        >
          <option value="">Select Customer/Supplier</option>
          {names.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <input 
          type="date" 
          value={startDateFilter} 
          onChange={(e) => setStartDateFilter(e.target.value)} 
          className="border bg-white rounded px-4 py-2 mb-2 sm:mb-0 sm:mr-2 flex-1"
        />
        <input 
          type="date" 
          value={endDateFilter} 
          onChange={(e) => setEndDateFilter(e.target.value)} 
          className="border bg-white rounded px-4 py-2 mb-2 sm:mb-0 sm:mr-2 flex-1"
        />
        <button 
          onClick={handleFilter} 
          className="bg-blue-500 text-white rounded px-4 py-2 mb-2 sm:mb-0 sm:mr-2"
        >
          Filter
        </button>
        <button 
          onClick={handleReset} 
          className="bg-gray-300 text-black rounded px-4 py-2 mb-2 sm:mb-0"
        >
          Reset
        </button>
      </div>

      <table id="table-to-print" className="min-w-full border border-gray-300 text-center dark:bg-[#1d1d3b]">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border border-gray-300 px-4 py-2">SL</th>
            <th className="border border-gray-300 px-4 py-2">Customer/Supplier</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Amount Paid</th>
            <th className="border border-gray-300 px-4 py-2">Invoice</th>
            <th className="border border-gray-300 px-4 py-2">Note</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr key={item.id} className="dark:text-white">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.supplier ? `Supplier Name: ${item.supplier}` : `Customer Name: ${item.selected_customer}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.purchase_date || item.sale_date}</td>
                <td className="border border-gray-300 px-4 py-2">{item.amount_paid} TK</td>
                <td className="border border-gray-300 px-4 py-2">{item.invoice_no}</td>
                <td className="border border-gray-300 px-4 py-2">{item.payment_note || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    onClick={() => generateInvoice(item)} 
                    className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                  >
                    Invoice
                  </button>
                  <button 
                    className="bg-red-500 text-white rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border border-gray-300 px-4 py-2 text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentPage(index + 1)} 
              className={`border rounded px-2 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
