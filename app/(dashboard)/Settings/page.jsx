"use client"
import Image from 'next/image';
import React, { useState } from 'react';

export default function Settings () {
    const [companyName, setCompanyName] = useState('Repwoop company');
    const [phone, setPhone] = useState('017150000000');
    const [email, setEmail] = useState('repwoop@info.com');
    const [address, setAddress] = useState('Sahajatpur, Gulshan, Dhaka');
    const [invoiceLogoType, setInvoiceLogoType] = useState('Logo');
    const [invoiceDesign, setInvoiceDesign] = useState('Pos Printer');
    const [barcodeType, setBarcodeType] = useState('Single');
    const [lowStockQuantity, setLowStockQuantity] = useState(2);
    const [currency, setCurrency] = useState('TK');
    const [darkMode, setDarkMode] = useState(false);
    const [logo, setLogo] = useState('../../../assets/logo.png'); // Default logo image
    // Handle logo upload
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setLogo(logoURL);
    }
  };

  const handleSaveChanges = () => {
    // Handle saving changes
    alert('Changes saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 t-[25%] sm:mt-[5%]">
    <h2 className=" dark:text-white text-lg mb-6">Settings</h2>
    
    {/* Company Details */}
    <div className="bg-gray-100 p-4  shadow-md mb-6">
      <h3 className="text-lg  mb-4">Company Details</h3>
      <div className="md:flex flex-wrap gap-4">
      <div className="flex-1">
            <label className="block text-sm mb-1">Company Logo</label>
            <div className="md:flex items-center space-x-4">
              {/* Logo Preview */}
              <Image src={logo} alt="Company Logo" width={100} height={200} className="h-16 w-16 object-cover border" />
              {/* Logo Upload Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="p-2 border bg-white"
              />
            </div>
          </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
      </div>
    </div>

    {/* Invoice Settings */}
    <div className="bg-gray-100 p-4  shadow-md mb-6">
      <h3 className="text-lg  mb-4">Invoice Settings</h3>
      <div className="md:flex md:flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Invoice Logo Type</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="invoiceLogoType"
                value="Logo"
                checked={invoiceLogoType === 'Logo'}
                onChange={(e) => setInvoiceLogoType(e.target.value)}
                className="mr-2 bg-white"
              />
              Logo
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="invoiceLogoType"
                value="Name"
                checked={invoiceLogoType === 'Name'}
                onChange={(e) => setInvoiceLogoType(e.target.value)}
                className="mr-2 bg-white"
              />
              Name
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="invoiceLogoType"
                value="Both"
                checked={invoiceLogoType === 'Both'}
                onChange={(e) => setInvoiceLogoType(e.target.value)}
                className="mr-2 bg-white"
              />
              Both
            </label>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Invoice Design</label>
          <select
            value={invoiceDesign}
            onChange={(e) => setInvoiceDesign(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Pos Printer">Pos Printer</option>
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
          </select>
        </div>
      </div>
    </div>

    {/* Barcode Settings */}
    <div className="bg-gray-100 p-4  shadow-md mb-6">
      <h3 className="text-lg  mb-4">Barcode Settings</h3>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="barcodeType"
            value="Single"
            checked={barcodeType === 'Single'}
            onChange={(e) => setBarcodeType(e.target.value)}
            className="mr-2 bg-white"
          />
          Single
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="barcodeType"
            value="A4"
            checked={barcodeType === 'A4'}
            onChange={(e) => setBarcodeType(e.target.value)}
            className="mr-2 bg-white"
          />
          A4
        </label>
      </div>
    </div>

    {/* Other Settings */}
    <div className="bg-gray-100 p-4  shadow-md mb-6">
      <h3 className="text-lg  mb-4">Other Settings</h3>
      <div className="md:flex md:flex-wrap gap-4">
        
        <div className="flex-1">
          <label className="block text-sm mb-1">Low Stock Quantity</label>
          <input
            type="number"
            value={lowStockQuantity}
            onChange={(e) => setLowStockQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Currency</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>
      </div>
    </div>

    {/* Save Changes Button */}
    <div className="flex justify-center md:justify-end">
      <button
        onClick={handleSaveChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  </div>
  )
}
