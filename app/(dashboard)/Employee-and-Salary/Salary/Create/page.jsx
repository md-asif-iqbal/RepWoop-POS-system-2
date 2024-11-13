"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function EmployeeSalary() {
     const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const [formData, setFormData] = useState({
        salaryMonth: new Date().toISOString().split('T')[0], // Set today's date as the default
        employee: '',
        basicSalary: '',
        overtimeRate: '',
        totalOvertime: '',
        totalSalary: '',
        advanceAmount: '0',
        payAmount: '',
        transactionAccount: 'CASH',
      });
    
      const transactionAccounts = [
        'CASH',
        'IBBL',
        'Nagud',
        'Bkash',
        'Shobuj',
        'City Bank',
        'aa',
        '1347908644477', // Example data from dropdown
      ];
    
      const employees = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Robert Downey' },
        // Add more employees as needed
      ];
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add your submit logic here (e.g., sending data to an API)
      };
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>

    <div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Employee Salary added</h1>
    <div className=' lg:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Employee-and-Salary" className= {`${
                          pathname === '/Employee-and-Salary' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Employees
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/New-Employee" className={`${
                          pathname === '/Employee-and-Salary/New-Employee' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + New Employee
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/Salary" className= {`${
                          pathname === '/Employee-and-Salary/Salary' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Employees Salary
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/Salary/Create" className= {`${
                          pathname === '/Employee-and-Salary/Salary/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + New Employee Salary
        <span className={spanClass}></span>
        </Link>
        <Link href="/Employee-and-Salary/Payments" className= {`${
                          pathname === '/Employee-and-Salary/Payments' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Payment List
        <span className={spanClass}></span>
        </Link>
    </div>
  </div>
  <div className="w-full  mx-auto p-4">
      <h2 className=" dark:text-white text-lg  mb-4">Employee Salary</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {/* Salary Month and Employee */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="salaryMonth">
              Salary Month<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="salaryMonth"
              name="salaryMonth"
              type="date"
              value={formData.salaryMonth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="employee">
              Employee<span className="text-red-500">*</span>
            </label>
            <select
              className="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="employee"
              name="employee"
              value={formData.employee}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Employee</option>
              {employees?.map((employee) => (
                <option key={employee.id} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Basic Salary, Overtime Rate, Total Overtime, Total Salary */}
        <div className="flex -mx-3 mb-6">
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="basicSalary">
              Basic Salary<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="basicSalary"
              name="basicSalary"
              type="number"
              placeholder="Enter Basic Salary"
              value={formData.basicSalary}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="overtimeRate">
              Overtime Rate
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="overtimeRate"
              name="overtimeRate"
              type="number"
              placeholder="Overtime Rate"
              value={formData.overtimeRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="totalOvertime">
              Total Overtime (hr)
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="totalOvertime"
              name="totalOvertime"
              type="number"
              placeholder="Total Overtime (hr)"
              value={formData.totalOvertime}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/4 px-3">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="totalSalary">
              Total Salary
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="totalSalary"
              name="totalSalary"
              type="number"
              placeholder="Total Salary"
              value={formData.totalSalary}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Advance Amount and Pay Amount */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="advanceAmount">
              Advance Amount
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="advanceAmount"
              name="advanceAmount"
              type="number"
              placeholder="Enter Advance Amount"
              value={formData.advanceAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="payAmount">
              Pay Amount
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="payAmount"
              name="payAmount"
              type="number"
              placeholder="Enter Pay Amount"
              value={formData.payAmount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Transaction Account */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/4 px-3">
            <label className="block  tracking-wide text-gray-700 text-xs  mb-2" htmlFor="transactionAccount">
              Transaction Account
            </label>
            <select
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="transactionAccount"
              name="transactionAccount"
              value={formData.transactionAccount}
              onChange={handleInputChange}
            >
              {transactionAccounts?.map((account, index) => (
                <option key={index} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-center">
          <button
            className="bg-emerald-500 hover:bg-teal-700 text-white  py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>


 
</div>
</div>
  )
}
