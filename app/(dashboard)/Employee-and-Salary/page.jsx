"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function EmployeeAndSalary() {
    const pathname = usePathname();
    const spanClass = "block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700";

    // State variables
    const [employeesData, setEmployeesData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 15;

    // Fetch and merge data
    useEffect(() => {
        const fetchAndMergeData = async () => {
            try {
                const salaryResponse = await fetch('/Employee-and-Salary/Salary/salary');
                const salaryData = await salaryResponse.json();

                const newEmployeeResponse = await fetch('/Employee-and-Salary/New-Employee/new');
                const newEmployeeData = await newEmployeeResponse.json();

                const mergedData = newEmployeeData.data.map(newEmp => {
                    const matchingSalary = salaryData.find(
                        salary => salary.employee_name === newEmp.name || salary.email === newEmp.email
                    );

                    if (matchingSalary) {
                        // If salary data is found, use it
                        return {
                            id: matchingSalary.id,
                            joiningDate: new Date(matchingSalary.salary_month).toLocaleDateString('en-GB'),
                            name: matchingSalary.employee_name,
                            email: matchingSalary.email,
                            phone: newEmp.phone || 'N/A',
                            address: newEmp.address || 'N/A',
                            salary: `${parseFloat(matchingSalary.basic_salary).toFixed(2)} TK`,
                            overtimeRate: `${parseFloat(matchingSalary.overtime_rate).toFixed(2)} TK`,
                            totalReceivable: `${(parseFloat(matchingSalary.basic_salary) + parseFloat(matchingSalary.total_overtime) * parseFloat(matchingSalary.overtime_rate)).toFixed(2)} TK`,
                            totalPaid: `${parseFloat(matchingSalary.pay_amount).toFixed(2)} TK`,
                            totalDue: `${(parseFloat(matchingSalary.basic_salary) + parseFloat(matchingSalary.total_overtime) * parseFloat(matchingSalary.overtime_rate) - parseFloat(matchingSalary.pay_amount)).toFixed(2)} TK`
                        };
                    } else {
                        // If salary data is missing, calculate from new employee data
                        const basicSalary = parseFloat(newEmp.salary) || 0;
                        const overtimeRate = parseFloat(newEmp.overtime_rate) || 0;
                        const totalOvertime = 0; // Default value for overtime
                        const totalReceivable = basicSalary + (totalOvertime * overtimeRate);
                        return {
                            id: newEmp.id,
                            joiningDate: new Date(newEmp.joining_date).toLocaleDateString('en-GB'),
                            name: newEmp.name,
                            email: newEmp.email,
                            phone: newEmp.phone || 'N/A',
                            address: newEmp.address || 'N/A',
                            salary: `${basicSalary.toFixed(2)} TK`,
                            overtimeRate: `${overtimeRate.toFixed(2)} TK`,
                            totalReceivable: `${totalReceivable.toFixed(2)} TK`,
                            totalPaid: '0.00 TK', // No payment made yet
                            totalDue: `${totalReceivable.toFixed(2)} TK` // Total due equals total receivable
                        };
                    }
                });

                setEmployeesData(mergedData);
                setFilteredEmployees(mergedData);
            } catch (error) {
                console.error('Failed to fetch or merge data:', error);
            }
        };

        fetchAndMergeData();
    }, []);

    // Pagination logic
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    // Handle filtering
    const handleFilter = () => {
        const filtered = employeesData.filter(
            (employee) =>
                employee.name.toLowerCase().includes(filterName.toLowerCase()) &&
                employee.phone.includes(filterPhone)
        );
        setFilteredEmployees(filtered);
        setCurrentPage(1); // Reset to the first page
    };

    // Reset filtering
    const handleReset = () => {
        setFilterName('');
        setFilterPhone('');
        setFilteredEmployees(employeesData);
        setCurrentPage(1); // Reset to the first page
    };

    // Handle printing
    const handlePrint = () => {
        const printContent = document.getElementById("table-to-print").outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Employee and Salary Information</title>
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

    return (
        <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>
            <div className="p-0 mt-[25%] lg:mt-[5%] w-full">
                {/* Title Section */}
                <div className="mb-4 shadow-sm">
                    <h1 className="text-lg text-gray-500 dark:text-white mx-5">Employee and Salary</h1>
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

                <div className="w-full p-4">
                    {/* Filter Section */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
                            value={filterPhone}
                            onChange={(e) => setFilterPhone(e.target.value)}
                        />
                        <button
                            className="bg-emerald-500 text-white rounded px-8 py-2 mb-2 md:mb-0 md:mr-2"
                            onClick={handleFilter}
                        >
                            Filter
                        </button>
                        <button
                            className="bg-blue-500 text-white rounded px-8 py-2 mb-2 md:mb-0"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>

                    {/* Employee Table */}
                    <div className="overflow-x-auto md:mt-10">
                        <div className="flex items-center justify-between gap-5 mb-5">
                            <h1 className="text-gray-500 dark:text-white text-lg font-medium">Employees</h1>
                            <button
                                onClick={handlePrint}
                                className="bg-blue-500 text-white px-14 py-2 rounded"
                            >
                                Print
                            </button>
                        </div>
                        <table id="table-to-print" className="table-auto dark:text-white w-full border-collapse border">
                            <thead>
                                <tr className='bg-emerald-500 text-white'>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border">Joining Date</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Phone</th>
                                    <th className="px-4 py-2 border">Address</th>
                                    <th className="px-4 py-2 border">Salary</th>
                                    <th className="px-4 py-2 border">Over Time Rate</th>
                                    <th className="px-4 py-2 border">Total Receivable</th>
                                    <th className="px-4 py-2 border">Total Paid</th>
                                    <th className="px-4 py-2 border">Total Due</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((employee, index) => (
                                    <tr key={employee.id} className="text-center border-t">
                                        <td className="px-4 py-2 border">{indexOfFirstEmployee + index + 1}</td>
                                        <td className="px-4 py-2 border">{employee.joiningDate}</td>
                                        <td className="px-4 py-2 border">{employee.name}</td>
                                        <td className="px-4 py-2 border">{employee.email}</td>
                                        <td className="px-4 py-2 border">{employee.phone}</td>
                                        <td className="px-4 py-2 border">{employee.address}</td>
                                        <td className="px-4 py-2 border">{employee.salary}</td>
                                        <td className="px-4 py-2 border">{employee.overtimeRate}</td>
                                        <td className="px-4 py-2 border">{employee.totalReceivable}</td>
                                        <td className="px-4 py-2 border">{employee.totalPaid}</td>
                                        <td className="px-4 py-2 border">{employee.totalDue}</td>
                                        <td className="px-4 py-2 border">Manage</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-emerald-500 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
