import { query } from '../../../../lib/db';

// export async function getAccountHistory(req) {
//   const { accountId } = req.query; // Assume accountId is passed in query

//   const result = await query(
//     'SELECT transaction_type, amount, date, balance_after_transaction FROM account_history WHERE account_id = $1 ORDER BY date DESC',
//     [accountId]
//   );

//   return new Response(JSON.stringify(result.rows), { status: 200 });
// }


// export async function POST(req) {
//     try {
//       const { fromAccountId, toAccountId, amount } = await req.json();
//       const transferAmount = parseFloat(amount);
  
//       if (isNaN(transferAmount) || transferAmount <= 0) {
//         return new Response(JSON.stringify({ error: 'Invalid transfer amount provided' }), { status: 400 });
//       }
  
//       await query('BEGIN'); // Start transaction
  
//       // Get current balance for fromAccount
//       const fromAccountResult = await query(
//         'SELECT current_balance FROM bank_account WHERE account_id = $1 FOR UPDATE',
//         [fromAccountId]
//       );
  
//       if (fromAccountResult.rowCount === 0) {
//         await query('ROLLBACK');
//         return new Response(JSON.stringify({ error: 'Source account not found' }), { status: 404 });
//       }
  
//       const fromAccountBalance = parseFloat(fromAccountResult.rows[0].current_balance);
//       if (fromAccountBalance < transferAmount) {
//         await query('ROLLBACK');
//         return new Response(JSON.stringify({ error: 'Insufficient funds in source account' }), { status: 400 });
//       }
  
//       // Deduct from fromAccount
//       const newFromAccountBalance = fromAccountBalance - transferAmount;
//       await query(
//         'UPDATE bank_account SET current_balance = $1 WHERE account_id = $2',
//         [newFromAccountBalance, fromAccountId]
//       );
  
//       // Log withdrawal in account_history for fromAccount
//       await query(
//         `INSERT INTO account_history (account_id, transaction_type, amount, balance_after_transaction)
//          VALUES ($1, 'Withdrawal', $2, $3)`,
//         [fromAccountId, transferAmount, newFromAccountBalance]
//       );
  
//       // Get current balance for toAccount
//       const toAccountResult = await query(
//         'SELECT current_balance FROM bank_account WHERE account_id = $1 FOR UPDATE',
//         [toAccountId]
//       );
  
//       if (toAccountResult.rowCount === 0) {
//         await query('ROLLBACK');
//         return new Response(JSON.stringify({ error: 'Destination account not found' }), { status: 404 });
//       }
  
//       const toAccountBalance = parseFloat(toAccountResult.rows[0].current_balance);
//       const newToAccountBalance = toAccountBalance + transferAmount;
  
//       // Add to toAccount
//       await query(
//         'UPDATE bank_account SET current_balance = $1 WHERE account_id = $2',
//         [newToAccountBalance, toAccountId]
//       );
  
//       // Log deposit in account_history for toAccount
//       await query(
//         `INSERT INTO account_history (account_id, transaction_type, amount, balance_after_transaction)
//          VALUES ($1, 'Deposit', $2, $3)`,
//         [toAccountId, transferAmount, newToAccountBalance]
//       );
  
//       await query('COMMIT'); // Commit transaction
  
//       return new Response(
//         JSON.stringify({
//           message: 'Transfer successful',
//           fromAccountBalance: newFromAccountBalance,
//           toAccountBalance: newToAccountBalance,
//         }),
//         { status: 200, headers: { 'Content-Type': 'application/json' } }
//       );
//     } catch (error) {
//       await query('ROLLBACK');
//       console.error('Error during balance transfer:', error);
//       return new Response('Failed to complete transfer', { status: 500 });
//     }
//   }


export default async function handler(req, res) {
  const { account_id } = req.query;

  if (!account_id) {
    return res.status(400).json({ error: 'Account ID is required' });
  }

  try {
    // Fetch history for the specified account_id
    const result = await query(
      `SELECT * FROM account_history WHERE account_id = $1 ORDER BY date DESC`,
      [account_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No transaction history found for this account' });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching account history:', error);
    return res.status(500).json({ error: 'Failed to fetch account history' });
  }
}