"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from 'react-toastify';

export default function AddUnits() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const initialUnits = [
        { id: 1, name: 'pc', relatedTo: '-', relatedSign: '-', relatedBy: '-', result: 'pc = 1' },
        { id: 2, name: 'Dozen', relatedTo: 'pc', relatedSign: '*', relatedBy: '12', result: 'Dozen = 1 pc * 12' },
        { id: 3, name: 'gm', relatedTo: '-', relatedSign: '-', relatedBy: '-', result: 'gm = 1' },
        { id: 4, name: 'Kg', relatedTo: 'gm', relatedSign: '*', relatedBy: '1000', result: 'Kg = 1 gm * 1000' },
        { id: 5, name: 'ml', relatedTo: '-', relatedSign: '-', relatedBy: '-', result: 'ml = 1' },
        { id: 6, name: 'Litre', relatedTo: 'ml', relatedSign: '*', relatedBy: '1000', result: 'Litre = 1 ml * 1000' },
        { id: 7, name: 'Box', relatedTo: 'pc', relatedSign: '*', relatedBy: '12', result: 'Box = 1 pc * 12' },
        { id: 8, name: 'Screw Packet', relatedTo: 'pc', relatedSign: '*', relatedBy: '1000', result: 'Screw Packet = 1 pc * 1000' },
        { id: 9, name: 'thousand', relatedTo: 'pc', relatedSign: '*', relatedBy: '1000', result: 'thousand = 1 pc * 1000' },
        { id: 10, name: 'Shoes_pair', relatedTo: 'Dozen', relatedSign: '*', relatedBy: '12', result: 'Shoes_pair = 1 Dozen * 12' },
        { id: 11, name: 'Shoes_pair_2', relatedTo: 'Dozen', relatedSign: '*', relatedBy: '1', result: 'Shoes_pair_2 = 1 Dozen * 1' },
        { id: 12, name: 'Shoes_pair_3', relatedTo: 'Shoes_pair_2', relatedSign: '*', relatedBy: '12', result: 'Shoes_pair_3 = 1 Shoes_pair_2 * 12' },
        { id: 13, name: 'Pcs', relatedTo: 'pc', relatedSign: '*', relatedBy: '1', result: 'Pcs = 1 pc * 1' },
        { id: 14, name: 'Dz', relatedTo: 'Pcs', relatedSign: '*', relatedBy: '12', result: 'Dz = 1 Pcs * 12' },
        { id: 15, name: 'kg', relatedTo: 'pc', relatedSign: '*', relatedBy: '1', result: 'kg = 1 pc * 1' },
        { id: 16, name: 'sack', relatedTo: 'kg', relatedSign: '*', relatedBy: '50', result: 'sack = 1 kg * 50' },
        { id: 17, name: 'Tonne', relatedTo: 'kg', relatedSign: '*', relatedBy: '1000', result: 'Tonne = 1 kg * 1000' },
        { id: 18, name: 'Ounces', relatedTo: 'Pcs', relatedSign: '*', relatedBy: '1', result: 'Ounces = 1 Pcs * 1' },
        { id: 19, name: 'Pound', relatedTo: 'Ounces', relatedSign: '*', relatedBy: '16', result: 'Pound = 1 Ounces * 16' },
        { id: 20, name: 'gm_2', relatedTo: 'pc', relatedSign: '*', relatedBy: '1', result: 'gm_2 = 1 pc * 1' },
        // Add 5 more rows to make it 25 data points
        { id: 21, name: 'Box_2', relatedTo: 'pc', relatedSign: '*', relatedBy: '24', result: 'Box_2 = 1 pc * 24' },
        { id: 22, name: 'Pack', relatedTo: 'Pcs', relatedSign: '*', relatedBy: '6', result: 'Pack = 1 Pcs * 6' },
        { id: 23, name: 'Meter', relatedTo: '-', relatedSign: '-', relatedBy: '-', result: 'Meter = 1' },
        { id: 24, name: 'Square Meter', relatedTo: 'Meter', relatedSign: '*', relatedBy: '100', result: 'Square Meter = 1 Meter * 100' },
        { id: 25, name: 'Tonne_2', relatedTo: 'kg', relatedSign: '*', relatedBy: '1000', result: 'Tonne_2 = 1 kg * 1000' },
      ];
      const [unitName, setUnitName] = useState('');
      const [relatedSign, setRelatedSign] = useState('');
      const [unitValue, setUnitValue] = useState('');
      const [relatedTo, setRelatedTo] = useState('');
      const [loading, setLoading] = useState(false);
  
    // Function to handle form submission
    const handleAddUnit = async  (e) => {
      e.preventDefault();

      if (!unitName || !relatedSign || !unitValue) {
        toast.info('Please fill all fields');
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('/Units/units', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unitName, relatedSign, unitValue, relatedTo }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success(data.message);
          setUnitName('');
          setRelatedSign('');
          setUnitValue('');
          setRelatedTo('');
        } else {
          toast.error(data.message || 'Failed to add unit');
        }
      } catch (error) {
        console.error('Error adding unit:', error);
        toast.error('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
  

    };
  
  
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white md:h-screen'>

    <div className="p-0  mt-[25%] sm:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm rounded-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Add Unit </h1>
    <div className=' sm:md:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Units" className= {`${
                          pathname === '/Units' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Units
        <span className={spanClass}></span>
        </Link>
        <Link href="/Units/Create" className={`${
                          pathname === '/Units/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + Add Unit
        <span className={spanClass}></span>
        </Link>
        
    </div>
  </div>
  <div className="container mx-auto px-4 py-8">
      <h2 className=" dark:text-white text-lg font-bold mb-4">New Unit</h2>

      <form onSubmit={handleAddUnit} >
        {/* Unit Name */}
        <div>
          <label className="block text-sm mb-2">Unit Name</label>
          <input
            type="text"
            placeholder="e.g. Kg"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

       <div className="grid grid-cols-1 md:grid-cols-3 mt-2 gap-6">
         {/* Related to Unit */}
         <div>
          <label className="block text-sm mb-2">Related To Unit</label>
          <select
            value={relatedTo}
            onChange={(e) => setRelatedTo(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Unit</option>
            {initialUnits?.map((unit) => (
              <option key={unit.id} value={unit.name}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        {/* Operator */}
        <div>
          <label className="block text-sm mb-2">Operator</label>
          <select
            value={relatedSign}
            onChange={(e) => setRelatedSign(e.target.value)}
            className="w-full p-2 border rounded dark:bg-white"
            required
          >
            <option value="">Select Operator Sign</option>
            <option value="*">(*) Multiply Operator</option>
            <option value="-">(-) Minus Operator</option>
            {/* Add more operators as needed */}
          </select>
        </div>

        {/* Related By Value */}
        <div>
          <label className="block text-sm mb-2">Related By Value</label>
          <input
            type="number"
            placeholder="Enter value"
            value={unitValue}
            onChange={(e) => setUnitValue(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>
       </div>

        {/* Add Unit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
          >
            Add Unit
          </button>
        </div>
      </form>
    </div>
</div>
</div>
  )
}
