'use client'


import Loader from '@/app/Loaders/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AccountHistoryPage ({ params }) {
  const router = useRouter();
  const { account_id } = params; // Get account_id from the params
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account_id) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/accounts/${account_id}/history`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch history');
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      }finally {
        setLoading(false); // End loading
      }
    };

    fetchHistory();
  }, [account_id]);

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Transaction History for Account ID: ${account_id}</title>
          <style>
            body { font-family: Arial, sans-serif;}
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()" >
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, '')} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };
  return (
    <div className='mt-[20%] md:mt-[5%]'>

<div className="p-4 w-full mx-auto text-sm dark:text-white">
  <Link href="/Bank_Accounts">
  <button className='underline btn btn-accent text-white'>
  /Back
  </button>
  </Link>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transaction History for Account ID: {account_id}</h2>
        <button onClick={handlePrint} className="bg-teal-500 text-white px-8 py-2 rounded">Print</button>
      </div>

      <div className="overflow-x-auto">
        <table id='table-to-print' className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Amount</th>
              
              <th className="py-2 px-4 border">Balance After</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((transaction,index) => (
              <tr key={transaction.history_id} className="border-b">
                <td className="py-2 px-4 border">{index+1}</td>
                <td className="py-2 px-4 border">{transaction.transaction_type}</td>
                <td
                  className={`py-2 px-4 border ${transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}
                >
                  {transaction.amount} Tk
                </td>
                <td className={`py-2 px-4 border ${transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.balance_after_transaction} TK</td>
                <td className="py-2 px-4 border">{new Date(transaction.date).toLocaleString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


    </div>
  )
}
