"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import Loader from '@/app/Loaders/page';


export default function AccountPage() {
  const {user} = useUser();
  const userRole = user.role;
  const [accountName, setAccountName] = useState('');
  const [openingBalance, setOpeningBalance] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null); // Store selected account
  const [fromAccounts, setfromAccount] = useState(''); // Store from account
  const [balanceForm, setBalanceForm] = useState({ amount:'', note: '', owner: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    // Generate a unique ID between 5 and 20 digits
    const uniqueId = Math.floor(Math.random() * 10_000_000_000_000_000) + 10_000;

    try {
      const response = await fetch('/Bank_Accounts/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountName,
          openingBalance,
          uniqueId,
          userRole,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
      } else {
        alert('Account added successfully!');
        setAccountName('');
        setOpeningBalance(0);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account');
    }
  };


  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch('/Bank_Accounts/accounts');
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, []);
  if (loading) return <p> <Loader/></p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddBalance = async () => {
    console.log(selectedAccount.account_id,);
    try {
      // Convert balanceForm.amount to a number
      const amount = parseFloat(balanceForm.amount);
      console.log(amount);
  
      // Check if the conversion was successful and amount is a valid number
      if (isNaN(amount)) {
        alert("Please enter a valid number for the amount");
        return;
      }
  
      const response = await fetch('/Bank_Accounts/balance', {
        method: 'PUT',  // Changed to PUT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: selectedAccount.account_id,
          amount: amount,
        }),
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          alert('Account not found');
        } else {
          const errorMessage = await response.text();
          alert(`Error: ${errorMessage}`);
        }
        return;
      }
  
      const data = await response.json();
      const updatedAccounts = accounts?.map((account) =>
        account.account_id === selectedAccount.account_id
          ? { ...account, current_balance: data.current_balance }
          : account
      );
  
      setAccounts(updatedAccounts);
      setShowAddBalanceModal(false); // Close modal
      setBalanceForm({ amount: '', note: '', owner: '' }); // Reset form
    } catch (error) {
      console.error('Error adding balance:', error);
      alert('Failed to add balance. Check the console for details.');
    }
  };

// Function to get account ID by name
const getAccountIdByName = (accountName) => {
  const account = accounts.find(acc => acc.name === accountName);
  return account ? account.account_id : null; // Return the ID if found, otherwise null
};

  const handleTransferBalance = async () => {
    try {
      const transferAmount = parseFloat(balanceForm.amount);
  
      if (isNaN(transferAmount) || transferAmount <= 0) {
        alert("Please enter a valid transfer amount.");
        return;
      }
  
      // Find the account IDs for fromAccount and toAccount
      const fromAccount =  selectedAccount.account_id;
      const toAccount = getAccountIdByName(balanceForm.owner);

      
  
      if (!fromAccount) {
        alert("Source account not found.");
        return;
      }
      if (!toAccount) {
        alert("Destination account not selected.");
        return;
      }
  
      const response = await fetch('/Bank_Accounts/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccountId: fromAccount, // Ensure this ID is passed correctly
          toAccountId: toAccount,
          amount: transferAmount,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
        return;
      }
  
      const data = await response.json();
      alert("Transfer successful");
  
      // Update the local accounts list to reflect the new balances
      setAccounts(prevAccounts =>
        prevAccounts?.map(account =>
          account.id === toAccount.id
            ? { ...account, current_balance: data.toAccountBalance }
            : account
        )
      );
      setShowTransferModal(false); // Close modal
      setBalanceForm({ amount: '', note: '', owner: '' }); // Reset form
    } catch (error) {
      console.error('Error transferring balance:', error);
      alert('Failed to transfer balance. Check the console for details.');
    }
  };
    
  return (
    <div className='dark:bg-[#141432] h-full font-nunito text-sm bg-white p-2'>
        <div className="  py-8  mt-[25%] md:mt-[5%]">
      {/* New Account Section */}
      <div className="p-0 shadow-sm rounded-md  ">
        <h2 className=" dark:text-white text-lg  mb-4">New Account</h2>
        <div className="lg:flex md:space-x-4 space-y-3 md:space-y-0">
        <input
          type="text"
          placeholder="Enter Account Name"
          className="border border-gray-300 rounded px-4 py-2 flex-1 bg-white w-full"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Opening Balance"
          className="border border-gray-300 rounded px-4 py-2 flex-1 bg-white w-full"
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value)}
        />
        <button
          className="bg-emerald-500 text-white px-8 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="overflow-x-auto shadow-sm dark:bg-[#1a1a3d] w-full mt-5">
  <h2 className="  text-lg mb-4 dark:text-white">Accounts</h2>
  <table className="min-w-full w-full border-collapse">
    <thead>
      <tr className="bg-emerald-500 text-white">
        <th className="py-2 px-2 md:px-4 border">SL</th>
        <th className="py-2 px-2 md:px-4 border">Name</th>
        <th className="py-2 px-2 md:px-4 border">Opening Balance</th>
        <th className="py-2 px-2 md:px-4 border">Current Balance</th>
        <th className="py-2 px-2 md:px-4 border">Actions</th>
      </tr>
    </thead>
    <tbody>
          {accounts?.map((account,index) => (
        <tr key={account.account_id} className="text-center dark:text-white">
          <td className="py-2 px-2 md:px-4 border">{index + 1}</td>
          <td className="py-2 px-2 md:px-4 border">{account.name}</td>
          <td className="py-2 px-2 md:px-4 border">Tk.{parseFloat(account.opening_balance).toFixed(2)}</td>
          <td className="py-2 px-2 md:px-4 border">Tk.{parseFloat(account.current_balance).toFixed(2)}</td>
          <td className="py-2 px-2 md:px-4 border grid grid-cols-1 gap-5 md:grid-cols-3">
            <button
              className="border-b-2 border-teal-500 hover:bg-emerald-500 hover:text-white dark:text-white px-0 py-1 md:px-4 md:py-2 rounded"
              onClick={() => {
                setSelectedAccount(account);
                setShowAddBalanceModal(true);
              }}
            >
              Add Balance
            </button>

            <button
              className="border-b-2 border-teal-500 hover:bg-emerald-500 hover:text-white dark:text-white px-0 py-1 md:px-4 md:py-2 rounded"
              onClick={() => {
                setSelectedAccount(account);
                setShowTransferModal(true);
                
              }}
            >
              Transfer
            </button>

           <Link href={`/Bank_Accounts/${account.account_id}/history`} className='bg-emerald-500 text-white px-0 py-1 md:px-4 md:py-2 rounded'>
                History
           </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Modal for Adding Balance */}
        {showAddBalanceModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 md:p-8 shadow-sm w-full max-w-xs md:max-w-md lg:max-w-lg mx-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className=" dark:text-white text-md md:text-lg">Add Balance to {selectedAccount?.name}</h2>
                <button className="text-gray-500 text-lg" onClick={() => setShowAddBalanceModal(false)}>
                  &times;
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-2 py-1 md:px-4 md:py-2 bg-white"
                  value={balanceForm.amount}
                  onChange={(e) => setBalanceForm({ ...balanceForm, amount: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Note</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-2 py-1 md:px-4 md:py-2"
                  rows="3"
                  value={balanceForm.note}
                  onChange={(e) => setBalanceForm({ ...balanceForm, note: e.target.value })}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Owner</label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 md:px-4 md:py-2"
                  value={balanceForm.owner}
                  onChange={(e) => setBalanceForm({ ...balanceForm, owner: e.target.value })}
                >
                  <option value="">Select Owner</option>
                    <option key={selectedAccount.account_id} value={selectedAccount?.name}>
                      {selectedAccount?.name}
                    </option>
              
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddBalance}>
                  Add Balance
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowAddBalanceModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Transferring Balance */}
        {showTransferModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 md:p-8 shadow-sm w-full max-w-xs md:max-w-md lg:max-w-lg mx-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className=" dark:text-white text-md md:text-lg">Transfer Balance From {selectedAccount?.name}</h2>
                <button className="text-gray-500 text-lg" onClick={() => setShowTransferModal(false)}>
                  &times;
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  className="w-full border bg-white border-gray-300 rounded px-2 py-1 md:px-4 md:py-2"
                  value={balanceForm.amount}
                  onChange={(e) => setBalanceForm({ ...balanceForm, amount: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Note</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-2 py-1 md:px-4 md:py-2"
                  rows="3"
                  value={balanceForm.note}
                  onChange={(e) => setBalanceForm({ ...balanceForm, note: e.target.value })}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">To Account</label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 md:px-4 md:py-2"
                  value={balanceForm.owner}
                  onChange={(e) => setBalanceForm({ ...balanceForm, owner: e.target.value })}
                >
                  <option value="">Select Account</option>
                  {accounts
                      .filter((account) => account.name !== selectedAccount.name) // Filter out the single selected account
                      ?.map((account) => (
                        <option key={account.id} value={account.name} >
                          {account.name} <span onMouseEnter={() =>setfromAccount(account.account_id)}>{account.account_id}</span>
                        </option>
                      ))}
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleTransferBalance}>
                  Transfer
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowTransferModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
    </div>

  );
}
