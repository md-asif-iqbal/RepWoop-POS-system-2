'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSale() {

const [customer, setCustomer] = useState('Walk-In Customer');
  const [saleDate, setSaleDate] = useState(new Date());
  const [payTerm, setPayTerm] = useState('');
  const [status, setStatus] = useState('');
  const [invoiceScheme, setInvoiceScheme] = useState('Default');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [orderTax, setOrderTax] = useState(0);
  const [sellNote, setSellNote] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [changeReturn, setChangeReturn] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
  const [discountedTotal, setDiscountedTotal] = useState(total);

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [shippingNote, setShippingNote] = useState('');

//   const [availableProducts] = useState([
//     { id: 1, product_name: 'Fresh Soybean Oil 500 ml', opening_stock: 24.00, unit: 'Pieces', price: 86.00, purchase_cost: 60.00 },
//     { id: 2, product_name: 'Olive Oil 1L', opening_stock: 15.00, unit: 'Pieces', price: 120.00, purchase_cost: 90.00 },
//   ]);
  const [availableProducts, setAvailableProducts] = useState([]);


  const addProduct = (product) => {
    const newProduct = {
      ...product,
      quantity: 1,
      subtotal: product.sale_price,
      purchase_cost: product.purchase_cost,
      details: ''
    };
    setProducts((prev) => [...prev, newProduct]);
    calculateTotal([...products, newProduct]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    const quantity = parseFloat(updatedProducts[index].quantity) || 1;
    const unitPrice = parseFloat(updatedProducts[index].sale_price) || 0;
    updatedProducts[index].subtotal = quantity * unitPrice;

    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (productsList) => {
    const totalAmount = productsList.reduce((sum, product) => sum + product.subtotal, 0);
    setTotal(totalAmount);
  };

  const calculateDiscountedTotal = () => {
    let discountValue = 0;

    if (discountType === 'Percentage') {
      discountValue = (discountAmount / 100) * total;
    } else {
      discountValue = discountAmount;
    }

    const discounted = total - discountValue + parseFloat(orderTax || 0);
    const finalTotal = discounted + parseFloat(shippingCharges || 0);
    setDiscountedTotal(finalTotal);
    setChangeReturn(amountPaid - finalTotal);
    updatePaymentStatus(amountPaid, finalTotal);
  };

  useEffect(() => {
    calculateDiscountedTotal();
  }, [total, discountAmount, discountType, shippingCharges, orderTax]);

  const updatePaymentStatus = (paidAmount, totalAmount) => {
    if (paidAmount >= totalAmount) {
      setPaymentStatus('paid');
    } else if (paidAmount > 0 && paidAmount < totalAmount) {
      setPaymentStatus('partial');
    } else {
      setPaymentStatus('unpaid');
    }
  };

  const handleAmountPaidChange = (e) => {
    const paidAmount = parseFloat(e.target.value) || 0;
    setAmountPaid(paidAmount);
    setChangeReturn(paidAmount - discountedTotal);
    updatePaymentStatus(paidAmount, discountedTotal);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = availableProducts.filter(product =>
    searchQuery && product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/Products/Create/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setAvailableProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } 
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

     const formData = {
      customer,
      saleDate,
      payTerm,
      status,
      invoiceScheme,
      invoiceNo,
      products,
      total,
      discountType,
      discountAmount,
      shippingCharges,
      orderTax,
      sellNote,
      amountPaid,
      changeReturn,
      paymentDate,
      paymentMethod,
      paymentAccount,
      paymentNote,
      shippingNote
    };
    console.log(formData);

    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Sale saved successfully!");
        // Optionally reset the form or redirect
      } else {
        toast.error("Failed to save sale. Please try again.");
      }
    } catch (error) {
      console.error("Error saving sale:", error);
      toast.error("An error occurred while saving the sale.");
    }
  };


  const getTotalClassproduct_name = () => {
    if (paymentStatus === 'paid') return 'text-green-600';
    if (paymentStatus === 'partial') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div classproduct_name="container mx-auto p-4 space-y-6 text-sm mt-[5%]">
      <h2 classproduct_name="text-xl  mb-4">Add Sale</h2>
      
      <form onSubmit={handleSubmit} classproduct_name="space-y-6"  >
        {/* Customer and Service Details */}
        <div classproduct_name='bg-white shadow-md md:p-6'>
          <h3 classproduct_name=" mb-2">Customer and Service Details</h3>
          <label classproduct_name="block ">Select types of service</label>
          <select classproduct_name="w-full md:w-1/2 p-2 border rounded">
            <option>Please Select</option>
          </select>

          <div classproduct_name="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label classproduct_name="block font-semibold">Customer:*</label>
              <select classproduct_name="w-full  p-2 border rounded" value={customer} onChange={(e) => setCustomer(e.target.value)}>
                <option>Walk-In Customer</option>
                <option>Customer 1</option>
                <option>Customer 2</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block font-semibold">Billing Address:</label>
              <input type="text" value="Walk-In Customer" disabled classproduct_name="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label classproduct_name="block font-semibold">Shipping Address:</label>
              <input type="text" value="Walk-In Customer" disabled classproduct_name="w-full p-2 border rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Payment and Invoice Details */}
        <div  classproduct_name='bg-white shadow-md md:p-6'>
          <h3 classproduct_name=" mb-2">Payment and Invoice Details</h3>
          <div classproduct_name="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label classproduct_name="block ">Pay Term:</label>
              <select classproduct_name="w-full p-2 border rounded">
                <option>Please Select</option>
                <option value="days">Days</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block ">Sale Date:*</label>
              <DatePicker
                selected={saleDate}
                onChange={(date) => setSaleDate(date)}
                showTimeSelect
                dateFormat="Pp"
                classproduct_name="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label classproduct_name="block font-semibold">Status:*</label>
              <select classproduct_name="w-full p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>This field is required</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block ">Status:*</label>
              <select classproduct_name="w-full p-2 border rounded">
                <option>This field is required</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block ">Invoice Scheme:</label>
              <input type="text" classproduct_name="w-full p-2 border rounded" value={invoiceScheme} onChange={(e) => setInvoiceScheme(e.target.value)} />
            </div>
            <div>
              <label classproduct_name="block ">Invoice No.:</label>
              <input type="text" classproduct_name="w-full p-2 border rounded" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="Keep blank to auto generate" />
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div  classproduct_name='bg-white shadow-md md:p-6'>
          <h3 classproduct_name=" mb-2">Product Selection</h3>
          <label classproduct_name="block ">Enter Product product_name / SKU / Scan bar code</label>
          <input type="text" value={searchQuery} onChange={handleSearch} classproduct_name="w-full p-2 border rounded mb-2" />

          {filteredProducts.length > 0 && (
            <div classproduct_name="border rounded shadow overflow-auto max-h-64">
              {filteredProducts.map((product) => (
                <div key={product.id} classproduct_name="p-2 border-b hover:bg-gray-100 cursor-pointer" onClick={() => addProduct(product)}>
                  {product.product_name}
                </div>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <table classproduct_name="w-full border-collapse mt-4 text-center">
              <thead>
                <tr classproduct_name="bg-gray-100">
                  <th classproduct_name="p-2">Product</th>
                  <th classproduct_name="p-2">Quantity</th>
                  <th classproduct_name="p-2">Unit Price</th>
                  <th classproduct_name="p-2">Purchase Price</th>
                  <th classproduct_name="p-2">Details</th>
                  <th classproduct_name="p-2">Subtotal</th>
                  <th classproduct_name="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} classproduct_name="text-center">
                    <td classproduct_name="p-2">{product.product_name}</td>
                    <td classproduct_name="p-2">
                      <input type="number" min="1" value={product.quantity} onChange={(e) => handleProductChange(index, 'quantity', e.target.value)} classproduct_name="w-full md:w-1/2 text-center border rounded" />
                    </td>
                    <td classproduct_name="p-2">৳ {product.price}</td>
                    <td classproduct_name="p-2">৳ {product.purchase_cost}</td>
                    <td classproduct_name="p-2">
                      <textarea type="textarea textarea-primary p-2" value={product.details} onChange={(e) => handleProductChange(index, 'details', e.target.value)} placeholder="Add IMEI, Serial number..." classproduct_name="w-full border rounded" />
                    </td>
                    <td classproduct_name="p-2">৳ {product.subtotal}</td>
                    <td classproduct_name="p-2">
                      <button onClick={() => removeProduct(index)} classproduct_name="text-red-500">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Discount, Tax */}
        <div  classproduct_name='bg-white shadow-md md:p-6'>
          <h3 classproduct_name=" mb-2">Discount and Tax</h3>
          <div classproduct_name="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label classproduct_name="block ">Discount Type:</label>
              <select classproduct_name="w-full p-2 border rounded" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block ">Discount Amount:*</label>
              <input type="number" classproduct_name="w-full p-2 border rounded" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} />
            </div>
            <div>
              <label classproduct_name="block ">Order Tax:*</label>
              <input type="number" classproduct_name="w-full p-2 border rounded" value={orderTax} onChange={(e) => setOrderTax(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Shipping Section */}
        <div classproduct_name='bg-white shadow-md md:p-6'>
          <h3 classproduct_name=" mb-2">Shipping Details</h3>
          <div classproduct_name="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label classproduct_name="block ">Shipping Address:</label>
              <input type="text" classproduct_name="w-full p-2 border rounded" placeholder="Shipping Address" />
            </div>
            <div>
              <label classproduct_name="block ">Shipping Charges:</label>
              <input type="number" classproduct_name="w-full p-2 border rounded" value={shippingCharges} onChange={(e) => setShippingCharges(e.target.value)} />
            </div>
            <div>
              <label classproduct_name="block ">Shipping Note:</label>
              <textarea classproduct_name="w-full p-2 border rounded" value={shippingNote} onChange={(e) => setShippingNote(e.target.value)} placeholder="Add shipping note here..." />
            </div>
            
          </div>
        </div>

        {/* Add Payment Section */}
        <div  classproduct_name='bg-white shadow-md md:p-6'>
          <h3 classproduct_name=" mb-2">Add Payment</h3>
          <div classproduct_name="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label classproduct_name="block ">Amount Paid:*</label>
              <input type="number" classproduct_name="w-full p-2 border rounded" value={amountPaid} onChange={handleAmountPaidChange} />
            </div>
            <div>
              <label classproduct_name="block ">Change Return:</label>
              <input type="text" classproduct_name="w-full p-2 border rounded bg-gray-100" value={`৳ ${changeReturn.toFixed(2)}`} disabled />
            </div>
          </div>
          <div classproduct_name="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label classproduct_name="block ">Paid on:*</label>
              <DatePicker
                selected={paymentDate}
                onChange={(date) => setPaymentDate(date)}
                showTimeSelect
                dateFormat="Pp"
                classproduct_name="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label classproduct_name="block ">Payment Method:*</label>
              <select classproduct_name="w-full p-2 border rounded" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank Transfer</option>
                <option value="Card">Card Payment</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block ">Payment Account:</label>
              <select classproduct_name="w-full p-2 border rounded" value={paymentAccount} onChange={(e) => setPaymentAccount(e.target.value)}>
                <option>Select Account</option>
                <option value="Account1">Account 1</option>
                <option value="Account2">Account 2</option>
              </select>
            </div>
            <div>
              <label classproduct_name="block ">Payment Note:</label>
              <textarea classproduct_name="w-full p-2 border rounded" value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} placeholder="Add payment notes here..." />
            </div>
          </div>
        </div>

        {/* Total Bill */}
        <div classproduct_name="mt-6">
          <h3 classproduct_name={` text-lg ${getTotalClassproduct_name()}`}>Total Payable: ৳ {discountedTotal.toFixed(2)}</h3>
          <div classproduct_name="flex gap-4 mt-4">
            <button type="submit" classproduct_name="bg-green-500 text-white p-2 rounded">Save</button>
            <button type="button" classproduct_name="bg-blue-500 text-white p-2 rounded">Save & Print</button>
            
          </div>
        </div>
      </form>
    </div>
  );
}
