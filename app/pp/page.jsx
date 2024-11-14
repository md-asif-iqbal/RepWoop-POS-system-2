
'use client'
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Eye, Filter } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/app/Loaders/page';
import { toast } from 'react-toastify';

export default function ProductData() {
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    product: '',
    category: '',
    brand: '',
    price: ''
  });
  const [sortOrder, setSortOrder] = useState('');
  const [dateSortOrder, setDateSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showExpireDate, setShowExpireDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenModal = (action, product) => {
    if (modalVisible) return; 
    setModalVisible(true);
    setSelectedProduct(product);
    setModalAction(action);
  };
  
  const handleCloseModal = () => {
    setModalAction(null);
    setModalVisible(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/Products/Create/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = products?.map((product) => product?.id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Product List', 20, 10);
    products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product?.product}, SKU: ${product?.sku}, Price: $${product?.price}`, 20, 20 + index * 10);
    });
    doc.save('products.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Products List</title>
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

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handlePriceSort = (e) => {
    setSortOrder(e.target.value);
  };

  const handleDateSort = (e) => {
    setDateSortOrder(e.target.value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredProducts = products
  .filter((product) =>
    product?.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    && (filters.product === '' || product?.product_name === filters.product)
    && (filters.category === '' || product?.category === filters.category)
    && (filters.brand === '' || product?.brand === filters.brand)
  )
    .sort((a, b) => {
      if (sortOrder === 'Low to High') {
        return a.sale_price - b.sale_price;
      } else if (sortOrder === 'High to Low') {
        return b.sale_price - a.sale_price;
      } else if (dateSortOrder === 'Oldest First') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (dateSortOrder === 'Newest First') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return 0;
      }
    });

  const downloadCSVTemplate = () => {
    const headers = [
      'product_name', 'product_code', 'category', 'brand', 'main_unit',
      'sub_unit', 'opening_stock', 'sale_price', 'purchase_cost',
      'product_details', 'image', 'created_at', 'discount', 'expire_date', 'username', 'email'
    ];
    const rows = [
      [
        'Sample Product 1', 'PROD001', 'Electronics', 'Samsung', 'Unit', 'Sub-Unit',
        '10', '500', '300', 'Sample details 1', 'https://example.com/image1.jpg',
        '2024-01-01', '5%', '2025-01-01', 'John Doe'
      ],
      [
        'Sample Product 2', 'PROD002', 'Home Appliances', 'LG', 'Unit', 'Sub-Unit',
        '15', '700', '450', 'Sample details 2', 'https://example.com/image2.jpg',
        '2024-02-01', null, '2025-02-01', 'Jane Doe'
      ]
    ];
    const csvContent = [headers, ...rows]?.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'products_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcelTemplate = () => {
    const headers = [
      'productName', 'productCode', 'selectedCategory', 'selectedBrand',
      'selectedMainUnit', 'subUnit', 'openingStock', 'salePrice', 'purchaseCost',
      'productDetails', 'imageLink', 'createdDate', 'discount', 'expireDate', 'userName'
    ];
    const rows = [
      [
        'Sample Product 1', 'PROD001', 'Electronics', 'Samsung', 'Unit', 'Sub-Unit',
        10, 500, 300, 'Sample details 1', 'https://example.com/image1.jpg',
        '2024-01-01', '5%', '2025-01-01', 'John Doe'
      ],
      [
        'Sample Product 2', 'PROD002', 'Home Appliances', 'LG', 'Unit', 'Sub-Unit',
        15, 700, 450, 'Sample details 2', 'https://example.com/image2.jpg',
        '2024-02-01', null, '2025-02-01', 'John Doe'
      ]
    ];
    const worksheetData = [headers, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products Template');
    XLSX.writeFile(workbook, 'products_template.xlsx');
  };

  const handleFileUpload = (e) => {
    const selectedFile = e?.target?.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Please select a valid file');
    }
  };

  const submitProducts = async () => {
    if (!file) {
      setMessage('Please select a file before submitting.');
      return;
    }
    const formData = new FormData();
    formData?.append('file', file);
    try {
      const response = await fetch('/Products/multiple', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response?.ok) {
        toast.success(data.message || 'File uploaded and data inserted successfully');
        setShowModal(false);
      } else {
        setMessage(data?.error || 'File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/Products/product/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete product');
        return;
      }
      toast.info('Product deleted successfully');
      handleCloseModal();
      setProducts(products.filter((product) => product?.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('An error occurred while deleting the product');
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='font-nunito text-sm'>
        <div className="container mx-auto px-4  md:mt-[7%] mt-[20%] font-nunito text-sm">
      {/* Action Buttons */}
      <div className="md:flex mflex-col md:flex-row justify-between items-center mb-4">
        <h2 className=" dark:text-white text-lg  mb-2 md:mb-0">Product List</h2>
        <div className="md:flex space-x-2 space-y-2 md:space-y-0">
          <Link href="/Products/Create">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Product</button>
          </Link>
          <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={()=>setShowModal(true)}
            >
                Import Product
            </button>
            {/* Modal */}
            {showModal && (
                              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white w-full md:w-1/2 p-6">
                                  <h2 className="dark:text-white text-lg mb-4">Import Products</h2>
                                  <div className="md:space-x-4 md:mb-4">
                                    <button onClick={downloadCSVTemplate} className="bg-blue-500 text-white px-4 py-2 rounded">
                                      Download CSV Template
                                    </button>
                                    <button onClick={downloadExcelTemplate} className="bg-green-500 text-white px-4 py-2 rounded">
                                      Download Excel Template
                                    </button>
                                  </div>
                                  <input
                                    type="file"
                                    accept=".csv, .xlsx"
                                    onChange={handleFileUpload}
                                    className="mb-4 bg-white"
                                  />
                                  <div className="flex justify-end space-x-4">
                                    <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={submitProducts}>
                                      Submit
                                    </button>
                                    <button
                                      className="px-4 py-2 bg-red-500 text-white rounded"
                                      onClick={() => setShowModal(false)}
                                    >
                                      Close
                                    </button>
                                  </div>
                                  {message && <p className="mt-4 text-red-500">{message}</p>}
                                </div>
                              </div>
                                      )}

          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">PDF</button>
          <button onClick={exportExcel} className="px-4 py-2 bg-yellow-500 text-white rounded">Excel</button>
          <button onClick={handlePrint} className="px-4 py-2 bg-gray-500 text-white rounded">Print</button>
        </div>
      </div>
                   {/* Modal */}



      {/* Search and Filter Section */}
      <div className="flex md:justify-end md:items-end mb-4">
       
        <div className="flex space-x-2">
          <button onClick={toggleFilters} className="bg-red-500 text-white px-4 py-2 rounded">
            {showFilters ? '✕' : <Filter size={20} strokeWidth={2} /> }
          </button>
          
          <select className="border border-gray-300 px-4 py-2 rounded" onChange={handleDateSort}>
            <option value="">Sort by Date</option>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Filters - Toggle Visibility */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 mb-4">
          <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-white border-gray-300 px-4 py-2 rounded focus:outline-none mb-2 md:mb-0"
        />
          <select
            name="category"
            className="border border-gray-300 px-4 py-2 rounded"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Choose Category</option>
            {uniqueCategories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            name="brand"
            className="border border-gray-300 px-4 py-2 rounded"
            value={filters.brand}
            onChange={handleFilterChange}
          >
            <option value="">All Brand</option>
            {uniqueBrands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select className="border border-gray-300 px-4 py-2 rounded" onChange={handlePriceSort}>
            <option value="">Sort by Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table id='table-to-print' className="min-w-full table-auto  bg-white dark:bg-[#1c1c3c] dark:text-white shadow-sm  overflow-hidden">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="px-4 py-2 ">
                <input className='bg-white' type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="px-4 py-2 ">Product</th>
              <th className="px-4 py-2 ">SKU</th>
              <th className="px-4 py-2 ">Category</th>
              <th className="px-4 py-2 ">Brand</th>
              <th className="px-4 py-2 ">Price</th>
              <th className="px-4 py-2 ">Unit</th>
              <th className="px-4 py-2 ">Quantity</th>
              <th className="px-4 py-2 ">Created Date</th>
              <th className="px-4 py-2 ">Created By</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct)?.map((product) => (
              <tr key={product?.id} className="border-t border-gray-200 ">
                <td className="px-4 py-2 ">
                  <input
                  className='bg-white'
                    type="checkbox"
                    checked={selectedProducts.includes(product?.id)}
                    onChange={(e) => handleSelectProduct(e, product?.id)}
                  />
                </td>
                <td className="px-4 py-2 flex items-center">
                {product?.image && (
                  <Image 
                  width={200} height={300}
                  src={`data:image/jpeg;base64,${product?.image}`}
                  alt={product?.product_name}
  
                    className="w-8 h-10 object-cover rounded mr-2"
                  />   )}
                  {product?.product_name}
                </td>
                <td className="px-4 py-2 ">{product?.product_code}</td>
                <td className="px-4 py-2">{product?.category }</td>
                <td className="px-4 py-2">{product?.brand }</td>
                <td className="px-4 py-2">${product?.sale_price }</td>
                <td className="px-4 py-2">{product?.main_unit}</td>
                <td className="px-4 py-2">{product?.opening_stock }</td>
                <td className="px-4 py-2">{new Date(product?.created_at).toISOString().split('T')[0] }</td>
                <td className="px-4 py-2">{product?.username }</td>
                {/* <td className="px-4 py-2">{product?.createdBy}</td> */}
                <td className="px-4 py-2 flex space-x-2">
                  <button onClick={() => handleOpenModal('view', product)} className="border  p-2 transform hover:scale-110 hover:bg-[#092C4C] hover:text-white">
                    <Eye size={16} strokeWidth={1.5} /></button>
                  <button  onClick={() => handleOpenModal('edit', product)} className="p-2  border transform text-blue-600 hover:bg-[#288EC7] hover:text-white hover:scale-110">
                  <TbEdit size={16}/>
                </button>
                <button onClick={() => handleOpenModal('delete', product)} className="p-2  transform text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 border">
                  <RiDeleteBin5Line size={16}/>
                </button>
                                
                       {/* Modal */}
                       {modalVisible && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-opacity-50 transition-all duration-300 ease-in-out"
                    >
                      <div className="bg-white w-[90%] md:w-[50%] lg:w-[50%] text-center rounded shadow-lg relative">
                        {/* Close Button */}
                        <button onClick={handleCloseModal} 
                        className="btn btn-sm hover:bg-rose-500 hover:text-white btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                          </button>

                        <h2 className="text-lg mb-4">
                          {modalAction === 'view' && 'Product Details'}
                          {modalAction === 'edit' && 'Edit Product'}
                          {modalAction === 'delete' && 'Are you sure?'}
                        </h2>

                        {modalAction === 'view' && (
                          <div className="hero w-full">
                          <div className="hero-content flex-col lg:flex-row">
                                    <Image 
                            width={300} height={400}
                            src={`data:image/jpeg;base64,${selectedProduct?.image}`}
                            alt={selectedProduct?.product_name}
            
                              className=" object-cover rounded mr-2"
                            /> 
                            <div className='text-start'>
                              <h1 className=" text-xl md:text-3xl font-bold">{selectedProduct?.product_name}</h1>
                              <p className="">
                              Category: 
                                {selectedProduct?.category}
                              </p>
                              <p className="">
                                Brand: 
                                {selectedProduct?.brand}
                              </p>
                              <p className=" text-emerald-400">
                               Sale price: {selectedProduct?.sale_price}
                              </p>
                              <p className=" text-red-500">
                                Purchase price: 
                                {selectedProduct?.purchase_cost}
                              </p>
                              <p className="">
                                Total Unit: 
                                {selectedProduct?.sub_unit}
                              </p>
                              <p className="">
                                Opening Stock: 
                                {selectedProduct?.opening_stock}
                              </p>
                              <p className="">
                                Discount:  
                                {selectedProduct?.discount} %
                              </p>
                              <p className="">
                                Details: 
                                {selectedProduct?.product_details}
                              </p>
                            
                            </div>
                          </div>
                        </div>
                        )}

                        {modalAction === 'edit' && (
                         <div>
                          <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg dark:bg-[#202047]">
      <h1 className="text-2xl mb-4">Add New Product</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="bg-white 
             p-2 border rounded w-full text-black"
            value={productName}
            onChange={(e) => setProducts(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Product Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Product Code"
            className="bg-white p-2 border rounded w-full text-black"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>

        {/* Category Selection */}
        <div className=" mb-4">
          <div className="w-full">
            <label className="block mb-2">
              Category <span className="text-red-500">*</span>
            </label>
           <div className='md:flex gap-2'>
           <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white 
               p-2 border rounded w-full text-black"
            >
              <option value="">Search Categories</option>
              {categories?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded w-full md:w-1/2 "
            onClick={() => setShowCategoryModal(true)}
          >
            Add Category
          </button>

           </div>
          </div>
          
        </div>

        {/* Brand Selection */}
        <div className=" mb-4">
          <div className="w-full">
            <label className="block mb-2">
              Brand <span className="text-red-500">*</span>
            </label>
            <div className='w-full md:flex gap-2'>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white 
               p-2 border rounded text-black w-full"
            >
              <option value="">Search Brands</option>
              {brands?.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded w-full md:w-1/2"
            onClick={() => setShowBrandModal(true)}
          >
            Add Brand
          </button>
          </div>
          
            </div>
        </div>

        {/* Unit Selection */}
        <div className="mb-4">
          <label className="block mb-2">
           Main Unit <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedMainUnit}
            onChange={(e) => setSelectedMainUnit(e.target.value)}
            className="bg-white text-black 
             p-2 border rounded w-full"
          >
            <option value="">Select Unit</option>
            {mainUnits?.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
           Sub Unit <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Sub Unit"
            className="bg-white 
             p-2 border rounded w-full text-black"
            value={subUnit}
            onChange={(e) => setSubUnit(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Opening Stock</label>
          <input
            type="number"
            placeholder="Opening Stock"
            className="bg-white text-black
             p-2 border rounded w-full"
            value={openingStock}
            onChange={(e) => setOpeningStock(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Sale Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Sale Price"
            className="bg-white text-black
             p-2 border rounded w-full"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Purchase Cost <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Purchase Cost"
            className="bg-white text-black
             p-2 border rounded w-full"
            value={purchaseCost}
            onChange={(e) => setPurchaseCost(e.target.value)}
          />
        </div>
            {/* Discount Field */}
    <div className="mb-4">
      <label className="block mb-2">
        Discount (%) <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        placeholder="Enter discount percentage"
        className="bg-white p-2 text-black border rounded w-full"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />
    </div>

    {/* Expiration Date Toggle */}
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showExpireDate}
          onChange={() => setShowExpireDate(!showExpireDate)}
          className="form-checkbox"
        />
        <span>Add Expiration Date</span>
      </label>
      {/* Expiration Date Field */}
    {showExpireDate && (
      <div className="mb-4">
        <label className="block mb-2">
          Expiration Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="bg-white p-2 text-black border rounded w-full"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
        />
      </div>
    )}
    </div>

        {/* Product Details Textarea */}
        <div className="mb-4">
          <label className="block mb-2">
            Product Details <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter product details..."
            className="bg-white 
             p-2 border rounded text-black w-full"
            rows="5"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block mb-2">Product Image</label>
          <input
            type="file"
            className="bg-white 
             p-2 border rounded w-full text-black"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 w-full md:w-1/6 justify-items-center flex justify-center text-white px-8 py-2 rounded"
      >
        Save
      </button>
    </form>
                         </div>
                        )}

                        {modalAction === 'delete' && (
                          <div className='p-4'>

                            <h1 className=" text-xl md:text-3xl font-bold">{selectedProduct?.product_name}</h1>
                              <p className="">
                              SKU: 
                                {selectedProduct?.product_code}
                              </p>
                              <p className="">
                              Category: 
                                {selectedProduct?.category}
                              </p>
                              <p className="">
                                Brand: 
                                {selectedProduct?.brand}
                              </p>
                              <p className=" text-emerald-400">
                               Sale price: {selectedProduct?.sale_price}
                              </p>
                              <p className=" text-red-500">
                                Purchase price: 
                                {selectedProduct?.purchase_cost}
                              </p>
                            <div className="flex justify-center space-x-4">
                              <button
                                onClick={() => handleDelete(selectedProduct?.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                              >
                                Yes, delete it!
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
  

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="lg:flex justify-center items-center gap-5 mt-4">
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()]?.map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-2 mx-1 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {number + 1}
          </button>
        ))}
         <div >Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} entries</div>
      </div>
     
        </div>

    </div>
  );
}
