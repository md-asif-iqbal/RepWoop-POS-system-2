import { NextResponse } from 'next/server';
import { query } from '../../../../../lib/db';

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

// export async function POST(req) {
//   try {
//     // Parse the FormData manually
//     const formData = await req.formData();
//     const productName = formData.get('productName');
//     const productCode = formData.get('productCode');
//     const selectedCategory = formData.get('selectedCategory');
//     const selectedBrand = formData.get('selectedBrand');
//     const selectedMainUnit = formData.get('selectedMainUnit');
//     const subUnit = formData.get('subUnit');
//     const openingStock = formData.get('openingStock');
//     const salePrice = formData.get('salePrice');
//     const purchaseCost = formData.get('purchaseCost');
//     const productDetails = formData.get('productDetails');
//     const createdDate = new Date().toISOString().split('T')[0];

//     // Get the uploaded file as a Blob
//     const productImage = formData.get('productImage');
//     const imageBuffer = Buffer.from(await productImage.arrayBuffer());

//     // Insert product data including the image buffer into PostgreSQL
//     await query(
//       'INSERT INTO products (product_name, product_code, category, brand, main_unit, sub_unit, opening_stock, sale_price, purchase_cost, product_details, image, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
//       [
//         productName,
//         productCode,
//         selectedCategory,
//         selectedBrand,
//         selectedMainUnit,
//         subUnit,
//         openingStock,
//         salePrice,
//         purchaseCost,
//         productDetails,
//         imageBuffer,
//         createdDate,
//       ]
//     );

//     return NextResponse.json({ message: 'Product added successfully' });
//   } catch (error) {
//     console.error('Error uploading product:', error);
//     return NextResponse.json({ error: 'Failed to upload product', details: error.message }, { status: 500 });
//   }
// }

export async function POST(req) {
  try {
    // Parse the FormData manually
    const formData = await req.formData();
    const productName = formData.get('productName');
    const productCode = formData.get('productCode');
    const selectedCategory = formData.get('selectedCategory');
    const selectedBrand = formData.get('selectedBrand');
    const selectedMainUnit = formData.get('selectedMainUnit');
    const subUnit = formData.get('subUnit');
    const openingStock = formData.get('openingStock');
    const salePrice = formData.get('salePrice');
    const purchaseCost = formData.get('purchaseCost');
    const productDetails = formData.get('productDetails');
    const createdDate = new Date().toISOString().split('T')[0];

    // Optional fields
    const discount = formData.get('discount');
    const expireDate = formData.get('expireDate') || null;

    // Get the uploaded file as a Blob
    const productImage = formData.get('productImage');
    const imageBuffer = Buffer.from(await productImage.arrayBuffer());
    const userName = formData.get('userName');  // New user name field
    const email = formData.get('email'); 

    // Insert product data including the image buffer and optional fields into PostgreSQL
    await query(
      `INSERT INTO products (
        product_name, product_code, category, brand, main_unit, sub_unit,
        opening_stock, sale_price, purchase_cost, product_details, image,
        created_at, discount, expire_date, username, email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        productName,
        productCode,
        selectedCategory,
        selectedBrand,
        selectedMainUnit,
        subUnit,
        openingStock,
        salePrice,
        purchaseCost,
        productDetails,
        imageBuffer,
        createdDate,
        discount || null,  // Store as null if not provided
        expireDate,  // Store as null if not provided
        userName,
        email,
      ]
    );

    return NextResponse.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error uploading product:', error);
    return NextResponse.json(
      { error: 'Failed to upload product', details: error.message },
      { status: 500 }
    );
  }
}
