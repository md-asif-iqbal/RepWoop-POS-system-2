import { query } from '../../../../lib/db';

// export async function PUT(req) {
//   try {
//     const { accountId, amount } = await req.json();

//     // Parse and validate the amount
//     const parsedAmount = parseFloat(amount);
//     if (isNaN(parsedAmount)) {
//       return new Response(JSON.stringify({ error: 'Invalid amount provided' }), { status: 400 });
//     }

//     // Retrieve the current balance for the account with the given account_id
//     const result = await query(
//       `SELECT opening_balance, current_balance FROM bank_account WHERE account_id = $1`,
//       [accountId]
//     );

//     if (result.rowCount === 0) {
//       return new Response(JSON.stringify({ error: 'Account not found' }), { status: 404 });
//     }

//     const { opening_balance, current_balance } = result.rows[0];

//     // Calculate the new balance
//     const newBalance = parseFloat(current_balance) + parsedAmount;

//     // Update the current_balance with the new balance in PostgreSQL, formatted to two decimal places
//     await query(
//       `UPDATE bank_account SET current_balance = $1 WHERE account_id = $2`,
//       [newBalance.toFixed(2), accountId] // Ensure two decimal places
//     );

//     return new Response(
//       JSON.stringify({
//         message: 'Balance updated successfully',
//         current_balance: newBalance.toFixed(2), // Return formatted balance
//       }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error('Error updating balance:', error);
//     return new Response('Failed to update balance', { status: 500 });
//   }
// }


// balanace transfer

// export async function POST(req) {
//   try {
//     const { fromAccountId, toAccountId, amount } = await req.json();

//     console.log("Received fromAccountId:", fromAccountId); // Debugging
//     console.log("Received toAccountId:", toAccountId);     // Debugging
//     console.log("Transfer amount:", amount);               // Debugging

//     const transferAmount = parseFloat(amount);
//     if (isNaN(transferAmount) || transferAmount <= 0) {
//       return new Response(JSON.stringify({ error: 'Invalid transfer amount provided' }), { status: 400 });
//     }

//     await query('BEGIN');

//     // Check the balance of the fromAccount
//     const fromAccountResult = await query(
//       'SELECT current_balance FROM bank_account WHERE account_id = $1 FOR UPDATE',
//       [fromAccountId]
//     );

//     console.log("fromAccountResult:", fromAccountResult.rows); // Debugging

//     if (fromAccountResult.rowCount === 0) {
//       await query('ROLLBACK');
//       return new Response(JSON.stringify({ error: 'Source account not found' }), { status: 404 });
//     }

//     const fromAccountBalance = parseFloat(fromAccountResult.rows[0].current_balance);

//     if (fromAccountBalance < transferAmount) {
//       await query('ROLLBACK');
//       return new Response(JSON.stringify({ error: 'Insufficient balance in the source account' }), { status: 400 });
//     }

//     await query(
//       'UPDATE bank_account SET current_balance = current_balance - $1 WHERE account_id = $2',
//       [transferAmount, fromAccountId]
//     );

//     const toAccountResult = await query(
//       'UPDATE bank_account SET current_balance = current_balance + $1 WHERE account_id = $2 RETURNING current_balance',
//       [transferAmount, toAccountId]
//     );

//     if (toAccountResult.rowCount === 0) {
//       await query('ROLLBACK');
//       return new Response(JSON.stringify({ error: 'Destination account not found' }), { status: 404 });
//     }

//     await query('COMMIT');

//     return new Response(
//       JSON.stringify({
//         message: 'Transfer successful',
//         toAccountBalance: toAccountResult.rows[0].current_balance,
//       }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     await query('ROLLBACK');
//     console.error('Error during balance transfer:', error);
//     return new Response('Failed to complete transfer', { status: 500 });
//   }
// }

export async function PUT(req) {
  try {
    const { accountId, amount } = await req.json();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return new Response(JSON.stringify({ error: 'Invalid amount provided' }), { status: 400 });
    }

    // Retrieve the current balance
    const result = await query(
      `SELECT opening_balance, current_balance, name AS account_name FROM bank_account WHERE account_id = $1`,
      [accountId]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Account not found' }), { status: 404 });
    }

    const { opening_balance, current_balance, account_name } = result.rows[0];
    const newBalance = parseFloat(current_balance) + parsedAmount;

    // Update the current_balance
    await query(
      `UPDATE bank_account SET current_balance = $1 WHERE account_id = $2`,
      [newBalance.toFixed(2), accountId]
    );

    // Log in account_history
    const today = new Date();
    await query(
      `INSERT INTO account_history (account_id, account_name, transaction_type, amount, date, balance_after_transaction)
       VALUES ($1, $2, 'Deposit', $3, $4, $5)`,
      [accountId, account_name, parsedAmount, today, newBalance.toFixed(2)]
    );

    return new Response(
      JSON.stringify({
        message: 'Balance updated successfully',
        current_balance: newBalance.toFixed(2),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating balance:', error);
    return new Response('Failed to update balance', { status: 500 });
  }
}


// Balance Transfer (POST Method)
export async function POST(req) {
  try {
    const { fromAccountId, toAccountId, amount } = await req.json();

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid transfer amount provided' }), { status: 400 });
    }

    await query('BEGIN');

    // Retrieve fromAccount details
    const fromAccountResult = await query(
      'SELECT current_balance, name AS account_name FROM bank_account WHERE account_id = $1 FOR UPDATE',
      [fromAccountId]
    );

    if (fromAccountResult.rowCount === 0) {
      await query('ROLLBACK');
      return new Response(JSON.stringify({ error: 'Source account not found' }), { status: 404 });
    }

    const fromAccountBalance = parseFloat(fromAccountResult.rows[0].current_balance);
    const fromAccountName = fromAccountResult.rows[0].account_name;

    if (fromAccountBalance < transferAmount) {
      await query('ROLLBACK');
      return new Response(JSON.stringify({ error: 'Insufficient balance in the source account' }), { status: 400 });
    }

    const newFromBalance = fromAccountBalance - transferAmount;

    // Retrieve toAccount details
    const toAccountResult = await query(
      'SELECT current_balance, name AS account_name FROM bank_account WHERE account_id = $1 FOR UPDATE',
      [toAccountId]
    );

    if (toAccountResult.rowCount === 0) {
      await query('ROLLBACK');
      return new Response(JSON.stringify({ error: 'Destination account not found' }), { status: 404 });
    }

    const toAccountBalance = parseFloat(toAccountResult.rows[0].current_balance);
    const toAccountName = toAccountResult.rows[0].account_name;
    const newToBalance = toAccountBalance + transferAmount;

    // Update fromAccount balance
    await query(
      'UPDATE bank_account SET current_balance = $1 WHERE account_id = $2',
      [newFromBalance, fromAccountId]
    );

    // Log withdrawal with "Transfer to [Account Name] ([Account ID])" in account_history
    const today = new Date();
    const transactionType = `Transfer to ${toAccountName} (${toAccountId})`;
    await query(
      `INSERT INTO account_history (account_id, account_name, transaction_type, amount, date, balance_after_transaction)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [fromAccountId, fromAccountName, transactionType, transferAmount, today, newFromBalance]
    );

    // Update toAccount balance
    await query(
      'UPDATE bank_account SET current_balance = $1 WHERE account_id = $2',
      [newToBalance, toAccountId]
    );

    // Log deposit with "Transfer from [Account Name] ([Account ID])" in account_history
    const transactionTypeToAccount = `Transfer from ${fromAccountName} (${fromAccountId})`;
    await query(
      `INSERT INTO account_history (account_id, account_name, transaction_type, amount, date, balance_after_transaction)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [toAccountId, toAccountName, transactionTypeToAccount, transferAmount, today, newToBalance]
    );

    await query('COMMIT');

    return new Response(
      JSON.stringify({
        message: 'Transfer successful',
        toAccountBalance: newToBalance,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error during balance transfer:', error);
    return new Response('Failed to complete transfer', { status: 500 });
  }
}
