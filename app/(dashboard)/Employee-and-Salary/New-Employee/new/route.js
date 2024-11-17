import { query } from '../../../../../lib/db' // Assuming you have a `db` utility to interact with the database.

export async function POST(req) {
  try {
    const {
      joiningDate,
      name,
      email,
      phone,
      salary,
      overtimeRate,
      address,
    } = await req.json();

    // Insert data into the Employee table
    const result = await query(
      `INSERT INTO Employee (joining_date, name, email, phone, address) 
       VALUES ($1, $2, $3, $4, $5) RETURNING employee_id;`,
      [joiningDate, name, email, phone, address]
    );

    const employeeId = result.rows[0].employee_id;

    // Insert data into the Salary table
    await query(
      `INSERT INTO Salary (employee_id, base_salary, overtime_rate) 
       VALUES ($1, $2, $3);`,
      [employeeId, salary, overtimeRate]
    );

    return new Response(
      JSON.stringify({ message: "Employee and salary data saved successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save data" }),
      { status: 500 }
    );
  }
}
