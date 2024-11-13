import { query } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await query('SELECT * FROM products');
    const products = result.rows?.map((row) => ({
      ...row,
      image: row.image ? row.image.toString('base64') : null, // Convert binary image to Base64
    }));
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
