import { query } from '../../../../lib/db'; // Adjust the path as necessary

export async function GET() {
  try {
      // Query the suppliers table to fetch all supplier details
      const result = await query(`
          SELECT 
              id,
              name,
              email,
              phone,
              address,
              TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at, -- Format the date
              opening_balance AS balance,
              paid,
              purchase_due
          FROM suppliers
          ORDER BY name ASC;
      `);

      // Format and send the response
      return new Response(
          JSON.stringify({ suppliers: result.rows }),
          {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
          }
      );
  } catch (error) {
      console.error('Error fetching suppliers:', error.message);

      // Handle errors
      return new Response(
          JSON.stringify({ error: 'Failed to fetch suppliers' }),
          {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
          }
      );
  }
}





export async function POST(request) {
  try {
    const { suppliersName, email, phone, address, openingBalance } = await request.json();

    // Validate required fields
    if (!suppliersName) {
      return new Response(
        JSON.stringify({ error: "Supplier name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert the supplier into the database
    const result = await query(
      `INSERT INTO suppliers (name, email, phone, address, opening_balance, paid, purchase_due)
       VALUES ($1, $2, $3, $4, $5, 0, 0)
       RETURNING *;`,
      [suppliersName, email || null, phone || null, address || null, parseFloat(openingBalance) || 0]
    );

    return new Response(
      JSON.stringify({ message: "Supplier added successfully", supplier: result.rows[0] }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding supplier:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add supplier", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
