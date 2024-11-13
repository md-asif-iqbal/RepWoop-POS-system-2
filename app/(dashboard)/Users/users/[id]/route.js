import { query } from '../../../../../lib/db';

export async function PUT(req, { params }) {
  const { id } = params; // User ID from URL
  const { name, email, role, password } = await req.json();

  try {
    // Build a dynamic query based on provided fields
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = $' + (updateFields.length + 1));
      updateValues.push(name);
    }
    if (email) {
      updateFields.push('email = $' + (updateFields.length + 1));
      updateValues.push(email);
    }
    if (role) {
      updateFields.push('role = $' + (updateFields.length + 1));
      updateValues.push(role);
    }
    if (password) {
      updateFields.push('password = $' + (updateFields.length + 1));
      updateValues.push(password); // Hash this in production
    }

    // Add the ID to the values array
    updateValues.push(id);

    if (updateFields.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), { status: 400 });
    }

    const queryText = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${updateValues.length}`;
    await query(queryText, updateValues);

    return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response('Failed to update user', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // User ID from URL

  try {
    // Execute the delete query
    const result = await query('DELETE FROM users WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }),  { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
}

