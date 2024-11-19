import { query } from "../../../../lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        id, 
        invoice_no, 
        name, 
        amount, 
        created_at 
      FROM expenses
      ORDER BY created_at DESC;
    `);

    return new Response(
      JSON.stringify({ expenses: result.rows }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching expenses:", error.message); // Log error message
    return new Response(
      JSON.stringify({ error: "Failed to fetch expenses", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    const { invoice_no, name, amount } = await request.json();

    // Validate input data
    if (!invoice_no || !name || typeof amount !== "number") {
      return new Response(
        JSON.stringify({ error: "Invalid input data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert new expense into the database
    const result = await query(
      `
      INSERT INTO expenses (invoice_no, name, amount, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
      `,
      [invoice_no, name, amount]
    );

    return new Response(
      JSON.stringify({ expense: result.rows[0] }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating expense:", error.message); // Log error message
    return new Response(
      JSON.stringify({ error: "Failed to create expense", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Expense ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  
    try {
      await query(`
        DELETE FROM expenses
        WHERE id = ?
      `, [id]);
  
      return new Response(
        JSON.stringify({ message: "Expense deleted successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete expense" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }