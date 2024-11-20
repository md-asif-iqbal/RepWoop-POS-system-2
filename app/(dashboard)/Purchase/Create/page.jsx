'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPurchase() {
  const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date()); // Purchase Date
  const [payTerm, setPayTerm] = useState('');
  const [status, setStatus] = useState('');
  const [invoiceScheme, setInvoiceScheme] = useState('Default');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [orderTax, setOrderTax] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [changeReturn, setChangeReturn] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
  const [discountedTotal, setDiscountedTotal] = useState(total);

  const [accounts, setAccounts] = useState([]);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentAccount, setPaymentAccount] = useState({ account_id: '', name: '' });
  const [paymentNote, setPaymentNote] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);

  const parseToNumber = (value) => (isNaN(parseFloat(value)) ? 0 : parseFloat(value));

  useEffect(() => {
    // Generate a random invoice number on load
    setInvoiceNo(`INV-${Math.floor(Math.random() * 1000000)}`);
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      purchase_cost: parseToNumber(product.purchase_cost),
      quantity: 1,
      subtotal: parseToNumber(product.purchase_cost),
    };
    setProducts((prev) => [...prev, newProduct]);
    calculateTotal([...products, newProduct]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = field === 'quantity' ? parseToNumber(value) : value;

    const quantity = parseToNumber(updatedProducts[index].quantity) || 1;
    const unitPrice = parseToNumber(updatedProducts[index].purchase_cost) || 0;
    updatedProducts[index].subtotal = quantity * unitPrice;

    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (productsList) => {
    const totalAmount = productsList.reduce((sum, product) => sum + product.subtotal, 0);
    setTotal(totalAmount);
  };

  const calculateDiscountedTotal = () => {
    const discountValue =
      discountType === 'Percentage'
        ? (parseToNumber(discountAmount) / 100) * parseToNumber(total)
        : parseToNumber(discountAmount);

    const tax = parseToNumber(orderTax);
    const finalTotal = parseToNumber(total) - discountValue + tax;

    setDiscountedTotal(finalTotal);
    setChangeReturn(parseToNumber(amountPaid) - finalTotal);
    updatePaymentStatus(amountPaid, finalTotal);
  };

  useEffect(() => {
    calculateDiscountedTotal();
  }, [total, discountAmount, discountType, orderTax]);

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
    const paidAmount = parseToNumber(e.target.value);
    setAmountPaid(paidAmount);
    setChangeReturn(paidAmount - discountedTotal);
    updatePaymentStatus(paidAmount, discountedTotal);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = availableProducts.filter((product) =>
    product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
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
        toast.error(error.message);
      }
    };

    fetchProducts();
  }, []);

 // Fetch suppliers from the backend
 useEffect(() => {
  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/Suppliers/suppliers');
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const { suppliers } = await response.json();
      console.log(suppliers);
      setSuppliers(suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast.error('Error fetching suppliers');
    }
  };

  fetchSuppliers();
}, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/Bank_Accounts/accounts');
        if (!response.ok) throw new Error('Failed to fetch accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      supplier:selectedSupplier,
      purchaseDate, // Include purchase date in the form data
      payTerm,
      status,
      invoiceScheme,
      invoiceNo,
      products: products.map(({ image, ...rest }) => rest),
      total,
      discountType,
      discountAmount,
      orderTax,
      amountPaid,
      changeReturn,
      paymentDate,
      paymentMethod,
      paymentAccount: paymentAccount.account_id ? paymentAccount : null,
      paymentNote,
      totalPayable: discountedTotal,
    };

    try {
      const response = await fetch('/Purchase/Create/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Purchase saved successfully!');
      } else {
        toast.error('Failed to save purchase. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while saving the purchase.');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 text-sm mt-[5%]">
      <h2 className="text-xl mb-4">Add Purchase</h2>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Supplier Details */}
        <div className="bg-white shadow-md md:p-6">
          <h3 className="mb-2">Supplier Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold">Supplier:*</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                <option value="">Select Supplier</option>
                {suppliers?.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block">Invoice No.:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="Keep blank to auto generate"
              />
            </div>
            <div>
              <label className="block font-semibold">Status:*</label>
              <select
                className="w-full p-2 border rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block">Purchase Date & Time:</label>
            <DatePicker
              selected={purchaseDate}
              onChange={(date) => setPurchaseDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Product Selection */}
        <div className="bg-white shadow-md md:p-6">
          <h3 className="mb-2">Product Selection</h3>
          <label className="block">Enter Product Name / SKU</label>
          <input
            type="text"
            placeholder="Search Product"
            className="w-full p-2 border rounded mb-2"
            value={searchQuery}
            onChange={handleSearch}
          />
          
          {/* Show filtered products when searching */}
          {searchQuery && filteredProducts.length > 0 && (
            <div className="border rounded shadow overflow-auto max-h-64">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => addProduct(product)} // Add product to the list
                >
                  {product.product_name}
                </div>
              ))}
            </div>
          )}

          {/* Show the product table only when products are added */}
          {products.length > 0 && (
            <table className="w-full border-collapse text-center mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Purchase Price</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product_name}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                        className="border rounded p-1 text-center"
                      />
                    </td>
                    <td>{product.purchase_cost.toFixed(2)}</td>
                    <td>{product.subtotal.toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeProduct(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Discount and Tax */}
        <div className="bg-white shadow-md md:p-6">
          <h3 className="mb-2">Discount and Tax</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block">Discount Type:</label>
              <select
                className="w-full p-2 border rounded"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block">Discount Amount:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block">Order Tax:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={orderTax}
                onChange={(e) => setOrderTax(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Add Payment Section */}
        <div className="bg-white shadow-md md:p-6">
          <h3 className="mb-2">Add Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">Amount Paid:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={amountPaid}
                onChange={handleAmountPaidChange}
              />
            </div>
            <div>
              <label className="block">Change Return:</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-100"
                value={`৳ ${changeReturn.toFixed(2)}`}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block">Paid on:</label>
              <DatePicker
                selected={paymentDate}
                onChange={(date) => setPaymentDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block">Payment Method:</label>
              <select
                className="w-full p-2 border rounded"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Bank">Bank Transfer</option>
                <option value="Card">Card Payment</option>
              </select>
            </div>
            <div>
              <label className="block">Payment Account:</label>
              <select
                className="w-full p-2 border rounded"
                value={paymentAccount.account_id}
                onChange={(e) => {
                  const selectedAccountId = e.target.value;
                  const selectedAccount = accounts.find(
                    (acc) => acc.account_id === selectedAccountId
                  );

                  if (selectedAccount) {
                    setPaymentAccount({
                      account_id: selectedAccount.account_id,
                      name: selectedAccount.name,
                    });
                  } else {
                    setPaymentAccount({ account_id: '', name: '' });
                  }
                }}
              >
                <option value="">Select the account</option>
                {accounts.map((acc) => (
                  <option key={acc.account_id} value={acc.account_id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block">Payment Note:</label>
              <textarea
                className="w-full p-2 border rounded"
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                placeholder="Add payment notes here..."
              />
            </div>
          </div>
        </div>

        {/* Total Bill */}
        <div className="mt-6">
          <h3
            className={`text-lg ${
              paymentStatus === 'paid'
                ? 'text-green-600'
                : paymentStatus === 'partial'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            Total Payable: ৳ {discountedTotal.toFixed(2)}
          </h3>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
              Save
            </button>
            <button type="button" className="bg-blue-500 text-white p-2 rounded">
              Save & Print
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
