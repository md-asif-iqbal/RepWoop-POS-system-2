import { query } from "@/lib/db";

export async function GET() {
    try {
      const result = await query(`
        SELECT id, product_id, product_name, purchase_cost, date, quantity, reason
        FROM damages
        ORDER BY date DESC;
      `);
  
      return new Response(
        JSON.stringify({ damages: result.rows }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error fetching damages:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch damages" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
  


  export async function POST(request) {
    try {
      const { product_id, product_name, purchase_cost, date, quantity, reason } =
        await request.json();
  
      // Validate required fields
      if (!product_id || !product_name || !purchase_cost || !quantity || !reason) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Insert damage record
      const result = await query(
        `INSERT INTO damages (product_id, product_name, purchase_cost, date, quantity, reason) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *;`,
        [product_id, product_name, purchase_cost, date || new Date(), quantity, reason]
      );
  
      // Decrease the product quantity
      await query(
        `UPDATE products
         SET opening_stock = opening_stock - $1
         WHERE id = $2;`,
        [quantity, product_id]
      );
  
      return new Response(
        JSON.stringify({
          message: "Damage added successfully",
          damage: result.rows[0],
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error adding damage:", error);
      return new Response(
        JSON.stringify({ error: "Failed to add damage" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
  
  export async function DELETE(request) {
    try {
      const { id } = await request.json();
  
      if (!id) {
        return new Response(
          JSON.stringify({ error: "Damage ID is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Delete the record
      const result = await query(
        `DELETE FROM damages WHERE id = $1 RETURNING *;`,
        [id]
      );
  
      if (result.rowCount === 0) {
        return new Response(
          JSON.stringify({ error: "Damage not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
  
      return new Response(
        JSON.stringify({ message: "Damage deleted successfully", damage: result.rows[0] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting damage:", error);
      return new Response(
        JSON.stringify({ error: "Failed to delete damage" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  