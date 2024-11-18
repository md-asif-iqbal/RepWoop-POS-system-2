'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSale() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [saleDate, setSaleDate] = useState(new Date());
  const [payTerm, setPayTerm] = useState('');
  const [status, setStatus] = useState('');
  const [invoiceScheme, setInvoiceScheme] = useState('Default');
  const [invoiceNo, setInvoiceNo] = useState('');
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

  const[account, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paymentAccount, setPaymentAccount] = useState({ account_id: '', name: '' });
  const [paymentNote, setPaymentNote] = useState('');
  const [shippingNote, setShippingNote] = useState('');
  const [availableProducts, setAvailableProducts] = useState([]);

  const parseToNumber = (value) => isNaN(parseFloat(value)) ? 0 : parseFloat(value);

  useEffect(() => {
    // Generate a random invoice number on load
    setInvoiceNo(`INV-${Math.floor(Math.random() * 1000000)}`);
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      sale_price: parseToNumber(product.sale_price),
      purchase_cost: parseToNumber(product.purchase_cost),
      quantity: 1,
      subtotal: parseToNumber(product.sale_price),
      details: ''
    };
    setProducts((prev) => [...prev, newProduct]);
    calculateTotal([...products, newProduct]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = field === 'quantity' ? parseToNumber(value) : value;

    const quantity = parseToNumber(updatedProducts[index].quantity) || 1;
    const unitPrice = parseToNumber(updatedProducts[index].sale_price) || 0;
    updatedProducts[index].subtotal = quantity * unitPrice;

    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (productsList) => {
    const totalAmount = productsList.reduce((sum, product) => sum + product.subtotal, 0);
    setTotal(totalAmount);
  };

  const calculateDiscountedTotal = () => {
    const discountValue = discountType === 'Percentage' 
      ? (parseToNumber(discountAmount) / 100) * parseToNumber(total)
      : parseToNumber(discountAmount);

    const tax = parseToNumber(orderTax);
    const shipping = parseToNumber(shippingCharges);
    const finalTotal = parseToNumber(total) - discountValue + tax + shipping;
    
    setDiscountedTotal(finalTotal);
    setChangeReturn(parseToNumber(amountPaid) - finalTotal);
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
    const paidAmount = parseToNumber(e.target.value);
    setAmountPaid(paidAmount);
    setChangeReturn(paidAmount - discountedTotal);
    updatePaymentStatus(paidAmount, discountedTotal);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = availableProducts.filter(product =>
    searchQuery && product.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
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
        toast.error(error.message);
      } 
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      
      try {
        const response = await fetch('/Users/users');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch user data');
        }

        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        toast.error(err.message);
      } finally {

      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch('/Bank_Accounts/accounts');
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        toast.error('Error fetching accounts:', error);
      }
     
    }

    fetchAccounts();
  }, []);
  const productsWithoutImages = products.map(({ image, ...rest }) => rest);

  const handleAccountChange = (e) => {
    const accountId = e.target.value;
    const accountName = e.target.options[e.target.selectedIndex].text;
    setSelectedAccountId(accountId);
    setSelectedAccountName(accountName);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = {
      selectedCustomer,
      saleDate,
      payTerm,
      status,
      invoiceScheme,
      invoiceNo,
      products: productsWithoutImages, // Ensure images are removed here
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
      paymentAccount: paymentAccount.account_id ? paymentAccount : null, // Use account_id for database compatibility
      paymentNote,
      shippingNote,
      totalPayable: discountedTotal,
    };

    try {
      const response = await fetch('/Sales/Create/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Sale saved successfully!");
      } else {
        toast.error("Failed to save sale. Please try again.");
      }
    } catch (error) {
      console.error("Error saving sale:", error);
      toast.error("An error occurred while saving the sale.");
    }
  };

  const getTotalClassName = () => {
    if (paymentStatus === 'paid') return 'text-green-600';
    if (paymentStatus === 'partial') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto p-4 space-y-6 text-sm mt-[5%]">
      <h2 className="text-xl mb-4">Add Sale</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer and Service Details */}
        <div className='bg-white shadow-md md:p-6'>
          <h3 className="mb-2">Customer and Service Details</h3>
          <label className="block">Select types of service</label>
          <select className="w-full md:w-1/2 p-2 border rounded">
            <option>Please Select</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
              <label className="block font-semibold">Customer:*</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value="Walk-In Customer">Walk-In Customer</option>
                {customers?.map((customer) => (
                  <option key={customer.id} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold">Billing Address:</label>
              <input type="text" value={selectedCustomer ||"Walk-In Customer"} disabled className="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label className="block font-semibold">Shipping Address:</label>
              <input type="text" value={selectedCustomer ||"Walk-In Customer"} disabled className="w-full p-2 border rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Payment and Invoice Details */}
        <div className='bg-white shadow-md md:p-6'>
          <h3 className="mb-2">Payment and Invoice Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block">Pay Term:</label>
              <select className="w-full p-2 border rounded">
                <option>Please Select</option>
                <option value="days">Days</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block">Sale Date:*</label>
              <DatePicker
                selected={saleDate}
                onChange={(date) => setSaleDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Status:*</label>
              <select className="w-full p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>This field is required</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block">Invoice Scheme:</label>
              <input type="text" className="w-full p-2 border rounded" value={invoiceScheme} onChange={(e) => setInvoiceScheme(e.target.value)} />
            </div>
            <div>
              <label className="block">Invoice No.:</label>
              <input type="text" className="w-full p-2 border rounded" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="Keep blank to auto generate" />
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div className='bg-white shadow-md md:p-6'>
          <h3 className="mb-2">Product Selection</h3>
          <label className="block">Enter Product name / SKU / Scan bar code</label>
          <input type="text" value={searchQuery} onChange={handleSearch} className="w-full p-2 border rounded mb-2" />

          {filteredProducts.length > 0 && (
            <div className="border rounded shadow overflow-auto max-h-64">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-2 border-b hover:bg-gray-100 cursor-pointer" onClick={() => addProduct(product)}>
                  {product.product_name}
                </div>
              ))}
            </div>
          )}

          {products.length > 0 && (
            <table className="w-full border-collapse mt-4 text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Product</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Unit Price</th>
                  <th className="p-2">Purchase Price</th>
                  <th className="p-2">Details</th>
                  <th className="p-2">Subtotal</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2">{product.product_name}</td>
                    <td className="p-2">
                      <input type="number" min="1" defaultValue={product.quantity} onChange={(e) => handleProductChange(index, 'quantity', e.target.value)} className="w-full md:w-1/2 text-center border rounded" />
                    </td>
                    <td className="p-2">৳ {product.sale_price}</td>
                    <td className="p-2">৳ {product.purchase_cost}</td>
                    <td className="p-2">
                      <textarea type="textarea" value={product.details} onChange={(e) => handleProductChange(index, 'details', e.target.value)} placeholder="Add IMEI, Serial number..." className="w-full border rounded" />
                    </td>
                    <td className="p-2">৳ {product.subtotal}</td>
                    <td className="p-2">
                      <button onClick={() => removeProduct(index)} className="text-red-500">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Discount, Tax */}
        <div className='bg-white shadow-md md:p-6'>
          <h3 className="mb-2">Discount and Tax</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block">Discount Type:</label>
              <select className="w-full p-2 border rounded" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block">Discount Amount:*</label>
              <input type="number" className="w-full p-2 border rounded" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} />
            </div>
            <div>
              <label className="block">Order Tax:*</label>
              <input type="number" className="w-full p-2 border rounded" value={orderTax} onChange={(e) => setOrderTax(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Shipping Section */}
        <div className='bg-white shadow-md md:p-6'>
          <h3 className="mb-2">Shipping Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">Shipping Address:</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Shipping Address" />
            </div>
            <div>
              <label className="block">Shipping Charges:</label>
              <input type="number" className="w-full p-2 border rounded" value={shippingCharges} onChange={(e) => setShippingCharges(e.target.value)} />
            </div>
            <div>
              <label className="block">Shipping Note:</label>
              <textarea className="w-full p-2 border rounded" value={shippingNote} onChange={(e) => setShippingNote(e.target.value)} placeholder="Add shipping note here..." />
            </div>
            
          </div>
        </div>

        {/* Add Payment Section */}
        <div className='bg-white shadow-md md:p-6'>
          <h3 className="mb-2">Add Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">Amount Paid:*</label>
              <input type="number" className="w-full p-2 border rounded" value={amountPaid} onChange={handleAmountPaidChange} />
            </div>
            <div>
              <label className="block">Change Return:</label>
              <input type="text" className="w-full p-2 border rounded bg-gray-100" value={`৳ ${changeReturn.toFixed(2)}`} disabled />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block">Paid on:*</label>
              <DatePicker
                selected={paymentDate}
                onChange={(date) => setPaymentDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block">Payment Method:*</label>
              <select className="w-full p-2 border rounded" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank Transfer</option>
                <option value="Card">Card Payment</option>
              </select>
            </div>
            <div>
              <label className="block">Payment Account:</label>
              <select
                  className="w-full p-2 border rounded"
                  value={paymentAccount.account_id} // Bind to paymentAccount.account_id
                  onChange={(e) => {
                    const selectedAccountId = e.target.value;
                    const selectedAccount = account.find(acc => acc.account_id === selectedAccountId);
                    
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
                  {account.map((acc) => (
                    <option key={acc.account_id} value={acc.account_id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
            </div>
            <div>
              <label className="block">Payment Note:</label>
              <textarea className="w-full p-2 border rounded" value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} placeholder="Add payment notes here..." />
            </div>
          </div>
        </div>

        {/* Total Bill */}
        <div className="mt-6">
          <h3 className={` text-lg ${getTotalClassName()}`}>Total Payable: ৳ {discountedTotal.toFixed(2)}</h3>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-green-500 text-white p-2 rounded">Save</button>
            <button type="button" className="bg-blue-500 text-white p-2 rounded">Save & Print</button>
          </div>
        </div>
      </form>
    </div>
  );
}
