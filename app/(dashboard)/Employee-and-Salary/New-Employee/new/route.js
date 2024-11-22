import { query } from '../../../../../lib/db' // Assuming you have a `db` utility to interact with the database.




export async function POST(req) {
  try {
      const body = await req.json(); // Parse the incoming JSON
      const { joiningDate, name, email, phone, salary, overtimeRate, role, address } = body;

      // Validation (optional, but recommended)
      if (!joiningDate || !name || !phone || !salary || !overtimeRate || !role) {
          return new Response(
              JSON.stringify({ success: false, error: "Missing required fields" }),
              { status: 400 }
          );
      }

      // SQL query to insert the employee data
      const sql = `
          INSERT INTO Employee (joining_date, name, email, phone, salary, overtime_rate, role, address)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
      `;
      const values = [joiningDate, name, email, phone, salary, overtimeRate, role, address];

      // Execute the query
      const result = await query(sql, values);

      return new Response(JSON.stringify({ success: true, data: result.rows[0] }), { status: 201 });
  } catch (error) {
      console.error("Error inserting employee:", error);
      return new Response(
          JSON.stringify({ success: false, error: "Database error" }),
          { status: 500 }
      );
  }
}