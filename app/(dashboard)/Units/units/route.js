import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM units;', []);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching units:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch units' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}