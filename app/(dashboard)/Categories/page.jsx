'use client';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse'; // For CSV parsing
import * as XLSX from 'xlsx';
import { Eye, Filter, View } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import Loader from '@/app/Loaders/page';
import { toast } from 'react-toastify';
import Brands from '../Brands/page';
import Link from 'next/link';

export default function CategoryList() {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: '', createdOn: '', status: '' });
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(''); // 'edit' or 'delete'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showImportProductModal, setShowImportProductModal] = useState(false);
    const [categoryData, setCategoryData] = useState({
        category: selectedCategory?.name || '',
        category_slug: selectedCategory?.slug || '',
        status: selectedCategory?.status || 'active',
      });


    // Handle opening and closing modals
  const openAddCategoryModal = () => setShowAddCategoryModal(true);
  const closeAddCategoryModal = () => {
    setShowAddCategoryModal(false);
    setCategoryData({ category: '', slug: '', status: 'active' });
  };

  const openImportProductModal = () => setShowImportProductModal(true);
  const closeImportProductModal = () => {
    setShowImportProductModal(false);
    
  };

  // Handle Add New Category form submission
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newCategory = {
        ...categoryData,
        created_on: new Date().toISOString(), // today's date in ISO format
    };
    console.log(categoryData);
    try {
      const response = await fetch(`/Categories/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to add category');

      toast.success('Category added successfully!');
      closeAddCategoryModal();
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  };


    // File upload handler
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const fileType = file.name.split('.').pop();

        if (fileType === 'csv') {
            Papa.parse(file, {
                header: true,
                complete: (results) => setProducts(results.data),
                error: (err) => console.error('Error parsing CSV file:', err)
            });
        } else if (fileType === 'xlsx') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const excelData = XLSX.utils.sheet_to_json(worksheet);
                setProducts(excelData);
            };
            reader.readAsArrayBuffer(file);
        } else {
            console.error('Unsupported file type');
        }
    };

    
  const handleImportProduct = () => {
    if (file) {
      // Process the file upload here, using PapaParse or XLSX
      toast.success('Product imported successfully!');
      closeImportProductModal();
    } else {
      toast.error('Please select a file to upload.');
    }
  };


    // Export functions
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Category List', 20, 10);
        products.forEach((product, index) => {
            doc.text(`${index + 1}. ${product.category}, Created On: ${product.created_on}, Status: ${product.status}`, 20, 20 + index * 10);
        });
        doc.save('Categories.pdf');
    };

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        XLSX.writeFile(wb, 'products.xlsx');
    };

    // Filtering and sorting
    const filteredProducts = products
        .filter(product => 
            (filters.category === '' || product.category === filters.category) &&
            (filters.createdOn === '' || product.created_on === filters.createdOn) &&
            (filters.status === '' || product.status === filters.status) &&
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => sortOrder === 'asc' ? new Date(a.created_on) - new Date(b.created_on) : new Date(b.created_on) - new Date(a.created_on));

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Unique filter values
    const uniqueCategories = [...new Set(products?.map(product => product.category))];
    const uniqueCreatedOn = [...new Set(products?.map(product => product.created_on))];
    const uniqueStatuses = [...new Set(products?.map(product => product.status))];
     // Toggle Filters
     const [showFilters, setShowFilters] = useState(false);
      const toggleFilters = () => {
        setShowFilters(!showFilters);
      };
      // Function to handle select all products
      const handleSelectAll = (e) => {
        if (e.target.checked) {
          const allProductIds = products?.map((product) => product.id);
          setSelectedProducts(allProductIds);
        } else {
          setSelectedProducts([]);
        }
      };
        // Function to handle individual product selection
        const handleSelectProduct = (e, productId) => {
          if (e.target.checked) {
            setSelectedProducts([...selectedProducts, productId]);
          } else {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
          }
        };



   // Fetch categories from API on component mount
   useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/Categories/categories'); // Update this path if necessary
        const data = await response.json();
        setProducts(data);
        // <Brands categories={categories}/>
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return <Loader/>;



  const handleOpenModal = (type, category) => {
    setModalType(type);
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (id) => {
  
    try {
      const response = await fetch(`/Categories/categories/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.error || 'Failed to delete category');
  
      // Update state to remove the deleted item
      setProducts(products.filter((product) => product.id !== id));
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    } finally {
      handleCloseModal();
    }
  };

 // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

 // API Call to Update Category
 const updateCategory = async (updatedData) => {
    try {
      const response = await fetch(`/Categories/categories/${selectedCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to update category');

      toast.success('Category updated successfully!');
      handleCloseModal();
    } catch (error) {
    //   console.error('Error updating category:', error);
    //   toast.error('Failed to update category');
    }
  };

  // Handle form submission
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedCategory = {
      name: categoryData.name || selectedCategory.name,
      slug: categoryData.slug || selectedCategory.slug,
      status: categoryData.status || selectedCategory.status,
    };
    updateCategory(updatedCategory);
  };
    return (
        <div className=" font-nunito text-sm container mx-auto px-4 py-6 md:mt-[5%] mt-[20%] bg-white  dark:bg-[#151530] dark:text-white">
            {/* Action Buttons */}
            <div className="md:flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className=" dark:text-white text-lg  mb-2 md:mb-0">Category list</h2>
                <div className="md:flex space-x-2 space-y-2 md:space-y-0">
                    <button onClick={openAddCategoryModal} className="px-4 py-2 bg-emerald-500 text-white rounded">Add New Category</button>
                    <Link href="/Products/Create">
                      <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Product</button>
                    </Link>
                    <button onClick={openImportProductModal} className="px-4 py-2 bg-blue-500 text-white rounded">Import Product</button>
                    <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">Export PDF</button>
                    <button onClick={exportExcel} className="px-4 py-2 bg-blue-500 text-white rounded">Export Excel</button>
                </div>
            </div>

            {/* Modal for Importing Products */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
                    <div className="bg-white  p-6 w-1/2">
                        <h2 className=" dark:text-white text-lg  mb-4">Import Products</h2>
                        <input
                            type="file"
                            accept=".csv, .xlsx"
                            onChange={handleFileUpload}
                            className="mb-4 bg-white"
                        />
                        <div className="flex justify-end space-x-4">
                            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => { /* Submit logic here */ }}>Submit</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex md:justify-end md:items-end mb-4">
                  
                  <div className="flex space-x-2">
                    <button onClick={toggleFilters} className="bg-red-500 text-white px-4 py-2 rounded">
                      {showFilters ? '✕' : <Filter size={20} strokeWidth={2} /> }
                    </button>
                  </div>
                </div>
                {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 dark:text-black text-gray-500">

            <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border bg-white border-gray-300 px-4 py-2 rounded focus:outline-none mb-2 md:mb-0"
            />
                <div className="flex space-x-2">
                    <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="border p-2 rounded">
                        <option value="">Filter by Category</option>
                        {uniqueCategories?.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFilters({ ...filters, createdOn: e.target.value })} className="border p-2 rounded">
                        <option value="">Filter by Created On</option>
                        {uniqueCreatedOn?.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="border p-2 rounded">
                        <option value="">Filter by Status</option>
                        {uniqueStatuses?.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
           
        </div>
      )}

            {/* Search and Filter */}
            

            {/* Product Table */}
            <table className="min-w-full bg-white dark:bg-[#1c1c3c] dark:text-white border border-gray-300 font-nunito text-gray-500">
                <thead>
                    <tr className='bg-emerald-500 text-white'>
                    <th className="border px-4 py-2 ">
                <input type="checkbox" onChange={handleSelectAll} className='bg-white' />
              </th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Category Slug</th>
                        <th className="border px-4 py-2">Created On</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.length > 0 ? (
                        currentProducts?.map((product, index) => (
                            <tr key={index} className="border-b text-center">
                                <td className="px-4 py-2  border">
                                  <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={(e) => handleSelectProduct(e, product.id)}
                                    className='bg-white'
                                  />
                                </td>
                                <td className=" px-4 py-2">{product.category}</td>
                                <td className=" px-4 py-2 border">{product.category_slug}</td>
                                <td className=" px-4 py-2">{product.created_on}</td>
                                <td className=" px-4 py-2 border"><span className={`px-2 py-1 text-xs  rounded-full ${
                                                product.status === "active"
                                                  ? "bg-green-100 text-green-700"
                                                  : product.status === "inactive"
                                                  ? "bg-red-100 text-red-700"
                                                  : "bg-yellow-100 text-yellow-700"
                                              }`}>{product.status}</span></td>
                                <td className=" px-4 py-2  flex space-x-2 items-center justify-center gap-5">
                                    
                                <button
                                    className="p-2 border transform text-blue-600 hover:bg-[#288EC7] hover:text-white hover:scale-110"
                                    onClick={() => handleOpenModal('edit', product)}
                                    >
                                    <TbEdit size={16} />
                                </button>
                                <button
                                    className="p-2 border transform text-red-500 hover:bg-red-500 hover:text-white hover:scale-110"
                                    onClick={() => handleOpenModal('delete', product)}
                                    >
                                    <RiDeleteBin5Line size={16} />
                                </button>
                               
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border text-center py-4">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
             {/* Dynamic Modal */}
                {modalVisible && selectedCategory && (
                    <div className="fixed inset-0 flex items-center justify-center  transition-all duration-700 ease-in-out ">
                    <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
                        <h2 className="text-lg mb-4 text-black">{modalType === 'edit' ? `Edit Category: ${selectedCategory.category}` : 'Are you sure?'}</h2>
                        {modalType === 'edit' ? (
              
                            <form onSubmit={handleSaveChanges} className=" w-full bg-white rounded text-start text-black">
                                 <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
                                <div className="mb-4">
                                    <label className="block text-gray-700  text-sm font-bold mb-2">Category</label>
                                    <input
                                    type="text"
                                    name="name"
                                    defaultValue={selectedCategory.category}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 "
                                    placeholder="Enter category name"
                                    required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700  text-sm font-bold mb-2">Category Slug</label>
                                    <input
                                    type="text"
                                    name="slug"
                                    defaultValue={selectedCategory.category_slug}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 "
                                    placeholder="Enter category slug"
                                    required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700  text-sm font-bold mb-2">Status</label>
                                    <select
                                    name="status"
                                    defaultValue={selectedCategory.status}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 "
                                    required
                                    >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                >
                                    Save Changes
                                </button>
                                </form>

                        ) : (
                        <div className='text-black '>
                               <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
                            <p className="mb-6">You wont be able to revert this!</p>
                            <p><strong>Category:</strong> {selectedCategory.category}</p>
                            <p><strong>ID:</strong> {selectedCategory.category_slug}</p>
                            <p><strong>ID:</strong> {selectedCategory.status}</p>
                            <p><strong>ID:</strong> {selectedCategory.id}</p>
                            <div className="flex justify-center mt-6">
                            <button
                                onClick={() => handleDelete(selectedCategory.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded mr-2"
                            >
                                Yes, delete it!
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>
                )}

                {/* Add Category Modal */}
                {showAddCategoryModal && (
                    <div className="fixed inset-0 flex items-center justify-center  transition-all duration-700 ease-in-out">
                    <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
                        <div className="flex justify-between items-center mb-4 text-black">
                        <h2 className="text-lg font-semibold">Add New Category</h2>
                        <button onClick={closeAddCategoryModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
                        </div>
                        <form className='text-black' onSubmit={handleAddCategory}>
                        <div className="mb-4 text-start">
                            <label className="block text-gray-700 mb-2">Category</label>
                            <input
                            type="text"
                            value={categoryData.category}
                            onChange={(e) => setCategoryData({ ...categoryData, category: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                            />
                        </div>
                        <div className="mb-4 text-start">
                            <label className="block text-gray-700 mb-2">Category Slug</label>
                            <input
                            type="text"
                            value={categoryData.slug}
                            onChange={(e) => setCategoryData({ ...categoryData, category_slug: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                            />
                        </div>
                        <div className="mb-4 text-start">
                            <label className="block text-gray-700 mb-2">Status</label>
                            <select
                            value={categoryData.status}
                            onChange={(e) => setCategoryData({ ...categoryData, status: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded">Save Category</button>
                        </form>
                    </div>
                    </div>
                )}

                {/* Import Product Modal */}
                {showImportProductModal && (
                    <div className="fixed inset-0 flex items-center justify-center  transition-all duration-700 ease-in-out">
                    <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
                        <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Import Product</h2>
                        <button onClick={closeImportProductModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
                        </div>
                        <input type="file" onChange={handleFileUpload} accept=".csv, .xlsx" className="mb-4" />
                        <button onClick={handleImportProduct} className="px-4 py-2 bg-blue-500 text-white rounded">Import</button>
                    </div>
                    </div>
                )}

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
    );
}
