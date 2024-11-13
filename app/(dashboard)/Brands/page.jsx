// 'use client';
// import React, { useEffect, useState } from 'react';
// import { jsPDF } from 'jspdf';
// import Papa from 'papaparse'; // For CSV parsing
// import * as XLSX from 'xlsx';
// import { Eye, Filter, View } from 'lucide-react';
// import { RiDeleteBin5Line } from 'react-icons/ri';
// import { TbEdit } from 'react-icons/tb';
// import Loader from '@/app/Loaders/page';
// import { toast } from 'react-toastify';

// export default function Brands() {
//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filters, setFilters] = useState({ name: '', createdOn: '', status: '' });
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [currentPage, setCurrentPage] = useState(1);
//     const productsPerPage = 10;
//     const [loading, setLoading] = useState(true);
//     const [showFilters, setShowFilters] = useState(false);

//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalType, setModalType] = useState('');
//     const [selectedbrands, setSelectedBrands] = useState(null);
//     const [showAddbrandsModal, setShowAddbrandsModal] = useState(false);
//     const [showImportBrandModal, setShowImportBrandModal] = useState(false);
//     const [brandsData, setbrandsData] = useState({
//         name: selectedbrands?.name || '',
//         status: selectedbrands?.status || 'active',
//       });
//       const [message, setMessage] = useState('');
//       const [categories, setCategories] = useState([])


//       // Handle opening and closing modals
//   const openAddBrandsModal = () => setShowAddbrandsModal(true);

//   const closeAddBrandsModal = () => {
//     setShowAddbrandsModal(false);
//     setbrandsData({ name: '', status: 'active' });
//   };

//   const openImportProductModal = () => setShowImportBrandModal(true);

//   const closeImportProductModal = () => {
//     setShowImportBrandModal(false);
    
//   };
  
//     useEffect(() => {
//       const fetchnames = async () => {
//         try {
//           const response = await fetch('/Brands/brands');
//           const data = await response.json();
//           setProducts(data)

//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching name data:', error);
//           setLoading(false);
//         }
//       };
//       fetchnames();
//     }, []);
    
//    // Fetch categories from API on component mount
//    useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch('/Categories/categories'); // Update this path if necessary
//         const data = await response.json();
//         setCategories(data)
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, []);

//     // Handle Add New Category form submission
//     const handleAddbrands = async (e) => {
//         e.preventDefault();
       
//       };
    

    
 

//     if (loading) return <Loader/>;

//     const handleOpenModal = (type, brands) => {
//         setModalType(type);
//         setSelectedBrands(brands);
//         console.log(brands);
//         setModalVisible(true);
//         };
    
//         const handleCloseModal = () => {
//         setModalVisible(false);
//         setSelectedBrands(null);
//         };



    

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         const fileType = file.name.split('.').pop();

//         if (fileType === 'csv') {
//             Papa.parse(file, {
//                 header: true,
//                 complete: (results) => setProducts(results.data),
//                 error: (err) => console.error('Error parsing CSV file:', err)
//             });
//         } else if (fileType === 'xlsx') {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const data = new Uint8Array(event.target.result);
//                 const workbook = XLSX.read(data, { type: 'array' });
//                 const sheetName = workbook.SheetNames[0];
//                 const worksheet = workbook.Sheets[sheetName];
//                 const excelData = XLSX.utils.sheet_to_json(worksheet);
//                 setProducts(excelData);
//             };
//             reader.readAsArrayBuffer(file);
//         } else {
//             console.error('Unsupported file type');
//         }
//     };


//     const exportPDF = () => {
//         const doc = new jsPDF();
//         doc.text('names List', 20, 10);
//         products.forEach((product, index) => {
//             doc.text(`${index + 1}. ${product.name}, Created On: ${product.createdOn}, Status: ${product.status}`, 20, 20 + index * 10);
//         });
//         doc.save('names.pdf');
//     };

//     const exportExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(products);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Products');
//         XLSX.writeFile(wb, 'products.xlsx');
//     };


//     const filteredProducts = products
//         .filter(product => 
//             (filters.name === '' || product.name === filters.name) &&
//             (filters.createdOn === '' || product.created_on === filters.createdOn) &&
//             (filters.status === '' || product.status === filters.status) &&
//             product.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .sort((a, b) => sortOrder === 'asc' ? new Date(a.createdOn) - new Date(b.createdOn) : new Date(b.createdOn) - new Date(a.createdOn));

//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const uniqueCategories = [...new Set(products?.map(product => product.name))];
//     const uniqueCreatedOn = [...new Set(products?.map(product => product.created_on))];
//     const uniqueStatuses = [...new Set(products?.map(product => product.status))];


//     const toggleFilters = () => {
//         setShowFilters(!showFilters);
//       };

//     const handleSelectAll = (e) => {
//         if (e.target.checked) {
//           const allProductIds = products?.map((product) => product.id);
//           setSelectedProducts(allProductIds);
//         } else {
//           setSelectedProducts([]);
//         }
//       };

//     const handleSelectProduct = (e, productId) => {
//           if (e.target.checked) {
//             setSelectedProducts([...selectedProducts, productId]);
//           } else {
//             setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//           }
//     };
//      // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setbrandsData((prevData) => ({ ...prevData, [name]: value }));
//   };
//    // API Call to Update Category
//    const updateBrandData = async (id, updatedBrand) => {
//     try {
//       const response = await fetch(`/Brands/brands/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedBrand),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         toast.success('Brand updated successfully');
//         handleCloseModal();
//       } else {
//         console.error(data.error || 'Failed to update brand');
//       }
//     } catch (error) {
//         toast.error('Error updating brand:', error);
//     }
//   };

//       // Handle form submission
//   const handleSaveChanges = (e) => {
//     e.preventDefault();
//     const updatedBrand = {
//       name: brandsData.name || selectedbrands.name,
//       status: brandsData.status || selectedbrands.status,
//     };
//     console.log(updatedBrand);
//     updateBrandData(selectedbrands.id, updatedBrand);

//   };

// //   delete function---------------------

// const handleDeleteBrand = async (id) => {
//     setLoading(true);
//     console.log(id);
//     try {
//       const response = await fetch(`/Brands/brands/${id}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         toast.success('Brand deleted successfully');
//         handleCloseModal();
//       } else {
//         console.error(data.error || 'Failed to delete brand');
//       }
//     } catch (error) {
//       toast.error('Error deleting brand:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//     return (
//         <div className="text-sm container mx-auto px-4 py-6 md:mt-[5%] mt-[20%] font-nunito bg-white  dark:bg-[#151530] dark:text-white">
//             {/* Action Buttons */}
//             <div className="md:flex flex-col md:flex-row justify-between items-center mb-4">
//                 <h2 className=" dark:text-white text-lg  mb-2 md:mb-0">Brands List</h2>
//                 <div className="md:flex space-x-2 space-y-2 md:space-y-0">
//                 <button onClick={openAddBrandsModal} className="px-4 py-2 bg-emerald-500 text-white rounded">Add New Brand</button>
//                     <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Product</button>
//                     <button onClick={openImportProductModal} className="px-4 py-2 bg-blue-500 text-white rounded">Import Product</button>
//                     <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">Export PDF</button>
//                     <button onClick={exportExcel} className="px-4 py-2 bg-blue-500 text-white rounded">Export Excel</button>
//                 </div>
//             </div>


//             <div className="flex md:justify-end md:items-end mb-4">
                  
//                   <div className="flex space-x-2">
//                     <button onClick={toggleFilters} className="bg-red-500 text-white px-4 py-2 rounded">
//                       {showFilters ? '✕' : <Filter size={20} strokeWidth={2} /> }
//                     </button>
//                   </div>
//                 </div>
//                 {showFilters && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 dark:text-black text-gray-500">

//             <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-gray-300 bg-white px-4 py-2 rounded focus:outline-none mb-2 md:mb-0"
//             />
//                 <div className="flex space-x-2">
//                     <select onChange={(e) => setFilters({ ...filters, name: e.target.value })} className="border p-2 rounded">
//                         <option value="">Filter by name</option>
//                         {uniqueCategories?.map((name, index) => (
//                             <option key={index} value={name}>{name}</option>
//                         ))}
//                     </select>
//                     <select onChange={(e) => setFilters({ ...filters, createdOn: e.target.value })} className="border p-2 rounded">
//                         <option value="">Filter by Created On</option>
//                         {uniqueCreatedOn?.map((date, index) => (
//                             <option key={index} value={date}>{date}</option>
//                         ))}
//                     </select>
//                     <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="border p-2 rounded">
//                         <option value="">Filter by Status</option>
//                         {uniqueStatuses?.map((status, index) => (
//                             <option key={index} value={status}>{status}</option>
//                         ))}
//                     </select>
//                 </div>
           
//         </div>
//       )}

//             {/* Search and Filter */}
            

//             {/* Product Table */}
//             <table className="min-w-full bg-white dark:bg-[#1c1c3c] dark:text-white border border-gray-300 font-nunito text-gray-500">
//                 <thead>
//                     <tr className='bg-emerald-500 text-white'>
//                     <th className="border px-4 py-2 ">
//                 <input type="checkbox" onChange={handleSelectAll}  className='bg-gray-100 form-checkbox'/>
//               </th>
//                         <th className="border px-4 py-2">Brand ID</th>
//                         <th className="border px-4 py-2">Brand</th>
//                         <th className="border px-4 py-2">Created On</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentProducts.length > 0 ? (
//                         currentProducts?.map((product, index) => (
//                             <tr key={index} className="border-b text-center">
//                                 <td className="px-4 py-2  border">
//                                   <input
//                                   className='bg-white'
//                                     type="checkbox"
//                                     checked={selectedProducts.includes(product.id)}
//                                     onChange={(e) => handleSelectProduct(e, product.id)}
//                                   />
//                                 </td>
//                                 <td className=" px-4 py-2">{product.id}</td>
//                                 <td className=" px-4 py-2 border">{product.name}</td>
//                                 <td className=" px-4 py-2">{product.created_on}</td>
//                                 <td className=" px-4 py-2 border"><span className={`px-2 py-1 text-xs  rounded-full ${
//                                                 product.status === "active"
//                                                   ? "bg-green-100 text-green-700"
//                                                   : product.status === "inactive"
//                                                   ? "bg-red-100 text-red-700"
//                                                   : "bg-yellow-100 text-yellow-700"
//                                               }`}>{product.status}</span></td>
//                                 <td className=" px-4 py-2  flex space-x-2 items-center justify-center gap-5">
                                    
//                                 <button  onClick={() => handleOpenModal('edit', product)} className="p-2  border transform text-center text-blue-600 hover:bg-[#288EC7] hover:text-white hover:scale-110">
//                                   <TbEdit size={16}/>
//                                 </button>
//                                 <button onClick={() => handleOpenModal('delete', product)} className="p-2 text-center  transform text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 border">
//                                   <RiDeleteBin5Line size={16}/>
//                                 </button>
                            

                                    
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6" className="border text-center py-4">No products found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//              {/* Dynamic Modal */}
//              {modalVisible && selectedbrands && (
//                     <div className="fixed inset-0 flex items-center justify-center  transition-all duration-700 ease-in-out ">
//                     <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
//                         <h2 className="text-lg mb-4 text-black">{modalType === 'edit' ? `Edit brands: ${selectedbrands.name}` : 'Are you sure?'}</h2>
//                         {modalType === 'edit' ? (
              
//                             <form onSubmit={handleSaveChanges} className=" w-full bg-white rounded text-start text-black">
//                                  <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700  text-sm font-bold mb-2">brands</label>
//                                     <input
//                                     type="text"
//                                     name="name"
//                                     defaultValue={selectedbrands.name}
//                                     onChange={handleChange}
//                                     className="border rounded w-full py-2 px-3 text-gray-700 "
//                                     placeholder="Enter brands name"
//                                     required
//                                     />
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700  text-sm font-bold mb-2">brands ID</label>
//                                     <input
//                                     type="text"
//                                     name="ID"
//                                     defaultValue={selectedbrands.id}
//                                     onChange={handleChange}
//                                     className="border rounded w-full py-2 px-3 text-gray-700 "
//                                     placeholder="Enter brands slug"
//                                     required
//                                     />
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="block text-gray-700  text-sm font-bold mb-2">Status</label>
//                                     <select
//                                     name="status"
//                                     defaultValue={selectedbrands.status}
//                                     onChange={handleChange}
//                                     className="border rounded w-full py-2 px-3 text-gray-700 "
//                                     required
//                                     >
//                                     <option value="active">Active</option>
//                                     <option value="inactive">Inactive</option>
//                                     </select>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
//                                 >
//                                     Save Changes
//                                 </button>
//                                 {message && <p>{message}</p>}
//                                 </form>

//                         ) : (
//                         <div className='text-black '>
//                                <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
//                             <p className="mb-6">You wont be able to revert this!</p>
//                             <p><strong>brands:</strong> {selectedbrands.name}</p>
//                             <p><strong>ID:</strong> {selectedbrands.id}</p>
//                             <p><strong>ID:</strong> {selectedbrands.status}</p>
//                             <div className="flex justify-center mt-6">
//                             <button
//                                 onClick={() => handleDeleteBrand(selectedbrands.id)}
//                                 className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded mr-2"
//                             >
//                                 Yes, delete it!
//                             </button>
//                             <button
//                                 onClick={handleCloseModal}
//                                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             </div>
//                         </div>
//                         )}
//                     </div>
//                     </div>
//                 )}

//                                                     {/* Add brands Modal */}
//                                                     {showAddbrandsModal && (
//                                                                 <div className="fixed inset-0 flex items-center justify-center  transition-all duration-700 ease-in-out">
//                                                                 <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
//                                                                     <div className="flex justify-between items-center mb-4 text-black">
//                                                                     <h2 className="text-lg font-semibold">Add New brands</h2>
//                                                                     <button onClick={closeAddBrandsModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
//                                                                     </div>
//                                                                     <form onSubmit={handleAddbrands} className="text-black">
//                                                                     <div className="mb-4">
//                                                                         <label className="block text-gray-700 mb-2">Brand Name</label>
//                                                                         <input
//                                                                         type="text"
//                                                                         value={brandsData.name}
//                                                                         onChange={(e) => setbrandsData({ ...brandsData, name: e.target.value })}
//                                                                         className="w-full px-3 py-2 border rounded"
//                                                                         required
//                                                                         />
//                                                                     </div>
//                                                                     <div className="mb-4">
//                                                                         <label className="block text-gray-700 mb-2">Status</label>
//                                                                         <select
//                                                                         value={brandsData.status}
//                                                                         onChange={(e) => setbrandsData({ ...brandsData, status: e.target.value })}
//                                                                         className="w-full px-3 py-2 border rounded"
//                                                                         >
//                                                                         <option value="active">Active</option>
//                                                                         <option value="inactive">Inactive</option>
//                                                                         </select>
//                                                                     </div>
//                                                                     <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded">
//                                                                         Save Brand
//                                                                     </button>
//                                                                     </form>
//                                                                 </div>
//                                                                 </div>
//                                     )}

//                                     {/* Import Product Modal */}
//                                     {showAddbrandsModal && (
//                                         <div className="fixed inset-0 flex items-center justify-center  transition-all duration-700 ease-in-out">
//                                         <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
//                                             <div className="flex justify-between items-center mb-4">
//                                             <h2 className="text-lg font-semibold">Import Brands</h2>
//                                             <button onClick={closeImportProductModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>
//                                             </div>
//                                             <input type="file" onChange={handleFileUpload} accept=".csv, .xlsx" className="mb-4" />
//                                             <button onClick={handleImportProduct} className="px-4 py-2 bg-blue-500 text-white rounded">Import</button>
//                                         </div>
//                                         </div>
//                                     )}

//             {/* Pagination */}
//             <div className="lg:flex justify-center items-center gap-5 mt-4">
//         {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()]?.map((number) => (
//           <button
//             key={number + 1}
//             onClick={() => paginate(number + 1)}
//             className={`px-3 py-2 mx-1 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
//           >
//             {number + 1}
//           </button>
//         ))}
//          <div >Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} entries</div>
//             </div>


//         </div>
//     );
// }







































































'use client';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse'; // For CSV parsing
import * as XLSX from 'xlsx';
import { Filter } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import Loader from '@/app/Loaders/page';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Brands() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ name: '', createdOn: '', status: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [brandsData, setBrandsData] = useState({
    name: '',
    status: 'active',
  });
  const [categories, setCategories] = useState([]);
  const [newBrandData, setNewBrandData] = useState({
    name: '',
    category: '',
    status: 'active',
  });

  // Handle opening and closing modals
  const openAddBrandModal = () => setShowAddBrandModal(true);

  const closeAddBrandModal = () => {
    setShowAddBrandModal(false);
    setBrandsData({ name: '', status: 'active' });
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/Brands/brands');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brand data:', error);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/Categories/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

    // Create a constant for category names
    const categoryNames = categories.map((cat) => cat.category);

    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewBrandData((prevData) => ({ ...prevData, [name]: value }));
    };



  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrandData) {
        toast.info("Please select a category and enter a brand name.");
        return;
      }
    try {
        const response = await fetch('/Brands/brands', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBrandData),
        });
    
        const data = await response.json();
        if (response.ok) {
          toast.success('Brand added successfully!');
          setNewBrandData({ name: '', category: '', status: 'active' }); // Reset form
          closeAddBrandModal();
        } else {
          toast.error(data.error || 'Failed to add brand');
        }
      } catch (error) {
        console.error('Error adding brand:', error);
      }
  };

  if (loading) return <Loader />;

  const handleOpenModal = (type, brand) => {
    setModalType(type);
    setSelectedBrand(brand);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBrand(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileType = file.name.split('.').pop();

    if (fileType === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => setProducts(results.data),
        error: (err) => console.error('Error parsing CSV file:', err),
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

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Brands List', 20, 10);
    products.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.name}, Created On: ${product.createdOn}, Status: ${product.status}`,
        20,
        20 + index * 10
      );
    });
    doc.save('brands.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Brands');
    XLSX.writeFile(wb, 'brands.xlsx');
  };
  const filteredProducts = products
    .filter(
      (product) =>
        (filters.name === '' || product.name === filters.name) &&
        (filters.createdOn === '' || product.created_on === filters.createdOn) &&
        (filters.status === '' || product.status === filters.status) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.createdOn) - new Date(b.createdOn)
        : new Date(b.createdOn) - new Date(a.createdOn)
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueCategories = [...new Set(products.map((product) => product.name))];
  const uniqueCreatedOn = [...new Set(products.map((product) => product.created_on))];
  const uniqueStatuses = [...new Set(products.map((product) => product.status))];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = products.map((product) => product.id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandsData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    e.preventDefault();
    const updatedBrand = {
      name: brandsData.name || selectedBrand.name,
      status: brandsData.status || selectedBrand.status,
    };
    console.log(updatedBrand);
    updateBrandData(selectedBrand.id, updatedBrand);
  };

  // API Call to Update Category
  const updateBrandData = async (id, updatedBrand) => {
    try {
      const response = await fetch(`/Brands/brands/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBrand),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success('Brand updated successfully');
        handleCloseModal();
      } else {
        console.error(data.error || 'Failed to update brand');
      }
    } catch (error) {
        toast.error('Error updating brand:', error);
    }
  };

  const handleDeleteBrand = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/Brands/brands/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Brand deleted successfully');
        handleCloseModal();
      } else {
        const data = await response.json();
        console.error(data.error || 'Failed to delete brand');
      }
    } catch (error) {
      toast.error('Error deleting brand:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm container mx-auto px-4 py-6 md:mt-[5%] mt-[20%] font-nunito bg-white dark:bg-[#151530] dark:text-white">
      <div className="md:flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-lg mb-2 md:mb-0">Brands List</h2>
        <div className="md:flex space-x-2 space-y-2 md:space-y-0">
          <button onClick={openAddBrandModal} className="px-4 py-2 bg-emerald-500 text-white rounded">
            Add New Brand
          </button>
          <Link href="/Products/Create">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Product</button>
          </Link>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Import Brands</button>
          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">
            Export PDF
          </button>
          <button onClick={exportExcel} className="px-4 py-2 bg-blue-500 text-white rounded">
            Export Excel
          </button>
        </div>
      </div>

      <div className="flex md:justify-end mb-4">
        <button onClick={toggleFilters} className="bg-red-500 text-white px-4 py-2 rounded">
          {showFilters ? '✕' : <Filter size={20} strokeWidth={2} />}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 text-gray-500">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 bg-white px-4 py-2 rounded focus:outline-none"
          />
          <select onChange={(e) => setFilters({ ...filters, name: e.target.value })} className="border p-2 rounded">
            <option value="">Filter by name</option>
            {uniqueCategories.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select onChange={(e) => setFilters({ ...filters, createdOn: e.target.value })} className="border p-2 rounded">
            <option value="">Filter by Created On</option>
            {uniqueCreatedOn.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
          <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="border p-2 rounded">
            <option value="">Filter by Status</option>
            {uniqueStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      )}

      <table className="min-w-full bg-white dark:bg-[#1c1c3c] dark:text-white border border-gray-300">
        <thead>
          <tr className="bg-emerald-500 text-white">
            <th className="border px-4 py-2">
              <input type="checkbox" onChange={handleSelectAll} className="form-checkbox" />
            </th>
            <th className="border px-4 py-2">Brand ID</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Created On</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <tr key={index} className="border-b text-center">
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleSelectProduct(e, product.id)}
                  />
                </td>
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2">{product.created_on}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : product.status === 'inactive'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2 items-center justify-center gap-5">
                  <button
                    onClick={() => handleOpenModal('edit', product)}
                    className="p-2 border text-blue-600 hover:bg-[#288EC7] hover:text-white transform hover:scale-110"
                  >
                    <TbEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleOpenModal('delete', product)}
                    className="p-2 border text-red-500 hover:bg-red-500 hover:text-white transform hover:scale-110"
                  >
                    <RiDeleteBin5Line size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border text-center py-4">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalVisible && selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] p-6 rounded shadow-lg relative">
            <h2 className="text-lg mb-4 text-black">
              {modalType === 'edit' ? `Edit Brand: ${selectedBrand.name}` : 'Are you sure?'}
            </h2>
            {modalType === 'edit' ? (
              <form onSubmit={handleSaveChanges} className="text-black">
                <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Brand Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedBrand.name}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                  <select
                    name="status"
                    defaultValue={selectedBrand.status}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="text-black">
                <button
                  onClick={handleCloseModal}
                  className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
                >
                  ✕
                </button>
                <p className="mb-6">You won be able to revert this!</p>
                <p>
                  <strong>Brand:</strong> {selectedBrand.name}
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => handleDeleteBrand(selectedBrand.id)}
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

      {showAddBrandModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] p-6 rounded shadow-lg relative">
            <div className="flex justify-between items-center mb-4 text-black">
              <h2 className="text-lg font-semibold">Add New Brand</h2>
              <button onClick={closeAddBrandModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddBrand} className="text-black">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                    name="category"
                    value={newBrandData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                >
                    <option value="">Select Category</option>
                    {categoryNames.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 mb-2">Brand Name</label>
                <input
                    type="text"
                    name="name"
                    value={newBrandData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                    name="status"
                    value={newBrandData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                </div>

                <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded">
                Save Brand
                </button>
            </form>
          </div>
        </div>
      )}

      <div className="lg:flex justify-center items-center gap-5 mt-4">
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-2 mx-1 border rounded ${
              currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            {number + 1}
          </button>
        ))}
        <div>
          Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of{' '}
          {filteredProducts.length} entries
        </div>
      </div>
    </div>
  );
}
