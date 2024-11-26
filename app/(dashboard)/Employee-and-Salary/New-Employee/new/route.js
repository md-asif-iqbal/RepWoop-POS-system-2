import { query } from '../../../../../lib/db';

export async function POST(req) {
  try {
      const body = await req.json();
      const { joiningDate, name, email, phone, salary, overtimeRate, role, address } = body;

      if (!joiningDate || !name || !phone || !salary || !overtimeRate || !role) {
          return new Response(
              JSON.stringify({ success: false, error: "Missing required fields" }),
              { status: 400 }
          );
      }

      const sql = `
          INSERT INTO Employee (joining_date, name, email, phone, salary, overtime_rate, role, address)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
      `;
      const values = [joiningDate, name, email, phone, salary, overtimeRate, role, address];

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

export async function GET() {
  try {
      // SQL query to retrieve all employees
      const sql = `SELECT * FROM Employee ORDER BY id ASC;`;

      // Execute the query
      const result = await query(sql);

      // Return the fetched rows
      return new Response(JSON.stringify({ success: true, data: result.rows }), { status: 200 });
  } catch (error) {
      console.error("Error fetching employees:", error);
      return new Response(
          JSON.stringify({ success: false, error: "Database error" }),
          { status: 500 }
      );
  }
}
