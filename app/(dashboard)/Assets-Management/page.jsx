"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Assets() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const initialAssets = [
        { id: 1, name: 'test', purchasePrice: 12.0, forcedSalePrice: 22.0, quantity: 12, note: 'No Note' },
        // Add more asset data as needed
      ];
    
      const [assets, setAssets] = useState(initialAssets);
      const [assetNameFilter, setAssetNameFilter] = useState('');
    
      // Filter the assets based on the name
      const handleFilter = () => {
        const filteredAssets = initialAssets.filter((asset) =>
          asset.name.toLowerCase().includes(assetNameFilter.toLowerCase())
        );
        setAssets(filteredAssets);
      };
    
      // Reset the filter
      const handleReset = () => {
        setAssetNameFilter('');
        setAssets(initialAssets);
      };
    
      // Print functionality
      const handlePrint = () => {
        const printContent = document.getElementById("table-to-print").outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
          <html>
            <head>
              <title>Assets Information</title>
              <style>
                body { font-family: Arial, sans-serif; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              </style>
            </head>
            <body onload="window.print()">
              ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, '')} <!-- Remove the Actions column -->
            </body>
          </html>
        `);
        newWindow.document.close();
      };
    
      // Calculate total purchase and forced sale price
      const totalPurchasePrice = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);
      const totalForcedSalePrice = assets.reduce((sum, asset) => sum + asset.forcedSalePrice, 0);
    
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white md:h-screen'>

    <div className="p-0  mt-[25%] sm:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm rounded-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Assets </h1>
    <div className=' sm:md:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Assets-Management" className= {`${
                          pathname === '/Assets-Management' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Assets
        <span className={spanClass}></span>
        </Link>
        <Link href="/Assets-Management/Create" className={`${
                          pathname === '/Assets-Management/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + Add Assets
        <span className={spanClass}></span>
        </Link>
        
    </div>
  </div>
  <div className="container mx-auto mt-2 md:mt-10">

      {/* Filter Section */}
      <div className="mb-4 md:flex md:space-x-4">
        <input
          type="text"
          placeholder="Name"
          value={assetNameFilter}
          onChange={(e) => setAssetNameFilter(e.target.value)}
          className="border p-2 w-full md:w-1/4 bg-white"
        />
        <button onClick={handleFilter} className="bg-green-500 text-white px-8 py-2">
          Filter
        </button>
        <button onClick={handleReset} className="bg-blue-500 text-white px-8 py-2">
          Reset
        </button>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto">
        <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Asset Name</th>
              <th className="border px-4 py-2">Purchase Price</th>
              <th className="border px-4 py-2">Forced Sale Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Note</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets?.map((asset, index) => (
              <tr key={asset.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{asset.name}</td>
                <td className="border px-4 py-2">{asset.purchasePrice.toFixed(2)} TK</td>
                <td className="border px-4 py-2">{asset.forcedSalePrice.toFixed(2)} TK</td>
                <td className="border px-4 py-2">{asset.quantity}</td>
                <td className="border px-4 py-2">{asset.note}</td>
                <td className="border px-4 py-2">
                  <div className="inline-flex space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr className="">
              <td className="border px-4 py-2 text-right" colSpan="2">
                Total
              </td>
              <td className="border px-4 py-2">{totalPurchasePrice.toFixed(2)} TK</td>
              <td className="border px-4 py-2">{totalForcedSalePrice.toFixed(2)} TK</td>
              <td className="border px-4 py-2" colSpan="3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <button onClick={handlePrint} className="bg-emerald-500 text-white px-8 py-2 rounded hover:bg-teal-700">
          Print
        </button>
      </div>
    </div>
</div>
</div>
  )
}
