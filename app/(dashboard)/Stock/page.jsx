'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/app/Loaders/page';
import { toast } from 'react-toastify';

export default function Stock() {
  const printRef = useRef();

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [damages, setDamages] = useState([]);
  const [categories, setCategories] = useState([]); // Store unique categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    productName: '',
    productCode: '',
    category: '',
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/Products/Create/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((item) => item.category).filter(Boolean))
        );
        setCategories(uniqueCategories);

        // Initialize filtered data
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Fetch sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/Sales/Create/sales');
        if (!response.ok) throw new Error('Failed to fetch sales');
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
        toast.error('Failed to load sales data.');
      }
    };

    fetchSales();
  }, []);

  // Fetch damages
  useEffect(() => {
    const fetchDamages = async () => {
      try {
        const response = await fetch('/Damages/damage');
        if (!response.ok) throw new Error('Failed to fetch damages');
        const data = await response.json();
        setDamages(data.damages || []);
      } catch (err) {
        console.error('Error fetching damages:', err);
        toast.error('An error occurred while fetching damages.');
      }
    };

    fetchDamages();
  }, []);

  // Aggregate data for filtering and display
  useEffect(() => {
    if (products.length > 0 && sales.length > 0 && damages.length > 0) {
      const aggregatedData = products.map((product) => {
        const soldQuantity = sales
          .flatMap((sale) => sale.products)
          .filter((item) => item.id === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        const returnedQuantity = sales
          .filter((sale) => sale.status === 'Returned')
          .flatMap((sale) => sale.products)
          .filter((item) => item.id === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        const damagedQuantity = damages
          .filter((damage) => damage.product_id === product.id)
          .reduce((sum, damage) => sum + damage.quantity, 0);

        return {
          ...product,
          sold: soldQuantity,
          returned: returnedQuantity,
          damaged: damagedQuantity,
          availableStock: product.opening_stock - soldQuantity  - damagedQuantity,
        };
      });

      setFilteredData(aggregatedData);
      setLoading(false);
    }
  }, [products, sales, damages]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  // Apply filters to the aggregated product data
  const applyFilters = (newFilters) => {
    const filtered = products.filter((item) => {
      const productNameMatch =
        newFilters.productName === '' ||
        item.product_name?.toLowerCase().includes(newFilters.productName.toLowerCase());

      const productCodeMatch =
        newFilters.productCode === '' ||
        item.product_code?.toLowerCase().includes(newFilters.productCode.toLowerCase());

      const categoryMatch =
        newFilters.category === '' ||
        item.category?.toLowerCase() === newFilters.category.toLowerCase();

      return productNameMatch && productCodeMatch && categoryMatch;
    });

    setFilteredData(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      productName: '',
      productCode: '',
      category: '',
    });
    setFilteredData(products);
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById('table-to-print').outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Stock List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  if (loading) return <p><Loader /></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="font-nunito text-sm">
      <div className="p-2 max-w-full mx-auto mt-[5%]">
        {/* Title and Print Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg text-gray-600">Product Stock</div>
          <button
            onClick={handlePrint}
            className="bg-emerald-500 text-white cursor-pointer px-10 py-2 rounded-md hover:bg-teal-600"
          >
            Print
          </button>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            value={filters.productName}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full md:w-1/4 bg-white"
          />
          <input
            type="text"
            placeholder="Product Code"
            name="productCode"
            value={filters.productCode}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full md:w-1/4 bg-white"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full md:w-1/4"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={() => applyFilters(filters)} className="bg-green-500 text-white px-10 py-2 rounded-md hover:bg-green-600">
            Filter
          </button>
          <button onClick={resetFilters} className="bg-gray-500 text-white px-10 py-2 rounded-md hover:bg-gray-600">
            Reset
          </button>
        </div>

        {/* Product Stock Table */}
        <div ref={printRef} className="overflow-auto">
          <table id="table-to-print" className="w-full table-auto dark:text-white border-collapse bg-white text-sm text-center">
            <thead className="bg-gray-100">
              <tr className="bg-emerald-500 text-white">
                <th className="px-1 py-2">#</th>
                <th className="px-1 py-2">Image</th>
                <th className="px-1 py-2">Product</th>
                <th className="px-1 py-2">Category</th>
                <th className="px-1 py-2">Price</th>
                <th className="px-1 py-2">Quantity</th>
                <th className="px-1 py-2">Sold</th>
                <th className="px-1 py-2">Returned</th>
                <th className="px-1 py-2">Damaged</th>
                <th className="px-1 py-2">Available Stock</th>
                <th className="px-1 py-2">Brand</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product, index) => (
                <tr key={product.id}>
                  <td className="border px-1 py-2">{index + 1}</td>
                  <td className="border px-1 py-2">
                    <Image
                      width={200}
                      height={300}
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border px-1 py-2">{product.product_name}</td>
                  <td className="border px-1 py-2">{product.category || "Not Set"}</td>
                  <td className="border px-1 py-2">{product.sale_price}</td>
                  <td className="border px-1 py-2">{product.sub_unit || 0}</td>
                  <td className="border px-1 py-2">{product.sold}</td>
                  <td className="border px-1 py-2">{product.returned}</td>
                  <td className="border px-1 py-2">{product.damaged}</td>
                  <td className="border px-1 py-2">{product.availableStock}</td>
                  <td className="border px-1 py-2">{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
