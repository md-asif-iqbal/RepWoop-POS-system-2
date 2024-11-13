"use client"

import Loader from "@/app/Loaders/page";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

export default function Users() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    // const users = [
    //     {
    //       id: 1,
    //       name: 'SOFT GHOR',
    //       email: 'oaretor@softghor.com',
    //       role: 'Operator',
    //       avatar: '/path-to-avatar1.jpg', // Replace with actual image path or placeholder
    //     },
    //     {
    //       id: 2,
    //       name: 'John Doe',
    //       email: 'johndoe@gmail.com',
    //       role: 'Admin',
    //       avatar: '/path-to-avatar2.jpg', // Replace with actual image path or placeholder
    //     },
    //     {
    //       id: 3,
    //       name: 'Jane Smith',
    //       email: 'janesmith@gmail.com',
    //       role: 'Editor',
    //       avatar: '/path-to-avatar3.jpg', // Replace with actual image path or placeholder
    //     },
    //     {
    //       id: 4,
    //       name: 'David Miller',
    //       email: 'davidmiller@gmail.com',
    //       role: 'Moderator',
    //       avatar: '/path-to-avatar4.jpg', // Replace with actual image path or placeholder
    //     },
    //     {
    //       id: 5,
    //       name: 'Emily Johnson',
    //       email: 'emilyjohnson@gmail.com',
    //       role: 'Viewer',
    //       avatar: '/path-to-avatar5.jpg', // Replace with actual image path or placeholder
    //     },
    //   ];
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const roles = ['Admin', 'Employee', 'Viewer'];
    // Function to open the modal with the specified action and user details
    const handleOpenModal = (action, user) => {
      setModalAction(action);
      setSelectedUser(user);
      setModalVisible(true);
    };
  
    // Function to close the modal
    const handleCloseModal = () => {
      setModalVisible(false);
      setSelectedUser(null);
      setModalAction(null);
      setPassword('');
      setShowPassword(false);
    };
  
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true); // Start loading before fetching data
        try {
          const response = await fetch('/Users/users');
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch user data');
          }
  
          const data = await response.json();
          setUsers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); // End loading after data is fetched
        }
      };
  
      fetchUsers();
    }, []);
  
    if (loading) {
      return <Loader/>// Show loading indicator
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    
    const handleDeleteUser = async (id) => {
      try {
        const response = await fetch(`/Users/users/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete user');
        }
    
        // Show success message
        toast.success('User deleted successfully!');
    
        // Refresh user data or update state to remove deleted user from UI
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        handleCloseModal();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error(error.message || 'An error occurred while deleting the user');
      }
    };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
  
    try {
      const updatedUserData = {
        name: selectedUser.name || previousUser.name,
        email: selectedUser.email || previousUser.email,
        role: selectedUser.role || previousUser.role,
        password: password || selectedUser.password,
      };
  
      // Make a PUT request to update the user in the database
      const response = await fetch(`/Users/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save user changes');
      }
  
      toast.success('User data updated successfully!');
      handleCloseModal();
    } catch (error) {
      console.error('Error saving user changes:', error);
      toast.error(error.message || 'An error occurred while saving user data');
    }
  };



    
  return (
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm dark:text-white'>

    <div className="p-0  mt-[25%] sm:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm rounded-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Users </h1>
    <div className=' sm:md:flex items-start justify-start mx-5 py-5 gap-10 '>
        <Link href="/Users" className= {`${
                          pathname === '/Users' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        Users
        <span className={spanClass}></span>
        </Link>
        <Link href="/Users/Create" className={`${
                          pathname === '/Users/Create' 
                          ? ' group text-orange-500  hover:text-orange-500' 
                          : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                      }`}>
        + New Users
        <span className={spanClass}></span>
        </Link>
        
    </div>
  </div>
  <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="table-auto dark:text-white w-full border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="border px-4 py-2">SL</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Avatar</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <Image width={200} height={300}  src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full mx-auto" />
                </td>
                <td className="border px-2 py-2">
                 
                  <button
                      onClick={() => handleOpenModal('edit', user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded mr-2"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenModal('delete', user)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
           {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center  transition-all duration-300 ease-in-out">
          <div className="bg-white w-[90%] md:w-[40%] lg:w-[30%] text-center p-6 rounded shadow-lg relative">
            {/* Close Button */}
            <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">✕</button>

            <h2 className="text-lg mb-4">
              {modalAction === 'edit' ? `Edit ${selectedUser.role}` : 'Are you sure you want to delete this user?'}
            </h2>

            {modalAction === 'edit' && selectedUser && (
              <form onSubmit={handleSaveChanges}>
                <div className="mb-4 text-start">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={selectedUser.name}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  />
                </div>
                <div className="mb-4 text-start">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedUser.email}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </div>
                <div className="mb-4 text-start">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                  <select
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    {roles?.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 relative text-start">
                  <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </form>
            )}

            {modalAction === 'delete' && selectedUser && (
              <div>
                <p className="">User Name: {selectedUser.name}</p>
                <p className="">User Email: {selectedUser.email}</p>
                <p className="">User Role: {selectedUser.role}</p>
                <p className="mb-6">You won’t be able to revert this!</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                  >
                    Yes, delete it!
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
        </table>
      </div>
    </div>
    
</div>
</div>
  )
}
