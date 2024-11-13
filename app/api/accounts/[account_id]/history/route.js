import { query } from '../../../../../lib/db';


export async function GET(req, { params }) {
    const { account_id } = params; // Get account_id from the dynamic route parameter
  
    if (!account_id) {
      return new Response(JSON.stringify({ error: 'Account ID is required' }), { status: 400 });
    }
  
    try {
      // Query the account_history table for transactions with the given account_id
      const result = await query(
        `SELECT * FROM account_history WHERE account_id = $1 ORDER BY date DESC`,
        [account_id]
      );
  
      if (result.rowCount === 0) {
        return new Response(JSON.stringify({ error: 'No transaction history found for this account' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(result.rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching account history:', error);
      return new Response('Failed to fetch account history', { status: 500 });
    }
  }