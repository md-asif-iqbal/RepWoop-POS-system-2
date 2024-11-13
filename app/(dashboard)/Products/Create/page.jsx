'use client'
import { jsPDF } from 'jspdf';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';


export default function ProductCreate() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const { user } = useUser();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedMainUnit, setSelectedMainUnit] = useState('');
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [subUnit, setSubUnit] = useState('');
    const [openingStock, setOpeningStock] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [purchaseCost, setPurchaseCost] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [mainUnits, setUnits] = useState([
      'pc', 'Dozen', 'gm', 'Kg', 'ml', 'Litre', 'Box', 'Screw Packet', 'thousand', 
      'Shoes_pair', 'Shoes_pair_2', 'Shoes_pair_3', 'Pcs', 'Dz', 'kg', 'sack', 
      'Tonne', 'Ounces', 'Pound', 'gm_2', 'Box_2', 'Pack', 'Meter', 'Square Meter', 'Tonne_2'
    ]);
      // New state variables
  const [discount, setDiscount] = useState('');
  const [showExpireDate, setShowExpireDate] = useState(false);
  const [expireDate, setExpireDate] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);

  const [categoryData, setCategoryData] = useState({
    category: newCategory || '',
    category_slug: (newCategory ? newCategory.toLowerCase() : ''),
    status: selectedCategory?.status || 'active',
  });
  

    // Adding new category to the list
    const handleAddCategory= async (e) => {
      e.preventDefault();

      const newCategorys = {
        category: newCategory,
        category_slug: (newCategory ? newCategory.toLowerCase() : ''),
        status:'active',
    };
    // console.log(newCategorys);
    try {
      const response = await fetch(`/Categories/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategorys),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to add category');

      toast.success('Category added successfully!');
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowCategoryModal(false);
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
    };
  

    const handleAddBrand = async (e) => {
      e.preventDefault();
      if (!newCategory) {
          toast.info("Please select a category and enter a brand name.");
          return;
        }
        const addedNewBrand = {
          name: newBrand,
          category: newCategory,
          status: 'active',
        }
      try {
          const response = await fetch('/Brands/brands', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addedNewBrand),
          });
      
          const data = await response.json();
          if (response.ok) {
            toast.success('Brand added successfully!');
            setNewCategory('');
            setNewBrand('');
            setShowBrandModal(false);
          } else {
            toast.error(data.error || 'Failed to add brand');
          }
        } catch (error) {
          console.error('Error adding brand:', error);
        }
    };

  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productCode', productCode);
      formData.append('selectedCategory', selectedCategory);
      formData.append('selectedBrand', selectedBrand);
      formData.append('selectedMainUnit', selectedMainUnit);
      formData.append('subUnit', subUnit);
      formData.append('openingStock', openingStock);
      formData.append('salePrice', salePrice);
      formData.append('purchaseCost', purchaseCost);
      formData.append('productDetails', productDetails);
      formData.append('productImage', productImage); 
      formData.append('userName', user.name);
      formData.append('email', user.email); 
    
      // Conditionally add optional fields
      if (discount) {
        formData.append('discount', discount);
      }
      if (showExpireDate && expireDate) {
        formData.append('expireDate', expireDate);
      }
    
      try {
        const response = await fetch('/Products/Create/products', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
    
        const result = await response.json();
        alert('Product added successfully!');
        console.log('Response:', result);
        
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('Failed to add product. Check the console for details.');
      }
    };

    useEffect(() => {
      async function fetchCategories() {
        try {
          const response = await fetch('/Categories/categories');
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        } finally {
        }
      }
  
      fetchCategories();
    }, []);
      // Create a constant for category names
    const categoryNames = categories.map((cat) => cat.category);

      useEffect(() => {
        const fetchBrands = async () => {
          try {
            const response = await fetch('/Brands/brands');
            const data = await response.json();
            setBrands(data);
           
          } catch (error) {
            console.error('Error fetching brand data:', error);
         
          }
        };
        fetchBrands();
      }, []);


       // Handle category selection
        const handleCategoryChange = (e) => {
          const selected = e.target.value;
          setSelectedCategory(selected);

          // Find the selected category object
          const category = categories.find((cat) => cat.category === selected);

          if (category && category.brands) {
            // Parse the JSON strings in the brands array
            const brands = category.brands.map((brand) => JSON.parse(brand));
            setFilteredBrands(brands);
          } else {
            setFilteredBrands([]);
          }
        };

  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white'>

    <div className="p-0  mt-[25%] sm:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm rounded-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Users </h1>
    <div className=' sm:md:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Products" className= {`${
                          pathname === '/Products' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Products
        <span className={spanClass}></span>
        </Link>
        <Link href="/Products/Create" className={`${
                          pathname === '/Products/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + Add Products
        <span className={spanClass}></span>
        </Link>
        
    </div>
  </div>

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
            onChange={(e) => setProductName(e.target.value)}
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
              onChange={handleCategoryChange}
              className="bg-white 
               p-2 border rounded w-full text-black"
            >
              <option value="">Search Categories</option>
              {categoryNames.map((category, index) => (
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
              {filteredBrands?.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand.name}
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

      {/* Modals for adding new category */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg mb-4">Add Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="bg-white 
               p-2 border rounded w-full mb-4"
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setShowCategoryModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modals for adding new brand */}
      {showBrandModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-0 flex justify-center items-center">
          <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] p-6 rounded shadow-lg relative">
          <div className="flex justify-between items-center mb-4 text-black">
              <h2 className="text-lg font-semibold">Add New Brand</h2>
              <button onClick={() => setShowBrandModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                    name="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                >
                    <option value="">Select Category</option>
                    {categoryNames?.map((category, index) => (
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
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
                </div>
                <button onClick={handleAddBrand} type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded">
                Save Brand
                </button>


          </div>
        </div>
      )}
    </form>
      </div>
</div>
</div>
  )
}
