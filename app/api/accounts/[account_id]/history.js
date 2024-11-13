import { query } from '../../../../lib/db';


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