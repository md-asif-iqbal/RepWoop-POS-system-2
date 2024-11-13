import { query } from '../../../../lib/db';


export async function GET() {
  try {
    const sqlQuery = `
      SELECT category, unnest(brands) AS brand_data
      FROM categories;
    `;
    
    const result = await query(sqlQuery);

    // Parse and extract only `brand` data
    const brandData = result.rows?.map(row => {
      const sanitizedData = row.brand_data.replace(/"id":\s*0*(\d+)/g, '"id": $1');
      return JSON.parse(sanitizedData);  // Parse each brand data as JSON
    });

    return new Response(JSON.stringify(brandData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching brands:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}



// Utility function to generate a random unique id
const generateUniqueId = () => Math.floor(Math.random() * 1000000);

export async function POST(request) {
  try {
    const { category, name, status } = await request.json();
    const id = generateUniqueId(); // Generate random unique id
    const createdOn = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    // Fetch the current brands array for the selected category
    const selectQuery = 'SELECT brands FROM categories WHERE category = $1';
    const selectResult = await query(selectQuery, [category]);

    if (selectResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
    }

    // Parse the existing brands array or initialize it as an empty array if it's null
    const brandsArray = selectResult.rows[0].brands
      ? selectResult.rows[0].brands.map((brand) => JSON.parse(brand))
      : [];

    // Add the new brand to the array
    const newBrand = { id, name, created_on: createdOn, status };
    brandsArray.push(newBrand);

    // Convert back to text[] format
    const updatedBrandsTextArray = brandsArray.map((brand) => JSON.stringify(brand));

    // Update the brands column in the database
    const updateQuery = 'UPDATE categories SET brands = $2 WHERE category = $1';
    await query(updateQuery, [category, updatedBrandsTextArray]);

    return new Response(JSON.stringify({ message: 'Brand added successfully', brand: newBrand }), { status: 200 });
  } catch (error) {
    console.error('Error adding brand:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}