"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CreateAssets() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [forcedSalePrice, setForcedSalePrice] = useState('');
    const [note, setNote] = useState('');
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const newAsset = {
        id: Date.now(),
        name,
        quantity: parseInt(quantity),
        purchasePrice: parseFloat(purchasePrice),
        forcedSalePrice: parseFloat(forcedSalePrice),
        note,
      };
    //   onAddAsset(newAsset);
    console.log(newAsset);
  
      // Clear form fields
      setName('');
      setQuantity('');
      setPurchasePrice('');
      setForcedSalePrice('');
      setNote('');
    };
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white md:h-screen'>

    <div className="p-0  mt-[25%] sm:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm rounded-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Add Assets </h1>
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

  <div className="container mx-auto px-4 py-8">
      <h2 className=" dark:text-white text-lg  mb-4">Add Assets</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Name */}
        <div>
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter Asset Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm mb-2">Quantity</label>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Purchase Price */}
        <div>
          <label className="block text-sm mb-2">Purchase Price</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter Purchase Price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Forced Sale Price */}
        <div>
          <label className="block text-sm mb-2">Forced Sale Price</label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter Forced Sale Price"
            value={forcedSalePrice}
            onChange={(e) => setForcedSalePrice(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Note */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2">Note</label>
          <textarea
            placeholder="Enter any additional notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        {/* Add Asset Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Add Asset
          </button>
        </div>
      </form>
    </div>
</div>
</div>
  )
}
