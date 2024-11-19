'use client';

import React, { useEffect, useState } from 'react';

export default function LowStockReport() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productFilter, setProductFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/Products/Create/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setFilteredData(data);

        const uniqueCategories = Array.from(
          new Set(data.map((item) => item.category).filter(Boolean))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await fetch('/Sales/Create/sales');
        if (!response.ok) throw new Error('Failed to fetch sales');
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchProducts();
    fetchSales();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const aggregatedData = products.map((product) => {
        const soldQuantity = sales
          .flatMap((sale) => sale.products)
          .filter((item) => item.id === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        const availableStock = product.opening_stock || 0;
        const sellValue = availableStock * product.sale_price;

        return {
          id: product.id,
          product: product.product_name,
          category: product.category || 'Not Set',
          price: product.sale_price,
          sale: soldQuantity || 0,
          purchase: product.opening_stock || 0,
          stock: availableStock,
          value: `${sellValue.toFixed(2)} TK`,
        };
      });

      setFilteredData(aggregatedData);
    }
  }, [products, sales]);

  const filterData = () => {
    let filtered = products.map((product) => {
      const soldQuantity = sales
        .flatMap((sale) => sale.products)
        .filter((item) => item.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      const availableStock = product.opening_stock || 0;
      const sellValue = availableStock * product.sale_price;

      return {
        id: product.id,
        product: product.product_name,
        category: product.category || 'Not Set',
        price: product.sale_price,
        sale: soldQuantity || 0,
        purchase: product.opening_stock || 0,
        stock: availableStock,
        value: `${sellValue.toFixed(2)} TK`,
      };
    });

    if (productFilter) {
      filtered = filtered.filter((item) =>
        item.product.toLowerCase().includes(productFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setProductFilter('');
    setCategoryFilter('');
    setFilteredData(
      products.map((product) => {
        const soldQuantity = sales
          .flatMap((sale) => sale.products)
          .filter((item) => item.id === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        const availableStock = product.opening_stock || 0;
        const sellValue = availableStock * product.sale_price;

        return {
          id: product.id,
          product: product.product_name,
          category: product.category || 'Not Set',
          price: product.sale_price,
          sale: soldQuantity || 0,
          purchase: product.opening_stock || 0,
          stock: availableStock,
          value: `${sellValue.toFixed(2)} TK`,
        };
      })
    );
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
      <h1 className="text-lg dark:text-white mb-4">Stock Report</h1>

      {/* Filter Section */}
      <div className="md:flex flex-wrap justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="border bg-white p-2 w-full md:w-1/4"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border bg-white p-2 w-full md:w-1/4"
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded">
          Filter
        </button>
        <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>

      {/* Stock Table */}
      <table className="table-auto dark:text-white w-full border-collapse border">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border p-2">SL</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Sale</th>
            <th className="border p-2">Purchases</th>
            <th className="border p-2">Available Stock</th>
            <th className="border p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{item.product}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.price} TK</td>
              <td className="border p-2">{item.sale}</td>
              <td className="border p-2">{item.purchase}</td>
              <td className="border p-2">{item.stock}</td>
              <td className="border p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
