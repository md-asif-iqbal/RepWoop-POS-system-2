import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM categories ORDER BY created_on DESC');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}

// POST request to add a new category
export async function POST(request) {
  try {
    const { category, category_slug, status } = await request.json();

    // Validate required fields
    if (!category || !category_slug || !status) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    // Get current date
    const created_on = new Date().toISOString(); // Formats the current date to ISO string

    // Insert category data into the database
    const result = await query(
      `INSERT INTO categories (category, category_slug, created_on, status) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [category, category_slug, created_on, status]
    );

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Category added successfully', category: result.rows[0] }), 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding category:', error);
    return new Response(JSON.stringify({ error: 'Failed to add category' }), { status: 500 });
  }
}