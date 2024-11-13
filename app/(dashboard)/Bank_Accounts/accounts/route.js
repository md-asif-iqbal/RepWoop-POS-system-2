import { query } from '../../../../lib/db';


export async function GET() {
    try {
      const result = await query('SELECT * FROM Bank_Account');
      return new Response(JSON.stringify(result.rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching accounts:', error);
      return new Response('Failed to fetch accounts', { status: 500 });
    }
  }



// export async function POST(req) {
//   const { accountName, openingBalance, uniqueId, userRole } = await req.json();

//   // Check if the user is an admin
//   if (userRole !== 'admin') {
//     return new Response("You're not an admin", { status: 403 });
//   }

//   // Insert into PostgreSQL if user is admin
//   try {
//     await query(
//       'INSERT INTO bank_account (name, opening_balance, current_balance, account_id) VALUES ($1, $2, $3, $4)',
//       [accountName, openingBalance, openingBalance, uniqueId]
//     );

//     return new Response(JSON.stringify({ message: 'Account added successfully' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error adding account:', error);
//     return new Response('Failed to add account', { status: 500 });
//   }
// }

export async function POST(req) {
  const { accountName, openingBalance, uniqueId, userRole } = await req.json();

  if (userRole !== 'admin') {
    return new Response("You're not an admin", { status: 403 });
  }

  try {
    // Insert all columns including account_id if manually specified
    await query(
      'INSERT INTO bank_account (name, opening_balance, current_balance, account_id) VALUES ($1, $2, $3, $4) RETURNING account_id, current_balance',
      [accountName, openingBalance, openingBalance, uniqueId]
    );

    const accountId = uniqueId;
    console.log(accountId);
    
    const currentBalance = openingBalance;
    const today = new Date();
    const transactionType = 'Account Created';

    //  // Log the initial account creation in account_history
    //  await query(
    //   `INSERT INTO account_history (account_name, transaction_type, amount, date, balance_after_transaction)
    //    VALUES ($1, 'Account Created', $2, $3, $4)`,
    //   [accountName, openingBalance, today, currentBalance]
    // );
       // Log the initial account creation in account_history
    await query(
      `INSERT INTO account_history (account_id, account_name, transaction_type, amount, date, balance_after_transaction)
       VALUES ($1, $2, 'Account Created', $3, $4, $5)`,
      [BigInt(accountId), accountName, openingBalance, today, openingBalance]
    );

    return new Response(JSON.stringify({ message: 'Account added successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding account:', error);
    return new Response('Failed to add account', { status: 500 });
  }
}