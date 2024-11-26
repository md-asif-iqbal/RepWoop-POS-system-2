import { query } from '../../../../../lib/db'; // Adjust the path to your database utility


export async function GET(req) {
  try {
    // Query to fetch employee salary payments
    const sql = `
      SELECT 
        id, 
        salary_month, 
        employee_name, 
        email, 
        basic_salary, 
        overtime_rate, 
        total_overtime, 
        advance_amount, 
        pay_amount, 
        transaction_account
      FROM EmployeeSalary
      ORDER BY salary_month DESC; -- Order by most recent payments
    `;

    const results = await query(sql);

    // Return the results as JSON
    return new Response(JSON.stringify(results.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching employee payments:', error);

    return new Response(
      JSON.stringify({ success: false, error: 'Database error' }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Parse the incoming JSON payload
    const {
      salaryMonth,
      employee,
      email,
      basicSalary,
      overtimeRate,
      totalOvertime,
      advanceAmount,
      payAmount,
      transactionAccount,
    } = await req.json();

    // Validate required fields
    if (
      !salaryMonth ||
      !employee ||
      !email ||
      !basicSalary ||
      !payAmount ||
      !transactionAccount
    ) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Find the employee in the database
    const findEmployeeSql = `
      SELECT * FROM Employee WHERE name = $1 AND email = $2;
    `;
    const findEmployeeValues = [employee, email];
    const findEmployeeResult = await query(findEmployeeSql, findEmployeeValues);

    if (findEmployeeResult.rows.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Employee with name "${employee}" and email "${email}" not found.`,
        }),
        { status: 404 }
      );
    }

    // Insert salary data into the EmployeeSalary table
    const salarySql = `
      INSERT INTO EmployeeSalary (
        salary_month, employee_name, email, basic_salary, overtime_rate,
        total_overtime, advance_amount, pay_amount, transaction_account
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const salaryValues = [
      salaryMonth,
      employee,
      email,
      parseFloat(basicSalary),
      parseFloat(overtimeRate || 0),
      parseFloat(totalOvertime || 0),
      parseFloat(advanceAmount || 0),
      parseFloat(payAmount),
      transactionAccount,
    ];
    const salaryResult = await query(salarySql, salaryValues);

    // Update the Employee table: Add new salary and overtime rate to existing values
    const employeeUpdateSql = `
      UPDATE Employee
      SET 
        salary = COALESCE(salary, 0) + $1,
        overtime_rate = COALESCE(overtime_rate, 0) + $2 
      WHERE name = $3 AND email = $4
      RETURNING *;
    `;
    const employeeUpdateValues = [
      parseFloat(basicSalary),
      parseFloat(overtimeRate || 0),
      employee,
      email,
    ];
    const employeeResult = await query(employeeUpdateSql, employeeUpdateValues);

    // Check if the employee was successfully updated
    if (employeeResult.rows.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to update employee with name "${employee}" and email "${email}".`,
        }),
        { status: 500 }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Salary data added and Employee updated.',
        salaryData: salaryResult.rows[0],
        updatedEmployee: employeeResult.rows[0],
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding salary or updating employee:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
