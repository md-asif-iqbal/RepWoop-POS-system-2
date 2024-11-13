"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from '@/app/Loaders/page';

export default function Units() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"

    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUnits = async () => {
        try {
          const response = await fetch('/Units/units'); // Call the API route
          if (!response.ok) throw new Error('Failed to fetch units');
          const data = await response.json();
          setUnits(data);
        } catch (error) {
          console.error('Error fetching units:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUnits();
    }, []);
  

      const onAddUnit = (newUnit) => {
        setUnits((prevUnits) => [...prevUnits, newUnit]);
      };
    
      const [currentPage, setCurrentPage] = useState(1);
      const rowsPerPage = 20;
    
      // Pagination logic
      const totalPages = Math.ceil(units.length / rowsPerPage);
      const currentData = units.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

function convertUnit(value, unit) {
  // Log the available units to debug
  console.log('Available units:', units.map((u) => u.unit));

  // Use case-insensitive search for the unit
  const unitData = units?.find((u) => u.unit.toLowerCase() === unit.toLowerCase());
  console.log(unitData);

  if (!unitData) {
    console.error('Unit not found');
    return null;
  }

  const { unit_value, related_sign } = unitData;

  // Perform the calculation based on the Related_Sign
  let result;
  switch (related_sign) {
    case '*':
      result = value * unit_value;
      break;
    case '/':
      result = value / unit_value;
      break;
    case '+':
      result = value + unit_value;
      break;
    case '-':
      result = value - unit_value;
      break;
    default:
      console.error('Invalid Related_Sign');
      return null;
  }

  return result;
}




      if (loading) return <Loader/>;
      if (error) return <p>Error: {error}</p>;

  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white'>

    <div className="p-0  mt-[25%] sm:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm rounded-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Units </h1>
    <div className=' sm:md:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Units" className= {`${
                          pathname === '/Units' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Units
        <span className={spanClass}></span>
        </Link>
        <Link href="/Units/Create" className={`${
                          pathname === '/Units/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + Add Unit
        <span className={spanClass}></span>
        </Link>
        
    </div>
  </div>
  <div className="container px-4 py-8">


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto dark:text-white w-full border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Related To</th>
              <th className="border px-4 py-2">Related Sign</th>
              <th className="border px-4 py-2">Related Value</th>
              <th className="border px-4 py-2">Result</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((unit, index) => (
              <tr key={unit.id} className="text-center">
                <td className="border px-4 py-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="border px-4 py-2">{unit.unit}</td>
                <td className="border px-4 py-2">{unit.related_to}</td>
                <td className="border px-4 py-2">{unit.related_sign}</td>
                <td className="border px-4 py-2">{unit.unit_value}</td>
                <td className="border px-4 py-2">  {(() => {
                  if (unit.related_sign === '*') {
                    return `Result: ${unit.unit_value * 5}`; // Multiplication
                  } else if (unit.related_sign === '/') {
                    return `Result: ${(unit.unit_value / 2).toFixed(2)}`; // Division
                  } else if (unit.related_sign === '+') {
                    return `Result: ${unit.unit_value + 10}`; // Addition
                  } else if (unit.related_sign === '-') {
                    return `Result: ${unit.unit_value}`; // Subtraction
                  } else {
                    return 'Invalid operation'; // Fallback for unsupported signs
                  }
                })()}</td>
                <td className="border px-4 py-2">
                  <div className="inline-flex space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  
</div>
</div>
  )
}
