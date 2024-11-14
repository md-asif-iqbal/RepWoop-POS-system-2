"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function Roles() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([
    { id: 1, name: 'SARAN', users: 0 },
    { id: 2, name: 'Employee', users: 0 },
    { id: 3, name: 'Mahadi', users: 0 },
    { id: 4, name: 'Admin', users: 1 },
    { id: 5, name: 'Operator', users: 1 },
  ]);

  const handleAddRole = () => {
    if (roleName) {
      setRoles([...roles, { id: roles.length + 1, name: roleName, users: 0 }]);
      setRoleName('');
    }
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
  };

  const handleEditRole = (id, newName) => {
    const updatedRoles = roles?.map((role) =>
      role.id === id ? { ...role, name: newName } : role
    );
    setRoles(updatedRoles);
  };
  return (
    <div className="container mx-auto p-6 mt-[20%] md:mt-[5%]">
      {/* Add Role Section */}
      <div className="mb-6">
        <h2 className=" dark:text-white text-xl font-bold mb-4">Add Role</h2>
        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2 mb-4 bg-white"
        />
        <button
          onClick={handleAddRole}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div>
        <h2 className=" dark:text-white text-xl font-bold mb-4">Roles</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Users</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role, index) => (
              <tr key={role.id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{role.name}</td>
                <td className="p-2 border">{role.users}</td>
                <td className="p-2 border flex gap-4 justify-center">
                  <Link href="/Roles-And-Permissions/Create">
                    <button className="bg-emerald-500 text-white p-1 rounded">
                      Permission
                    </button>
                  </Link>
                  
                  <button
                    onClick={() => handleEditRole(role.id, prompt('Edit Role Name:', role.name))}
                    className="bg-blue-500 text-white p-1 px-5 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}