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


export async function POST(req) {
  try {
    const { unitName, unitValue, relatedTo , relatedSign} = await req.json();

    const result = await query(
      `
      INSERT INTO units (unit, unit_value, related_to , related_sign)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [unitName, unitValue, relatedTo , relatedSign]
    );

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error inserting unit:', error);
    return new Response(JSON.stringify({ error: 'Failed to insert unit' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
