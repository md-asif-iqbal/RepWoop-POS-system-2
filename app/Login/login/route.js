import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Query to check if a user exists and retrieve all columns except password
    const result = await query(
      'SELECT id, email, name, role, permissions FROM users WHERE email = $1 AND password = $2', 
      [email, password]
    );
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Successful authentication
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
