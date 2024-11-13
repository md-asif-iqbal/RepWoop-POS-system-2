import { query } from '../../../../../lib/db';

export async function DELETE(req, { params }) {
  const { id } = params; // Get the product ID from the URL

  try {
    // Run the delete query
    const result = await query(`DELETE FROM products WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response('Failed to delete product', { status: 500 });
  }
}
