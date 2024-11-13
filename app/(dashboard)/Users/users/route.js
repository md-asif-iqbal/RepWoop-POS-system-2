import { query } from '../../../../lib/db';

export async function GET(req) {
  try {
    // Fetch all user data from the user table
    const result = await query('SELECT * FROM users'); // Replace 'user' with your exact table name if different

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'No users found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response('Failed to fetch user data', { status: 500 });
  }
}

export async function POST(req) {
  const { name, email, password, role } = await req.json();

  try {
    // Insert new user data into the user table
    await query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)`,
      [name, email, password, role]
    );

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}
