"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from "next/navigation";
export default function RolesAndPermission() {

  const pathname = usePathname();
  const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"


  const permissionsData = [
    {
      section: 'Unit',
      permissions: [
        'list - unit',
        'create - unit',
        'delete - unit'
      ]
    },
    {
      section: 'Owner',
      permissions: [
        'list - owner',
        'create - owner',
        'edit - owner',
        'delete - owner'
      ]
    },
    {
      section: 'Bank Account',
      permissions: [
        'list - bank account',
        'create - bank account',
        'show - bank account',
        'bank account - add money',
        'bank account - withdraw money',
        'bank account - transfer',
        'bank account - history'
      ]
    },
    {
      section: 'Brand',
      permissions: [
        'list - brand',
        'create - brand',
        'edit - brand',
        'delete - brand'
      ]
    },
    {
      section: 'Category',
      permissions: [
        'list - category',
        'create - category',
        'edit - category',
        'delete - category'
      ]
    },
    {
      section: 'Product',
      permissions: [
        'list - product',
        'create - product',
        'edit - product',
        'delete - product',
        'product - sell history',
        'product - add category',
        'product - add brand',
        'product - barcode'
      ]
    },
    {
      section: 'POS',
      permissions: [
        'list - pos',
        'create - pos',
        'show - pos',
        'edit - pos',
        'delete - pos',
        'pos - add payment',
        'pos - add customer',
        'pos receipt',
        'chalan receipt',
        'pos - profit',
        'pos - purchase cost',
        'pos - purchase cost breakdown'
      ]
    },
    {
      section: 'Estimate',
      permissions: [
        'list - estimate',
        'create - estimate',
        'show - estimate',
        'edit - estimate',
        'delete - estimate'
      ]
    },
    {
      section: 'Return',
      permissions: [
        'list - return',
        'create - return',
        'delete - return'
      ]
    },
    {
      section: 'Purchase',
      permissions: [
        'list - purchase',
        'create - purchase',
        'show - purchase',
        'edit - purchase',
        'delete - purchase',
        'purchase - add payment',
        'purchase - add supplier',
        'purchase - receipt'
      ]
    },
    {
      section: 'Customer',
      permissions: [
        'list - customer',
        'create - customer',
        'edit - customer',
        'delete - customer',
        'customer - wallet payment',
        'customer - report'
      ]
    },
    {
      section: 'Supplier',
      permissions: [
        'list - supplier',
        'create - supplier',
        'edit - supplier',
        'delete - supplier',
        'supplier - wallet payment',
        'supplier - report'
      ]
    },
    {
      section: 'Employee',
      permissions: [
        'list - employee',
        'create - employee',
        'edit - employee',
        'delete - employee',
        'employee - create'
      ]
    },
    {
      section: 'Expense Category',
      permissions: [
        'list - expense category',
        'create - expense category',
        'edit - expense category',
        'delete - expense category'
      ]
    },
    {
      section: 'Expense',
      permissions: [
        'list - expense',
        'create - expense',
        'edit - expense',
        'delete - expense'
      ]
    },
    {
      section: 'Payment',
      permissions: [
        'list - payment',
        'create - payment',
        'delete - payment',
        'payment receipt'
      ]
    },
    {
      section: 'Damage',
      permissions: [
        'list - damage',
        'create - damage',
        'delete - damage'
      ]
    },
    {
      section: 'Role',
      permissions: [
        'list - role',
        'create - role',
        'edit - role',
        'delete - role',
        'permissions'
      ]
    },
    {
      section: 'User',
      permissions: [
        'list - user',
        'create - user',
        'edit - user',
        'delete - user'
      ]
    },
    {
      section: 'Cash Book',
      permissions: [
        'cash book'
      ]
    },
    {
      section: 'Stock',
      permissions: [
        'stock'
      ]
    },
    {
      section: 'Promotional SMS',
      permissions: [
        'promotional sms'
      ]
    },
    {
      section: 'Report',
      permissions: [
        'today report',
        'current month report',
        'summary report',
        'daily report',
        'customer due report',
        'supplier due report',
        'low stock report',
        'top customer report',
        'top product report',
        'top product all time report',
        'purchase report',
        'customer ledger',
        'supplier ledger',
        'profit loss report',
        'category sales'
      ]
    },
    {
      section: 'Misc',
      permissions: [
        'setting',
        'backup'
      ]
    },
    {
      section: 'Profile',
      permissions: [
        'profile',
        'change password'
      ]
    },
    {
      section: 'Dashboard',
      permissions: [
        'assets',
        'dashboard',
        'today sold',
        'today sold - purchase cost',
        'today expense',
        'today profit',
        'current month sold',
        'current month purchased',
        'current month expense',
        'current month returned',
        'current month profit',
        'total sold',
        'total purchased',
        'total expense',
        'total returned',
        'total profit',
        'total receivable',
        'total payable',
        'balance',
        'stock - purchase value',
        'stock - sell value',
        'total customer',
        'total supplier',
        'total invoices',
        'total products'
      ]
    },
    {
      section: 'Assets',
      permissions: [
        'create assets',
        'edit assets',
        'list assets',
        'delete assets'
      ]
    }
  ];
  

  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // Toggle individual permissions
  const togglePermission = (section, permission) => {
    setSelectedPermissions(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [permission]: !prevState[section]?.[permission]
      }
    }));
  };

  // Select/Deselect all permissions in a section
  const toggleSelectAllInSection = (section) => {
    const isAllSelected = permissionsData.find(sec => sec.section === section).permissions
      .every(perm => selectedPermissions[section]?.[perm]);

    const updatedPermissions = {};
    permissionsData.find(sec => sec.section === section).permissions.forEach(perm => {
      updatedPermissions[perm] = !isAllSelected;
    });

    setSelectedPermissions(prevState => ({
      ...prevState,
      [section]: updatedPermissions
    }));
  };

  // Select/Deselect all permissions globally
  const toggleSelectAllPermissions = () => {
    const updatedPermissions = {};
    permissionsData.forEach(section => {
      const sectionPermissions = {};
      section.permissions.forEach(permission => {
        sectionPermissions[permission] = !selectAll;
      });
      updatedPermissions[section.section] = sectionPermissions;
    });
    setSelectedPermissions(updatedPermissions);
    setSelectAll(!selectAll);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedPermissions);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-sm mt-[5%]">
      
      <h2 className='text-lg'>Role Permissions</h2>
<div className=' sm:md:flex items-start justify-start mt-5 gap-10 w-full'>
        <Link href="/Roles-And-Permissions" className= {`${
                          pathname === '/Users' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Roles
        <span className={spanClass}></span>
        </Link>
        <Link href="/Roles-And-Permissions/Permissions" className={`${
                          pathname === '/Roles-And-Permissions/Permissions' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + Permissions
        <span className={spanClass}></span>
        </Link>
        
    </div>
     <form onSubmit={handleSubmit}>
      

      {/* Select All Permissions */}
      <div className="mb-4 mt-4">
        <label className='flex justify-end items-center mb-4 gap-2'>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAllPermissions}
            className='bg-white'
          />
          Select All Permissions
        </label>
      </div>

      {/* Render Permissions Sections */}
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
     {permissionsData?.map((section, index) => (
        <div key={index} className="mb-4 border p-4 ">
          <div className='flex justify-between items-center mb-4'>
          <h3>{section.section}</h3>
          <div>
            <label className='flex justify-between items-center mb-4 gap-2'>
              <input
                className="form-checkbox bg-white"
                type="checkbox"
                onChange={() => toggleSelectAllInSection(section.section)}
                checked={section.permissions.every(perm => selectedPermissions[section.section]?.[perm])}
              />
              Select All
            </label>
          </div>
          </div>
          <ul >
            {section.permissions?.map((permission, i) => (
              <li key={i}>
                <label className='flex items-center mb-4 gap-2 '>
                  <input
                  className='bg-white'
                    type="checkbox"
                    checked={selectedPermissions[section.section]?.[permission] || false}
                    onChange={() => togglePermission(section.section, permission)}
                  />
                  {permission}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
     </div>

      {/* Submit Button */}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Permissions</button>

      {/* Example: Display selected permissions */}
      <div>
        <h3>Selected Permissions:</h3>
        <pre>{JSON.stringify(selectedPermissions, null, 2)}</pre>
      </div>
    </form>
  </div>
  )
}
