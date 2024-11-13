"use client"
import Link from 'next/link'
import React, { useState } from 'react';

export default function CreatePruchase() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const [suppliers, setSuppliers] = useState(['Supplier A', 'Supplier B']);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  
    const handleAddProduct = () => {
      if (newProduct && selectedSupplier) {
        setProducts([
          ...products,
          {
            id: products.length + 1,
            name: newProduct,
            rate: 0,
            qty: 1,
            subtotal: 0,
          },
        ]);
        setNewProduct('');
      } else {
        alert('Please select a supplier and enter a product name.');
      }
    };
  
    const handleProductChange = (index, field, value) => {
      const updatedProducts = products?.map((product, i) =>
        i === index
          ? { ...product, [field]: value, subtotal: field === 'qty' || field === 'rate' ? value * product.qty : product.subtotal }
          : product
      );
      setProducts(updatedProducts);
    };
  
    const grandTotal = products.reduce((acc, product) => acc + product.subtotal, 0);
  
  return (

      <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>
        <div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
      {/* Title Section */}
          <div className=" mb-4  shadow-sm  ">
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
          <div className="p-4 w-full mx-auto">
      <h2 className="text-lg mb-4">Create Purchase</h2>

      {/* Supplier and Date Selection */}
      <div className="md:flex gap-4 mb-6">
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 text-gray-700">Supplier</label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Supplier</option>
            {suppliers?.map((supplier, index) => (
              <option key={index} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 text-gray-700">Purchase Date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Product Input */}
      <div className="flex w-full items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Write product"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleAddProduct} className="bg-teal-500 w-full md:w-1/4 text-white px-8 py-2 rounded ">Add Product</button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-center border">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-2 px-4 border">#SL</th>
              <th className="py-2 px-4 border">Product</th>
              <th className="py-2 px-4 border">Rate</th>
              <th className="py-2 px-4 border">Qty</th>
              <th className="py-2 px-4 border">Sub Total</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    value={product.rate}
                    onChange={(e) => handleProductChange(index, 'rate', parseFloat(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    value={product.qty}
                    onChange={(e) => handleProductChange(index, 'qty', parseFloat(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border">Tk {product.subtotal.toFixed(2)}</td>
                <td className="py-2 px-4 border">
                  <button onClick={() => setProducts(products.filter((_, i) => i !== index))} className="text-red-500">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grand Total */}
      <div className="flex justify-end mt-4">
        <p className="text-lg font-semibold">Grand Total: Tk {grandTotal.toFixed(2)}</p>
      </div>

      {/* Payment Button */}
      <button className="bg-teal-500 text-white px-4 py-2 rounded mt-4">Payment</button>
    </div>


        </div>
      </div>
  )
}
