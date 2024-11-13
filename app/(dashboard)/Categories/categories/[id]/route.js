import { query } from '../../../../../lib/db';


export async function PUT(req, { params }) {
  const { id } = params;
  const { name, slug, status } = await req.json();

  // Update query with dynamic fields
  const fields = [];
  const values = [];
  let queryStr = 'UPDATE categories SET ';

  if (name) {
    fields.push(`category = $${fields.length + 1}`);
    values.push(name);
  }
  if (slug) {
    fields.push(`category_slug = $${fields.length + 1}`);
    values.push(slug);
  }
  if (status) {
    fields.push(`status = $${fields.length + 1}`);
    values.push(status);
  }

  values.push(id); // Push the id as the final parameter
  queryStr += `${fields.join(', ')}, created_on = NOW() WHERE id = $${fields.length + 1} RETURNING *`;

  try {
    const result = await query(queryStr, values);
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return new Response(JSON.stringify({ error: 'Failed to update category' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
    const { id } = params;
  
    try {
      // Execute delete query
      const result = await query('DELETE FROM categories WHERE id = $1', [id]);
  
      if (result.rowCount === 0) {
        return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: 'Category deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error deleting category:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete category' }), { status: 500 });
    }
  }