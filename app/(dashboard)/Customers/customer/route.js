import { query } from "../../../../lib/db";



export async function GET() {
    try {
      const result = await query(`
        SELECT 
          id, name, email, phone, address, opening_balance AS balance, 
          paid, sale_due AS saleDue, 
          (opening_balance - paid + sale_due) AS totalDue 
        FROM customers 
        ORDER BY created_at DESC;
      `);
  
      return new Response(
        JSON.stringify({ customers: result.rows }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error fetching customers:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch customers", details: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

export async function POST(request) {
  try {
    const { name, email, phone, address, opening_balance } = await request.json();

    // Validate required fields
    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Name and phone are required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert the new customer into the database
    const result = await query(
      `
      INSERT INTO customers (name, email, phone, address, opening_balance)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, phone, address, opening_balance, created_at;
      `,
      [name, email, phone, address, opening_balance]
    );

    return new Response(
      JSON.stringify({ message: "Customer added successfully", customer: result.rows[0] }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding customer:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to add customer", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
