'use client'
import React, { useState } from 'react';

export default function AddProduct() {
    const products = [
        { id: 1, name: 'Motherboard Esinic 61', units: { quantity: 2 } },
        { id: 2, name: 'TP Link Router_R100M', units: { quantity: 15, dozen: 5 } },
        { id: 3, name: 'Dell Monitor E2421HN', units: { quantity: 5, kg: 1 } },
        { id: 4, name: 'HP Laptop G6', units: { quantity: 7, gm: 500 } },
        { id: 5, name: 'Logitech Mouse M185', units: { quantity: 20, dozen: 3 } },
        { id: 6, name: 'Samsung SSD 1TB', units: { quantity: 25, kg: 1, gm: 500, dozen: 5 } },
        { id: 7, name: 'Acer Monitor 24"', units: { quantity: 8 } },
        { id: 8, name: 'Sony Headphones WH1000XM4', units: { quantity: 12 } },
        { id: 9, name: 'Corsair Power Supply 750W', units: { quantity: 4, kg: 1 } },
        { id: 10, name: 'Kingston RAM 16GB', units: { quantity: 6, gm: 500, dozen: 2 } },
      ];
      const [selectedProduct, setSelectedProduct] = useState(null);
      const [date, setDate] = useState('');
      const [note, setNote] = useState('');
      const [unitValues, setUnitValues] = useState({ quantity: '', kg: '', gm: '', dozen: '' });
    
      // Handle product selection
      const handleProductChange = (e) => {
        const productId = parseInt(e.target.value, 10);
        const product = products.find((p) => p.id === productId);
        setSelectedProduct(product);
    
        // Reset unit values
        setUnitValues({ quantity: '', kg: '', gm: '', dozen: '' });
      };
    
      // Handle unit input change
      const handleUnitInputChange = (unitType, value) => {
        setUnitValues((prevValues) => ({
          ...prevValues,
          [unitType]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        // Collect the unit data based on the available units for the selected product
        const selectedUnitData = {};
        Object.keys(selectedProduct.units).forEach((unitType) => {
          if (unitValues[unitType]) {
            selectedUnitData[unitType] = unitValues[unitType];
          }
        });
    
        // Handle form submission logic
        console.log({
          product: selectedProduct ? selectedProduct.name : '',
          date,
          note,
          units: selectedUnitData,
        });
      };
  return (
    <div className='h-screen font-nunito text-sm'>
         <div className="container mx-auto p-4 md:mt-[5%] mt-[20%] overflow-y-auto">
      <h1 className="text-lg dark:text-white  mb-4">Add Damage</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2" htmlFor="product">
            Product
          </label>
          <select
            id="product"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedProduct ? selectedProduct.id : ''}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Show input fields dynamically based on the selected product's available units */}
        {selectedProduct && Object.keys(selectedProduct.units)?.map((unitType) => (
          <div key={unitType} className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2" htmlFor={unitType}>
              {unitType.charAt(0).toUpperCase() + unitType.slice(1)} Available: {selectedProduct.units[unitType]}
            </label>
            <input
              id={unitType}
              type="number"
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={unitValues[unitType]}
              onChange={(e) => handleUnitInputChange(unitType, e.target.value)}
              placeholder={`Enter ${unitType}`}
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2" htmlFor="note">
            Note
          </label>
          <textarea
            id="note"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Damage
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}
